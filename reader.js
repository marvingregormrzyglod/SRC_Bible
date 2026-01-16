(() => {
  function normalizeToken(token) {
    const lower = token.toLowerCase();
    if (/^\d+(st|nd|rd|th)$/.test(lower)) {
      return lower.replace(/(st|nd|rd|th)$/, '');
    }
    if (lower === 'i') return '1';
    if (lower === 'ii') return '2';
    if (lower === 'iii') return '3';
    return lower;
  }

  function parseSearchQuery(query, bookAliases) {
    const cleaned = query
      .toLowerCase()
      .replace(/[.,]/g, ' ')
      .replace(/[^a-z0-9:\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleaned) return null;

    const tokens = cleaned.split(/[\s:]+/).filter(Boolean).map(normalizeToken);
    const firstNumberIndex = tokens.findIndex((token) => /^\d+$/.test(token));
    const bookTokens = firstNumberIndex === -1 ? tokens : tokens.slice(0, firstNumberIndex);
    const chapterToken = firstNumberIndex === -1 ? null : tokens[firstNumberIndex];
    const bookString = bookTokens.join('');

    function findBookKeyByAlias(input) {
      for (const [key, aliases] of Object.entries(bookAliases)) {
        if (aliases.includes(input)) {
          return { key, alias: input };
        }
      }
      return null;
    }

    function findBookKeyByPrefix(input) {
      let bestMatch = null;
      for (const [key, aliases] of Object.entries(bookAliases)) {
        for (const alias of aliases) {
          if (input.startsWith(alias)) {
            if (!bestMatch || alias.length > bestMatch.alias.length) {
              bestMatch = { key, alias };
            }
          }
        }
      }
      return bestMatch;
    }

    let match = bookString ? findBookKeyByAlias(bookString) : null;
    if (!match) {
      const compact = cleaned.replace(/[^a-z0-9]/g, '');
      match = findBookKeyByPrefix(compact);
      if (match) {
        const remainder = compact.slice(match.alias.length);
        const remainderNumber = remainder.match(/\d+/);
        const remainderChapter = remainderNumber ? parseInt(remainderNumber[0], 10) : null;
        const chapterValue = remainderChapter || (chapterToken ? parseInt(chapterToken, 10) : null);
        return { bookKey: match.key, chapter: chapterValue || 1 };
      }
    }

    if (!match) return null;

    const chapterValue = chapterToken ? parseInt(chapterToken, 10) : 1;
    return { bookKey: match.key, chapter: chapterValue || 1 };
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.classList.contains('reader-page')) return;
    if (!window.SrcBible) return;

    const {
      books,
      bookDisplayNames,
      bookAliases,
      registerPseudoLanguage
    } = window.SrcBible;

    const elements = {
      app: document.getElementById('app'),
      bookSelect: document.getElementById('book-select'),
      chapterSelect: document.getElementById('chapter-select'),
      prevButton: document.getElementById('prev-chapter'),
      nextButton: document.getElementById('next-chapter'),
      searchBar: document.getElementById('search-bar'),
      searchButton: document.getElementById('search-button'),
      searchFeedback: document.getElementById('search-feedback'),
      progressBar: document.getElementById('reading-progress-bar')
    };

    if (!elements.app || !elements.bookSelect || !elements.chapterSelect) return;

    let currentBook = 'genesis';
    let currentChapter = 1;
    let isNavigating = false;

    function updatePlaceholderForMobile() {
      const isMobile = window.innerWidth <= 768;
      elements.searchBar.placeholder = isMobile
        ? 'Search (e.g., Genesis 1)'
        : 'Search (e.g., Genesis 1, John 3:16)';
    }

    function populateBookSelect() {
      elements.bookSelect.innerHTML = '';
      Object.entries(bookDisplayNames).forEach(([key, name]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = name;
        if (key === currentBook) option.selected = true;
        elements.bookSelect.appendChild(option);
      });
    }

    function updateChapterSelect() {
      elements.chapterSelect.innerHTML = '';
      const chapterCount = books[currentBook];

      for (let i = 1; i <= chapterCount; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === currentChapter) option.selected = true;
        elements.chapterSelect.appendChild(option);
      }
    }

    function updateSearchFeedback(message, tone) {
      if (!elements.searchFeedback) return;
      if (!message) {
        elements.searchFeedback.textContent = '';
        elements.searchFeedback.classList.add('hidden');
        elements.searchFeedback.classList.remove('is-error', 'is-success');
        return;
      }
      elements.searchFeedback.textContent = message;
      elements.searchFeedback.classList.remove('hidden');
      elements.searchFeedback.classList.toggle('is-error', tone === 'error');
      elements.searchFeedback.classList.toggle('is-success', tone === 'success');
    }

    function setControlsDisabled(disabled) {
      const controls = [
        elements.bookSelect,
        elements.chapterSelect,
        elements.prevButton,
        elements.nextButton,
        elements.searchBar,
        elements.searchButton
      ].filter(Boolean);

      controls.forEach((control) => {
        control.disabled = disabled;
        control.setAttribute('aria-disabled', disabled ? 'true' : 'false');
      });

      document.body.classList.toggle('is-loading', disabled);
      if (elements.app) {
        elements.app.setAttribute('aria-busy', disabled ? 'true' : 'false');
      }
    }

    function renderLoading() {
      elements.app.innerHTML = `
        <div class="loading-skeleton">
          <div class="skeleton-line wide"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      `;
    }

    function renderError() {
      elements.app.innerHTML = '<div class="error">Error loading content. Please try again.</div>';
    }

    async function loadScripture(book, chapter) {
      if (!books[book] || isNavigating) return;
      isNavigating = true;
      setControlsDisabled(true);
      renderLoading();

      const safeChapter = Math.max(1, Math.min(chapter, books[book]));
      currentBook = book;
      currentChapter = safeChapter;

      elements.bookSelect.value = book;
      updateChapterSelect();
      updateSearchFeedback('', '');

      const newHash = `#/scripture/${book}/${safeChapter.toString().padStart(2, '0')}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, '', newHash);
      }

      try {
        const response = await fetch(`scripture/${book}/${safeChapter.toString().padStart(2, '0')}.md`);
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const markdown = await response.text();
        elements.app.innerHTML = marked.parse(markdown);

        if (typeof hljs !== 'undefined') {
          elements.app.querySelectorAll('pre code').forEach((block) => {
            block.classList.add('language-pseudo');
            hljs.highlightElement(block);
          });
        }

      } catch (error) {
        renderError();
      } finally {
        isNavigating = false;
        setControlsDisabled(false);
      }
    }

    function performSearch() {
      const query = elements.searchBar.value.trim();
      if (!query) {
        updateSearchFeedback('Enter a book name to search.', 'error');
        return;
      }

      const parsed = parseSearchQuery(query, bookAliases);
      if (!parsed || !parsed.bookKey) {
        updateSearchFeedback('Book not found. Try "John" or "1 John".', 'error');
        return;
      }

      const chapter = Math.min(parsed.chapter, books[parsed.bookKey]);
      updateSearchFeedback(
        `Jumping to ${bookDisplayNames[parsed.bookKey] || parsed.bookKey} ${chapter}.`,
        'success'
      );
      loadScripture(parsed.bookKey, chapter);
    }

    function handleHashChange() {
      const hashParts = window.location.hash.replace('#/scripture/', '').split('/');
      if (hashParts.length !== 2) return;
      const [book, chapterString] = hashParts;
      const chapter = parseInt(chapterString, 10);
      if (books[book] && chapter <= books[book]) {
        loadScripture(book, chapter);
      }
    }

    function updateReadingProgress() {
      if (!elements.progressBar) return;
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      elements.progressBar.style.width = `${scrolled}%`;
    }

    if (typeof registerPseudoLanguage === 'function') {
      registerPseudoLanguage();
    }
    updatePlaceholderForMobile();
    window.addEventListener('resize', updatePlaceholderForMobile);

    const hash = window.location.hash.replace('#/scripture/', '').split('/');
    if (hash.length === 2 && books[hash[0]] && parseInt(hash[1], 10) <= books[hash[0]]) {
      currentBook = hash[0];
      currentChapter = parseInt(hash[1], 10);
    }

    populateBookSelect();
    updateChapterSelect();
    updateSearchFeedback('', '');

    loadScripture(currentBook, currentChapter);
    updateReadingProgress();

    elements.bookSelect.addEventListener('change', (event) => {
      currentBook = event.target.value;
      currentChapter = 1;
      loadScripture(currentBook, 1);
    });

    elements.chapterSelect.addEventListener('change', (event) => {
      currentChapter = parseInt(event.target.value, 10);
      loadScripture(currentBook, currentChapter);
    });

    elements.prevButton.addEventListener('click', () => {
      const prevChapter = currentChapter - 1;
      if (prevChapter >= 1) {
        loadScripture(currentBook, prevChapter);
      } else {
        const bookKeys = Object.keys(books);
        const currentIndex = bookKeys.indexOf(currentBook);
        if (currentIndex > 0) {
          const prevBook = bookKeys[currentIndex - 1];
          loadScripture(prevBook, books[prevBook]);
        }
      }
    });

    elements.nextButton.addEventListener('click', () => {
      const nextChapter = currentChapter + 1;
      if (nextChapter <= books[currentBook]) {
        loadScripture(currentBook, nextChapter);
      } else {
        const bookKeys = Object.keys(books);
        const currentIndex = bookKeys.indexOf(currentBook);
        if (currentIndex < bookKeys.length - 1) {
          loadScripture(bookKeys[currentIndex + 1], 1);
        }
      }
    });

    elements.searchButton.addEventListener('click', performSearch);
    elements.searchBar.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') performSearch();
    });

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', updateReadingProgress, { passive: true });
  });
})();

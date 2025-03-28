const books = {
  "genesis": 50, "exodus": 40, "leviticus": 27, "numbers": 36, "deuteronomy": 34,
  "joshua": 24, "judges": 21, "ruth": 4, "1samuel": 31, "2samuel": 24,
  "1kings": 22, "2kings": 25, "1chronicles": 29, "2chronicles": 36, "ezra": 10,
  "nehemiah": 13, "esther": 10, "job": 42, "psalms": 150, "proverbs": 31,
  "ecclesiastes": 12, "songofsolomon": 8, "isaiah": 66, "jeremiah": 52, "lamentations": 5,
  "ezekiel": 48, "daniel": 12, "hosea": 14, "joel": 3, "amos": 9,
  "obadiah": 1, "jonah": 4, "micah": 7, "nahum": 3, "habakkuk": 3,
  "zephaniah": 3, "haggai": 2, "zechariah": 14, "malachi": 4, "matthew": 28,
  "mark": 16, "luke": 24, "john": 21, "acts": 28, "romans": 16,
  "1corinthians": 16, "2corinthians": 13, "galatians": 6, "ephesians": 6, "philippians": 4,
  "colossians": 4, "1thessalonians": 5, "2thessalonians": 3, "1timothy": 6, "2timothy": 4,
  "titus": 3, "philemon": 1, "hebrews": 13, "james": 5, "1peter": 5,
  "2peter": 3, "1john": 5, "2john": 1, "3john": 1, "jude": 1,
  "revelation": 22
};

const bookDisplayNames = {
  "genesis": "Genesis", "exodus": "Exodus", "leviticus": "Leviticus", "numbers": "Numbers", "deuteronomy": "Deuteronomy",
  "joshua": "Joshua", "judges": "Judges", "ruth": "Ruth", "1samuel": "1 Samuel", "2samuel": "2 Samuel",
  "1kings": "1 Kings", "2kings": "2 Kings", "1chronicles": "1 Chronicles", "2chronicles": "2 Chronicles", "ezra": "Ezra",
  "nehemiah": "Nehemiah", "esther": "Esther", "job": "Job", "psalms": "Psalms", "proverbs": "Proverbs",
  "ecclesiastes": "Ecclesiastes", "songofsolomon": "Song of Solomon", "isaiah": "Isaiah", "jeremiah": "Jeremiah", "lamentations": "Lamentations",
  "ezekiel": "Ezekiel", "daniel": "Daniel", "hosea": "Hosea", "joel": "Joel", "amos": "Amos",
  "obadiah": "Obadiah", "jonah": "Jonah", "micah": "Micah", "nahum": "Nahum", "habakkuk": "Habakkuk",
  "zephaniah": "Zephaniah", "haggai": "Haggai", "zechariah": "Zechariah", "malachi": "Malachi", "matthew": "Matthew",
  "mark": "Mark", "luke": "Luke", "john": "John", "acts": "Acts", "romans": "Romans",
  "1corinthians": "1 Corinthians", "2corinthians": "2 Corinthians", "galatians": "Galatians", "ephesians": "Ephesians", "philippians": "Philippians",
  "colossians": "Colossians", "1thessalonians": "1 Thessalonians", "2thessalonians": "2 Thessalonians", "1timothy": "1 Timothy", "2timothy": "2 Timothy",
  "titus": "Titus", "philemon": "Philemon", "hebrews": "Hebrews", "james": "James", "1peter": "1 Peter",
  "2peter": "2 Peter", "1john": "1 John", "2john": "2 John", "3john": "3 John", "jude": "Jude",
  "revelation": "Revelation"
};

const allBooks = Object.keys(books);

const exodusGroups = [
  { name: "⛓️ Oppression", start: 1, end: 6, class: "oppression", subtitles: "Slavery • Moses’ call" },
  { name: "🐸 Plagues", start: 7, end: 13, class: "plagues", subtitles: "Judgment • Passover" },
  { name: "🌊 Miracles", start: 14, end: 18, class: "miracles", subtitles: "Red Sea • Manna" },
  { name: "✋ Covenant", start: 19, end: 40, class: "covenant", subtitles: "Law • Tabernacle" }
];

const leviticusGroups = [
  { name: "🩸 Sacrifices", start: 1, end: 7, class: "sacrifices", subtitles: "Offerings • Atonement" },
  { name: "✨ Holiness", start: 8, end: 22, class: "holiness", subtitles: "Priests • Purity Laws" },
  { name: "🎉 Feasts", start: 23, end: 25, class: "feasts", subtitles: "Sabbaths • Jubilee" },
  { name: "⚠️ Warnings", start: 26, end: 27, class: "warnings", subtitles: "Blessings • Curses" }
];

const bookGroups = {
  "exodus": exodusGroups,
  "leviticus": leviticusGroups
};

document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.getElementById('book-list');
  const searchBar = document.getElementById('search-bar');
  let currentMode = 'books'; // 'books' or 'chapters'
  let selectedBook = null;

  // Display books with OT and NT sections or filtered results
  function displayBooks(filter = '') {
    bookList.innerHTML = '';
    if (filter) {
      const filteredBooks = allBooks.filter(book =>
        bookDisplayNames[book].toLowerCase().includes(filter.toLowerCase())
      );
      const grid = document.createElement('div');
      grid.className = 'book-grid';
      filteredBooks.forEach(book => {
        const bookButton = createBookButton(book);
        grid.appendChild(bookButton);
      });
      bookList.appendChild(grid);
    } else {
      // Old Testament Section
      const otBooks = allBooks.slice(0, 39); // Genesis to Malachi
      const otDiv = document.createElement('div');
      otDiv.className = 'book-group';
      const otHeader = document.createElement('h3');
      otHeader.textContent = 'Old Testament';
      otDiv.appendChild(otHeader);
      const otGrid = document.createElement('div');
      otGrid.className = 'book-grid';
      otBooks.forEach(book => {
        const bookButton = createBookButton(book);
        otGrid.appendChild(bookButton);
      });
      otDiv.appendChild(otGrid);
      bookList.appendChild(otDiv);

      // New Testament Section
      const ntBooks = allBooks.slice(39); // Matthew to Revelation
      const ntDiv = document.createElement('div');
      ntDiv.className = 'book-group';
      const ntHeader = document.createElement('h3');
      ntHeader.textContent = 'New Testament';
      ntDiv.appendChild(ntHeader);
      const ntGrid = document.createElement('div');
      ntGrid.className = 'book-grid';
      ntBooks.forEach(book => {
        const bookButton = createBookButton(book);
        ntGrid.appendChild(bookButton);
      });
      ntDiv.appendChild(ntGrid);
      bookList.appendChild(ntDiv);
    }
  }

  // Create a book button
  function createBookButton(book) {
    const displayName = bookDisplayNames[book];
    const bookButton = document.createElement('div');
    bookButton.className = 'book-button';
    bookButton.textContent = displayName;
    bookButton.addEventListener('click', () => {
      selectedBook = book;
      currentMode = 'chapters';
      displayChapters(book);
    });
    return bookButton;
  }

  // Display chapters for a selected book
  function displayChapters(book, filter = '') {
    bookList.innerHTML = '';
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = 'Back to Books';
    backButton.addEventListener('click', () => {
      currentMode = 'books';
      selectedBook = null;
      displayBooks();
    });
    bookList.appendChild(backButton);

    const groups = bookGroups[book];
    if (groups) {
      groups.forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.className = `chapter-group ${group.class}`;
        const groupHeader = document.createElement('div');
        groupHeader.className = 'group-header';
        const nameSpan = document.createElement('span');
        nameSpan.className = 'group-name';
        nameSpan.textContent = group.name;
        groupHeader.appendChild(nameSpan);
        if (group.subtitles) {
          const subtitleSpan = document.createElement('div');
          subtitleSpan.className = 'group-subtitles';
          subtitleSpan.textContent = group.subtitles;
          groupHeader.appendChild(subtitleSpan);
        }
        groupDiv.appendChild(groupHeader);
        const chaptersDiv = document.createElement('div');
        chaptersDiv.className = 'chapters';
        for (let i = group.start; i <= group.end; i++) {
          const chapterStr = i.toString().padStart(2, '0');
          if (filter && !chapterStr.includes(filter)) continue;
          const chapterLink = createChapterLink(book, chapterStr, i);
          chaptersDiv.appendChild(chapterLink);
        }
        groupDiv.appendChild(chaptersDiv);
        bookList.appendChild(groupDiv);
      });
    } else {
      const chaptersDiv = document.createElement('div');
      chaptersDiv.className = 'chapters';
      for (let i = 1; i <= books[book]; i++) {
        const chapterStr = i.toString().padStart(2, '0');
        if (filter && !chapterStr.includes(filter)) continue;
        const chapterLink = createChapterLink(book, chapterStr, i);
        chaptersDiv.appendChild(chapterLink);
      }
      bookList.appendChild(chaptersDiv);
    }
  }

  // Create a chapter link
  function createChapterLink(book, chapterStr, chapterNum) {
    const chapterLink = document.createElement('a');
    chapterLink.href = `#/scripture/${book}/${chapterStr}`;
    chapterLink.className = 'chapter-link';
    chapterLink.textContent = chapterNum;
    chapterLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.chapter-link').forEach(link => link.classList.remove('active'));
      chapterLink.classList.add('active');
      window.location.hash = `#/scripture/${book}/${chapterStr}`;
    });
    return chapterLink;
  }

  // Search bar functionality
  searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    const [bookSearch, chapterSearch] = searchTerm.split(' ');
    const bookKey = Object.keys(bookDisplayNames).find(key =>
      bookDisplayNames[key].toLowerCase().startsWith(bookSearch)
    );
    if (bookKey && books[bookKey]) {
      selectedBook = bookKey;
      currentMode = 'chapters';
      displayChapters(bookKey, chapterSearch || '');
    } else {
      currentMode = 'books';
      displayBooks(searchTerm);
    }
  });

  // Initial load and hash handling
  const hash = window.location.hash.replace('#/', '');
  if (hash) {
    const parts = hash.split('/');
    if (parts[0] === 'scripture' && parts[1] && parts[2]) {
      const book = parts[1];
      const chapter = parts[2];
      if (books[book]) {
        selectedBook = book;
        currentMode = 'chapters';
        displayChapters(book);
        setTimeout(() => {
          const chapterLink = document.querySelector(`a[href="#/scripture/${book}/${chapter}"]`);
          if (chapterLink) {
            chapterLink.classList.add('active');
            chapterLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  } else {
    displayBooks();
  }
});

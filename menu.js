const books = {
  "genesis": 50,
  "exodus": 40,
  "leviticus": 27,
  "numbers": 36,
  "deuteronomy": 34,
  "joshua": 24,
  "judges": 21,
  "ruth": 4,
  "1samuel": 31,
  "2samuel": 24,
  "1kings": 22,
  "2kings": 25,
  "1chronicles": 29,
  "2chronicles": 36,
  "ezra": 10,
  "nehemiah": 13,
  "esther": 10,
  "job": 42,
  "psalms": 150,
  "proverbs": 31,
  "ecclesiastes": 12,
  "songofsolomon": 8,
  "isaiah": 66,
  "jeremiah": 52,
  "lamentations": 5,
  "ezekiel": 48,
  "daniel": 12,
  "hosea": 14,
  "joel": 3,
  "amos": 9,
  "obadiah": 1,
  "jonah": 4,
  "micah": 7,
  "nahum": 3,
  "habakkuk": 3,
  "zephaniah": 3,
  "haggai": 2,
  "zechariah": 14,
  "malachi": 4,
  "matthew": 28,
  "mark": 16,
  "luke": 24,
  "john": 21,
  "acts": 28,
  "romans": 16,
  "1corinthians": 16,
  "2corinthians": 13,
  "galatians": 6,
  "ephesians": 6,
  "philippians": 4,
  "colossians": 4,
  "1thessalonians": 5,
  "2thessalonians": 3,
  "1timothy": 6,
  "2timothy": 4,
  "titus": 3,
  "philemon": 1,
  "hebrews": 13,
  "james": 5,
  "1peter": 5,
  "2peter": 3,
  "1john": 5,
  "2john": 1,
  "3john": 1,
  "jude": 1,
  "revelation": 22
};

const exodusGroups = [
  { name: "⛓️ Oppression", start: 1, end: 6, class: "oppression", subtitles: "Slavery • Moses’ call" },
  { name: "🐸 Plagues", start: 7, end: 13, class: "plagues", subtitles: "Judgment • Passover" },
  { name: "🌊 Miracles", start: 14, end: 18, class: "miracles", subtitles: "Red Sea • Manna" },
  { name: "✋ Covenant", start: 19, end: 40, class: "covenant", subtitles: "Law • Tabernacle" }
];

const leviticusGroups = [
  { name: "🩸 SACRIFICES", start: 1, end: 7, class: "sacrifices", subtitles: "Offerings • Atonement" },
  { name: "✨ HOLINESS", start: 8, end: 22, class: "holiness", subtitles: "Priests • Purity Laws" },
  { name: "🎉 FEASTS", start: 23, end: 25, class: "feasts", subtitles: "Sabbaths • Jubilee" },
  { name: "⚠️ WARNINGS", start: 26, end: 27, class: "warnings", subtitles: "Blessings • Curses" }
];

const bookGroups = {
  "exodus": exodusGroups,
  "leviticus": leviticusGroups
};

document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.getElementById('book-list');
  const chapterList = document.getElementById('chapter-list');
  const searchBar = document.getElementById('search-bar');

  function populateBooks(filter = '') {
    bookList.innerHTML = '';
    Object.keys(books).forEach(book => {
      const bookName = book.replace(/(\d)/, ' $1').replace(/([a-z])([A-Z])/g, '$1 $2');
      if (filter && !bookName.toLowerCase().includes(filter.toLowerCase())) return;
      const bookButton = document.createElement('div');
      bookButton.className = 'book-button';
      bookButton.textContent = bookName;
      bookButton.addEventListener('click', () => {
        document.querySelectorAll('.book-button').forEach(btn => btn.classList.remove('active'));
        bookButton.classList.add('active');
        chapterList.innerHTML = '';
        showChapters(book, chapterList, '');
      });
      bookList.appendChild(bookButton);
    });
  }

  populateBooks();

  searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    populateBooks(searchTerm);

    const [bookSearch, chapterSearch] = searchTerm.split(' ');
    const activeBook = document.querySelector('.book-button.active');

    if (bookSearch) {
      const book = activeBook ? activeBook.textContent.toLowerCase().replace(/\s/g, '') : bookSearch;
      if (books[book]) {
        chapterList.innerHTML = '';
        showChapters(book, chapterList, chapterSearch || '');
      } else {
        chapterList.innerHTML = '';
      }
    } else {
      chapterList.innerHTML = '';
    }
  });

  const hash = window.location.hash.replace('#/', '');
  if (hash) {
    const bookMatch = hash.match(/scripture\/([^\/]+)/);
    const chapterMatch = hash.match(/scripture\/[^\/]+\/(\d+)/);
    if (bookMatch) {
      const book = bookMatch[1];
      document.querySelectorAll('.book-button').forEach(btn => {
        if (btn.textContent.toLowerCase().replace(/\s/g, '') === book) btn.classList.add('active');
      });
      showChapters(book, chapterList);
      if (chapterMatch) {
        const chapter = chapterMatch[1];
        setTimeout(() => {
          const chapterLink = document.querySelector(`a[href="#/scripture/${book}/${chapter}"]`);
          if (chapterLink) chapterLink.classList.add('active');
        }, 100);
      }
    }
  }
});

function showChapters(book, chapterList, filter = '') {
  const groupsContainer = document.createElement('div');
  groupsContainer.className = 'chapter-groups-container';

  const groups = bookGroups[book];
  if (groups) {
    groups.forEach(group => {
      const searchTerm = filter.toLowerCase();
      const groupNameMatch = group.name.toLowerCase().includes(searchTerm);
      const subtitlesMatch = group.subtitles.toLowerCase().includes(searchTerm);
      const chapterRangeMatch = Array.from({ length: group.end - group.start + 1 }, (_, i) => group.start + i)
        .some(chapter => chapter.toString() === searchTerm);

      if (filter && !groupNameMatch && !subtitlesMatch && !chapterRangeMatch) return;

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
        const chapter = i.toString().padStart(2, '0');
        if (filter && !chapter.includes(filter) && !groupNameMatch && !subtitlesMatch) continue;
        const chapterLink = document.createElement('a');
        chapterLink.href = `#/scripture/${book}/${chapter}`;
        chapterLink.className = 'chapter-link';
        chapterLink.textContent = i;
        chapterLink.addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelectorAll('.chapter-link').forEach(link => link.classList.remove('active'));
          chapterLink.classList.add('active');
          window.location.hash = `#/scripture/${book}/${chapter}`;
        });
        chaptersDiv.appendChild(chapterLink);
      }
      if (chaptersDiv.children.length > 0) {
        groupDiv.appendChild(chaptersDiv);
        groupsContainer.appendChild(groupDiv);
      }
    });
  } else {
    const chaptersDiv = document.createElement('div');
    chaptersDiv.className = 'chapters';
    for (let i = 1; i <= books[book]; i++) {
      const chapter = i.toString().padStart(2, '0');
      if (filter && !chapter.includes(filter)) continue;
      const chapterLink = document.createElement('a');
      chapterLink.href = `#/scripture/${book}/${chapter}`;
      chapterLink.className = 'chapter-link';
      chapterLink.textContent = i;
      chapterLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.chapter-link').forEach(link => link.classList.remove('active'));
        chapterLink.classList.add('active');
        window.location.hash = `#/scripture/${book}/${chapter}`;
      });
      chaptersDiv.appendChild(chapterLink);
    }
    groupsContainer.appendChild(chaptersDiv);
  }
  chapterList.appendChild(groupsContainer);
}

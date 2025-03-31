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
  "genesis": "Gen", "exodus": "Ex", "leviticus": "Lev", "numbers": "Num", "deuteronomy": "Deut",
  "joshua": "Josh", "judges": "Judg", "ruth": "Ruth", "1samuel": "1 Sam", "2samuel": "2 Sam",
  "1kings": "1 Kgs", "2kings": "2 Kgs", "1chronicles": "1 Chr", "2chronicles": "2 Chr", "ezra": "Ezra",
  "nehemiah": "Neh", "esther": "Esth", "job": "Job", "psalms": "Ps", "proverbs": "Prov",
  "ecclesiastes": "Eccl", "songofsolomon": "Song", "isaiah": "Isa", "jeremiah": "Jer", "lamentations": "Lam",
  "ezekiel": "Ezek", "daniel": "Dan", "hosea": "Hos", "joel": "Joel", "amos": "Amos",
  "obadiah": "Obad", "jonah": "Jonah", "micah": "Mic", "nahum": "Nah", "habakkuk": "Hab",
  "zephaniah": "Zeph", "haggai": "Hag", "zechariah": "Zech", "malachi": "Mal", "matthew": "Matt",
  "mark": "Mark", "luke": "Luke", "john": "John", "acts": "Acts", "romans": "Rom",
  "1corinthians": "1 Cor", "2corinthians": "2 Cor", "galatians": "Gal", "ephesians": "Eph", "philippians": "Phil",
  "colossians": "Col", "1thessalonians": "1 Thess", "2thessalonians": "2 Thess", "1timothy": "1 Tim", "2timothy": "2 Tim",
  "titus": "Titus", "philemon": "Phlm", "hebrews": "Heb", "james": "Jas", "1peter": "1 Pet",
  "2peter": "2 Pet", "1john": "1 Jn", "2john": "2 Jn", "3john": "3 Jn", "jude": "Jude",
  "revelation": "Rev"
};

let currentBook = 'genesis';
let currentChapter = 1;

function populateBookSelect() {
  const select = document.getElementById('book-select');
  Object.entries(bookDisplayNames).forEach(([key, name]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = name;
    select.appendChild(option);
  });
}

function updateChapterSelect() {
  const select = document.getElementById('chapter-select');
  select.innerHTML = '';
  const chapterCount = books[currentBook];
  
  for (let i = 1; i <= chapterCount; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    option.selected = i === currentChapter;
    select.appendChild(option);
  }
}

function loadScripture(book, chapter) {
  currentBook = book;
  currentChapter = Math.max(1, Math.min(chapter, books[book]));
  
  document.getElementById('book-select').value = book;
  updateChapterSelect();
  window.location.hash = `#/scripture/${book}/${currentChapter.toString().padStart(2, '0')}`;
  
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = '<div class="loading">Loading...</div>';
  
  fetch(`scripture/${book}/${currentChapter.toString().padStart(2, '0')}.md`)
    .then(response => response.text())
    .then(markdown => {
      const html = marked.parse(markdown);
      appDiv.innerHTML = html;
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block, { language: 'pseudo' });
      });
    })
    .catch(() => {
      appDiv.innerHTML = '<h1>Error</h1><p>Could not load content.</p>';
    });
}

document.getElementById('book-select').addEventListener('change', (e) => {
  currentBook = e.target.value;
  currentChapter = 1;
  loadScripture(currentBook, 1);
});

document.getElementById('chapter-select').addEventListener('change', (e) => {
  loadScripture(currentBook, parseInt(e.target.value));
});

document.getElementById('prev-chapter').addEventListener('click', () => {
  if (currentChapter > 1) {
    loadScripture(currentBook, currentChapter - 1);
  } else {
    const bookKeys = Object.keys(books);
    const currentIndex = bookKeys.indexOf(currentBook);
    if (currentIndex > 0) {
      const prevBook = bookKeys[currentIndex - 1];
      loadScripture(prevBook, books[prevBook]);
    }
  }
});

document.getElementById('next-chapter').addEventListener('click', () => {
  if (currentChapter < books[currentBook]) {
    loadScripture(currentBook, currentChapter + 1);
  } else {
    const bookKeys = Object.keys(books);
    const currentIndex = bookKeys.indexOf(currentBook);
    if (currentIndex < bookKeys.length - 1) {
      loadScripture(bookKeys[currentIndex + 1], 1);
    }
  }
});

// Handle hash changes
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#/scripture/', '').split('/');
  if (hash.length === 2) {
    const book = hash[0];
    const chapter = parseInt(hash[1]);
    if (books[book] && chapter <= books[book]) {
      loadScripture(book, chapter);
    }
  }
});

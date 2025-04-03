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

const bookAliases = {
  "genesis": ["genesis", "gen", "ge"],
  "exodus": ["exodus", "exod", "ex"],
  "leviticus": ["leviticus", "lev", "le"],
  "numbers": ["numbers", "num", "nu", "nm"],
  "deuteronomy": ["deuteronomy", "deut", "dt"],
  "joshua": ["joshua", "josh", "jos", "jsh"],
  "judges": ["judges", "judg", "jdg", "jg"],
  "ruth": ["ruth", "rth", "ru"],
  "1samuel": ["1samuel", "1sam", "1sa", "1sm", "1s"],
  "2samuel": ["2samuel", "2sam", "2sa", "2sm", "2s"],
  "1kings": ["1kings", "1kgs", "1ki", "1k"],
  "2kings": ["2kings", "2kgs", "2ki", "2k"],
  "1chronicles": ["1chronicles", "1chron", "1chr", "1ch"],
  "2chronicles": ["2chronicles", "2chron", "2chr", "2ch"],
  "ezra": ["ezra", "ezr", "ez"],
  "nehemiah": ["nehemiah", "neh", "ne"],
  "esther": ["esther", "esth", "es"],
  "job": ["job", "jb"],
  "psalms": ["psalms", "psalm", "ps", "psa", "pss"],
  "proverbs": ["proverbs", "prov", "pr", "prv"],
  "ecclesiastes": ["ecclesiastes", "eccles", "ecc", "ec"],
  "songofsolomon": ["songofsolomon", "song", "sos", "so", "solomon"],
  "isaiah": ["isaiah", "isa", "is"],
  "jeremiah": ["jeremiah", "jer", "je", "jerm"],
  "lamentations": ["lamentations", "lam", "la"],
  "ezekiel": ["ezekiel", "ezek", "eze", "ezk"],
  "daniel": ["daniel", "dan", "da", "dn"],
  "hosea": ["hosea", "hos", "ho"],
  "joel": ["joel", "joe", "jl"],
  "amos": ["amos", "am"],
  "obadiah": ["obadiah", "obad", "ob"],
  "jonah": ["jonah", "jnh", "jon"],
  "micah": ["micah", "mic", "mi"],
  "nahum": ["nahum", "nah", "na"],
  "habakkuk": ["habakkuk", "hab", "hb"],
  "zephaniah": ["zephaniah", "zeph", "zep", "zp"],
  "haggai": ["haggai", "hag", "hg"],
  "zechariah": ["zechariah", "zech", "zec", "zc"],
  "malachi": ["malachi", "mal", "ml"],
  "matthew": ["matthew", "matt", "mt"],
  "mark": ["mark", "mrk", "mar", "mk"],
  "luke": ["luke", "luk", "lk"],
  "john": ["john", "joh", "jhn", "jn"],
  "acts": ["acts", "act", "ac"],
  "romans": ["romans", "rom", "ro", "rm"],
  "1corinthians": ["1corinthians", "1cor", "1co", "1c"],
  "2corinthians": ["2corinthians", "2cor", "2co", "2c"],
  "galatians": ["galatians", "gal", "ga"],
  "ephesians": ["ephesians", "eph", "ephes"],
  "philippians": ["philippians", "phil", "php", "pp"],
  "colossians": ["colossians", "col", "co"],
  "1thessalonians": ["1thessalonians", "1thess", "1th", "1thes"],
  "2thessalonians": ["2thessalonians", "2thess", "2th", "2thes"],
  "1timothy": ["1timothy", "1tim", "1ti", "1tm"],
  "2timothy": ["2timothy", "2tim", "2ti", "2tm"],
  "titus": ["titus", "tit", "ti"],
  "philemon": ["philemon", "philem", "phm", "pm"],
  "hebrews": ["hebrews", "heb"],
  "james": ["james", "jas", "jm"],
  "1peter": ["1peter", "1pet", "1pe", "1pt", "1p"],
  "2peter": ["2peter", "2pet", "2pe", "2pt", "2p"],
  "1john": ["1john", "1joh", "1jhn", "1jn", "1j"],
  "2john": ["2john", "2joh", "2jhn", "2jn", "2j"],
  "3john": ["3john", "3joh", "3jhn", "3jn", "3j"],
  "jude": ["jude", "jud", "jd"],
  "revelation": ["revelation", "rev", "re", "rv"]
};

let currentBook = 'genesis';
let currentChapter = 1;
let isNavigating = false;

function populateBookSelect() {
  const select = document.getElementById('book-select');
  select.innerHTML = '';
  Object.entries(bookDisplayNames).forEach(([key, name]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = name;
    if (key === currentBook) option.selected = true;
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

async function loadScripture(book, chapter) {
  if (isNavigating) return;
  isNavigating = true;
  
  try {
    currentBook = book;
    currentChapter = Math.max(1, Math.min(chapter, books[book]));
    
    // Update UI controls
    document.getElementById('book-select').value = book;
    updateChapterSelect();
    
    // Update URL
    const newHash = `#/scripture/${book}/${currentChapter.toString().padStart(2, '0')}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }

    // Load content
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = '<div class="loading">Loading...</div>';
    
    const response = await fetch(`scripture/${book}/${currentChapter.toString().padStart(2, '0')}.md`);
    const markdown = await response.text();
    const html = marked.parse(markdown);
    appDiv.innerHTML = html;
    
    document.querySelectorAll('pre').forEach(block => {
      hljs.highlightElement(block, { language: 'pseudo' });
    });
  } catch (error) {
    console.error('Error loading content:', error);
    document.getElementById('app').innerHTML = '<div class="error">Error loading content</div>';
  } finally {
    isNavigating = false;
  }
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
      const nextBook = bookKeys[currentIndex + 1];
      loadScripture(nextBook, 1);
    }
  }
});

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

function performSearch() {
  const query = document.getElementById('search-bar').value.trim();
  const [bookPart, chapterPart] = query.split(/[\s:]+/);
  const bookKey = Object.keys(bookAliases).find(key => 
    bookAliases[key].some(alias => alias === bookPart.toLowerCase())
  );
  
  if (bookKey && books[bookKey]) {
    const chapter = parseInt(chapterPart) || 1;
    loadScripture(bookKey, Math.min(chapter, books[bookKey]));
  }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  populateBookSelect();
  updateChapterSelect();
  loadScripture('genesis', 1);
});

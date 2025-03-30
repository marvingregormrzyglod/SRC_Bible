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

const bookCategories = {
  "Old Testament": {
    "Beginnings": ["genesis", "exodus", "leviticus", "numbers", "deuteronomy"],
    "History": ["joshua", "judges", "ruth", "1samuel", "2samuel", "1kings", "2kings", "1chronicles", "2chronicles", "ezra", "nehemiah", "esther"],
    "Wisdom": ["job", "psalms", "proverbs", "ecclesiastes", "songofsolomon"],
    "Prophets": ["isaiah", "jeremiah", "lamentations", "ezekiel", "daniel", "hosea", "joel", "amos", "obadiah", "jonah", "micah", "nahum", "habakkuk", "zephaniah", "haggai", "zechariah", "malachi"]
  },
  "New Testament": {
    "Gospels": ["matthew", "mark", "luke", "john", "acts"],
    "Letters": ["romans", "1corinthians", "2corinthians", "galatians", "ephesians", "philippians", "colossians", "1thessalonians", "2thessalonians", "1timothy", "2timothy", "titus", "philemon", "hebrews", "james", "1peter", "2peter", "1john", "2john", "3john", "jude"],
    "Apocalypse": ["revelation"]
  }
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
    // Display categorized books
    for (const [testament, categories] of Object.entries(bookCategories)) {
      const testamentDiv = document.createElement('div');
      testamentDiv.className = 'book-group';
      
      const testamentHeader = document.createElement('h3');
      testamentHeader.textContent = testament;
      testamentDiv.appendChild(testamentHeader);
      
      for (const [category, booksInCategory] of Object.entries(categories)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-group';
        
        const categoryHeader = document.createElement('h4');
        categoryHeader.textContent = category;
        categoryDiv.appendChild(categoryHeader);
        
        const grid = document.createElement('div');
        grid.className = 'book-grid';
        
        booksInCategory.forEach(book => {
          const bookButton = createBookButton(book);
          grid.appendChild(bookButton);
        });
        
        categoryDiv.appendChild(grid);
        testamentDiv.appendChild(categoryDiv);
      }
      
      bookList.appendChild(testamentDiv);
    }
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
  
  // Create header container
  const headerDiv = document.createElement('div');
  headerDiv.style.display = 'flex';
  headerDiv.style.justifyContent = 'space-between';
  headerDiv.style.alignItems = 'center';
  headerDiv.style.marginBottom = '15px';

  // Book title
  const title = document.createElement('h3');
  title.textContent = bookDisplayNames[book];
  title.style.margin = '0';
  title.style.fontSize = '1.2em';

  // Back button
  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.textContent = 'Back to Books';
  backButton.style.width = 'auto';
  backButton.style.padding = '5px 10px';

  headerDiv.appendChild(title);
  headerDiv.appendChild(backButton);
  bookList.appendChild(headerDiv);

  // Create chapters container
  const chaptersDiv = document.createElement('div');
  chaptersDiv.className = 'chapters';

  const groups = bookGroups[book];
  if (groups) {
    groups.forEach(group => {
      // Add group header
      const groupHeader = document.createElement('div');
      groupHeader.className = 'group-header';
      groupHeader.innerHTML = `
        <span class="group-name">${group.name}</span>
        <span class="group-subtitles">${group.subtitles}</span>
      `;
      chaptersDiv.appendChild(groupHeader);

      // Add chapters
      for (let i = group.start; i <= group.end; i++) {
        const chapterStr = i.toString().padStart(2, '0');
        if (filter && !chapterStr.includes(filter)) continue;
        const chapterLink = createChapterLink(book, chapterStr, i);
        chaptersDiv.appendChild(chapterLink);
      }
    });
  } else {
    // Regular chapter display
    for (let i = 1; i <= books[book]; i++) {
      const chapterStr = i.toString().padStart(2, '0');
      if (filter && !chapterStr.includes(filter)) continue;
      const chapterLink = createChapterLink(book, chapterStr, i);
      chaptersDiv.appendChild(chapterLink);
    }
  }

  bookList.appendChild(chaptersDiv);

  // Add back button functionality
  backButton.addEventListener('click', () => {
    currentMode = 'books';
    selectedBook = null;
    displayBooks();
  });
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

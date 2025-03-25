// Define books and chapter counts
const books = {
  // Old Testament
  "genesis": 50, "exodus": 40, "leviticus": 27, "numbers": 36, "deuteronomy": 34,
  "joshua": 24, "judges": 21, "ruth": 4, "1samuel": 31, "2samuel": 24,
  "1kings": 22, "2kings": 25, "1chronicles": 29, "2chronicles": 36, "ezra": 10,
  "nehemiah": 13, "esther": 10, "job": 42, "psalms": 150, "proverbs": 31,
  "ecclesiastes": 12, "songofsolomon": 8, "isaiah": 66, "jeremiah": 52,
  "lamentations": 5, "ezekiel": 48, "daniel": 12, "hosea": 14, "joel": 3,
  "amos": 9, "obadiah": 1, "jonah": 4, "micah": 7, "nahum": 3, "habakkuk": 3,
  "zephaniah": 3, "haggai": 2, "zechariah": 14, "malachi": 4,
  // New Testament
  "matthew": 28, "mark": 16, "luke": 24, "john": 21, "acts": 28,
  "romans": 16, "1corinthians": 16, "2corinthians": 13, "galatians": 6,
  "ephesians": 6, "philippians": 4, "colossians": 4, "1thessalonians": 5,
  "2thessalonians": 3, "1timothy": 6, "2timothy": 4, "titus": 3, "philemon": 1,
  "hebrews": 13, "james": 5, "1peter": 5, "2peter": 3, "1john": 5,
  "2john": 1, "3john": 1, "jude": 1, "revelation": 22
};

// Group books by Old Testament and New Testament
const oldTestament = [
  "genesis", "exodus", "leviticus", "numbers", "deuteronomy",
  "joshua", "judges", "ruth", "1samuel", "2samuel",
  "1kings", "2kings", "1chronicles", "2chronicles", "ezra",
  "nehemiah", "esther", "job", "psalms", "proverbs",
  "ecclesiastes", "songofsolomon", "isaiah", "jeremiah",
  "lamentations", "ezekiel", "daniel", "hosea", "joel",
  "amos", "obadiah", "jonah", "micah", "nahum", "habakkuk",
  "zephaniah", "haggai", "zechariah", "malachi"
];

const newTestament = [
  "matthew", "mark", "luke", "john", "acts",
  "romans", "1corinthians", "2corinthians", "galatians",
  "ephesians", "philippians", "colossians", "1thessalonians",
  "2thessalonians", "1timothy", "2timothy", "titus", "philemon",
  "hebrews", "james", "1peter", "2peter", "1john",
  "2john", "3john", "jude", "revelation"
];

// Populate the navigation
document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('menu-container');

  // Create Old Testament section
  const oldTestamentSection = document.createElement('div');
  oldTestamentSection.className = 'section';
  const oldTestamentHeader = document.createElement('div');
  oldTestamentHeader.className = 'section-header';
  oldTestamentHeader.textContent = 'Old Testament ▼';
  oldTestamentSection.appendChild(oldTestamentHeader);

  const oldTestamentBooks = document.createElement('div');
  oldTestamentBooks.className = 'book-list';
  oldTestament.forEach(book => {
    const bookDiv = createBookDiv(book);
    oldTestamentBooks.appendChild(bookDiv);
  });
  oldTestamentSection.appendChild(oldTestamentBooks);
  menuContainer.appendChild(oldTestamentSection);

  // Create New Testament section
  const newTestamentSection = document.createElement('div');
  newTestamentSection.className = 'section';
  const newTestamentHeader = document.createElement('div');
  newTestamentHeader.className = 'section-header';
  newTestamentHeader.textContent = 'New Testament ▼';
  newTestamentSection.appendChild(newTestamentHeader);

  const newTestamentBooks = document.createElement('div');
  newTestamentBooks.className = 'book-list';
  newTestament.forEach(book => {
    const bookDiv = createBookDiv(book);
    newTestamentBooks.appendChild(bookDiv);
  });
  newTestamentSection.appendChild(newTestamentBooks);
  menuContainer.appendChild(newTestamentSection);

  // Toggle section visibility
  oldTestamentHeader.addEventListener('click', () => {
    toggleVisibility(oldTestamentBooks, oldTestamentHeader);
  });

  newTestamentHeader.addEventListener('click', () => {
    toggleVisibility(newTestamentBooks, newTestamentHeader);
  });
});

// Function to create a book div with chapters
function createBookDiv(book) {
  const bookDiv = document.createElement('div');
  bookDiv.className = 'book';

  const bookHeader = document.createElement('div');
  bookHeader.className = 'book-header';
  bookHeader.textContent = book.charAt(0).toUpperCase() + book.slice(1).replace(/(\d+)/g, ' $1') + ' ▼';
  bookDiv.appendChild(bookHeader);

  const chapterList = document.createElement('div');
  chapterList.className = 'chapter-list';
  chapterList.style.display = 'none'; // Hidden by default

  const chapters = books[book];
  for (let i = 1; i <= chapters; i++) {
    const chapter = i.toString().padStart(2, '0');
    const chapterLink = document.createElement('a');
    chapterLink.href = `#/scripture/${book}/${chapter}`;
    chapterLink.className = 'chapter-link';
    chapterLink.textContent = `Chapter ${i}`;
    chapterLink.addEventListener('click', (e) => {
      // Prevent default to ensure hashchange event handles loading
      e.preventDefault();
      window.location.hash = `#/scripture/${book}/${chapter}`;
    });
    chapterList.appendChild(chapterLink);
  }

  bookDiv.appendChild(chapterList);

  // Toggle chapter visibility
  bookHeader.addEventListener('click', () => {
    toggleVisibility(chapterList, bookHeader);
  });

  return bookDiv;
}

// Function to toggle visibility of a section or chapter list
function toggleVisibility(element, header) {
  if (element.style.display === 'none') {
    element.style.display = 'block';
    header.textContent = header.textContent.replace('▼', '▲');
  } else {
    element.style.display = 'none';
    header.textContent = header.textContent.replace('▲', '▼');
  }
}

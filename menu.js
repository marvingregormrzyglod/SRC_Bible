// List of books and chapter counts
const books = {
  "genesis": 50, "exodus": 40, "leviticus": 27, "numbers": 36, "deuteronomy": 34,
  "joshua": 24, "judges": 21, "ruth": 4, "1samuel": 31, "2samuel": 24,
  "1kings": 22, "2kings": 25, "1chronicles": 29, "2chronicles": 36, "ezra": 10,
  "nehemiah": 13, "esther": 10, "job": 42, "psalms": 150, "proverbs": 31,
  "ecclesiastes": 12, "songofsolomon": 8, "isaiah": 66, "jeremiah": 52,
  "lamentations": 5, "ezekiel": 48, "daniel": 12, "hosea": 14, "joel": 3,
  "amos": 9, "obadiah": 1, "jonah": 4, "micah": 7, "nahum": 3, "habakkuk": 3,
  "zephaniah": 3, "haggai": 2, "zechariah": 14, "malachi": 4,
  "matthew": 28, "mark": 16, "luke": 24, "john": 21, "acts": 28,
  "romans": 16, "1corinthians": 16, "2corinthians": 13, "galatians": 6,
  "ephesians": 6, "philippians": 4, "colossians": 4, "1thessalonians": 5,
  "2thessalonians": 3, "1timothy": 6, "2timothy": 4, "titus": 3, "philemon": 1,
  "hebrews": 13, "james": 5, "1peter": 5, "2peter": 3, "1john": 5,
  "2john": 1, "3john": 1, "jude": 1, "revelation": 22
};

// Populate the menu
document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('menu-container');
  
  // Create book dropdown
  const bookSelect = document.createElement('select');
  bookSelect.id = 'book-select';
  bookSelect.innerHTML = '<option value="">Select a Book</option>' +
    Object.keys(books).map(book => 
      `<option value="${book}">${book.charAt(0).toUpperCase() + book.slice(1).replace(/(\d+)/g, ' $1')}</option>`
    ).join('');
  
  // Create chapter dropdown
  const chapterSelect = document.createElement('select');
  chapterSelect.id = 'chapter-select';
  chapterSelect.disabled = true;
  
  // Append to container
  menuContainer.appendChild(bookSelect);
  menuContainer.appendChild(chapterSelect);
  
  // Book selection event
  bookSelect.addEventListener('change', (e) => {
    const book = e.target.value;
    chapterSelect.innerHTML = '<option value="">Select a Chapter</option>';
    if (book) {
      const chapters = books[book];
      for (let i = 1; i <= chapters; i++) {
        const option = document.createElement('option');
        option.value = i.toString().padStart(2, '0');
        option.textContent = `Chapter ${i}`;
        chapterSelect.appendChild(option);
      }
      chapterSelect.disabled = false;
    } else {
      chapterSelect.disabled = true;
    }
  });
  
  // Chapter selection event
  chapterSelect.addEventListener('change', (e) => {
    const book = bookSelect.value;
    const chapter = e.target.value;
    if (book && chapter) {
      // Update the hash to trigger the hashchange event
      window.location.hash = `#/scripture/${book}/${chapter}`;
    }
  });
});

// Define books and chapter counts (only Genesis for now)
const books = {
  "genesis": 50
};

// Define chapter groupings for Genesis
const genesisGroups = [
  { name: "Creation", start: 1, end: 11, class: "creation" },
  { name: "Abraham", start: 12, end: 25, class: "abraham" }, // 25:18, but we'll use chapter 25 as the end
  { name: "Jacob", start: 26, end: 36, class: "jacob" },     // 25:19–36
  { name: "Joseph", start: 37, end: 50, class: "joseph" }
];

// Populate the navigation
document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.getElementById('book-list');
  const chapterList = document.getElementById('chapter-list');

  // Create vertical stack of books
  Object.keys(books).forEach(book => {
    const bookButton = document.createElement('div');
    bookButton.className = 'book-button';
    bookButton.textContent = book.charAt(0).toUpperCase() + book.slice(1);
    bookButton.addEventListener('click', () => {
      // Clear previous chapter list
      chapterList.innerHTML = '';
      // Show chapters for the selected book
      showChapters(book, chapterList);
    });
    bookList.appendChild(bookButton);
  });

  // If there's a hash on load, show the corresponding chapters
  const hash = window.location.hash.replace('#/', '');
  if (hash) {
    const bookMatch = hash.match(/scripture\/([^\/]+)/);
    if (bookMatch) {
      const book = bookMatch[1];
      showChapters(book, chapterList);
    }
  }
});

// Function to show chapters for a book
function showChapters(book, chapterList) {
  // Create a container for chapter groups
  const groupsContainer = document.createElement('div');
  groupsContainer.className = 'chapter-groups-container';

  // For Genesis, use the predefined groups
  if (book === 'genesis') {
    genesisGroups.forEach(group => {
      const groupDiv = document.createElement('div');
      groupDiv.className = `chapter-group ${group.class}`;

      const groupHeader = document.createElement('div');
      groupHeader.className = 'group-header';
      groupHeader.textContent = group.name;
      groupDiv.appendChild(groupHeader);

      const chaptersDiv = document.createElement('div');
      chaptersDiv.className = 'chapters';
      for (let i = group.start; i <= group.end; i++) {
        const chapter = i.toString().padStart(2, '0');
        const chapterLink = document.createElement('a');
        chapterLink.href = `#/scripture/${book}/${chapter}`;
        chapterLink.className = 'chapter-link';
        chapterLink.textContent = `Ch. ${i}`;
        chapterLink.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.hash = `#/scripture/${book}/${chapter}`;
        });
        chaptersDiv.appendChild(chapterLink);
      }
      groupDiv.appendChild(chaptersDiv);
      groupsContainer.appendChild(groupDiv);
    });
  }

  chapterList.appendChild(groupsContainer);
}

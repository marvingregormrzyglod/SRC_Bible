const books = {
  "genesis": 50
};

const genesisGroups = [
  { name: "Creation", start: 1, end: 11, class: "creation" },
  { name: "Abraham", start: 12, end: 25, class: "abraham" },
  { name: "Jacob", start: 26, end: 36, class: "jacob" },
  { name: "Joseph", start: 37, end: 50, class: "joseph" }
];

document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.getElementById('book-list');
  const chapterList = document.getElementById('chapter-list');

  Object.keys(books).forEach(book => {
    const bookButton = document.createElement('div');
    bookButton.className = 'book-button';
    bookButton.textContent = book.charAt(0).toUpperCase() + book.slice(1);
    bookButton.addEventListener('click', () => {
      document.querySelectorAll('.book-button').forEach(btn => btn.classList.remove('active'));
      bookButton.classList.add('active');
      chapterList.innerHTML = '';
      showChapters(book, chapterList);
    });
    bookList.appendChild(bookButton);
  });

  const hash = window.location.hash.replace('#/', '');
  if (hash) {
    const bookMatch = hash.match(/scripture\/([^\/]+)/);
    const chapterMatch = hash.match(/scripture\/[^\/]+\/(\d+)/);
    if (bookMatch) {
      const book = bookMatch[1];
      document.querySelectorAll('.book-button').forEach(btn => {
        if (btn.textContent.toLowerCase() === book) {
          btn.classList.add('active');
        }
      });
      showChapters(book, chapterList);
      if (chapterMatch) {
        const chapter = chapterMatch[1];
        setTimeout(() => {
          const chapterLink = document.querySelector(`a[href="#/scripture/${book}/${chapter}"]`);
          if (chapterLink) {
            chapterLink.classList.add('active');
          }
        }, 100);
      }
    }
  }
});

function showChapters(book, chapterList) {
  const groupsContainer = document.createElement('div');
  groupsContainer.className = 'chapter-groups-container';

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
          document.querySelectorAll('.chapter-link').forEach(link => link.classList.remove('active'));
          chapterLink.classList.add('active');
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

// Define books and chapter counts
const books = {
  "genesis": 50,
  "exodus": 40,
  "leviticus": 27,
  "numbers": 36,
  "deuteronomy": 34,
  "john": 21,
  "psalms": 150
};

// Define chapter groupings for each book with subtitles
const genesisGroups = [
  { name: "🌌 BEGINNINGS", start: 1, end: 11, class: "beginnings", subtitles: "Creation • Fall • Flood" },
  { name: "🤝 PROMISE", start: 12, end: 26, class: "promise", subtitles: "Abraham • Isaac • Covenant" },
  { name: "✋ STRUGGLE", start: 27, end: 36, class: "struggle", subtitles: "Jacob • Esau • Wrestling" },
  { name: "👑 REDEMPTION", start: 37, end: 50, class: "redemption", subtitles: "Joseph • Betrayal • Salvation" }
];

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

const numbersGroups = [
  { name: "🔢 COUNTING", start: 1, end: 4, class: "counting", subtitles: "Census • Tribe roles" },
  { name: "🚦 WANDERING", start: 5, end: 21, class: "wandering", subtitles: "Rebellions • Miracles" },
  { name: "⚔️ BATTLES", start: 22, end: 31, class: "battles", subtitles: "Balaam • Midian" },
  { name: "🏠 INHERITANCE", start: 32, end: 36, class: "inheritance", subtitles: "Land • Daughters" }
];

const deuteronomyGroups = [
  { name: "📜 REPEAT", start: 1, end: 4, class: "repeat", subtitles: "Moses reviews Exodus" },
  { name: "⚖️ LAW", start: 5, end: 26, class: "law", subtitles: "10 Commandments • Rules" },
  { name: "⚠️ WARNING", start: 27, end: 30, class: "warning", subtitles: "Blessings & Curses" },
  { name: "🕊️ HANDOFF", start: 31, end: 34, class: "handoff", subtitles: "Joshua • Moses’ death" }
];

const johnGroups = [
  { name: "🌟 REVELATION", start: 1, end: 4, class: "beginnings", subtitles: "Word • Wedding • Born Again" },
  { name: "✨ SIGNS", start: 5, end: 12, class: "miracles", subtitles: "Miracles • 'I AM' • Lazarus" },
  { name: "❤️ LOVE", start: 13, end: 17, class: "holiness", subtitles: "Footwashing • New Command • Vine" },
  { name: "☀️ GLORY", start: 18, end: 21, class: "redemption", subtitles: "Cross • Resurrection • 'Feed My Sheep'" }
];

const psalmsGroups = [
  { name: "🙏 LAMENT", start: 1, end: 41, class: "oppression", subtitles: "Cries • Trust • Messianic Hints" },
  { name: "✝️ DELIVERANCE", start: 42, end: 89, class: "handoff", subtitles: "Exile • Temple • God’s Faithfulness" },
  { name: "🌿 WISDOM", start: 90, end: 106, class: "promise", subtitles: "Moses • Creation • Consequences" },
  { name: "🎉 PRAISE", start: 107, end: 150, class: "inheritance", subtitles: "Hallelujah • Pilgrim Songs • Final Chorus" }
];

// Map books to their groups for easier lookup
const bookGroups = {
  "genesis": genesisGroups,
  "exodus": exodusGroups,
  "leviticus": leviticusGroups,
  "numbers": numbersGroups,
  "deuteronomy": deuteronomyGroups,
  "john": johnGroups,
  "psalms": psalmsGroups
};

// Populate the navigation
document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.getElementById('book-list');
  const chapterList = document.getElementById('chapter-list');
  const searchBar = document.getElementById('search-bar');

  // Function to populate books
  function populateBooks(filter = '') {
    bookList.innerHTML = '';
    Object.keys(books).forEach(book => {
      const bookName = book.charAt(0).toUpperCase() + book.slice(1);
      if (filter && !bookName.toLowerCase().includes(filter.toLowerCase())) {
        return;
      }
      const bookButton = document.createElement('div');
      bookButton.className = 'book-button';
      bookButton.textContent = bookName;
      bookButton.addEventListener('click', () => {
        document.querySelectorAll('.book-button').forEach(btn => btn.classList.remove('active'));
        bookButton.classList.add('active');
        chapterList.innerHTML = '';
        showChapters(book, chapterList, filter);
      });
      bookList.appendChild(bookButton);
    });
  }

  // Initial population of books
  populateBooks();

  // Search functionality
  searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    populateBooks(searchTerm);
    const activeBook = document.querySelector('.book-button.active');
    if (activeBook) {
      const book = activeBook.textContent.toLowerCase();
      chapterList.innerHTML = '';
      showChapters(book, chapterList, searchTerm);
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

function showChapters(book, chapterList, filter = '') {
  const groupsContainer = document.createElement('div');
  groupsContainer.className = 'chapter-groups-container';

  const groups = bookGroups[book];
  if (groups) {
    groups.forEach(group => {
      // Check if group matches the filter (by name, subtitle, or chapter range)
      const searchTerm = filter.toLowerCase();
      const groupNameMatch = group.name.toLowerCase().includes(searchTerm);
      const subtitlesMatch = group.subtitles.toLowerCase().includes(searchTerm);
      const chapterRangeMatch = Array.from({ length: group.end - group.start + 1 }, (_, i) => group.start + i)
        .some(chapter => chapter.toString() === searchTerm);

      if (filter && !groupNameMatch && !subtitlesMatch && !chapterRangeMatch) {
        return;
      }

      const groupDiv = document.createElement('div');
      groupDiv.className = `chapter-group ${group.class}`;

      const groupHeader = document.createElement('div');
      groupHeader.className = 'group-header';

      // Add the category name
      const nameSpan = document.createElement('span');
      nameSpan.className = 'group-name';
      nameSpan.textContent = group.name;
      groupHeader.appendChild(nameSpan);

      // Add the subtitles
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
        if (filter && !chapter.includes(filter) && !groupNameMatch && !subtitlesMatch) {
          continue;
        }
        const chapterLink = document.createElement('a');
        chapterLink.href = `#/scripture/${book}/${chapter}`;
        chapterLink.className = 'chapter-link';
        chapterLink.textContent = i; // Updated for better UX (see improvement 4)
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
  }

  chapterList.appendChild(groupsContainer);
}

(() => {
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

  function registerPseudoLanguage() {
    if (typeof hljs === 'undefined') return;
    if (hljs.getLanguage && hljs.getLanguage('pseudo')) return;

    hljs.registerLanguage('pseudo', function(hljs) {
      return {
        name: 'PseudoScripture',
        keywords: {
          keyword: 'function return if else for while let true false future',
          literal: 'true false'
        },
        contains: [
          hljs.COMMENT('//', '$', {
            className: 'comment',
            relevance: 0
          }),
          {
            className: 'keyword',
            begin: /\bfunction\b/
          },
          {
            className: 'function-title',
            begin: /\bfunction\s+/,
            end: /(?=\()/,
            contains: [{
              className: 'title',
              begin: /[a-zA-Z_][a-zA-Z0-9_]*/
            }]
          },
          {
            className: 'property-access',
            begin: /\b([a-zA-Z_][a-zA-Z0-9_]*)(\.)/,
            relevance: 0,
            contains: [
              {
                className: 'object',
                begin: /\b[a-zA-Z_][a-zA-Z0-9_]*/
              },
              {
                className: 'dot',
                begin: /\./
              }
            ]
          },
          {
            className: 'method-call',
            begin: /\.([a-zA-Z_][a-zA-Z0-9_]*)/,
            relevance: 0,
            contains: [
              {
                className: 'method-name',
                begin: /[a-zA-Z_][a-zA-Z0-9_]*/
              }
            ]
          },
          {
            className: 'string',
            begin: '"',
            end: '"',
            contains: [{
              begin: '\\\\"'
            }]
          },
          {
            className: 'number',
            begin: /\b\d+(\.\d+)?\b/
          },
          {
            className: 'operator',
            begin: /(==|=|!|!=|<=|>=|<|>|\+|-|\*|\/|%)/
          },
          {
            className: 'punctuation',
            begin: /[\(\)\{\}\[\]\.,;]/
          },
          {
            className: 'variable',
            begin: /\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*(?:=|\.|$))/,
            relevance: 0
          }
        ]
      };
    });
  }

  window.SrcBible = Object.assign(window.SrcBible || {}, {
    books,
    bookDisplayNames,
    bookAliases,
    registerPseudoLanguage
  });
})();

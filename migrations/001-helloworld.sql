-- Up
CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  password TEXT
);

CREATE TABLE Posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  body TEXT,
  userId INTEGER REFERENCES User(id)
);

-- Down
DROP TABLE Users;
DROP TABLE Posts;
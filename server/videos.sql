drop table if exists videos;

CREATE TABLE videos (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(50) NOT NULL,
  link       VARCHAR(50) NOT NULL,
  rating      integer not null
);

INSERT INTO videos (title, link, rating) VALUES ('Never Gonna Give Up', 'https://www.youtube.com/watch?v=LNBS9HfhCTU','23');

INSERT INTO videos (title, link, rating)
VALUES ('Never ', 'https://www.youtube.com/watch?v=LNBS9HfhCTU', '24')
VALUES ('Gonna ', 'https://www.youtube.com/watch?v=LNBS9HfhCTU','25')
VALUES (' Give ', 'https://www.youtube.com/watch?v=LNBS9HfhCTU', '26')
VALUES (' Up', 'https://www.youtube.com/watch?v=LNBS9HfhCTU','27')
VALUES ('!', 'https://www.youtube.com/watch?v=LNBS9HfhCTU','28');
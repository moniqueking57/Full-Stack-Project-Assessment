drop table if exists videos;

CREATE TABLE videos (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(50) NOT NULL,
  rating      integer not null
);

INSERT INTO videos (id, title, rating) VALUES ('1','Never Gonna Give Up', '23');

INSERT INTO videos (id, title, rating)
VALUES ('3','Never ', '24')
VALUES ('5','Gonna ', '25')
VALUES ('6',' Give ', '26')
VALUES ('7',' Up', '27')
VALUES ('8','!', '28');
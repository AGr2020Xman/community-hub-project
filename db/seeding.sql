Create database if not exists geo_verse_db;
use geo_verse_db;

-- geos or Geos: sometimes issues arise with case sensitivity --
INSERT INTO geos (name)
VALUES ('Paris'),
('Tokyo'),
('London'),
('Sydney'),
('Vancouver'),
('Perth'),
('Rome'),
('Geneva'),
('Amsterdam'),
('Brisbane');
          
INSERT INTO communities (name, GeoId)
VALUES ('Computers', 1),('Pets', 2),('Bikes',1),('Cars',3);

-- таблица, содержащая информацию о пользователе
CREATE TABLE person(
  person_id SERIAL PRIMARY KEY,
  login VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(login) BETWEEN 3 AND 50),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL CHECK(LENGTH(password) BETWEEN 6 AND 255),
  avatar_path VARCHAR(255)
);

-- создание перечисления жанров
CREATE TYPE genre_enum AS ENUM ('Rock', 'Hip-Hop', 'Chanson', 'Jazz', 'Drill', 'Pop', 'Rap');

-- таблица, содержащая информацию о треке
CREATE TABLE track(
  track_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  genre VARCHAR(255),
  logo_path VARCHAR(255),
  track_path VARCHAR(255) NOT NULL,
  duration VARCHAR(255) NOT NULL
);

-- таблица, содержащая информацию о плейлисте
CREATE TABLE playlist(
  playlist_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  logo_path VARCHAR(255),
  person_id INT NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person(person_id)
);

-- таблица, связывающая плейлисты с треками
CREATE TABLE playlist_track(
  playlist_track_id SERIAL PRIMARY KEY,
  added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  playlist_id int NOT NULL,
  track_id int NOT NULL,
  FOREIGN KEY (playlist_id) REFERENCES playlist(playlist_id),
  FOREIGN KEY (track_id) REFERENCES track(track_id)
);

-- таблица, содержащая треки, которые были добавлены в избранное
CREATE TABLE user_favorite_track(
  favorite_track_id SERIAL PRIMARY KEY,
  added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  person_id INT NOT NULL,
  track_id INT NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person(person_id),
  FOREIGN KEY (track_id) REFERENCES track(track_id)
);
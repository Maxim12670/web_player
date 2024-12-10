import { useState, useRef } from "react";
import styles from "./HomePage.module.scss";
import axiosInstance from "@shared/api/axiosInstace";
import { ITrack } from "@entities/track/model/track";
import axios from "axios";
import AudioPlayer from "react-audio-player";

const HomePage = () => {
  const [name, setName] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [track, setTrack] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const result = await axios.get<ITrack>("http://localhost:3001/api/track/get-track", {
        params: {
          id: 1,
        },
      });
      const { name, author, genre, logo_path, track_path } = result.data;
      setName(name);
      setAuthor(author);
      setGenre(genre);
      setTrack(`http://localhost:3001${track_path}`);
      setLogo(`http://localhost:3001${logo_path}`);
    } catch (error: any) {
      console.log("Произошла ошибка: ", error.message);
    }
  };

  return (
    <>
      <div className={styles.content}>
        <h2>название трека: {name}</h2>
        <h2>автор: {author}</h2>
        <h2>жанр: {genre}</h2>

        <img src={logo!} alt="avatar" />

        <div>
          <AudioPlayer src={track!} controls />
        </div>

        <button onClick={handleSubmit}>Получить трек </button>
      </div>
    </>
  );
};

export default HomePage;

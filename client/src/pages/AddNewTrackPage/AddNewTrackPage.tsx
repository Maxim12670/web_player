import styles from "./AddNewTrackPage.module.scss";
import { postNewTrack } from "@entities/track/api/trackApi";
import { trackGenres } from "@entities/track/model/track";
import { ChangeEvent, useEffect, useState } from "react";
import { MyInput, MyButton, MySelect, FileBtn } from "@shared/ui";
import { MyInputType } from "@shared/types/enums";

const AddNewTrack = () => {
  const [trackName, setTrackName] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [previewPath, setPreviewPath] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [track, setTrack] = useState<File | null>(null);
  const [isDisableBtn, setIsDisableBtn] = useState<boolean>(true);

  const clearFormData = () => {
    setTrackName(null);
    setAuthor(null);
    setGenre(null);
    setPreviewPath(null);
    setAvatar(null);
    setTrack(null);
  };

  const handleChangeTrackName = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackName(e.target.value);
  };

  const handleChangeTrackAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleChangeTrackAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
      setPreviewPath(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleChangeTrackFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTrack(e.target.files[0]);
    }
  };

  const handleToggleTrackGenre = (value: string) => {
    if (value == "Not genre") {
      setGenre(null);
    }

    setGenre(value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", trackName!);
    formData.append("author", author!);
    formData.append("genre", genre ?? "");
    formData.append("track", track!);
    formData.append("avatar", avatar ?? "");

    try {
      await postNewTrack(formData);
      clearFormData();
    } catch (err) {
      console.log("Произошла ошибка: ", err);
    }
  };

  useEffect(() => {
    if (trackName != "" && author != "" && track != null) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [trackName, author, genre, avatar, track]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Upload your favorite track</h2>
      <div className={styles["grid-container"]}>
        <MyInput
          type={MyInputType.Text}
          placeholder="Track name"
          style={`${styles.input} ${styles.input_name}`}
          value={trackName ?? ""}
          onChange={handleChangeTrackName}
        />
        <MyInput
          type={MyInputType.Text}
          placeholder="Author"
          style={`${styles.input} ${styles.input_author}`}
          value={author ?? ""}
          onChange={handleChangeTrackAuthor}
        />
        <MySelect
          selectValues={trackGenres}
          currentValue={genre}
          style={styles.select}
          onClick={handleToggleTrackGenre}
        />
        <FileBtn
          label="Load track avatar"
          id="avatar"
          style={`${styles.btn} ${styles["btn_avatar"]}`}
          onChange={handleChangeTrackAvatar}
        />
        <FileBtn
          label="Load your track"
          id="track"
          style={`${styles.btn} ${styles["btn_track"]}`}
          onChange={handleChangeTrackFile}
        />
        {previewPath && <img src={previewPath} alt="Preview" className={styles.avatar} />}
        <MyButton
          text="Post Data"
          style={`${styles.btn} ${styles["btn_post"]} ${isDisableBtn ? styles["btn_disable"] : ""}`}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddNewTrack;

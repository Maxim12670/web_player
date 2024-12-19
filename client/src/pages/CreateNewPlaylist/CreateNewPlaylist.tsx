import styles from "./CreateNewPlaylist.module.scss";
import { MyButton, MyInput, FileBtn } from "@shared/ui";
import { MyInputType } from "@shared/types/enums";
import { useState, ChangeEvent, useEffect } from "react";

const CreateNewPlaylist = () => {
  // title, descr, logo, person_id
  const [isDisableBtn, setIsDisableBtn] = useState<boolean>(true);
  const [previewPath, setPreviewPath] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);

  const clearFormData = () => {
    setPreviewPath(null);
    setTitle(null);
    setDescription(null);
    setAvatar(null);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
      setPreviewPath(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title!);
    formData.append("descr", description ?? "");
    formData.append("logo_path", avatar ?? "");
    // formData.append("person_id", id!);

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    clearFormData();
  };

  return (
    <div className={styles["create-playlist"]}>
      <h2 className={styles["create-playlist__title"]}>Create your playlist</h2>
      <div className={styles["create-playlist__wrapper"]}>
        <MyInput
          type={MyInputType.Text}
          placeholder="Title"
          style={`${styles.input}
          ${styles["input__title"]}`}
          value={title ?? ""}
          onChange={handleChangeTitle}
        />
        <MyInput
          type={MyInputType.Text}
          placeholder="Description"
          style={`${styles.input} ${styles["input__descr"]}`}
          value={description ?? ""}
          onChange={handleChangeDescription}
        />
        <FileBtn
          style={`${styles.btn} ${styles["btn_avatar"]}`}
          label="Load playlist avatar"
          id="avatar"
          onChange={handleChangeAvatar}
        />
        {previewPath && <img src={previewPath} alt="Preview" className={styles.avatar} />}
        <MyButton text="Select tracks" style={`${styles.btn} ${styles["btn__select"]}`} />
        <MyButton
          text="Post Data"
          style={`${styles.btn} ${styles["btn__post"]} ${isDisableBtn ? styles["btn_disable"] : ""}`}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateNewPlaylist;

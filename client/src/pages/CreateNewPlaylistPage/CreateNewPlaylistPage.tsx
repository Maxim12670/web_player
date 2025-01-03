import styles from "./CreateNewPlaylistPage.module.scss";
import { MyButton, MyInput, FileBtn } from "@shared/ui";
import { MyInputType } from "@shared/types/enums";
import { useState, ChangeEvent, useEffect } from "react";
import { usePlaylist } from "@features/playlist/model/usePlaylist";

const CreateNewPlaylist = () => {
  const [isDisableBtn, setIsDisableBtn] = useState<boolean>(true);
  const [previewPath, setPreviewPath] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const { handlePostPlaylist } = usePlaylist();

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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title!);
    formData.append("description", description ?? "");
    formData.append("logo_path", avatar ?? "");

    await handlePostPlaylist(formData);

    clearFormData();
  };

  useEffect(() => {
    if (title !== "") {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [title, handleChangeTitle]);

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
          disabled={isDisableBtn}
          style={`${styles.btn} ${styles["btn__post"]}`}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateNewPlaylist;

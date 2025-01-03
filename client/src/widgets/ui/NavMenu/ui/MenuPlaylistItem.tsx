import styles from "../NavMenu.module.scss";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { setActiveItem } from "@app/store/storeSlices/menuSlice";
import { Link } from "react-router-dom";
import { IPlaylist } from "@entities/playlist/model/playlist";

interface IMenuPlaylistItem {
  playlists: IPlaylist[];
}

export const MenuPlaylistItem = ({ playlists }: IMenuPlaylistItem) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activePathMenu = useAppSelector((state) => state.menu.path);
  const itemStyles = `${styles.sidebar__item} ${styles.sidebar__item_small}`;

  const handleClick = (path: string) => {
    navigate(path);
    dispatch(setActiveItem(path));
  };

  return (
    <>
      {playlists.map((playlist) => (
        <li
          key={playlist.playlist_id}
          className={`${itemStyles} ${`playlist/${playlist.playlist_id}` == activePathMenu && styles.sidebar__item_active}`}
          onClick={() => {
            handleClick(`playlist/${playlist.playlist_id}`);
          }}
        >
          {playlist.title}
        </li>
      ))}
    </>
  );
};

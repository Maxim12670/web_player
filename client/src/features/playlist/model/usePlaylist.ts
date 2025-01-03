import { useAppSelector } from "@app/store/hooks";
import {
  postNewPlaylist,
  requestAllPlaylist,
  requestTracksPlaylist,
  requestSelectedPlaylist,
} from "@entities/playlist/api/playlistApi";
import { IPlaylist } from "@entities/playlist/model/playlist";
import { ITrack } from "@entities/track/model/track";
import { useState } from "react";

export const usePlaylist = () => {
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state) => state.user);

  const handlePostPlaylist = async (formData: FormData) => {
    try {
      let postData = new FormData();
      postData = formData;
      postData.append("person_id", user.person_id!.toString());
      await postNewPlaylist(postData);
    } catch (err: any) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const getAllPlaylist = async () => {
    try {
      const result = await requestAllPlaylist(Number(localStorage.getItem("id")));
      console.log("playlist: ", result);
      return result as IPlaylist[];
    } catch (err: any) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const getTracksPlaylist = async (playlistId: number) => {
    try {
      const result = await requestTracksPlaylist(playlistId);
      return result as ITrack[];
    } catch (err: any) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const getSelectedPlaylist = async (playlistId: number) => {
    try {
      const result = await requestSelectedPlaylist(user.person_id!, playlistId);
      return result as IPlaylist;
    } catch (err: any) {
      if (err instanceof Error) setError(err.message);
    }
  };
  return { error, handlePostPlaylist, getAllPlaylist, getTracksPlaylist, getSelectedPlaylist };
};

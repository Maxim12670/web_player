import axiosInstance from "@shared/api/axiosInstace";
import { IPlaylist } from "../model/playlist";

class ApiPaths {
  static postNewPlaylist = "playlist/new-playlist";

}

export const postNewPlaylist = async (formData: FormData): Promise<void> => {
  await axiosInstance.post<IPlaylist>(ApiPaths.postNewPlaylist, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// методы отправки, получения и тд
import axiosInstance from "@shared/api/axiosInstace";
import { ITrack } from "../model/track";

export const postNewTrack = async (formData: FormData): Promise<void> => {
    await axiosInstance.post<ITrack>("track/new-track", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};



import { ITrack } from "@entities/track/model/track";

export const myAudio: ITrack = {
  track_id: 1,
  name: "one love",
  author: "мияги",
  genre: "Rap",
  duration: "3:30",
  logo_path: "http://localhost:3001\\cloud\\image\\one love_1_avatar.jpg",
  track_path: "http://localhost:3001\\cloud\\track\\one love_1_logo.mp3",
};

export const myAudios: ITrack[] = [
  {
    track_id: 1,
    name: "one love",
    author: "мияги",
    genre: "Rap",
    duration: "3:30",
    logo_path: "http://localhost:3001\\cloud\\image\\one love_1_avatar.jpg",
    track_path: "http://localhost:3001\\cloud\\track\\one love_1_logo.mp3",
  },
  {
    track_id: 2,
    name: "ямакаси",
    author: "мияги",
    genre: "Rap",
    duration: "4:23",
    logo_path: "http://localhost:3001\\cloud\image\\ямакаси_2_avatar.jpg",
    track_path: "http://localhost:3001\\cloud\\track\\ямакаси_2_logo.mp3",
  },
  {
    track_id: 3,
    name: "на заре",
    author: "баста",
    genre: "Pop",
    duration: "5:06",
    logo_path: "http://localhost:3001\\cloud\\image\\на заре_3_avatar.jpg",
    track_path: "http://localhost:3001\\cloud\\track\\на заре_3_logo.mp3",
  },
  {
    track_id: 4,
    name: "сансара",
    author: "баста",
    genre: "Pop",
    duration: "6:02",
    logo_path: "http://localhost:3001\\cloud\\image\\сансара_4_avatar.jpg",
    track_path: "http://localhost:3001\\cloud\\track\\сансара_4_logo.mp3",
  }
]
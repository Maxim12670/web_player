const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

export const ConvertTime = (duration: number) => {
  const minutes = +formatTime(Math.floor(duration / 60));
  const seconds = formatTime(Math.floor(duration - minutes * 60));

  return `${minutes}:${seconds}`;
};

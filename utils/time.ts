export function getIsoTimestr(): string {
  return new Date().toISOString();
}

export const getTimestamp = () => {
  const time = Date.parse(new Date().toUTCString());

  return time / 1000;
};

export const getMillisecond = () => {
  const time = new Date().getTime();

  return time;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const msToSeconds = (ms: number): string => {
  const seconds = ms / 1000;
  return seconds.toFixed(2);
};

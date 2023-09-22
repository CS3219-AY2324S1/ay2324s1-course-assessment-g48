export const info = (...params: any[]) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

export const error = (...params: any[]) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

export default { info, error };

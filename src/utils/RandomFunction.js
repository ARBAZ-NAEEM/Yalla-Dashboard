export const generateRandomNumber = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  // setRandomFileName(randomNumber);
  return randomNumber;
};

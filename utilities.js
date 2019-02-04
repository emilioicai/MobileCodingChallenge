export const areAllLetterSelected = (reason, selectedLetters) => {
  const arr = reason.split("");
  const obj = {};
  let succes = true;

  selectedLetters.forEach(l => {
    obj[l] = true;
  });

  arr.forEach(l => {
    if (!obj[l]) {
      succes = false;
    }
  });

  return succes;
};

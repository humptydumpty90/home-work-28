const convertOriginalID = (uniquID, originalID) => {
  return `${originalID}-${uniquID}`;
};

const generateSliderID = () => {
  const now = Date.now();
  const prefix = getRandom(1000, 9999);
  const suffix = getRandom(1000, 9999);

  return `${prefix}-${now}-${suffix}`;
};

const getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

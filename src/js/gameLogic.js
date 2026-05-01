export function getNewPosition(currentI, currentJ, rowsCount, colsCount) {
  let newI, newJ;
  do {
    newI = getRandomInt(0, rowsCount - 1);
    newJ = getRandomInt(0, colsCount - 1);
  } while (newI === currentI && newJ === currentJ);

  return [newI, newJ];
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

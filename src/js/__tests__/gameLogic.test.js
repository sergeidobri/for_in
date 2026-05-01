import { getNewPosition, getRandomInt } from "../gameLogic";

describe("getNewPosition", () => {
  const rows = 4;
  const cols = 4;

  test("возвращает массив из двух чисел", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);

    const pos = getNewPosition(0, 0, rows, cols);

    expect(Array.isArray(pos)).toBe(true);
    expect(pos.length).toBe(2);

    global.Math.random.mockRestore();
  });

  test("никогда не возвращает ту же позицию, что и текущая", () => {
    for (let i = 0; i < 100; i++) {
      const currI = Math.floor(Math.random() * rows);
      const currJ = Math.floor(Math.random() * cols);
      const [newI, newJ] = getNewPosition(currI, currJ, rows, cols);

      expect(newI * 10 + newJ).not.toBe(currI * 10 + currJ);

      const isSamePosition = newI === currI && newJ === currJ;
      expect(isSamePosition).toBe(false);
    }
  });

  test("возвращает координаты в пределах сетки", () => {
    for (let i = 0; i < 50; i++) {
      const [newI, newJ] = getNewPosition(2, 2, rows, cols);
      expect(newI).toBeGreaterThanOrEqual(0);
      expect(newI).toBeLessThan(rows);
      expect(newJ).toBeGreaterThanOrEqual(0);
      expect(newJ).toBeLessThan(cols);
    }
  });
});

describe("getRandomInt", () => {
  test("возвращает число в заданном диапазоне", () => {
    const min = 5;
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const res = getRandomInt(min, max);
      expect(res).toBeGreaterThanOrEqual(min);
      expect(res).toBeLessThanOrEqual(max);
      expect(Number.isInteger(res)).toBe(true);
    }
  });

  test("работает корректно с отрицательными числами", () => {
    const res = getRandomInt(-5, -1);
    expect(res).toBeGreaterThanOrEqual(-5);
    expect(res).toBeLessThanOrEqual(-1);
  });
});

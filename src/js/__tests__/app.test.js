import { orderByProps } from "../app";

test("success test", () => {
  const obj = { name: "мечник", health: 10, level: 2, attack: 80, defence: 40 };

  const result = orderByProps(obj, ["name", "level"]);

  expect(result).toEqual([
    { key: "name", value: "мечник" }, // порядок взят из массива с ключами
    { key: "level", value: 2 }, // порядок взят из массива с ключами
    { key: "attack", value: 80 }, // порядок по алфавиту (т.к. в массиве с ключами нет значения "attack")
    { key: "defence", value: 40 }, // порядок по алфавиту (т.к. в массиве с ключами нет значения "defence")
    { key: "health", value: 10 }, // порядок по алфавиту (т.к. в массиве с ключами нет значения "health")
  ]);
});

test("empty keys array", () => {
  const obj = { name: "мечник", health: 10, level: 2, attack: 80, defence: 40 };

  const result = orderByProps(obj, []);

  // алфавит
  expect(result).toEqual([
    { key: "attack", value: 80 },
    { key: "defence", value: 40 },
    { key: "health", value: 10 },
    { key: "level", value: 2 },
    { key: "name", value: "мечник" },
  ]);
});

test("key not in object", () => {
  const obj = { name: "мечник", health: 10, level: 2, attack: 80, defence: 40 };

  expect(() => orderByProps(obj, ["keyyyy"])).toThrow(Error);
});

test("empty object, empty key list", () => {
  const obj = {};

  expect(orderByProps(obj, [])).toEqual([]);
});

test("empty object, not empty key list", () => {
  const obj = {};

  expect(() => orderByProps(obj, ["keyyyy"])).toThrow(Error);
});

test("fully controlled order", () => {
  const obj = { a: 1, b: 2, c: 3, d: 4 };

  const result = orderByProps(obj, ["b", "c", "d", "a"]);

  expect(result).toEqual([
    { key: "b", value: 2 },
    { key: "c", value: 3 },
    { key: "d", value: 4 },
    { key: "a", value: 1 },
  ]);
});

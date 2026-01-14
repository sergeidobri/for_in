export function orderByProps(obj, keys) {
  let unusedKeys = [];
  for (const key in obj) {
    if (!keys.includes(key)) {
      unusedKeys = [...unusedKeys, key];
    }
  }
  for (const key of keys) {
    if (!Object.keys(obj).includes(key)) {
      throw new Error("No such key in object: " + key);
    }
  }

  unusedKeys.sort(); // лексикографическая сортировка
  return [...keys, ...unusedKeys].map((i) => ({ key: i, value: obj[i] }));
}

export class PriorityQueue<T> {
  private data: T[];
  private priorities: number[];
  private dataLength = 0;

  constructor() {
    this.data = [];
    this.priorities = [];
    this.dataLength = this.data.length;
  }

  push(item: T, priority: number) {
    const index = this.priorities.findIndex((p) => p > priority);
    this.data.splice(index, 0, item);
    this.priorities.splice(index, 0, priority);
    this.dataLength = this.data.length;
  }

  pop() {
    const result = this.data.shift();
    this.priorities.shift();
    this.dataLength = this.data.length;
    return result;
  }

  get length() {
    return this.dataLength;
  }
}

export const permutations =
  function* <T>(arr: T[]): Generator<T[]> {
    if (1 === arr.length) { yield arr; }
    for (let k = 0; k < arr.length; ++k) {
      for (const p of permutations([
        ...arr.slice(0, k),
        ...arr.slice(k + 1),
      ])) {
        yield [arr[k], ...p];
      }
    }
  };

export const add =
  (a: number | boolean, b: number | boolean) =>
    Number(a) + Number(b)
  ;

export const setsAreEqual =
  (
    a: Set<unknown> | unknown[],
    b: Set<unknown>,
  ): boolean => {
    const aSize: number =
      (a as Set<never>)?.size
      ?? (a as never[])?.length
      ;

    if (aSize !== b.size) {
      return false;
    }

    for (const el of a) {
      if (!b.has(el)) {
        return false;
      }
    }

    return true;
  };

export const multiply =
  (a: number, b: number) =>
    a * b
  ;

export const sum =
  (...arrs: (number | number[])[]) =>
    arrs.flat(2).reduce(add, 0)
  ;

export const product =
  (...arrs: number[] | number[][]) =>
    arrs.flat(2).reduce(multiply, 1)
  ;

export const bigIntLargestPowerOf2Below =
  (n: number | bigint) => {
    let x = 1n;
    while (x <= n) {
      x *= 2n;
    }

    return x / 2n;
  };

// x^p % r
export const bigIntPowerRemainder =
  (x: bigint, p: bigint, r: bigint) => {
    if (0n === p) {
      return 1n;
    }

    const powersOfX = new Map();
    for (
      let i = 1n, n = x;
      i <= p;
      i *= 2n, n = (n * n) % r
    ) {
      powersOfX.set(i, n);
    }

    let n = 1n;
    while (0n < p) {
      const powerOf2 = bigIntLargestPowerOf2Below(p);
      const powerOfX = powersOfX.get(powerOf2);
      n = n * powerOfX % r;
      p -= powerOf2;
    }

    return n % r;
  };

export const setUnion =
  <T>(...sets: Set<T>[]) =>
    sets
      .reduce(
        (result, set) => {
          for (const item of set) {
            result.add(item);
          }

          return result;
        },
        new Set(),
      )
  ;

export const setIntersection =
  <T>(set1: Set<T>, ...sets: Set<T>[]) => {
    const result = new Set(set1);
    for (const item of set1) {
      if (sets.some((s) => !s.has(item))) {
        result.delete(item);
      }
    }

    return result;
  };

export const setDifference =
  <T>(a: Set<T>, b: Set<T>) => {
    const result = new Set();
    for (const item of a) {
      if (!b.has(item)) {
        result.add(item);
      }
    }

    return result;
  };

export const defaultDict =
  <T>(defaultValue: T | (() => T)): Record<string, T> =>
    new Proxy({}, {
      get(target, property) {
        // @ts-ignore go away
        if (target[property] !== undefined) {
          // @ts-ignore go away
          return target[property];
        }

        switch (typeof defaultValue) {
          case "undefined":
          case "boolean":
          case "number":
          case "string":
          case "symbol":
            // @ts-ignore go away
            target[property] = defaultValue;
            break;
          case "function":
            // @ts-ignore go away
            target[property] = defaultValue(property);
            break;
          case "object":
            if (null === defaultValue) {
              // @ts-ignore go away
              target[property] = null;
              break;
            }
            if (Array.isArray(defaultValue)) {
              // @ts-ignore go away
              target[property] = [...defaultValue];
              break;
            }
            // @ts-ignore go away
            target[property] = { ...defaultValue };
            break;
          default: throw new TypeError(`Unnkown type ${typeof defaultValue}`);
        }

        // @ts-ignore go away
        return target[property];
      },
    })
  ;

export const range =
  function* (start: number, end: number, step = 1): Generator<number> {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  }

export const div =
  (a: number, b: number) =>
    b === 0
      ? 0
      : Number(BigInt(a) / BigInt(b))
  ;

export const divUnit =
  (a: number) =>
    div(
      a,
      Math.abs(a),
    )
  ;

export const toArray =
  <T>(iterable: Iterable<T>): T[] =>
    Array.from(iterable)
  ;

export const toSet =
  <T>(iterable: Iterable<T>): Set<T> =>
    new Set(iterable)
  ;

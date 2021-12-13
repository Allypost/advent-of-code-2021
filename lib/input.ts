import {
  join as joinPath,
} from "https://deno.land/std/path/mod.ts";
import { Timer } from "./output.ts";

const trimString =
  (string: string, doTrim: boolean) =>
    doTrim
      ? string.trim()
      : string
  ;

export const loadInput =
  (
    day: number | string,
    {
      trim = true,
      test = false,
    } = {},
  ) =>
    trimString(
      Deno
        .readTextFileSync(joinPath(new URL('.', import.meta.url).pathname, `../inputs/${day}${test ? '.test' : ''}`))
      ,
      trim,
    )
  ;

const deepClone =
  <T>(inObject: unknown): T => {
    if ("object" !== typeof inObject || null === inObject) {
      return inObject as T; // Return the value if inObject is not an object
    }

    if (inObject instanceof Map) {
      return new Map(JSON.parse(JSON.stringify([...inObject]))) as unknown as T;
    }

    if (inObject instanceof Set) {
      return new Set(JSON.parse(JSON.stringify([...inObject]))) as unknown as T;
    }

    // Create an array or object to hold the values
    const outObject: Record<string, unknown> | unknown[] = Array.isArray(inObject) ? [] : {};

    for (const [key, value] of Object.entries(inObject)) {
      // Recursively (deep) copy for nested objects, including arrays
      // @ts-ignore Weird stuff
      outObject[key] = deepClone(value);
    }

    return outObject as T;
  };


export type Solver<T> = (data: T) => number | string;

export const printOutput =
  <T>(data: T, { solve1, solve2 }: { solve1: Solver<T>, solve2: Solver<T> }) => {
    const timer = new Timer();

    const {
      output: part1,
      duration: time1,
    } = timer.timed(() => solve1(deepClone(data)));

    const {
      output: part2,
      duration: time2,
    } = timer.timed(() => solve2(deepClone(data)));

    const padLength = Math.max(...[part1, part2].filter((n) => typeof n === "number").map((n) => String(n).length));
    const padded = (val: unknown) => String(val).padEnd(padLength, " ");

    const logResult =
      (part: number) =>
        (result: ReturnType<Solver<unknown>>, time: string) =>
          console.log(
            `|> ${part}:`,
            padded(
              typeof result === "number"
                ? result
                : ""
              ,
            ),
            "in",
            time,
            typeof result === "string"
              ? `\n${result}`
              : ""
            ,
          )
      ;

    const dateTime = new Date().toLocaleDateString("default", {
      day: "numeric",
      month: "numeric",
      year: "numeric",

      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    console.log("@>", dateTime);
    console.log("".padEnd(dateTime.length + 3, "="));
    logResult(1)(part1, String(time1));
    logResult(2)(part2, String(time2));
  };

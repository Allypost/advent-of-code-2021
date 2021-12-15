#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

import * as R from "https://deno.land/x/ramda/mod.ts";
import {
  NumberMap,
  sub,
} from "../lib/helpers.ts";

const inputs =
  loadInput(14, { test: true })
    .split('\n')
    .filter(Boolean)
  ;

const solve =
  ([templateString, ...instructionList]: string[]) =>
    (iterations: number) => {
      const insertCharacter =
        instructionList
          .map((instruction) => instruction.split(' -> '))
          .reduce(
            (s, [x, y]) => s.set(x, y),
            new Map<string, string>(),
          )
        ;

      const combinationCount =
        Array
          .from({ length: iterations }, () => new NumberMap())
          .reduce(
            (combinationCount: NumberMap, newCombinationCount) =>
              Array
                .from(combinationCount.keys())
                .reduce(
                  (newCombinationCount, [left, right]) => {
                    const combination = left + right;
                    const insertChar = insertCharacter.get(combination)!;
                    const oldCount = combinationCount.get(combination)!;

                    newCombinationCount.increment(left + insertChar, oldCount);
                    newCombinationCount.increment(insertChar + right, oldCount);
                    return newCombinationCount;
                  },
                  newCombinationCount,
                )
            ,
            R
              .zip(
                templateString.split(''),
                templateString.split('').slice(1),
              )
              .reduce(
                (s: NumberMap, [a, b]: string[]) => s.increment(a + b),
                new NumberMap(),
              )
          )
        ;

      const [
        leftCombinationCount,
        rightCombinationCount,
      ] =
        Array
          .from(combinationCount.keys())
          .reduce(
            (combo, [left, right]) => {
              const combination = left + right;
              const count = combinationCount.get(combination)!;

              combo[0].increment(left, count);
              combo[1].increment(right, count);

              return combo;
            },
            [
              new NumberMap(),
              new NumberMap(),
            ],
          )
        ;

      return -sub(
        // @ts-ignore: Only two elements in array
        ...[
          ...leftCombinationCount.keys(),
          ...rightCombinationCount.keys()
        ]
          .map(
            (x) =>
              Math.max(
                leftCombinationCount.get(x) ?? 0,
                rightCombinationCount.get(x) ?? 0,
              )
          ,
          )
          .reduce(
            ([min, max], x) => [
              Math.min(min, x),
              Math.max(max, x),
            ],
            [Infinity, -Infinity],
          )
      );
    }
  ;

function solve1(input: typeof inputs) {
  return solve(input)(10);
}

function solve2(input: typeof inputs) {
  return solve(input)(40);
}


printOutput(inputs, { solve1, solve2 });

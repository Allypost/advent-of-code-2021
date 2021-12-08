#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  add,
  setsAreEqual,
  permutations
} from "../lib/helpers.ts";
import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

import * as R from "https://deno.land/x/ramda/mod.ts";

const inputs =
  loadInput(8, { test: false })
    .split('\n')
    .map((line) => line.split(' | ').map((word) => word.split(" ")))
  ;

function solve1(input: typeof inputs) {
  const uniqueDigits = ["cf", "bcdf", "acf", "abcdefg"];
  const digitLengths = new Set(uniqueDigits.map((digit) => digit.length));

  return (
    input
      .map(([, words]) =>
        words
          .reduce(
            (acc, word) =>
              add(acc, digitLengths.has(word.length))
            ,
            0,
          )
      )
      .reduce(add, 0)
  );
}

function solve2(input: typeof inputs) {
  const digits = new Set(["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"]);
  const digitToNumber = R.zipObj([...digits], [...digits].map((_, i) => i)) as Record<string, number>;
  const segments = "abcdefg".split("");

  const permutationToDigits =
    (permutation: string[], patterns: string[]) =>
      ((m: Record<string, string>) =>
        patterns.map(
          (pattern) =>
            pattern
              .split("")
              .map((segment) => m[segment])
              .sort()
              .join("")
        )
      )(R.zipObj(permutation, segments))
    ;

  const isValid =
    (permutation: string[], signalPattern: string[]) =>
      setsAreEqual(
        permutationToDigits(permutation, signalPattern),
        digits,
      )
    ;

  const segmentPermutations = [...permutations(segments)];

  return (
    input
      .map(
        ([signalPattern, output]) =>
          segmentPermutations
            .map(
              (permutation) =>
                isValid(permutation, signalPattern)
                  ? Number(
                    permutationToDigits(permutation, output)
                      .map((q) => digitToNumber[q])
                      .join("")
                  )
                  : 0
              ,
            )
            .reduce(add, 0)
        ,
      )
      .reduce(add, 0)
  )
}


printOutput(inputs, { solve1, solve2 });

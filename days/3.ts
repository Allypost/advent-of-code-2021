#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import { defaultDict } from "../lib/helpers.ts";
import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

const inputs =
  loadInput(3, { test: false })
    .split("\n")
  ;

function solve1(input: typeof inputs) {
  const map =
    defaultDict(() => ({
      "0": 0,
      "1": 0,
    }))
    ;

  for (const line of input) {
    const split = line.split('') as ("0" | "1")[];

    for (const [i, c] of Object.entries(split)) {
      map[i][c] += 1;
    }
  }

  let most = '';
  let least = '';
  for (const val of Object.values(map)) {
    if (val["0"] > val["1"]) {
      most += "0";
      least += "1";
    } else {
      most += "1";
      least += "0";
    }
  }

  return parseInt(least, 2) * parseInt(most, 2);
}

function solve2(input: typeof inputs) {
  const toCount =
    (items: string[]) =>
      items.reduce((acc, item) => {
        if (!(item in acc)) {
          acc[item] = 0;
        }

        acc[item] += 1;

        return acc;
      }, {} as Record<string, number>)
    ;

  const reduce = (
    items: string[],
    select: ((input: Record<string, number>) => string),
    index = 0,
  ): number => {
    const charactersAtIndex = items.map((str) => str[index]);
    const characterFrequency = toCount(charactersAtIndex);
    const characterToFilterBy = select(characterFrequency);
    const filtered = items.filter((str) => str[index] === characterToFilterBy);

    if (filtered.length === 1) {
      return parseInt(filtered[0], 2);
    } else {
      return reduce(filtered, select, index + 1);
    }
  }

  const ox = reduce(
    input,
    (counts) =>
      counts["0"] > counts["1"]
        ? "0"
        : "1"
    ,
  );

  const co = reduce(
    input,
    (counts) =>
      counts["0"] > counts["1"]
        ? "1"
        : "0"
    ,
  );

  return ox * co;
}


printOutput(inputs, { solve1, solve2 });

#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

import {
  sum
} from "../lib/helpers.ts";

const inputs =
  loadInput(6, { test: false })
    .split(',')
    .map(Number)
  ;

function solve(intervals: number[], days: number) {
  const counter = new Array(9).fill(0);

  for (const val of intervals) {
    counter[val] += 1;
  }

  for (let day = 0; day < days; day++) {
    const add = counter[0];
    for (let i = 1; i <= 9; i++) {
      counter[i - 1] = counter[i];
    }
    counter[6] += add;
    counter[8] = add;
  }

  return sum(counter)
}

function solve1(input: typeof inputs) {
  return solve(input, 80);
}

function solve2(input: typeof inputs) {
  return solve(input, 256);
}


printOutput(inputs, { solve1, solve2 });

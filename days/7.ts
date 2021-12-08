#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  add,
} from "../lib/helpers.ts";
import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

const inputs =
  loadInput(7, { test: false })
    .split(',')
    .map(Number)
  ;

function solve(input: number[], cost: (from: number) => (to: number) => number) {
  const maxNum = Math.max(...input);
  const costFrom = (from: number) => input.map(cost(from)).reduce(add, 0);

  return Math.min(...new Array(maxNum).fill(0).map((_, point) => costFrom(point)));
}

function solve1(input: typeof inputs) {
  const cost = (to: number) => (from: number) => Math.abs(from - to);

  return solve(input, cost);
}

function solve2(input: typeof inputs) {
  const sum1ToN = (n: number) => n * (n + 1) / 2;
  const cost = (from: number) => (to: number) => sum1ToN(Math.abs(to - from));

  return solve(input, cost);
}


printOutput(inputs, { solve1, solve2 });

#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

const inputs =
  loadInput(ENTER_DAY_HERE, { test: false })
    .split(',')
    .map(Number)
  ;

function solve1(input: typeof inputs) {
  return -1;
}

function solve2(input: typeof inputs) {
  return -1;
}


printOutput(inputs, { solve1, solve2 });

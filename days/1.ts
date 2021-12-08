#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

import {
  sum
} from "../lib/helpers.ts";

const inputs =
  loadInput(1, { test: false })
    .split("\n")
    .map(Number)
  ;

function solve1(nums: typeof inputs) {
  let increased = 0;
  for (let index = 1; index < nums.length; index++) {
    const cur = nums[index];
    const prev = nums[index - 1];

    increased += Number(cur > prev);
  }
  return increased;
}

function solve2(nums: typeof inputs) {
  let increased = 0;
  for (let index = 1; index < nums.length - 2; index++) {
    const cur = nums.slice(index, index + 3);
    const prev = nums.slice(index - 1, index + 2);

    increased += Number(sum(cur) > sum(prev));
  }
  return increased;
}


printOutput(inputs, { solve1, solve2 });

#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

const inputs =
  loadInput(2, { test: false })
    .split("\n")
  ;

function solve1(input: typeof inputs) {
  let depth = 0;
  let position = 0;

  for (const line of input) {
    const [direction, distanceS] = line.split(" ");
    const X = Number(distanceS);

    switch (direction) {
      case "forward":
        position += X;
        break;
      case "down":
        depth += X;
        break;
      case "up":
        depth -= X;
        break;
    }
  }

  return depth * position;
}

function solve2(input: typeof inputs) {
  let depth = 0;
  let position = 0;
  let aim = 0;

  for (const line of input) {
    const [direction, distance] = line.split(" ");
    const X = Number(distance);

    switch (direction) {
      case "forward":
        position += X;
        depth += aim * X;
        break;
      case "down":
        aim += X;
        break;
      case "up":
        aim -= X;
        break;
    }
  }

  return depth * position;
}


printOutput(inputs, { solve1, solve2 });

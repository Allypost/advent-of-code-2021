#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

import { Deque } from 'https://deno.land/x/deno_deque@1.0.0/mod.ts';
import { div } from "../lib/helpers.ts";

const inputs =
  loadInput(10, { test: false })
    .split('\n')
  ;

const mirror: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

function toErrorStack(line: string): { stack: Deque<string>, fail: boolean } {
  const stack = new Deque<string>();
  for (const char of line) {
    if (char === stack.back) {
      stack.pop();
      continue
    }

    stack.push(mirror[char] ?? char);

    if (stack.back !== mirror[char]) {
      return { stack, fail: true };
    }
  }

  return { stack, fail: false };
}

function solve1(input: typeof inputs) {
  const points: Record<string, number> = {
    "|": 0,
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  return (
    input
      .map(toErrorStack)
      .filter(({ fail }) => fail)
      .reduce((acc, { stack }) => acc + points[stack.back!], 0)
  );
}

function solve2(input: typeof inputs) {
  const points: Record<string, number> = {
    "|": 0,
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  return (
    input
      .map(toErrorStack)
      .filter(({ fail }) => !fail)
      .map(({ stack }) => ([...stack] as string[]).reverse().reduce((acc, c) => acc * 5 + points[c], 0))
      .sort((a, b) => a - b)
      .find((_, i, arr) => i === div(arr.length, 2))!
  );
}


printOutput(inputs, { solve1, solve2 });

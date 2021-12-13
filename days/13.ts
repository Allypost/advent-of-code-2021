#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

import * as R from "https://deno.land/x/ramda/mod.ts";

const inputs =
  loadInput(13, { test: false })
    .split('\n\n')
  ;

const solve =
  (moves: string, folds: string) =>
    (stopAfterFirstMove: boolean) =>
      folds
        .split('\n')
        .map(
          (line) =>
            line
              .substr(line.indexOf('=') - 1)
              .split('=')
              ,
        )
        .map(
          ([type, numStr]) =>
            [
              type,
              Number(numStr),
            ] as [string, number]
          ,
        )
        .slice(
          0,
          stopAfterFirstMove
            ? 1
            : Infinity
          ,
        )
        .reduce(
          (dots, [type, num]) =>
            dots.map(([x, y]) =>
              [
                (x >= num && type === "x")
                  ? (num - (x - num))
                  : x
                ,
                (y >= num && type === "y")
                  ? (num - (y - num))
                  : y
                ,
              ]
            )
          ,
          moves
            .split('\n')
            .map((line) => line.split(',').map(Number))
          ,
        )
  ;

function solve1([moves, folds]: typeof inputs) {
  const dots = solve(moves, folds)(true);

  return new Set(dots.map(String)).size;
}

function solve2([moves, folds]: typeof inputs) {
  const nums = solve(moves, folds)(false);

  const minX = Math.min(...nums.map(([x, _]) => x));
  const minY = Math.min(...nums.map(([_, y]) => y));

  const relativeNums = nums.map(([x, y]) => [x - minX, y - minY]);

  const maxX = Math.max(...relativeNums.map(([x, _]) => x));
  const maxY = Math.max(...relativeNums.map(([_, y]) => y));

  return (
    relativeNums
      .reduce(
        (grid, [x, y]) =>
          R.set(R.lensIndex(y), R.set(R.lensIndex(x), '#', grid[y]), grid)
        ,
        Array.from({ length: maxY + 1 }, () => Array.from({ length: maxX + 1 }, () => ' ')),
      )
      .map(R.join(''))
      .join('\n')
  );
}


printOutput(inputs, { solve1, solve2 });

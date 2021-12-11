#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

const inputs =
  loadInput(11, { test: false })
    .split('\n')
    .map((r) => r.split('').map(Number))
  ;

function flash(grid: number[][], r: number, c: number, cb: ((r: number, c: number) => unknown) = () => -1) {
  cb(r, c);

  for (let i = r - 1; i <= r + 1; i++) {
    for (let j = c - 1; j <= c + 1; j++) {
      if (i === r && j === c) {
        continue;
      }

      if (i in grid && j in grid[i]) {
        grid[i][j] += 1;
        if (grid[i][j] === 10) {
          flash(grid, i, j, cb);
          grid[i][j] += 1;
        }
      }
    }
  }
}

function squidsLitUp(grid: number[][]): number {
  let nSquidsLitUp = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      grid[row][col] += 1;

      if (grid[row][col] === 10) {
        flash(grid, row, col, () => nSquidsLitUp += 1);
        grid[row][col] += 1;
      }
    }
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] > 9) {
        grid[row][col] = 0;
      }
    }
  }

  return nSquidsLitUp;
}

function solve1(input: typeof inputs) {
  return new Array(100).fill(0).reduce((acc) => acc + squidsLitUp(input), 0);
}

function solve2(input: typeof inputs) {
  let stepsTaken = 0;
  while (squidsLitUp(input) !== input.length * input[0].length) {
    stepsTaken += 1;
  }
  return stepsTaken;
}


printOutput(inputs, { solve1, solve2 });

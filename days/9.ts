#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

import {
  multiply,
} from "../lib/helpers.ts";

import { Deque } from 'https://deno.land/x/deno_deque@1.0.0/mod.ts';

const inputs =
  loadInput(9, { test: false })
    .split('\n')
    .map((line) => line.split('').map(Number))
  ;

function solve1(input: typeof inputs) {
  const at = (row: number, col: number) => input[row]?.[col] ?? Infinity;

  let sum = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const location = input[row][col];
      const neighbours = [
        at(row - 1, col),
        at(row + 1, col),
        at(row, col - 1),
        at(row, col + 1),
      ];

      if (neighbours.every((neighbour) => location < neighbour)) {
        sum += location + 1;
      }
    }
  }

  return sum;
}

function solve2(input: typeof inputs) {
  const depthSeen: number[][] = input.map((r) => new Array(r.length).fill(0));

  let depth = 1;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (
        input[row][col] === 9
        || depthSeen[row][col] !== 0
      ) {
        continue;
      }

      const visited = new Set<string>();
      visited.add(`${row},${col}`);

      const queue = new Deque<[number, number]>();
      queue.push([row, col]);

      while (!queue.empty) {
        const [r, c] = queue.shift()!;
        const neighbours = [
          [r - 1, c],
          [r + 1, c],
          [r, c - 1],
          [r, c + 1],
        ];

        for (const [i, j] of neighbours) {
          if (visited.has(`${i},${j}`)) {
            continue;
          }

          if (
            0 <= i && i < input.length
            && 0 <= j && j < input[i].length
            && input[i][j] !== 9
          ) {
            visited.add(`${i},${j}`);
            queue.push([i, j]);
          }
        }

        depthSeen[r][c] = depth;
      }
      depth += 1;
    }
  }

  const basinSizes = new Array(depth).fill(0);
  for (const depth of depthSeen.flat()) {
    basinSizes[depth] += 1;
  }
  basinSizes.splice(0, 1);
  return basinSizes.sort((a, b) => b - a).slice(0, 3).reduce(multiply, 1);
}

printOutput(inputs, { solve1, solve2 });

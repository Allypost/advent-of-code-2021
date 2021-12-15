#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

import {
  Graph,
  astar,
} from '../lib/astar.js';

import {
  div,
} from "../lib/helpers.ts";

const inputs =
  loadInput(15, { test: false })
    .split('\n')
    .map((line) => line.split('').map(Number))
  ;

function findPath(grid: number[][]) {
  const rows = grid.length;
  const cols = grid[rows - 1].length;

  const graph = new Graph(grid);

  const start = graph.grid[0][0];
  const end = graph.grid[rows - 1][cols - 1];
  const result = astar.search(graph, start, end);

  return result.reduce((acc, node) => acc + node.weight, 0);
}

function solve1(input: typeof inputs) {
  return findPath(input);
}

function solve2(input: typeof inputs) {
  const rows = input.length;
  const cols = input[0].length;

  const wrap = (num: number) => (num - 1) % 9 + 1;

  const newInput =
    Array
      .from(
        {
          length: rows * 5
        },
        (_, i) =>
          Array.from(
            {
              length: cols * 5
            },
            (_, j) =>
              wrap(
                input[i % rows][j % cols]
                + div(i, rows)
                + div(j, cols)
              )
            ,
          )
        ,
      )
    ;

  return findPath(newInput);
}


printOutput(inputs, { solve1, solve2 });

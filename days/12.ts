#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

import {
  add
} from "../lib/helpers.ts";

const inputs =
  loadInput(12, { test: false })
    .split('\n')
    .map((x) => x.split("-"))
    .flatMap((x) => [x, x.slice().reverse()])
    .reduce(
      (acc, [from, to]) => acc.set(from, [...acc.get(from) ?? [], to]),
      new Map<string, string[]>(),
    )
  ;

const pathfinder =
  (
    connections: Map<string, string[]>,
    visitSmallTwice: boolean,
  ) =>
    function pathfind(
      node: string,
      history: string[] = [],
      smallVisited = !visitSmallTwice,
    ): number {
      if (node === "end") {
        return 1;
      }

      if (
        node === node.toLowerCase()
        && history.includes(node)
      ) {
        if (!smallVisited && node !== "start") {
          smallVisited = true
        } else {
          return 0;
        }
      }

      return (
        connections
          .get(node)!
          .map((connectedNode) => pathfind(connectedNode, [...history, node], smallVisited))
          .reduce(add, 0)
      )
    }
  ;

function solve1(connections: typeof inputs) {
  return pathfinder(connections, false)("start")
}

function solve2(connections: typeof inputs) {
  return pathfinder(connections, true)("start")
}


printOutput(inputs, { solve1, solve2 });

#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import { divUnit } from "../lib/helpers.ts";
import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

const inputs =
  loadInput(5, { test: false })
    .split('\n')
    .map((line) => line.split(' -> '))
    .map(([l, r]) => [l.split(',').map(Number), r.split(',').map(Number)])
  ;

function overlaps(coordRange: number[][][]) {
  const field = new Map<string, number>();

  for (const coords of coordRange) {
    const [[x1, y1], [x2, y2]] = coords;
    const dx = divUnit(x2 - x1);
    const dy = divUnit(y2 - y1);
    let x = x1;
    let y = y1;
    while (
      x != x2 + dx
      || y != y2 + dy
    ) {
      const key = `${x},${y}`;
      field.set(key, (field.get(key) || 0) + 1);
      x += dx;
      y += dy;
    }
  }

  return [...field.values()].reduce((acc, a) => acc + Number(a > 1), 0);
}

function solve1(coords: typeof inputs) {
  const filtered =
    coords.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2);

  return overlaps(filtered);
}

function solve2(coords: typeof inputs) {
  return overlaps(coords);
}


printOutput(inputs, { solve1, solve2 });

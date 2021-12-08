#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import {
  loadInput,
  printOutput,
} from "../lib/input.ts";

import {
  add,
} from '../lib/helpers.ts'

const inputs =
  loadInput(4, { test: false })
    .split('\n\n')
  ;

function solve1([numbersList, ...boardLines]: typeof inputs) {
  const numbers =
    numbersList
      .split(',')
      .map(Number)
    ;

  const boards =
    boardLines
      .map((l) => l.replaceAll(/ +/g, ' ').split('\n'))
      .map((l) => l.map((n) => n.trim().split(' ').map((n) => Number(n))))
    ;

  const isWinner =
    (numbers: Set<number>) =>
      (board: number[][]) =>
        board.some((row) => row.every((num) => numbers.has(num)))
        || board.some((_, i) => board.every(x => numbers.has(x[i])))
    ;

  const lastNumber =
    numbers
      .find((_, i) => {
        const nums = new Set(numbers.slice(0, i + 1));

        return boards.some(isWinner(nums));
      })!
    ;

    const lastNumberIndex = numbers.indexOf(lastNumber);
    const usedNumbers = new Set(numbers.slice(0, lastNumberIndex + 1));

  const sum =
    boards
      .find(isWinner(usedNumbers))!
      .flat()
      .filter(
        (number) =>
          !usedNumbers
            .has(number)
      ,
      )
      .reduce(add, 0)
    ;

  return sum * lastNumber;
}

function solve2([numbersList, ...boardLines]: typeof inputs) {
  const numbers =
    numbersList
      .split(',')
      .map(Number)
    ;

  const boards =
    boardLines
      .map((l) => l.replaceAll(/ +/g, ' ').split('\n'))
      .map((l) => l.map((n) => n.trim().split(' ').map((n) => Number(n))))
    ;

  const isWinner =
    (numbers: Set<number>) =>
      (board: number[][]) =>
        board.some((row) => row.every((num) => numbers.has(num)))
        || board.some((_, i) => board.every((row) => numbers.has(row[i])))
    ;

  const lastNumber =
    numbers
      .find(
        (_, i) =>
          boards.every(
            isWinner(new Set(numbers.slice(0, i + 1))),
          )
        ,
      )!
    ;

  const lastNumberIndex = numbers.indexOf(lastNumber);
  const usedNumbers = new Set(numbers.slice(0, lastNumberIndex));

  const sum =
    boards
      .find((x) => !isWinner(usedNumbers)(x))!
      .flat()
      .filter(
        (number) =>
          !numbers
            .slice(0, lastNumberIndex + 1)
            .includes(number)
        ,
      )
      .reduce(add, 0)
    ;

  return sum * lastNumber;
}


printOutput(inputs, { solve1, solve2 });

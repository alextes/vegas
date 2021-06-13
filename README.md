<p align="center">
<!-- <img src="https://raw.githubusercontent.com/cryptogohan/vegas/master/media/vegas-logo.svg" width="200"> -->

<h1 align="center">Vegas</h1>
<p align="center">Generate random numbers and samples.</p>
</p>
<p align="center">
  <a href="https://github.com/cryptogohan/vegas/actions/workflows/tests.yml">
    <img src="https://github.com/cryptogohan/vegas/workflows/tests/badge.svg">
  </a>
  <a href="https://codecov.io/gh/cryptogohan/vegas">
    <img src="https://codecov.io/gh/cryptogohan/vegas/branch/main/graph/badge.svg?token=TW4QNAKP7U"/>
  </a>
  <a href="https://github.com/cryptogohan/vegas/releases">
    <img src="https://img.shields.io/github/v/tag/cryptogohan/vegas?label=version">
  </a>
  <a href="https://doc.deno.land/https/deno.land/x/vegas/mod.ts">
    <img src="https://img.shields.io/badge/%E2%80%8E-docs-blue.svg?logo=deno">
  </a>
</p>

Vegas helps do things based on randomness. For example picking a random integer,
picking a random element from a list, or even collecting a unique sample of
elements from a list. This library takes inspiration from
[Python's random library](https://docs.python.org/3/library/random.html).

## Usage

```ts
import { randomInt } from "https://deno.land/x/vegas@1.0.0/mod.ts";

console.log(randomInt(0, 4)); // 2
```

## API

Below are examples for all currently available APIs. Except for the
`makeGenerators` and `makeSeededGenerators` functions, all functions draw
randomness from `Math.random`. Use the aforementioned functions to draw
randomness from a different source.

```ts
// int from and including two, up to and excluding eight.
randomInt(2, 8);

// int below 4.
randomBelow(4);

// pick a random element from a list.
randomPick([1, 2, 3]);

// pick a sample of two elements from a list.
randomSample([1, 2, 3, 4], 2);

// random float, mostly here for seeded random float generation.
randomFloat();

// initializes all random generators with a seeded random number generator.
const vegas = makeSeededGenerators("my-seed");
vegas.randomInt(2, 32);

// initializes all random generators with a custom random number generator.
const vegasCustom = makeGenerators(Math.random);
vegasCustom.randomInt(0, 10);
```

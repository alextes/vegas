<p align="center">
<!-- <img src="https://raw.githubusercontent.com/alextes/vegas/master/media/vegas-logo.svg" width="200"> -->

<h1 align="center">Vegas</h1>
<p align="center">Generate random numbers and samples.</p>
</p>
<p align="center">
  <a href="https://github.com/alextes/vegas/releases">
    <img src="https://img.shields.io/github/v/tag/alextes/vegas?label=version">
  </a>
  <a href="https://github.com/alextes/vegas/actions/workflows/tests.yml">
    <img src="https://github.com/alextes/vegas/workflows/tests/badge.svg">
  </a>
  <a href="https://doc.deno.land/https/deno.land/x/vegas/mod.ts">
    <img src="https://img.shields.io/badge/%E2%80%8E-docs-blue.svg?logo=deno">
  </a>
  <a href="https://codecov.io/gh/alextes/vegas">
    <img src="https://codecov.io/gh/alextes/vegas/branch/main/graph/badge.svg?token=TW4QNAKP7U"/>
  </a>
  <img alt="dependency count" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fdep-count%2Fhttps%2Fdeno.land%2Fx%2Fvegas%2Fmod.ts">
  <img alt="dependencies up-to-date" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fupdates%2Fhttps%2Fdeno.land%2Fx%2Fvegas%2Fmod.ts">
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

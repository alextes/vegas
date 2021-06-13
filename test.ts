import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import {
  makeSeededGenerators,
  randomBelow,
  randomFloat,
  randomInt,
  randomPick,
  randomSample,
} from "./mod.ts";

const vegas = makeSeededGenerators("test-seed");

Deno.test("generate random ints", () => {
  assertEquals(vegas.randomInt(0, 4), 1);
  assertEquals(vegas.randomInt(0, 4), 2);
  assertEquals(vegas.randomInt(0, 4), 2);
  assertEquals(vegas.randomInt(0, 4), 1);
  assertEquals(vegas.randomInt(0, 4), 1);
  assertEquals(vegas.randomInt(0, 4), 1);
  assertEquals(vegas.randomInt(0, 4), 0);
  assertEquals(vegas.randomInt(0, 4), 1);
  assertEquals(vegas.randomInt(0, 4), 3);
});

Deno.test("pick random element", () => {
  assertEquals(vegas.randomPick([1, 2, 3]), 3);
});

Deno.test("generate random int below", () => {
  assertEquals(vegas.randomBelow(8), 1);
});

Deno.test("generate random float", () => {
  assertEquals(vegas.randomFloat(), 0.6410711158367218);
});

Deno.test("pick random sample", () => {
  const nums = Array(40).fill(0).map((_) => vegas.randomInt(1, 9));
  assertEquals(vegas.randomSample(nums, 2), [1, 8]);
});

Deno.test("generate an random int of type number", () => {
  assertEquals(typeof randomInt(0, 2), "number");
});

Deno.test("pick a random number of type number", () => {
  assertEquals(typeof randomPick([1, 2, 3]), "number");
});

Deno.test("pick a random int below of type number", () => {
  assertEquals(typeof randomBelow(4), "number");
});

Deno.test("generate a random float of type number", () => {
  assertEquals(typeof randomFloat(), "number");
});

Deno.test("generate a random sample with numbers", () => {
  const sample = randomSample([1, 2, 3], 3);
  assert(Array.isArray(sample));
  assertEquals(sample.length, 3);
  assertEquals(typeof sample[0], "number");
});

import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { makeSeededGenerators } from "./mod.ts";

const vegas = makeSeededGenerators("test-seed");

Deno.test("generate random int", () => {
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
  assertEquals(vegas.randomSample(nums, 2), [1, 2]);
});

Deno.test("pick random large sample", () => {
  assertEquals(vegas.randomSample([5, 8, 4, 8, 5], 3), [5, 8, 8]);
});

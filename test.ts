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
  assertEquals(vegas.randomSample([1, 2, 3, 4], 2), [4, 1]);
});

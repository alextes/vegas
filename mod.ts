/**
 * Vegas
 * @module vegas
 * This module is browser compatible.
 */

// @deno-types="./seedrandom.d.ts"
import seedrandom from "https://jspm.dev/seedrandom";

const nth = <A>(index: number, list: A[]): A => list[index];

/* Implementations for random generator functions */

const randomInt_ = (
  genFloat: () => number,
  min: number,
  max: number,
  //The maximum is exclusive and the minimum is inclusive
): number => Math.floor(genFloat() * (max - min)) + min;

const randomPick_ = <A>(genFloat: () => number, list: A[]): A =>
  nth(randomInt_(genFloat, 0, list.length), list);

const randomBelow_ = (
  genFloat: () => number,
  exclusiveUpperBound: number,
): number => randomInt_(genFloat, 0, exclusiveUpperBound);

const randomFloat_ = (genFloat: () => number): number => genFloat();

const randomSample_ = <A>(
  genFloat: () => number,
  population: A[],
  sampleSize: number,
): A[] => {
  // We use a relatively smart method of picking samples. We copy the
  // population into source pool and grab every element in the pool at most
  // once through some clever moving of elements and bounds. A simpler method
  // is to just pick a random element and try again if the element was picked
  // already. The dumb method is fast enough for small lists, and cases where
  // chances of picking the same element twice are low. e.g. a sample of five,
  // out of a list of a thousand. However, as chances of collisions increase,
  // the simple method gets slow. e.g. picking nine-hundred-ninety-nine out of
  // a list of a thousand. Therefore we keep to the smart method, knowing we
  // pay a small cost that could sometimes be avoided. In Python the method is
  // chosen based on the following condition `popSize <= 21 + 4 **
  // ceil(log(sampleSize * 3)/log(4))` is used. A PR for a smart way of making
  // this decision based on JS performance is welcome.
  const sampled = [];
  const source = [...population];
  for (let i = 0; i < sampleSize; i++) {
    // Every iteration we pick from a smaller set of the population. Decreasing
    // the right bound.
    const randomIndex = randomBelow_(genFloat, population.length - i);
    // Pick a random element from our source list
    sampled[i] = source[randomIndex];
    // Replace the element we just picked with the element that wasn't but
    // will be out-of-bounds next iteration. The magic of this method happens
    // here. Each iteration we replace the element we just picked from our
    // source pool, with the right-most element. Next iteration we move our
    // right-bound left by one, thus not reconsidering picked elements. To
    // create a complete sample we have to walk the source list at most once.
    // When picking the right most element, we can skip this line, but it
    // effectively does nothing anyway.
    source[randomIndex] = source[population.length - i - 1];
  }

  return sampled;
};

/* Simplified exports of the random generator functions */
export const randomInt = (min: number, max: number): number =>
  randomInt_(Math.random, min, max);

/** Picks a random element from a list */
export const randomPick = <A>(list: A[]): A => randomPick_(Math.random, list);

/** Generates an integer below the given bound and above but including 0.  */
export const randomBelow = (exclusiveUpperBound: number) =>
  randomBelow_(Math.random, exclusiveUpperBound);

/** Generates a random number between 0 (inclusive) and 1 (exclusive).  */
export const randomFloat = () => randomFloat_(Math.random);

/** Builds a list of elements, of a given size, from a given list. */
export const randomSample = <A>(list: A[], sampleSize: number) =>
  randomSample_(Math.random, list, sampleSize);

/* Exports for seeded scenarios */
// We have these to ensure makeGenerators and makeSeededGenerators are exporting the same thing.
type RandomGenerators = {
  randomInt: (min: number, max: number) => number;
  randomPick: <A>(list: A[]) => A;
  randomBelow: (exclusiveUpperBound: number) => number;
  randomFloat: () => number;
  randomSample: <A>(list: A[], sampleSize: number) => A[];
};

/** Makes a set of generators based on a provided random number generator. */
export const makeGenerators = (
  genFloat: () => number = Math.random,
): RandomGenerators => ({
  randomInt: (min: number, max: number) => randomInt_(genFloat, min, max),
  randomPick: <A>(list: A[]): A => randomPick_(genFloat, list),
  randomBelow: (exclusiveUpperBound: number) =>
    randomBelow_(genFloat, exclusiveUpperBound),
  randomFloat: () => randomFloat_(genFloat),
  randomSample: <A>(list: A[], sampleSize: number) =>
    randomSample_(genFloat, list, sampleSize),
});

/** Makes a set of generators based on a provided seed string */
export const makeSeededGenerators = (seed: string): RandomGenerators =>
  makeGenerators(seedrandom(String(seed)));

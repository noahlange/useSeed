import { describe, test, expect } from '@jest/globals';
import Seeder from '../Seeder';
import { useSeed } from '../useSeed';

function randomWithSeed(seed: string): number {
  Seeder.set(seed);
  const res = Math.random();
  Seeder.unset(seed);
  return res;
}

describe('useSeed', () => {
  test('should set global random behavior within a callback', () => {
    const seed = 'asdf';
    let a = randomWithSeed(seed);
    let b: number | null = null;

    useSeed(seed, () => (b = Math.random()));
    expect(b).not.toBeNull();
    expect(a).toEqual(b);
  });

  test('should preserve seed across multiple useSeed calls', () => {
    let seeds: string[] = [];
    // set to 123
    useSeed('123', () => {
      seeds.push(Seeder.seed);
      // set to 456
      useSeed('456', () => {
        seeds.push(Seeder.seed);
      });
      // back to 123
      seeds.push(Seeder.seed);
    });

    expect(seeds.join(' ')).toEqual('123 456 123');
  });
});

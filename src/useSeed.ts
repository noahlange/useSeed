import Seeder from './Seeder';

export function useSeed(seed: string, callback: () => void): void {
  // get current seed
  const start = Seeder.seed;
  // set new seed
  Seeder.set(seed);
  // do stuff
  callback();
  // replace old seed
  Seeder.set(start);
}

import * as seedrandom from 'seedrandom';

export default class Seeder {
  public static get seed(): string {
    return this.seeder.seed;
  }

  public static unset(seed: string): void {
    if (seed in this.states) {
      delete this.states[seed];
    }
  }

  public static set(seed: string): void {
    // if we have an active seeder, store the current state.
    if (this.seeder) {
      this.seeder.save();
    }
    const state = this.states[seed] ?? true;
    // set the global seeder
    this.seeder = new Seeder(seed, { state });
    // ...overwrite global RNG behavior
    Math.random = () => this.seeder.random();
  }

  protected static seeder: Seeder;
  protected static states: Record<string, seedrandom.State> = {};

  protected seeder: seedrandom.prng;
  protected seed: string;

  protected save() {
    Seeder.states[this.seed] = this.seeder.state();
  }

  public random() {
    return this.seeder.quick();
  }

  public constructor(seed: string, state: seedrandom.State = true) {
    this.seed = seed;
    this.seeder = seedrandom(seed, { state });
  }
}

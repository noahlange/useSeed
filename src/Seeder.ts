import * as seedrandom from 'seedrandom';

export default class Seeder {
  public static get seed(): string {
    return this.seeder._seed;
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

  protected _seeder: seedrandom.prng;
  protected _seed: string;

  protected save() {
    Seeder.states[this._seed] = this._seeder.state();
  }

  public random() {
    return this._seeder.quick();
  }

  public constructor(seed: string, state: seedrandom.State = true) {
    this._seed = seed;
    this._seeder = seedrandom(seed, { state });
  }
}

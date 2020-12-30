# useSeed

Seeded pseudorandom number generation within callbacks, preserving state.

```typescript
import { useSeed } from './src/useSeed';

useSeed('123', () => {
  // do things using a PRNG seeded with "123"
  Math.random();

  useSeed('456', () => {
    // do things with "456"
    Math.random();
  });

  // resumes "123"
  Math.random();
});

useSeed('456', () => {
  // resumes "456"
  Math.random();
});
```

Advisory: nested `useSeed()` calls with the same seed may not work as expected—I haven't taken the time to determine exactly what should happen there.

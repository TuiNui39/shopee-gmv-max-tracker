Here's the main tRPC app router in TypeScript:

```typescript
import { router } from '../_core/trpc';
import { gmvMaxRouter } from './gmv-max';
import { importRouter } from './import';

export const appRouter = router({
  gmvMax: gmvMaxRouter,
  import: importRouter,
});

export type AppRouter = typeof appRouter;
```

This code does the following:

1. It imports the `router` function from the `'../_core/trpc'` module.
2. It imports the `gmvMaxRouter` from the `'./gmv-max'` module.
3. It imports the `importRouter` from the `'./import'` module.
4. It defines the `appRouter` using the `router` function and combines the `gmvMaxRouter` and `importRouter` as its properties.
5. It exports the `appRouter` variable.
6. It exports the `AppRouter` type, which is inferred from the `appRouter` using the `typeof` operator.

Now you can use the `appRouter` to define your tRPC routes and the `AppRouter` type to get type information about the router and its endpoints.
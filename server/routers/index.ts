Here's the TypeScript code for the `server/routers/index.ts` file:

```typescript
import { router } from '../_core/trpc';
import gmvMaxRouter from './gmv-max';
import importRouter from './import';
import aiRouter from './ai';
import notionRouter from './notion';
import slidesRouter from './slides';

export const appRouter = router({
  gmvMax: gmvMaxRouter,
  import: importRouter,
  ai: aiRouter,
  notion: notionRouter,
  slides: slidesRouter,
});

export type AppRouter = typeof appRouter;
```
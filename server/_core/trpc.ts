Here's a tRPC setup file with the requested exports:

```typescript
import { initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { Request, Response } from 'express';
import { User } from './types'; // Assuming you have a User type defined

const t = initTRPC.context<Context>().create();

interface Context {
  req: Request;
  res: Response;
  user: User | null;
}

export const createContext = ({ req, res }: CreateExpressContextOptions): Context => {
  // Get the user from the request (e.g., from authentication middleware)
  const user = req.user as User | null;

  return {
    req,
    res,
    user,
  };
};

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
```

In this setup file:

1. We import the necessary modules from `@trpc/server` and `express`.

2. We define the `Context` interface, which includes the `req`, `res`, and `user` properties.

3. We export a `createContext` function that takes the `req` and `res` objects from Express and returns the `Context` object. It assumes that the `user` object is attached to the `req` object (e.g., through an authentication middleware).

4. We define an `isAuthed` middleware using `t.middleware`. It checks if the `user` exists in the context. If not, it throws a `TRPCError` with the `UNAUTHORIZED` code. Otherwise, it passes the `user` to the next middleware or procedure.

5. We export the `router` and `publicProcedure` directly from the `t` object.

6. We export the `protectedProcedure` by applying the `isAuthed` middleware to the `t.procedure`. This ensures that the user is authenticated before accessing the protected procedures.

You can use this setup file as a starting point for your tRPC server. You can define your routes and procedures using the exported `router`, `publicProcedure`, and `protectedProcedure`. The `createContext` function will be used to create the context object for each request.
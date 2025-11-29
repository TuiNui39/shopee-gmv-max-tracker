Here's the TypeScript code for creating an Express server with tRPC:

```typescript
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index';
import { createContext } from './_core/trpc';

const app = express();

// Enable CORS
app.use(cors());

// Serve static files from dist/
app.use(express.static('dist'));

// tRPC middleware at /api/trpc
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Get the port from environment variable or use default port 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

This code sets up an Express server with the following features:

1. Express app setup: The `express` module is imported and an Express app instance is created.

2. CORS enabled: The `cors` middleware is used to enable Cross-Origin Resource Sharing (CORS) for the server.

3. tRPC middleware at `/api/trpc`: The `createExpressMiddleware` function from `@trpc/server/adapters/express` is used to create the tRPC middleware. The `appRouter` and `createContext` are imported and passed to the middleware.

4. Serve static files from `dist/`: The `express.static` middleware is used to serve static files from the `dist/` directory.

5. Error handling: An error handling middleware is defined to catch and log any errors that occur during request processing. It sends a 500 Internal Server Error response with an error message.

6. Port from environment variable (default 3000): The `PORT` environment variable is used to determine the port on which the server should listen. If the environment variable is not set, the default port 3000 is used.

7. The `appRouter` is imported from `'./routers/index'` and passed to the tRPC middleware.

8. The `createContext` function is imported from `'./_core/trpc'` and passed to the tRPC middleware.

9. The `@trpc/server/adapters/express` module is used to create the tRPC middleware.

Make sure to install the required dependencies (`express`, `cors`, `@trpc/server`) before running the server.
import { router } from '../trpc';
import { noteRouter } from './notes';

export const appRouter = router({
  notes: noteRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

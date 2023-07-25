/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../prisma';

/**
 * Default selector for Note.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultNoteSelect = Prisma.validator<Prisma.NoteSelect>()({
  id: true,
  title: true,
  text: true,
  createdAt: true,
  updatedAt: true,
});

export const noteRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).nullish(),
          cursor: z.string().nullish(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input?.limit ?? 50;
      const { cursor } = input ?? {};

      const items = await prisma.note.findMany({
        select: defaultNoteSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const note = await prisma.note.findUnique({
        where: { id },
        select: defaultNoteSelect,
      });
      if (!note) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No note with id '${id}'`,
        });
      }
      return note;
    }),
  add: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1).max(100),
        text: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const note = await prisma.note.create({
        data: input,
        select: defaultNoteSelect,
      });
      return note;
    }),
});
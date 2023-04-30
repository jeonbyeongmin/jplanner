import { rest } from 'msw';

import { generateBoardsPath } from '@/api/boards/paths';

const board = [
  // Retrieve boards
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/${generateBoardsPath()}`,
    (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: '1',
            name: 'Board 1',
            description: 'Description 1',
          },
          {
            id: '2',
            name: 'Board 2',
            description: 'Description 2',
          },
        ]),
      );
    },
  ),

  // Retrieve specific board
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/${generateBoardsPath()}/:id`,
    (req, res, ctx) => {
      const { id } = req.params;

      return res(
        ctx.status(200),
        ctx.json({
          id,
          name: `Board ${id}`,
          description: `Description ${id}`,
        }),
      );
    },
  ),

  // Create board
  rest.post(
    `${process.env.NEXT_PUBLIC_API_URL}/${generateBoardsPath()}`,
    (_, res, ctx) => {
      return res(ctx.status(201), ctx.json({}));
    },
  ),

  // Update board
  rest.put(
    `${process.env.NEXT_PUBLIC_API_URL}/${generateBoardsPath()}/:id`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    },
  ),

  // Partially update board
  rest.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/${generateBoardsPath()}/:id`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    },
  ),

  // Delete board
  rest.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/${generateBoardsPath()}/:id`,
    (_, res, ctx) => {
      return res(ctx.status(204), ctx.json({}));
    },
  ),
];

export const handlers = [...board];

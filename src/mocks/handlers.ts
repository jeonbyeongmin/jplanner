import { rest } from 'msw';

import { getBoardsPath } from '@/api/board/get-board';

const board = [
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/${getBoardsPath()}`,
    (req, res, ctx) => {
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

  rest.post(
    `${process.env.NEXT_PUBLIC_API_URL}/${getBoardsPath()}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: 'success',
        }),
      );
    },
  ),
];

export const handlers = [...board];

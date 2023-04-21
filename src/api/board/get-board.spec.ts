import { getBoardsAPI, getBoardsPath } from '@/api/board/get-board';
import { rest, server } from '@/mocks/server';

describe('getBoard', () => {
  it('should return an empty array of boards', async () => {
    server.use(
      rest.get(getBoardsPath(), (req, res, ctx) => {
        return res(ctx.json({ boards: [] }));
      }),
    );

    const data = await getBoardsAPI();

    expect(data).toEqual({ boards: [] });
  });
});

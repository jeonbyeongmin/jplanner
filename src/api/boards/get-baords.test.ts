import { getBoardsAPI } from '@/api/boards/get-boards';

describe('getBoardsAPI 테스트', () => {
  it('should get board', async () => {
    const params = {};
    const data = await getBoardsAPI(params);

    expect(data).toBeInstanceOf(Array);
  });
});

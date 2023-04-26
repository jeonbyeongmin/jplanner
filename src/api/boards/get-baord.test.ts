import { getBoardsAPI } from '@/api/boards/get-board';

describe('getBoardsAPI 테스트', () => {
  it('should get board', async () => {
    const data = await getBoardsAPI();

    expect(data).toBeInstanceOf(Array);
  });
});

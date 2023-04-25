import { getBoardsPath } from '@/api/board/get-board';
import { fetcher } from '@/utils/api-client';

describe('fetcher', () => {
  it('should return data', async () => {
    const data = await fetcher(getBoardsPath());

    expect(data).toBeDefined();
  });
});

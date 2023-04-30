import { getBoardAPI } from '@/api/boards/board/get-baord';

describe('getBoardAPI 테스트', () => {
  it('should get board', async () => {
    const params = { boardID: '1' };
    const data = await getBoardAPI(params);

    expect(data).toEqual({
      id: '1',
      name: 'Board 1',
      description: 'Description 1',
    });
  });
});

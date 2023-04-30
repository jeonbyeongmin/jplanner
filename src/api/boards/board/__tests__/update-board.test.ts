import { updateBoardAPI } from '../update-board';

describe('updateBoardAPI 테스트', () => {
  it('id와 body가 주어지면 board를 수정해야 한다', async () => {
    const params = { boardID: '1' };
    const body = { title: 'Board 1' };

    const data = await updateBoardAPI(params, body);

    expect(data).toEqual({});
  });
});

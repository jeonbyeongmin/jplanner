import { deleteBoardAPI } from '../delete-board';

describe('deleteBoardAPI 테스트', () => {
  it('id가 주어지면 board를 삭제해야 한다', async () => {
    const params = { boardID: '1' };

    const data = await deleteBoardAPI(params);

    expect(data).toEqual({});
  });
});

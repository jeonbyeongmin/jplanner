import { createBoardAPI } from './create-board';

import type { CreateBoardParams } from './create-board';

describe('createBoardAPI 테스트', () => {
  it('data가 주어지면 board를 만들어야 한다', async () => {
    const params: CreateBoardParams = {
      title: 'test board',
    };

    const data = await createBoardAPI(params);

    expect(data).toEqual({});
  });

  it('title이 비어있다면 에러를 던저야 한다', async () => {
    const params: CreateBoardParams = {
      title: '',
    };

    await expect(createBoardAPI(params)).rejects.toThrowError(
      'title is required',
    );
  });
});

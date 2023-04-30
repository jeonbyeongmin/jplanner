import { createBoardAPI } from './create-board';

import type { CreateBoardBody } from './create-board';

describe('createBoardAPI 테스트', () => {
  const params = {};

  it('data가 주어지면 board를 만들어야 한다', async () => {
    const body: CreateBoardBody = {
      title: 'test board',
    };

    const data = await createBoardAPI(params, body);

    expect(data).toEqual({});
  });

  it('title이 비어있다면 에러를 던저야 한다', async () => {
    const body: CreateBoardBody = {
      title: '',
    };

    await expect(createBoardAPI(params, body)).rejects.toThrowError(
      'title is required',
    );
  });
});

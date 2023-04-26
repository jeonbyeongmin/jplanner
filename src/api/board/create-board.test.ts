import { createBoardAPI } from './create-board';

import type { CreateBoardParams } from './create-board';

describe('create board', () => {
  it('should create board', async () => {
    const params: CreateBoardParams = {
      title: 'test board',
    };

    const data = await createBoardAPI(params);

    expect(data).toEqual({
      message: 'success',
    });
  });

  it('should throw error when title is empty', async () => {
    const params: CreateBoardParams = {
      title: '',
    };

    await expect(createBoardAPI(params)).rejects.toThrowError(
      'title is required',
    );
  });
});

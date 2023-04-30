import { createPathGenerator } from '../path';

describe('createPathGenerator 테스트', () => {
  const resourceName = 'boards';
  const generateBoardsPath = createPathGenerator(resourceName);

  it('resourceName이 주어지지 않으면 에러를 반환합니다', () => {
    expect(() => createPathGenerator('')).toThrow();
  });

  it('반환값은 함수입니다', () => {
    expect(typeof generateBoardsPath).toBe('function');
  });

  describe('generator 테스트', () => {
    it('인자로 id가 주어지면 id를 포함한 경로를 반환합니다', () => {
      expect(generateBoardsPath({ id: '1' })).toBe('boards/1');
    });

    it('인자로 queries가 주어지면 쿼리스트링을 포함한 경로를 반환합니다', () => {
      expect(generateBoardsPath({ queries: { page: '1' } })).toBe(
        'boards?page=1',
      );
    });

    it('인자로 id와 queries가 주어지면 id와 쿼리스트링을 포함한 경로를 반환합니다', () => {
      expect(generateBoardsPath({ id: '1', queries: { page: '1' } })).toBe(
        'boards/1?page=1',
      );
    });

    it('인자로 아무것도 주어지지 않으면 기본 경로를 반환합니다', () => {
      expect(generateBoardsPath()).toBe('boards');
    });
  });
});

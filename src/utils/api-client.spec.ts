import { fetcher } from '@/utils/api-client';

// Mock fetch function

describe('fetcher', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'));
  // afterEach(() => {
  //   jest.resetAllMocks();
  // });

  test('should make a GET request if data is not provided', async () => {
    const endpoint = 'test-endpoint';
    await fetcher(endpoint);
    expect(window.fetch).toHaveBeenCalledWith(`${process.env.API_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': undefined,
      },
    });
  });

  test('should make a POST request if data is provided', async () => {
    const endpoint = 'test-endpoint';
    const data = { name: 'Test' };
    await fetcher(endpoint, { data });
    expect(window.fetch).toHaveBeenCalledWith(`${process.env.API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });

  test('should handle unauthorized error if status code is 401', async () => {
    const endpoint = 'test-endpoint';
    window.fetch.mockResolvedValueOnce({
      status: 401,
      json: jest.fn().mockResolvedValueOnce({ error: 'Unauthorized' }),
    });
    await expect(fetcher(endpoint)).rejects.toEqual({ error: 'Unauthorized' });
  });

  test('should return data if response is ok', async () => {
    const endpoint = 'test-endpoint';
    const data = { name: 'Test' };
    window.fetch.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce(data),
    });
    const result = await fetcher(endpoint);
    expect(result).toEqual(data);
  });

  test('should reject with error data if response is not ok', async () => {
    const endpoint = 'test-endpoint';
    const error = { message: 'Error' };
    window.fetch.mockResolvedValueOnce({
      status: 400,
      json: jest.fn().mockResolvedValueOnce(error),
    });
    await expect(fetcher(endpoint)).rejects.toEqual(error);
  });
});

import { rest, server } from '@/mocks/server';
import { fetcher } from '@/utils/api-client';

describe('fetcher function', () => {
  const endpoint = 'test-endpoint';
  const data = { testData: 'test' };
  const mockResponse = { testResponse: 'test' };

  describe('method 테스트', () => {
    it('method가 주어지지 않으면 GET 요청을 만듭니다', async () => {
      server.use(
        rest.get(
          `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
          (_, res, ctx) => {
            return res(ctx.json(mockResponse));
          },
        ),
      );

      const result = await fetcher(endpoint);

      expect(result).toEqual(mockResponse);
    });

    it('GET method가 주어지면 GET 요청을 만듭니다', async () => {
      server.use(
        rest.get(
          `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
          (_, res, ctx) => {
            return res(ctx.json(mockResponse));
          },
        ),
      );

      const result = await fetcher(endpoint, { method: 'GET' });

      expect(result).toEqual(mockResponse);
    });

    it('POST method가 주어지면 POST 요청을 만듭니다', async () => {
      server.use(
        rest.post(
          `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
          (_, res, ctx) => {
            return res(ctx.json(mockResponse));
          },
        ),
      );

      const result = await fetcher(endpoint, { method: 'POST', data });

      expect(result).toEqual(mockResponse);
    });

    it('PUT method가 주어지면 PUT 요청을 만듭니다', async () => {
      server.use(
        rest.put(
          `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
          (_, res, ctx) => {
            return res(ctx.json(mockResponse));
          },
        ),
      );

      const result = await fetcher(endpoint, { method: 'PUT', data });

      expect(result).toEqual(mockResponse);
    });

    it('PATCH method가 주어지면 PATCH 요청을 만듭니다', async () => {
      server.use(
        rest.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
          (_, res, ctx) => {
            return res(ctx.json(mockResponse));
          },
        ),
      );

      const result = await fetcher(endpoint, { method: 'PATCH', data });

      expect(result).toEqual(mockResponse);
    });

    it('DELETE method가 주어지면 DELETE 요청을 만듭니다', async () => {
      server.use(
        rest.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
          (_, res, ctx) => {
            return res(ctx.json(mockResponse));
          },
        ),
      );

      const result = await fetcher(endpoint, { method: 'DELETE' });

      expect(result).toEqual(mockResponse);
    });
  });

  it('응답이 ok가 아니라면 Error data와 함께 promise를 reject합니다', async () => {
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
        (_, res, ctx) => {
          return res(ctx.status(400), ctx.json({ message: 'Error occurred' }));
        },
      ),
    );

    await expect(fetcher(endpoint)).rejects.toEqual({
      message: 'Error occurred',
    });
  });
});

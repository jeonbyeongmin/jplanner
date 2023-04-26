interface EndpointOptions {
  data?: Record<string, unknown>;
}

export async function fetcher(
  endpoint: string,
  { method, data, ...customConfig }: EndpointOptions & RequestInit = {
    method: 'GET',
  },
) {
  const headers: RequestInit['headers'] = {};

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    headers['Content-Type'] = 'application/json';
  }

  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    ...customConfig,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
      config,
    );

    const data = await response.json();

    return response.ok ? data : Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

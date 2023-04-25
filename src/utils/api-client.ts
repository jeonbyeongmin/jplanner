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

  if (data) {
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

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

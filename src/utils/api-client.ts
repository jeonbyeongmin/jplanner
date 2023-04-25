interface EndpointOptions {
  data?: Record<string, unknown>;
}

export async function fetcher(
  endpoint: string,
  { data, ...customConfig }: EndpointOptions & RequestInit = {},
) {
  const headers: RequestInit['headers'] = {};

  if (data) {
    headers['Content-Type'] = 'application/json';
  }

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers,
    ...customConfig,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
      config,
    );

    if (response.status === 401) {
      // handle unauthorized error
    }

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

type QueryParamsType = {
  [key: string]: string;
};

type PathGeneratorParams<T extends QueryParamsType> = {
  id?: string;
  queries?: T;
};

type PathGenerator<T extends QueryParamsType> = (
  params?: PathGeneratorParams<T>,
) => string;

export function createPathGenerator<T extends QueryParamsType>(
  resourceName: string,
): PathGenerator<T> {
  if (!resourceName) {
    throw new Error('resourceName이 주어지지 않았습니다');
  }

  return (params) => {
    const { id, queries } = params ?? {};
    let path = id ? `${resourceName}/${id}` : resourceName;

    if (queries) {
      const queryParams = new URLSearchParams();
      Object.entries(queries).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
      path += `?${queryParams.toString()}`;
    }

    return path;
  };
}

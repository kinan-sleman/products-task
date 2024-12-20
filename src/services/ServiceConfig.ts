export const method = {
  POST: "POST" as const,
  GET: "GET" as const,
  PUT: "PUT" as const,
  DELETE: "DELETE" as const,
  PATCH: "PATCH" as const,
};

export const toJsonStr = (val: unknown): string => JSON.stringify(val);

export const makeRequest = async <T>(
  endpoint: string,
  methodType: string,
  body?: Record<string, unknown> | FormData,
  useFormEncoded = false
): Promise<T> => {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (useFormEncoded) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let requestBody: string | URLSearchParams | FormData | undefined;

  if (useFormEncoded) {
    const formEncodedBody = new URLSearchParams();
    for (const key in body as Record<string, string>) {
      formEncodedBody.append(key, (body as Record<string, string>)[key]);
    }
    requestBody = formEncodedBody;
  } else if (body instanceof FormData) {
    requestBody = body;
  } else {
    requestBody = toJsonStr(body);
  }

  const response = await fetch("https://dummyjson.com" + endpoint, {
    method: methodType,
    headers,
    body: requestBody || null,
  });

  if (!response.ok) {
    console.error(response, "error");
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const formDataRequest = async <T>(
  endpoint: string,
  methodType: string,
  body: FormData
): Promise<T> => {
  const response = await fetch("https://dummyjson.com" + endpoint, {
    method: methodType,
    body: body || null,
  });

  if (!response.ok) {
    console.error(response, "error");
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

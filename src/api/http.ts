export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
  const token = getAccessToken();

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${baseUrl}${path}`, { ...options, headers });

  // Vi hanterar 401/403 senare via UI, men här kan vi kasta “signaler”
  if (res.status === 401) throw new Error("401");
  if (res.status === 403) throw new Error("403");

  return res;
}

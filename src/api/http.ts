export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function redirectTo(path: string) {
  window.location.href = path;
}


export async function apiFetch(path: string, options: RequestInit = {}) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
  const token = getAccessToken();

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${baseUrl}${path}`, { ...options, headers });

 if (res.status === 401) {
  // Clear auth so app does not think you're logged in
  localStorage.removeItem("accessToken");
  localStorage.removeItem("roles");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");

  redirectTo("/login");
  throw new Error("401");
}

if (res.status === 403) {
  redirectTo("/forbidden");
  throw new Error("403");
}


  return res;
}

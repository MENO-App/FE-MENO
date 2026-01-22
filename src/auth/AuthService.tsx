import { apiFetch } from "../api/http";

export type LoginResponse = {
  accessToken: string;
  userId: string;
  email: string;
  roles: string[];
};

export async function login(email: string, password: string) {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    // backend can return ProblemDetails or message 
    throw new Error(String(res.status));
  }

  const data = (await res.json()) as LoginResponse;

  // save token + user info + roles
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("email", data.email);
  localStorage.setItem("roles", JSON.stringify(data.roles));

  return data;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("roles");
}

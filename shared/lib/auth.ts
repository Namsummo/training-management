// Lightweight auth helpers that read token/user from localStorage.
// Keep these simple so they can be reused across client code.

export function getApiToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("api_token");
}

export function getApiUser(): any | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("api_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getApiToken() && !!getApiUser();
}

export function clearAuth(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("api_token");
    localStorage.removeItem("api_user");
  } catch (e) {
    // ignore
  }
}

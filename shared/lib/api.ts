import { getApiToken } from "./auth";

// Resolve token: prefer runtime localStorage token, fall back to env variable.
export function resolveToken(): string | null {
  const t = typeof window !== "undefined" ? getApiToken() : null;
  if (t) return t;
  return process.env.NEXT_PUBLIC_API_TOKEN || null;
}

// Build headers for API requests. Accepts a contentType override.
export function authHeaders(contentType = "application/json") {
  const headers: Record<string, string> = {
    "Content-Type": contentType,
  };
  const token = resolveToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

// Normalize API values to UI display keys
export function mapPhysicalIntensity(raw?: string | null): string | null {
  if (!raw) return null;
  const v = String(raw).toLowerCase();
  if (v.startsWith("low")) return "Low";
  if (v.startsWith("medium")) return "Medium";
  if (v.startsWith("high")) return "High";
  // fallback: capitalize
  return v.charAt(0).toUpperCase() + v.slice(1);
}

export function mapTechnicalDifficulty(raw?: string | null): string | null {
  if (!raw) return null;
  const v = String(raw).toLowerCase();
  if (v.startsWith("easy")) return "Easy";
  if (v.startsWith("moderate")) return "Moderate";
  if (v.startsWith("difficult") || v.startsWith("hard")) return "Difficult";
  return v.charAt(0).toUpperCase() + v.slice(1);
}
// Centralized placeholder for future API calls
export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

// authFetch: convenience wrapper that attaches auth headers and returns parsed JSON.
export async function authFetch<T = any>(url: string, init: RequestInit = {}): Promise<T> {
  const headers = authHeaders((init.headers && (init.headers as Record<string, string>)["Content-Type"]) || "application/json");
  init.headers = {
    ...(init.headers || {}),
    ...headers,
  };
  const res = await fetch(url, init);
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(`Request failed: ${res.status}`) as any;
    err.status = res.status;
    err.payload = json;
    throw err;
  }
  return json as T;
}

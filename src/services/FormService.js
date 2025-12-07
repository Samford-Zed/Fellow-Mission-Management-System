import { API_URL } from "../api";

export async function submitForm(data) {
  const res = await fetch(`${API_URL}/auth/fill-form`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}

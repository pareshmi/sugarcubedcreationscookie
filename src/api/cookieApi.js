// src/api/cookieApi.js

const API_BASE_URL = "http://localhost:8080/api/v1/cookies";

// Get all cookies
export async function fetchCookies() {
  const response = await fetch(API_BASE_URL);
  return await response.json();
}

// Add a new cookie
export async function createCookie(cookie) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cookie),
  });
  return await response.text();
}

// Delete a cookie by ID
export async function deleteCookieById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return await response.text();
}

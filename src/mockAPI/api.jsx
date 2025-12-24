const API_URL = "https://6945530aed253f51719afe95.mockapi.io/project/users";

// Get user by email
export const getUserByEmail = async (email) => {
  const res = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);

  if (res.status === 404) return null;          // ← new
  if (!res.ok) throw new Error('Failed to fetch users');

  const data = await res.json();                // always an array from MockAPI
  return data.length ? data[0] : null;
};

// Create new user
export const createUser = async (user) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  return res.json();
};

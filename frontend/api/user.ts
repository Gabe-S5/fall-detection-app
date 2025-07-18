const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const userLogin = async (token: string, userLogin: { email: string }) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userLogin),
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  return res.json();
};

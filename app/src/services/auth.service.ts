const API_BASE_URL = import.meta.env.VITE_API_URL; // URL de ton API définie dans .env

export const signin = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token); // Stocke le token
    return data.access_token;
  } catch (error) {
    console.error("Signin error:", error.message);
    return null;
  }
};

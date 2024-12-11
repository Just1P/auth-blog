const API_BASE_URL = import.meta.env.VITE_API_URL;

export const signin = async (
  username: string,
  password: string
): Promise<string | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Signin error:", error.message || "Unknown error");
      return null;
    }

    const data = await response.json();
    let accessToken = data.access_token;

    if (accessToken) {
      accessToken = accessToken.trim().replace(/^"|"$/g, "");
      localStorage.setItem("access_token", accessToken);
      return accessToken;
    } else {
      console.error("Signin response missing access_token");
      return null;
    }
  } catch (error) {
    console.error("Signin error:", error);
    return null;
  }
};

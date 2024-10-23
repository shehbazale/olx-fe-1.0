interface userPayload {
  email: string;
  password: string;
}

export const userLogin = async (payload: userPayload) => {
  const { email, password } = payload;

  const response = await fetch("http://localhost:3001/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.log("Login message", errorData);
    throw new Error(errorData || "Failed to login");
  }
  const data = response.json();
  return data;
};

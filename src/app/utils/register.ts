interface infoUser {
  name: string;
  email: string;
  password: string;
}

const UserRegister = async (userInfo: infoUser) => {
  const { name, email, password } = userInfo;
  const response = await fetch("http://localhost:3001/users/addUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();

    console.error("Register message", errorData);
    throw new Error(errorData.message || "Failed to Register");
  }
  const data = response.json();
  return data;
};

export default UserRegister;

let endpoint = "http://localhost:8080/api/site"

export async function login(formData) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: new URLSearchParams(formData),
    });

    if (!response.ok) {
      throw new Error("Invalid login credentials");
    }

    const { user, token } = await response.json();

    // Store token in localStorage
    localStorage.setItem("token", token);

    // I need the role of the user
    return user.role;

  } catch (error) {
    console.error("Error retrieving login data:", error.message);
    throw error;
  }
}

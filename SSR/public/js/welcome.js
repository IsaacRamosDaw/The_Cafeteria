const endPoint = "http://localhost:8080/api/site/logintest";

async function handleForm(e) {
  e.preventDefault();

  const formData = {
    username: e.target.username.value,
    password: e.target.password.value,
  };

  console.log("Form Data:", formData);

  try {
    const user = await logInWelcome(formData);
    console.log("User:", user);
  } catch (error) {
    console.error("Error:", error.message);
  }
  console.log("Redirigiendo a /admin...");
  window.location.href = "/admin";
}

async function logInWelcome(formData) {
  const response = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  console.log("Response status: ", response.status);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Invalid login credentials");
  }

  
  const user = await response.json()
  console.log("User from welcome js: ", user)

  return user
}

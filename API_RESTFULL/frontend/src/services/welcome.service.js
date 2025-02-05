let endpoint = "http://localhost:8080/api/site";

export async function login(formData) {
  let AUTH_CODE = btoa(`${formData.username}:${formData.password}`)

  const response = await fetch(endpoint, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization" : `Basic ${AUTH_CODE}`}),
  });

  if (!response.ok || response === null ) {
    throw new Error("Invalid login credentials");
  }

  const { user, token } = await response.json();

  // Store token in localStorage
  localStorage.setItem("token", token);

  // I need the role of the user
  return user;
}

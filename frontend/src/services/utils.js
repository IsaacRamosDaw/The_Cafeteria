export function getUserRole() {
  const token = localStorage.getItem("token"); // O de tu estado de autenticación
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(base64Payload));
    return decodedPayload.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function getUserId(){
  const token = localStorage.getItem("token"); // O de tu estado de autenticación
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(base64Payload));
    return decodedPayload.id
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
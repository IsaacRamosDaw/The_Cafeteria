const endpoint = "http://localhost:8080/api/categories";

export async function get() {

  const getOperation = await fetch(endpoint, { method: "GET", })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(`error catch, ${e.message} e without message ${e}`);
      return e;
    });
  return getOperation;
}

// In progress
export async function remove(id) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const removeOperation = fetch(`${endpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete this category");
      }

      return res.json();
    })
    .catch((error) => {
      console.log(`errordsafadsfsda, ${error}`);
      return error;
    });
  return removeOperation;
}
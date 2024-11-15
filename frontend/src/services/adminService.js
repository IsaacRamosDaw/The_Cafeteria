const endpoint = "http://localhost:8080/api/admin";

// export async function login(username, password) {
//   try {
//     const response = await fetch(`${endpoint}/signin`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//       throw new Error("Login failed");
//     }

//     const data = await response.json();
//     localStorage.setItem("token", data.token); // Save token
//     return data;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// }

// function getAuthHeaders() {
//   const token = localStorage.getItem("token");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }


// export function get() {
//   return fetch(endpoint, {
//     headers: getAuthHeaders(),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error fetching data");
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.log(`error, ${error}`);
//       return error;
//     });
// }

export function get() {
  const getOperation = fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(`error, ${error}`);
      return error;
    });
  return getOperation;
}

// export function getOne(id) {
//   return fetch(`${endpoint}/${id}`, {
//     headers: getAuthHeaders(),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error fetching data");
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.log(`error, ${error}`);
//       return error;
//     });
// }

export function getOne(id) {
  const getOneOperation = fetch(`${endpoint}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(`error, ${error}`);
      return error;
    });
  return getOneOperation;
}

export async function create(formData) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while retrieving admin data:", error);
      throw error;
    });
}


export async function remove(id) {
  const removeOperation = fetch(`${endpoint}/${id}`, {
    method: "DELETE",
    // headers: getAuthHeaders(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }

      return response.json();
    })
    .catch((error) => {
      console.log(`error, ${error}`);
      return error;
    });
  return removeOperation;
}

export async function edit(id, data) {
  let url = `${endpoint}/${id}`

  return fetch(url, {
    method: "PUT",
    headers: {
      // ...getAuthHeaders(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      return response.json();
    })
    .catch((error) => {
      console.error("Error while updating admin data:", error);
      throw error;
    });
}

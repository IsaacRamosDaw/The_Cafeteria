const endpoint = "http://localhost:8080/api/admin";

export function get() {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const getOperation = fetch(endpoint, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  })
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

export function getOne(id) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const getOneOperation = fetch(`${endpoint}/${id}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  })
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
  const username = formData.get("username");
  const password = formData.get("password");

  formData.delete("username");
  formData.delete("password");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error in the request");
    }

    const user = await response.json();
    console.log("User created:", user.admin);

    return user;
  } catch (error) {
    console.error("Error while retrieving admin data:", error);
    throw error;
  }
}

export async function remove(id) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const removeOperation = fetch(`${endpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
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
  console.log(id, data);
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error("Error in the request");
    }

    const user = await response.json();
    console.log("User created:", user.admin);

    return user;
  } catch (error) {
    console.error("Error while retrieving admin data:", error);
    throw error;
  }
}

export async function editImg(id, data) {
  try {
    let token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/error";
      return;
    }

    let url = `${endpoint}/upload/${id}`;

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("file", data.file);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData, // Pasar directamente el objeto FormData
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const updatedData = await response.json(); // Resolviendo la promesa de la respuesta
    console.log("Imagen actualizada:", updatedData);

    return updatedData; // Retornar los datos actualizados
  } catch (error) {
    console.error("Error while updating admin data:", error);
    throw error;
  }
}

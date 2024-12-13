const endpoint = "http://localhost:8080/api/worker";

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
      // "Content-Type": "application/x-www-form-urlencoded",
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
  return fetch(endpoint, {
    method: "POST",
    headers:   new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': `Basic ${btoa( formData.username + ':' + formData.password)}`,
    }),
    body: new URLSearchParams(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in the request");
      }

      return response.json();
    })
    .catch((error) => {
      console.error("Error while retrieving worker data:", error);
      throw error;
    });
}

export async function remove(id) {
  let token = localStorage.getItem("token")

  if(!token){
    window.location.href='/error'
  }
  const removeOperation = fetch(`${endpoint}/${id}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete worker");
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
  let token = localStorage.getItem("token")

  if(!token){
    window.location.href='/error'
  }

  // let url = `${endpoint}/${id}`;

  return fetch(`${endpoint}/${id}`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in the request");
      }

      return response.json();
    })
    .catch((error) => {
      console.error("Error while updating admin data:", error);
      throw error;
    });
}

export async function updateProfilePicture(id, data) {

  try {
    let token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/error";
      return; // Asegúrate de detener la ejecución si no hay token
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
      throw new Error("Error in the reques");
    }

    const updatedData = await response.json(); // Resolviendo la promesa de la respuesta
    console.log("Imagen actualizada:", updatedData);

    return updatedData; // Retornar los datos actualizados
  } catch (error) {
    console.error("Error while updating profile picture:", error);
    throw error;
  }
}

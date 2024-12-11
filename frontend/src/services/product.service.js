const endpoint = "http://localhost:8080/api/products";

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

export function findByPk(id) {
  // let token = localStorage.getItem("token");

  // if (!token) {
  //   window.location.href = "/error";
  // }

  const getOneOperation = fetch(`${endpoint}/${id}`, {
    method: "GET",
    headers: new Headers({
      // Authorization: `Bearer ${token}`,
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


export function getByCategory(idCategory) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const getOperation = fetch(`${endpoint}/categories/${idCategory}`, {
    method: "GET",
    headers: new Headers({
      // Authorization: `Bearer ${token}`,
      // Accept: "application/json",
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


export async function countByCategory(idCategory) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
    return 0;
  }

  try {
    const response = await fetch(`${endpoint}/count/${idCategory}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });

    if (!response.ok) {
      throw new Error("Error al obtener el conteo");
    }

    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    console.error("Error en countByCategory:", error);
    return 0;
  }
}


export async function remove(id) {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}


export async function edit(id, updatedProductData) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error"; // Redirigir si no hay token
  }

  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "PUT", // Método PUT para editar
      headers: new Headers({
        Authorization: `Bearer ${token}`, // Incluir el token en los headers
        "Content-Type": "application/json", // Enviar JSON como cuerpo de la solicitud
      }),
      body: JSON.stringify(updatedProductData), // El cuerpo es el producto actualizado
    });

    if (!response.ok) {
      throw new Error("Error al editar el producto");
    }

    return await response.json(); // Devolver los datos del producto editado
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error;
  }
}

export function create(formData) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/error";
  }

  return fetch(endpoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name: formData.name }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while retrieving course data:", error);
      throw error;
    });
}

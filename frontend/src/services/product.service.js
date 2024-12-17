const endpoint = "http://localhost:8080/api/products";

export async function get() {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const getOperation =await fetch(endpoint, {
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


export function getByCategory(idCategory) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const getOperation = fetch(`${endpoint}/categories/${idCategory}`, {
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


export function getFirstByCategory(idCategory) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const getOperation = fetch(`${endpoint}/category/${idCategory}`, {
    method: "GET",
    headers: new Headers({
      Accept: "application/json",
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
    // return 0;
  }

  try {
    const response = await fetch(`${endpoint}/count/${idCategory}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });

    if (!response.ok) {
      throw new Error("Error with count");
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
      throw new Error("Error of delete product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error of delete product:", error);
    throw error;
  }
}


export async function edit(id, updatedProductData) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "PUT", 
      headers: new Headers({
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json", 
      }),
      body: JSON.stringify(updatedProductData), 
    });

    if (!response.ok) {
      throw new Error("Error of edit product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error of edit product:", error);
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
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in the request");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while retrieving course data:", error);
      throw error;
    });
}

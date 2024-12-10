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
  

const endpoint = "http://localhost:8080/api/coffeShop";

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

export function create(formData) {

  return fetch(endpoint, {
    method: "POST",
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: new URLSearchParams(formData).toString(), 
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in the request");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while retrieving admin data:", error);
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

  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  return fetch(`${endpoint}/${id}`, {
    method: "PUT",
    headers: new Headers({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: new URLSearchParams(data).toString()
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

export async function editImg(id, data) {
    try {
      let token = localStorage.getItem("token");
  
      if (!token) {
        window.location.href = "/error";
        return;
      }
  
      let url = `${endpoint}/upload/${id}`;
  
      const formData = new FormData();
      formData.append("file", data);
  
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Error in the request");
      }
  
      const updatedData = await response.json();
      console.log("Imagen actualizada:", updatedData);
  
      return updatedData;
    } catch (error) {
      console.error("Error while updating admin data:", error);
      throw error;
    }
  }
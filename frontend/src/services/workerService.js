const endpoint = "http://localhost:8080/api/worker";

export function get() {
  const getOperation = fetch(endpoint).then((res) => {
    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    return res.json();
  }).catch((err) => {
    console.log(`error, ${err}`);
    return err;
  })
  return getOperation;
}

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
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      return response.json();
    })
    .catch((error) => {
      console.error("Error while retrieving worker data:", error);
      throw error;
    });
}

export async function remove(id) {
  const removeOperation = fetch(`${endpoint}/${id}`, {
    method: "DELETE",
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
  let url = `${endpoint}/${id}`;

  return fetch(url, {
    method: "PUT",
    headers: {
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
      console.error("Error while updating worker data:", error);
      throw error;
    });
}
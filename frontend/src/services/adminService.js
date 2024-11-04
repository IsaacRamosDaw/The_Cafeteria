const endpoint = "http://localhost:8080/api/admin";

export async function get() {
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

export function create(formData) {
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // "Content-Type": "multipart/form-data",
    },
    body: new URLSearchParams(formData),
  })
    .then((response) => {
      return response.json();
    })
    .error((error) => {
      return `Error while retrieving admin data, ${error}`;
    });
}

// No lo cambies a delete porque delete es una palabra reservada de js
export async function remove(id) {
  const removeOperation = fetch(`${endpoint}/${id}`, {
    method: "DELETE",
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

export function edit(id){
    let url = endpoint+"/"+id

    console.log(url)
}

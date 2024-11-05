const endpoint = "http://localhost:8080/api/worker";

export async function get() {
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

export function create(formData) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return `Error while retrieving worker data, ${error}`;
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

export function edit(id) {
  let url = endpoint + "/" + id;

  console.log(url);
}
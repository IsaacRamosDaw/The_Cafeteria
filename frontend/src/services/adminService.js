const endpoint = "http://localhost:8080/api/admin";

export function get(){
    return fetch(endpoint).then((response) => {
        return response.json()
    }).error((error) => {
        return error
    })
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

// export function update(){
//     let url = endpoint+"/"
//     fetch(endpoint)
// }


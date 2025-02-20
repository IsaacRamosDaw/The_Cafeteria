const endpoint = "http://localhost:8080/api/student";

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

// export function create(formData) {
//   const bodyData = new URLSearchParams({
//     ...formData,
//     role: 'student',
//   });

//   return fetch(endpoint, {
//     method: "POST",
//     headers: new Headers({
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': `Basic ${btoa(formData.username + ':' + formData.password)}`,
//     }),
//     body: bodyData, 
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error in the request");
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.error("Error while retrieving admin data:", error);
//       throw error;
//     });
// }

export function create(formData) {
  const bodyData = JSON.stringify({
    ...formData,
    role: 'student',
  });

  return fetch("http://localhost:8080/api/student", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', // Cambiado a JSON
      'Authorization': `Basic ${btoa(formData.username + ':' + formData.password)}`,
    },
    body: bodyData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in the request");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while retrieving student data:", error);
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

export async function updateProfilePicture(id, file) {

  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const formData = new FormData();
  formData.append("file", file);

  return fetch(`${endpoint}/upload/${id}`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in the request");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while updating profile picture:", error);
      throw error;
    });
}

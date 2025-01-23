const endpoint = "http://localhost:8080/api/categories";

export async function get() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/error";
  }

  const getOperation = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(`error catch, ${e.message} e without message ${e}`);
      return e;
    });
  return getOperation;
}

// In progress
export async function remove(id) {
  
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/error";
  }

  console.log(id);
  const removeOperation = await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete this category");
      }

      return res.json();
    })
    .catch((err) => {
      // console.log(`errordsafadsfsda, ${id} variable`);
      console.log(`errordsafadsfsda, ${err}`);
      console.log(`errordsafadsfsda, ${err.message}`);
      return err;
    });
  return removeOperation;
}

export function create(formData) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/error";
  }

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: formData.name }),
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

export async function edit(id, updatedCategoryData) {
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
      body: JSON.stringify(updatedCategoryData),
    });

    if (!response.ok) {
      throw new Error("Error of edit category");
    }

    return await response.json();
  } catch (error) {
    console.error("Error of edit product:", error);
    throw error;
  }
}

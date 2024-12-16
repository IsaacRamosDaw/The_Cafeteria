const endpoint = "http://localhost:8080/api/orders";

export async function create(idProduct, idUser, price) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const orderData = {
    ProductId: idProduct,
    StudentId: idUser,
    price: price,
  }

  const getOperation = await fetch(endpoint, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: new URLSearchParams(orderData).toString()
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error creating order, product didnt found");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(`error catch este:, ${e.message}`);
      return e;
    });
  return getOperation;
};

export async function get() {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const getOperation = await fetch(endpoint, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(`error catch, ${e.message}`);
      return e;
    });
  return getOperation;
}

export async function findOne(id) {
  const getOperation = await fetch(endpoint, { method: "GET", }, { where: { id: id } })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(`error catch, ${e.message}`);
      return e;
    });
  return getOperation;
}

export async function getByStudent(id) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const getOperation = await fetch(`${endpoint}/student/${id}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(`error catch, ${e.message}`);
      return e;
    });
  return getOperation;
}

export async function remove(id) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const idObject = {
    id: id
  }
  
  const getOperation = await fetch(endpoint, { method: "DELETE", 
      headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: new URLSearchParams(idObject).toString()
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(`error catch, ${e.message}`);
      return e;
    });

  return getOperation;
}
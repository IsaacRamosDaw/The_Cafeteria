const endpoint = "http://localhost:8080/api/orders";

export async function create(idProduct, idUser, price) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/err1or";
  }

  console.log("idproduct:", idProduct,"iduser: ", idUser, "price: ", price)

  const orderData = {
    ProductId: idProduct,
    StudentId: idUser,
    price: price,
  }
  // console.log("error en order service: ", new URLSearchParams(orderData).toString());

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
  const getOperation = await fetch(`${endpoint}/${id}`, { method: "DELETE", })
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
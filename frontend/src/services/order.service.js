const endpoint = "http://localhost:8080/api/orders";

export async function create(idProduct, idUser) {
  const getOperation = await fetch(`${endpoint}/${idProduct}/${idUser}`, { method: "POST", })
    .then((res) => {
      if (!res.ok) {
        console.log("llegue aqui")
        throw new Error("Error creating order, product didnt found");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(`error catch, ${e.message}`);
      return e;
    });
  return getOperation;
};

export async function get() {
  const getOperation = await fetch(endpoint, { method: "GET", })
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
  const getOperation = await fetch(endpoint, { method: "GET", }, {where: { id: id}})
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
  const getOperation = await fetch(`${endpoint}/student/${id}`, { method: "GET", })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching dataaaaaa");
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
        throw new Error("Error fetching dataaaaaa");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(`error catch, ${e.message}`);
      return e;
    });
  return getOperation;
}
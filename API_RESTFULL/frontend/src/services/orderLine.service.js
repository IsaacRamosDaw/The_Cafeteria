import axios from "axios";

const endpoint = "http://localhost:8080/api/orderLine";

async function request(method, url, data = null) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/error";
  }

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": method === "post" ? "application/x-www-form-urlencoded" : "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `(OrderLine.service-${method}) Error: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      console.error(`(OrderLine.service-${method}) No hubo respuesta del servidor`);
    } else {
      console.error(`(OrderLine.service-${method}) Error: ${error.message}`);
    }
    throw error;
  }
}

export async function create(quantity, unitPrice, orderId, productId) {
  const data = new URLSearchParams({
    quantity,
    unitPrice,
    orderId,
    productId,
  }).toString();

  const result = await request("post", endpoint, data);
  console.log("(OrderLine.service-create) Resultado:", result);
  return result;
}

export async function getAll() {
  const result = await request("get", endpoint);
  console.log("(OrderLine.service-getAll) Resultado:", result);
  return result;
}

export async function getByOrder(orderId) {
  const result = await request("get", `${endpoint}/orders/${orderId}`);
  console.log("(OrderLine.service-getByOrder) Resultado:", result);
  return result;
}

export async function getOne(id) {
  const result = await request("get", `${endpoint}/${id}`);
  console.log("(OrderLine.service-getOne) Resultado:", result);
  return result;
}

export async function remove(id) {
  const result = await request("delete", `${endpoint}/${id}`);
  console.log("(OrderLine.service-remove) Resultado:", result);
  return result;
}

export async function removeByOrder(id) {
  const result = await request("delete", `${endpoint}/lines/${id}`);
  console.log("(OrderLine.service-remove) Resultado:", result);
  return result;
}
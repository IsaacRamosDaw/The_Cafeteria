import axios from "axios";
import { getUserId } from "./utils";

const endpoint = "http://localhost:8080/api/orders";

async function request(method, url, data = null) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/error";
  }
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    // Solo configura Content-Type para POST, PUT
    if (["post", "put"].includes(method)) {
      headers["Content-Type"] = "application/x-www-form-urlencoded"; // Usa JSON para estas solicitudes
    }

    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;

  } catch (error) {
    if (error.response) {
      console.error(
        `(Orders.service-${method}) Error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`
      );
    } else if (error.request) {
      console.error(`(Orders.service-${method}) No hubo respuesta del servidor`);
    } else {
      console.error(`(Orders.service-${method}) Error: ${error.message}`);
    }
    throw error;
  }
}

export async function create(date, studentId) {
  const orderData = new URLSearchParams({
    date,
    studentId,
  }).toString();

  const result = await request("post", endpoint, orderData);
  console.log("(Orders.service-create) Resultado:", result);
  return result;
}

export async function finishOrder(orderId) {
  const result = await request("put", `${endpoint}/finish/${orderId}`);
  console.log("(Orders.service-finishOrder) Resultado:", result);
  return result;
}

export async function get() {
  const result = await request("get", endpoint);
  console.log("(Orders.service-get) Resultado:", result);
  return result;
}

export async function findOne(id) {
  const result = await request("get", `${endpoint}/${id}`);
  console.log("(Orders.service-findOne) Resultado:", result);
  return result;
}

export async function getByStudent(id) {
  const result = await request("get", `${endpoint}/student/${id}`);
  console.log("(Orders.service-getByStudent) Resultado:", result);
  return result;
}

export async function remove(id) {
  const result = await request("delete", `${endpoint}/${id}`);
  console.log("(Orders.service-remove) Resultado:", result);
  return result;
}
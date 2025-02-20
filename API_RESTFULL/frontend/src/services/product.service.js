import axios from "axios";
const endpoint = "http://localhost:8080/api/products";

async function request(method, url, data, type) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error(`(Products.service-${method}) No token`);
    return null;
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (type == 1) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else if (type == 2) {
      // let formData = new FormData()
      // formData.append('name', data.name)
      // headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
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
        `(Products.service-${method}) Error: ${
          error.response.status
        } - ${JSON.stringify(error.response.data)}`
      );
    } else if (error.request) {
      console.error(
        `(Products.service-${method}) No hubo respuesta del servidor`
      );
    } else {
      console.error(`(Products.service-${method}) Error: ${error.message}`);
    }
    throw error;
  }
}

export async function create(formData) {
  try {
    return await request("POST", endpoint, formData, 2);
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function get() {
  try {
    return await request("GET", endpoint, null);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function edit(id, updatedProductData) {
  try {
    return await request("PUT", `${endpoint}/${id}`, updatedProductData, 2);
  } catch (error) {
    console.error(`Error editing product with ID ${id}:`, error);
    throw error;
  }
}

export async function remove(id) {
  try {
    return await request("DELETE", `${endpoint}/${id}`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
}

export async function findByPk(id) {
  try {
    return await request("GET", `${endpoint}/${id}`, null);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}

export async function getByCategory(idCategory) {
  try {
    return await request(
      "GET",
      `${endpoint}/categories/${idCategory}`,
      null
    );
  } catch (error) {
    console.error(`Error fetching products for category ${idCategory}:`, error);
    throw error;
  }
}

export async function getFirstByCategory(idCategory) {
  try {
    return await request(
      "GET",
      `${endpoint}/category/${idCategory}`,
    );
  } catch (error) {
    console.error(
      `Error fetching first product for category ${idCategory}:`,
      error
    );
    throw error;
  }
}

export async function countByCategory(idCategory) {
  try {
    const response = await request(
      "GET",
      `${endpoint}/count/${idCategory}`,
    );
    return response.count || 0;
  } catch (error) {
    console.error(`Error counting products for category ${idCategory}:`, error);
    return 0;
  }
}

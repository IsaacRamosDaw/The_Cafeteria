const endpoint = `http://localhost:8080/api/student/wallet`

export function getWallet(token, id) {
  
    const getOperation = fetch(`${endpoint}/${id}`, {
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
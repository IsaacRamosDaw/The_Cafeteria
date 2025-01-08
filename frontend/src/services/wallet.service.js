const endpoint = 'http://localhost:8080/api/wallet'

export function getWallet(userId) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const getOperation = fetch(`${endpoint}/${userId}`, {
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
    .catch((err) => {
      console.log(`error,:`, err);
      return err;
    });
  return getOperation;
}

export function addCredits(userId, amount) {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/error";
  }

  const creditsIncrement = {
    studentId: parseInt(userId),
    amount: parseFloat(amount),
  }


  const addOperation = fetch(`${endpoint}/increase`, {
    method: "PUT",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: new URLSearchParams(creditsIncrement).toString()
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error adding credits");
      }
      return res.json();

    })
    .catch((err) => {
      console.log(`error, ${err}`);
      return err;
    });
    
  return addOperation;
}
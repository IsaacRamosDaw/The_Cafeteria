const db = require("../models");
const Wallet = db.wallet;

exports.create = (req, res, wallet, /*studentId*/) => {
  if(!req.body.ammount) {
    res.status(400).send({
      message: "There is no ammount",
    });
    return;
  }

  // NO SÉ QUE HACER /PREGUNTAR
  //2
  Wallet.create(wallet).then((data) => {

  })
};

exports.update = (req, res, cuantity) => {
  const id = req.params.id;

  if(Number(id) !== req.user.id){
      return res.status(403).send({
      message: "Access denied. You can only update your own data.", 
    })
  }

  const updateWallet = {
    // preguntar
    ammount: req.user.ammount + cuantity,
  }

  Wallet.update(updateWallet, { where: { id: id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).send({
          message: `Cannot update wallet, not found.`,
        });
      }
      res.send({ message: "wallet was updated successfully." });
    })
    .catch((err) => {
      // Catch any error
      res.status(500).send({
        message:"An error occurred while updating the wallet." || err.message,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (req.user.role !== "admin" || Number(id) !== req.user.id) {
    return res.status(403).send({
      message: "Access denied. You can only delete your own data.",
    });
  }

  Wallet.destroy({ where: { id: id } })
    .then((deleted) => {
      if (deleted) {
        console.log("wallet was deleted.");
        res.json({ message: "wallet deleted successfully." });

      } else {
        console.log("That wallet wasnt found.");
        res.status(404).json({ message: "wallet not found." });
      }

    }).catch((err) => {
      console.error("Error deleting wallet:", err);
      res.status(500).json({ message: "Error deleting wallet." });
    });
};
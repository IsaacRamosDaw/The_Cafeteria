const db = require("../models");
const Wallet = db.wallet;

exports.findOne = (req, res) => {
  const student_id = Number(req.params.id);

  if (!student_id) {
    return res.status(403).json({
      message: "Error while getting this student wallet",
    });
  }

  Wallet.findOne({ where: { StudentId: student_id } })
    .then((wallet) => {
      if (!wallet) {
        return res.status(404).json({
          message: `order with id=${id} not found`,
        });
      }

      res.send(wallet)
    });
};
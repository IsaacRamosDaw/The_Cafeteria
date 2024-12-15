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
          message: `Wallet with id=${id} not found`,
        });
      }

      res.send(wallet)
    }).catch(err => res.status(500).json({
      message: "Some error while retrieving the wallet of this student: " || err.message
    })
    );
};

exports.addCredits = (req, res) => {
  const studentId = req.body.studentId
  const amount = req.body.amount;
  // const walletId = req.body.id;

  if (!studentId) {
    return res.status(403).json({
      message: "Error geting student id",
    });
  }
  if (!amount) {
    return res.status(400).send({
      message: "Select one amount to increase",
    });
  }

  // if (studentId !== studentIdWallet) {
  //   return res.status(400).send({
  //     message: "You only can update your own wallet",
  //   });
  // }

  Wallet.increment('amount', { by: amount, where: { StudentId: studentId } })
    .then((wallet) => {
      if (!wallet) {
        return res.status(404).json({
          message: `Wallet not found`,
        });
      }
      res.send(wallet)
    });
};

exports.substractCredits = (req, res) => {
  const walletId = req.body.id;
  const amount = req.body.amount;

  if (!walletId) {
    return res.status(403).json({
      message: "Error while getting this wallet id",
    });
  }
  if (!amount) {
    return res.status(400).send({
      message: "Select one amount to increase",
    });
  }

  Wallet.decrement('amount', { by: amount, where: { id: walletId } })
    .then((wallet) => {
      if (!wallet) {
        return res.status(404).json({
          message: `Order with id=${walletId} not found`,
        });
      }
      res.send(wallet)
    });
};
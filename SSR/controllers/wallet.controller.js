//!TO CHECK
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
          message: `Wallet from student with id: ${student_id} not found`,
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

  Wallet.increment('amount', { by: amount, where: { StudentId: studentId } })
    .then((wallet) => {
      if (!wallet) {
        return res.status(404).json({
          message: `Wallet not found`,
        });
      }
      res.status(201).json({
        message: "Wallet incremented",
        wallet: wallet,
      })
    });

};

// exports.subtractCredits = (req, res) => {
//   const studentId = req.body.studentId
//   const amount = req.body.amount;

//   if (!studentId) {
//     return res.status(403).json({
//       message: "Error geting student id",
//     });
//   }
//   if (!amount) {
//     return res.status(400).send({
//       message: "Select one amount to increase",
//     });
//   }

  
// };

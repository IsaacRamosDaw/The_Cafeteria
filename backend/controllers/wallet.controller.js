const db = require("../models");
const Wallet = db.wallet;
// const Student = db.student;

exports.findOne = (req, res) => {
  const student_id = req.params.id;


  if (!student_id) {
    return res.status(403).json({
      message: "Error while getting this student wallet",
    });
  }

  // REVISAR
  // Student.findOne({ where: { id: student_id }, include: 'wallet' })
  //   .then((student) => res.status(201).json({
  //     wallet: student.wallet,
  //     message: "This is the wallet you requested for",
  //   }))


  Wallet.findOne({ where: { StudentId: student_id } })
    .then((wallet) => res.status(201).json({
      wallet: wallet,
      message: "This is the wallet you requested for",
    }))
};
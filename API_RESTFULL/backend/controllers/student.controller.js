const db = require("../models");
const Student = db.student;
const Wallet = db.wallet;
const utils = require("../utils");
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
	
	if (!req.body.password || !req.body.username) {
		return res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	let studentData = {
		username: req.body.username,
		password: req.body.password,
		age: parseInt(req.body.age),
		phone: req.body.phone,
		courseId: req.body.CourseId,
		role: "student",
		filename: req.file ? req.file.filename : "",
	};

	console.log("Datos en el frontend ", studentData );


	Student.findOne({ where: { username: studentData.username } })
		.then((student) => {
			if (student) {
				const result = bcrypt.compareSync(req.body.password, student.password);
				if (!result) return res.status(401).send("Password not valid!");
				const token = utils.generateToken(student);
				const studentObj = utils.getCleanUser(student);

				return res.json({ student: studentObj, access_token: token });
			}

			studentData.password = bcrypt.hashSync(req.body.password);

			Student.create(studentData)
				.then((student) => {
					const token = utils.generateToken(student);
					const studentObj = utils.getCleanUser(student);

					const walletData = {
						amount: 50,
						StudentId: student.id,
					}

					Wallet.create(walletData)
						.then((wallet) => {
							res.status(201).json({
								message: "Student and wallet added created succesfully",
								student: studentObj,
								CourseId: student.CourseId,
								token: token,
								wallet: wallet,
							})
						})
						.catch(err => res.status(500).json({
							message: "Some error while creating the wallet of this student: " || err.message
						})
						)
				})
				.catch((err) => {
					res.status(500).send({
						message: "Some error while creating the student: " || err.message,
					})
				})
		}
		)
		.catch((err) => {
			res.status(500).send({
				message:
					"Some error while retrieving the tutorials the student: " || err.message,
			});
		});
};

exports.findAll = (req, res) => {
	if (!req.user) {
		return res.status(403).json({
			message: "Access denied. Authentication required.",
		});
	}

	if (req.user.role == "admin" || req.user.role == "worker") {
		Student.findAll()
			.then((data) => {
				delete data.password
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message:
						err.message || "Some error occurred while retrieving students.",
				});
			});
	} else if (req.user.role == "student") {
		Student.findByPk(req.user.id)
			.then((data) => {
				if (!data) {
					return res.status(404).json({
						message: "Student not found",
					});
				}
				delete data.password
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message:
						err.message || "Some error occurred while retrieving student.",
				});
			});
	} else {
		res.status(403).json({
			message: "Access denied. Invalid role.",
		});
	}
};

exports.findOne = (req, res) => {
	const id = Number(req.params.id);

	if (!req.user) {
		return res.status(403).json({
			message: "Access denied. Authentication required.",
		});
	}

	if (req.user.role === "admin" || id === req.user.id || req.user.role === "worker") {
		Student.findByPk(id)
			.then((data) => {
				if (!data) {
					return res.status(404).json({
						message: `Student with id=${id} not found.`,
					});
				}
				// Delete the password in the get
				delete data.password
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || `Error retrieving student with id=${id}.`,
				});
			});
	} else {
		res.status(403).json({ message: "Access denied. You can only access your own data." });
	}
};

exports.create = (req, res) => {
	
	if (!req.body.password || !req.body.username) {
		return res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// if (req.body.username.length < 5) {
	// 	return res.status(400).send({
	// 		message: "The username must have at least 5 characters.",
	// 	});
	// }

	// if (req.body.password.length < 4) {
	// 	return res.status(400).send({
	// 		message: "The password must have at least 4 characters.",
	// 	});
	// }

	// if (req.body.age && isNaN(req.body.age)) {
	// 	return res.status(400).send({
	// 		message: "Age must be a valid number.",
	// 	});
	// }

	// if (req.body.phone && req.body.phone.length < 10) {
	// 	return res.status(400).send({
	// 		message: "The phone number must have at least 10 characters.",
	// 	});
	// }

	let studentData = {
		username: req.body.username,
		password: req.body.password,
		age: parseInt(req.body.age),
		phone: req.body.phone,
		CourseId: req.body.CourseId,
		role: "student",
		filename: req.file ? req.file.filename : "",
	};

	Student.findOne({ where: { username: studentData.username } })
		.then((student) => {
			if (student) {
				const result = bcrypt.compareSync(req.body.password, student.password);
				if (!result) return res.status(401).send("Password not valid!");
				const token = utils.generateToken(student);
				const studentObj = utils.getCleanUser(student);

				return res.json({ student: studentObj, access_token: token });
			}

			studentData.password = bcrypt.hashSync(req.body.password);

			Student.create(studentData)
				.then((student) => {
					const token = utils.generateToken(student);
					const studentObj = utils.getCleanUser(student);

					const walletData = {
						amount: 50,
						StudentId: student.id,
					}

					Wallet.create(walletData)
						.then((wallet) => {
							res.status(201).json({
								message: "Student and wallet added created succesfully",
								student: studentObj,
								CourseId: student.CourseId,
								token: token,
								wallet: wallet,
							})
						})
						.catch(err => res.status(500).json({
							message: "Some error while creating the wallet of this student: " || err.message
						})
						)
				})
				.catch((err) => {
					res.status(500).send({
						message: "Some error while creating the student: " || err.message,
					})
				})
		}
		)
		.catch((err) => {
			res.status(500).send({
				message:
					"Some error while retrieving the tutorials the student: " || err.message,
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	if (req.user.role !== "admin" && Number(id) !== req.user.id) {
		return res.status(403).send({
			message: "Access denied. You can only update your own data.",
		});
	}

	// if (!req.body.username || req.body.username.length < 5) {
	// 	return res.status(400).send({
	// 		message: "The username must have at least 5 characters.",
	// 	});
	// }

	// if (!req.body.password || req.body.password.length < 4) {
	// 	return res.status(400).send({
	// 		message: "The password must have at least 4 characters.",
	// 	});
	// }

	// if (req.body.age && isNaN(req.body.age)) {
	// 	return res.status(400).send({
	// 		message: "Age must be a valid number.",
	// 	});
	// }

	// if (req.body.phone && req.body.phone.length < 10) {
	// 	return res.status(400).send({
	// 		message: "The phone number must have at least 10 characters.",
	// 	});
	// }

	const updateStudent = {
		username: req.body.username,
		age: req.body.age,
		phone: req.body.phone,
		role: "student",
		CourseId: req.body.CourseId,
		filename: req.file ? req.file.filename : "",
	};

	if (req.body.password) {
		updateStudent.password = bcrypt.hashSync(req.body.password);
	}

	Student.update(updateStudent, { where: { id: id } })
		.then(([rowsUpdated]) => {
			if (rowsUpdated === 0) {
				return res.status(404).send({
					message: `Cannot update Student with id=${id}. Student not found.`,
				});
			}
			res.send({ message: "Student was updated successfully." });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "An error occurred while updating the Student.",
			});
		});
};


exports.imgUpdate = (req, res) => {
	const id = req.params.id;

	console.log(req.user);

	if (
		!(
			req.user.role == "admin" ||
			(req.user.role == "student" && Number(id) == req.user.id)
		)
	) {
		return res.status(403).send({
			message: "Access denied. You can only update your own data.",
		});
	}

	const updateStudent = {
		filename: req.file ? req.file.filename : "",
	};

	Student.update(updateStudent, { where: { id: id } })
		.then(([rowsUpdated]) => {
			if (rowsUpdated === 0) {
				// If no rows were updated, the student was not found
				return res.status(404).send({
					message: `Cannot update Student with id=${id}. Student not found.`,
				});
			}
			res.send({ message: "Student was updated successfully." });
		})
		.catch((err) => {
			// Catch any error
			res.status(500).send({
				message: err.message || "An error occurred while updating the Student.",
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	if (req.user.role !== "admin" && Number(id) !== req.user.id) {
		return res.status(403).send({
			message: "Access denied. You can only delete your own data.",
		});
	}

	// Delete a Student by ID
	Student.destroy({ where: { id: id } })
		.then((deleted) => {
			if (deleted) {
				console.log("Student with id:", id, "was deleted.");
				res.json({ message: "Student deleted successfully." });
			} else {
				console.log("Student with id:", id, "was not found.");
				res.status(404).json({ message: "Student not found." });
			}
		})
		.catch((err) => {
			console.error("Error deleting student:", err);
			res.status(500).json({ message: "Error deleting student." });
		});
};

// Find user by username and password
exports.findUserByUsernameAndPassword = (req, res) => {
	const { username, password } = req.body;

	Student.findOne({ where: { username } })
		.then((student) => {
			if (!student) {
				return res.status(404).send({ message: "User not found." });
			}

			if (req.user.role !== "admin" && req.user.id !== student.id) {
				return res.status(403).send({
					message: "Access denied. You can only view your own data.",
				});
			}

			const isMatch = bcrypt.compareSync(password, student.password);
			if (!isMatch) {
				return res.status(401).send({ message: "Invalid credentials." });
			}

			res.send(student);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving the user.",
			});
		});
};

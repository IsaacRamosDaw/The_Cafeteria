const { where } = require("sequelize");
const db = require("../models");
const Admin = db.admins;
const Op = db.sequelize.Op;
const utils = require("../utils");
const bcrypt = require('bcryptjs');
const userModel = require("../../../Ej/Ionic8NodeAuthBasic/backend/models/user.model");

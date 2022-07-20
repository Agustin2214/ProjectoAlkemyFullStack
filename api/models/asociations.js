const User = require("../models/user")
const Atm = require("../models/atm")



User.hasMany(Atm)

Atm.belongsTo(User)
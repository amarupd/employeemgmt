const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require('../config/empConfig')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})
sequelize.authenticate()
    .then(() => {
        console.log("database is connected");
    })
    .catch((err) => {
        console.log("error :-" + err);
    })
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.employeeForm = require('./empModel')(sequelize, DataTypes)
db.employeeRelation = require('./relationModel')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync done');
    })
db.employeeForm.hasMany(db.employeeRelation, { foreignKey: 'empId' });
db.employeeRelation.belongsTo(db.employeeForm, { foreignKey: 'empId' });

module.exports = db
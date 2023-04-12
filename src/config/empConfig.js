module.exports={
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'amar',
    DB: 'employeeDetails',
    DIALECT: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
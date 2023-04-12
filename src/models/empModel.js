module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define("employeeForm", {
        empId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        employeeFullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        job_Title: {
            type: DataTypes.STRING,
            allowNull: false
            
        },
        phone_Number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Registration;
}

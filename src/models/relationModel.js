module.exports = (sequelize, DataTypes) => {
    const relation = sequelize.define("relations_of_employee", {
        empId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employeeForms',
                key: "empId",
              }
        },
        primaryReln_Emergency_Contact:{
            type: DataTypes.STRING,
            allowNull: false
        },
        primaryReln_phone_Number:{
            type: DataTypes.STRING,
            allowNull: false
        },
        primaryReln_relationship:{
            type: DataTypes.STRING,
            allowNull: false
        },
        secondaryReln_Emergency_Contact:{
            type: DataTypes.STRING,
            allowNull: true
        },
        secondaryReln_phone_Number:{
            type: DataTypes.STRING,
            allowNull: true
        },
        secondaryReln_relationship:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return relation;
}

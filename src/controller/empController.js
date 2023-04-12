const db = require("../models")
const addUser = db.employeeForm;
const addUserRelation = db.employeeRelation;
const { Op } = require('sequelize');
const Joi = require('joi')

/********************************************************************************************** */


//applying validation on the entries entered by the user

const adduser = async (req, res) => {
    const signupSchema = Joi.object().keys({
        employeeFullName: Joi.string().required(),
        job_Title: Joi.string().required(),
        phone_Number: Joi.string().length(10).required(),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        primaryReln_Emergency_Contact: Joi.string().required(),
        primaryReln_phone_Number: Joi.string().length(10).required(),
        primaryReln_relationship: Joi.string().required(),
        secondaryReln_Emergency_Contact: Joi.string(),
        secondaryReln_phone_Number: Joi.string().length(10),
        secondaryReln_relationship: Joi.string()
    })
    const { error, value } = signupSchema.validate(req.body)
    if (error) {
        console.log(error);
        return res.json(error.details)
    }

    const mob = req.body.phone_Number
    const emAil = req.body.email
    const count_user = await addUser.count({              // checking condition for duplicates
        where: {
            [Op.or]: [
                { phone_Number: `${mob}` },
                { email: `${emAil}` }
            ]
        }
    })
    if (count_user) {
        return res.status(400).json({ message: 'employee already registered' })
    }
    try {
        let info = {
            employeeFullName: req.body.employeeFullName,
            job_Title: req.body.job_Title,
            phone_Number: req.body.phone_Number,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state
        }
        const employee = await addUser.create(info);

        console.log(employee.empId);
        const eId = parseInt(employee.empId);
        let relationInfo = {
            empId: eId,
            primaryReln_Emergency_Contact: req.body.primaryReln_Emergency_Contact,
            primaryReln_phone_Number: req.body.primaryReln_phone_Number,
            primaryReln_relationship: req.body.primaryReln_relationship,
            secondaryReln_Emergency_Contact: req.body.secondaryReln_Emergency_Contact,
            secondaryReln_phone_Number: req.body.secondaryReln_phone_Number,
            secondaryReln_relationship: req.body.secondaryReln_relationship
        }
        if (employee.empId) {
            const emplrel = await addUserRelation.create(relationInfo);
            console.log(emplrel);
            return res.status(201).json({ employee, emplrel });
        }
        return res.status(201).json({ employee, emplrel });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

}

// getting all the employee details by id from the database

const details = async (req, res) => {
    const empId=req.body.empId
    
    let employees = await addUser.findOne({
        where: {
            empId: empId
        },
        include: [
            {
                model: addUserRelation,
                attributes: [
                    "primaryReln_Emergency_Contact",
                    "primaryReln_phone_Number",
                    "primaryReln_relationship",
                    "secondaryReln_Emergency_Contact",
                    "secondaryReln_phone_Number",
                    "secondaryReln_relationship"]
            }
        ]
    });
    return res.status(200).json(employees)
}

//getting all the employees from the database

const allDetails = async (req, res) => {
    
    let employees = await addUser.findAll({
        include: [
            {
                model: addUserRelation,
                attributes: [
                    "primaryReln_Emergency_Contact",
                    "primaryReln_phone_Number",
                    "primaryReln_relationship",
                    "secondaryReln_Emergency_Contact",
                    "secondaryReln_phone_Number",
                    "secondaryReln_relationship"]
            }
        ]
    });
    res.status(200).json(employees)
}

const updateUser = async (req, res) => {
    const signupSchema = Joi.object().keys({
        employeeFullName: Joi.string(),
        job_Title: Joi.string(),
        phone_Number: Joi.string().length(10),
        email: Joi.string().email(),
        address: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        primaryReln_Emergency_Contact: Joi.string(),
        primaryReln_phone_Number: Joi.string().length(10),
        primaryReln_relationship: Joi.string(),
        secondaryReln_Emergency_Contact: Joi.string(),
        secondaryReln_phone_Number: Joi.string().length(10),
        secondaryReln_relationship: Joi.string(),
        empId:Joi.number()
    })
    const { error, value } = signupSchema.validate(req.body)
    if (error) {
        console.log(error);
        return res.json(error.details)
    }

    const empId=req.body.empId
    const mob = req.body.phone_Number
    const emAil = req.body.email
    const count_user = await addUser.count({              // checking condition for duplicates
        where: {
            [Op.or]: [
                { phone_Number: `${mob}` },
                { email: `${emAil}` }
            ]
        }
    })
    if (count_user) {
        return res.status(400).json({ message: 'number or email already registered' })
    }
    try {
        const employee = await addUser.update( req.body ,
        { where: { empId: empId } });
        const eId = empId
        
            const emplrel = await addUserRelation.update(req.body,{ where:{empId:empId}});
            
            return res.status(201).json({message:'user updated succesfully'});
        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

}

const deleteUser=async(req,res)=>{
    const empId=req.body.empId
    try{
        const employee = await addUser.destroy({
            where: { empId: empId }
        });
        return res.status(201).json({message:'user deleted succesfully'});
    }catch(err){
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    adduser,
    details,
    allDetails,
    updateUser,
    deleteUser
}
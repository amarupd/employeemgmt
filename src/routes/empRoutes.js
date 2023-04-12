const empController=require('../controller/empController')

const router=require('express').Router()

router.post("/employee",empController.adduser)

router.get("/employeebyid",empController.details)

router.get("/employee",empController.allDetails)

router.put("/employee",empController.updateUser)

router.delete("/employee",empController.deleteUser)

module.exports=router;
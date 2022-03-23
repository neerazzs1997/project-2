const CollegeModel = require("../models/CollegeModel")
const InternModel = require("../models/InternModel")
const InterModel= require("../models/InternModel")


 const createintern= async function (req, res) {
      
      try {
        let data= req.body
        let ClgData = req.body.collegeId
        let name = req.body.name
        let mobile = req.body.mobile
        let email = req.body.email

   
        if(!name){
            return res.status(400).send({status:false, msg:"please provide name or data"})
        }
        if(!mobile){
            return res.status(400).send({status:false, msg:"please provide a mobile number"})
        }
        if(!email){
            return res.status(400).send({status:false, msg:"please provide a email"})
        }
        if(!ClgData){
            return res.status(400).send({status:false, msg:"please provide a ClgData"})
        }


        const findCollege = await CollegeModel.findById(ClgData)
        if(!findCollege){
            return res.status(400).send({status:false, msg:"please provide a collegeId"})
        }

        

        const changeEmail = await InternModel.findOne({email:email})
        if(changeEmail){
          return res.status(400).send({status:false,msg:"please enter another email"})
        }

        const ChangeNumber = await InternModel.findOne({mobile:mobile})
        if(ChangeNumber){
          return res.status(400).send({status:false,msg:"please enter another mobile number"})
        }

        if(!findCollege){
            return res.status(400).send({status:false, msg:"please provide a collegeId"})
        }

   
        // if(!(/^([+]\d{2})?\d{10}$/.test(mobile))){
        //   return res.status(400).send({status:false, msg:"please provide a valid number"})
        // }

        if(data){
            const CollegeCreate = await InterModel.create(data)
            return res.status(201).send({status:true, data:CollegeCreate})
    
        }else{
            return res.status(400).send({status:false, msg:"data invalid"})
        }
      } catch (error) {
          return res.status(500).send({status:false,msg:"need some improvement"})
      }
    
}




  const getcollegedetail = async function (req, res) {
    try {
      // let result = {}
      let interns = []
      let name = req.query.name
  
      if (!name)
        return res.status(400).send({ status: false, msg:"Please Provide college name" })
  
  
      let CollegeDetail = await CollegeModel.findOne({ name: name })
      if (!CollegeDetail)
        res.status(400).send({ status: false, msg:"College not Found" })
  
      let InternDetails = await InternModel.find({ collegeId: CollegeDetail._id })
      if (!InternDetails) {
        res.status(400).send({ status: false, msg: "please provide intern details" })
      }
      let ClgData = {
        name: CollegeDetail.name,
        fullName: CollegeDetail.fullName,
        logoLink: CollegeDetail.logoLink
      }
      for (let i = 0; i < InternDetails.length; i++) {
        result = {
          _id:InternDetails[i]._id,
          name: InternDetails[i].name,
          email: InternDetails[i].email,
          mobile: InternDetails[i].mobile
        }
        interns.push(result)
      }
      ClgData["interests"] = interns
      console.log(ClgData)
      res.status(200).send({ status: true, data: ClgData })
    }
    catch (error) {
      console.log(error)
      res.status(500).send({ status: false, msg: error.message })
    }
  };
     

    
  module.exports.createintern = createintern;
  module.exports.getcollegedetail = getcollegedetail;


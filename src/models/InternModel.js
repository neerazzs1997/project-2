const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const validator = require("validator")

const internschema = new mongoose.Schema( {
    name:{
        type:String,
        required:true
    },
    email:{
       type:String,
       required:true,
       unique:true
},
    mobile: {
        type: Number,
        unique: true,
        required: true,
        // match: [/^([+]\d{2})?\d{10}$/, "please fill a valid mobile Number"],
        minlength:10,
        maxlength:10

    },

    collegeId: {
        type: ObjectId,
        required: true,
        ref: 'college'
    },
    
    isDeleted: {
        type: Boolean,
        default:false
       
    },
  
   
}, { timestamps: true });

module.exports = mongoose.model('intern', internschema)



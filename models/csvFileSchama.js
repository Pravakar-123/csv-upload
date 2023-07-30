const mongoose=require('mongoose');

const fileSchama=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    }
},{
    timeStamp:true
})


const csvFile=mongoose.model('csvFile',fileSchama);

module.exports=csvFile;
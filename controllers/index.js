const path = require("path");
const fs=require('fs');
const csv=require('csvtojson');
const resumePath = path.join("../uploads/");
const csvFile = require('../models/csvFileSchama');
console.log(resumePath);
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now();
//         cb(null, file.fieldname + "-" + uniqueSuffix + ".js");
//     },
// });

// const upload = multer({
//     storage: storage
// }).single("file");

module.exports.home = function (req, res) {
    csvFile.find({}).then((result) => {
        return res.render('home', {
            result: result

        });

    }).catch((err) => {
        console.log("Error to find file", err);
        return;
    })

}

module.exports.fileUpload = async function (req, res) {
    console.log(req.file);
    if(req.file.mimetype==='text/csv'){
        console.log("This is csv file");
    }
    // upload(req, res, async function (err) {
    //     if (err instanceof multer.MulterError) {
    //         // A Multer error occurred when uploading.
    //         console.log(err.code);
    //         return res.send(err.code);
    //     }
    //     else if (err) {
    //         // An unknown error occurred when uploading.
    //         console.log(err);
    //         console.log(2);
    //         return res.send(err.message);
    //     }
        
    //         // const jobid = req.query.jobid;
    //         console.log(req.file);
    //         var csvfile = new csvFile({
    //             name: req.file.originalname,
    //             destination: req.file.filename
    //         })
    //         try {
    //            let ans= await csvfile.save();
    //            console.log(ans);
              
                
    //         } catch (error) {
    //             console.log("Error to save date in data base",err);
    //             return res.send(err);
                
    //         }
            
           
           

      

    // });
    

    // // csvfile.save().then((result) => {
    // //     console.log("Hello i am salaj mondal");
    // //     return res.redirect('.');
    // // }).catch((err) => {
    // //     console.log("Error in file upload", err);
    // //     // return res.redirect('/');
    // // })
    // return res.send("File Uploaded");
    return res.redirect('.');

    

}


module.exports.delete = function (req, res) {
    csvFile.findById(req.params.destination).then((result) => {
        console.log(result);
        const p = path.join(resumePath,result.destination);

        try {
            console.log(p);
            fs.unlinkSync(p)
            //file removed
            csvFile.findByIdAndDelete(result.id).then((ans)=>{
                res.redirect('/')
            }).catch((err)=>{
                return console.error(err);
            })
            
        } catch (err) {
            console.error(err)
        }

    }).catch((err) => {
        console.log("Error to find file", err);
        return res.send(err.message);
    })
    // console.log(req.params.destination);
    // return;
}

module.exports.openFile=function(req,res){
    csvFile.findById(req.params.id).then((ans)=>{
        console.log(ans);
        const pathToRead=path.join(resumePath,ans.destination);
        csv().fromFile(pathToRead).then((result)=>{
            console.log(result);
            console.log(Object.keys(result[0]));
            let keys=Object.keys(result[0])
            return res.render('table',{result:result,
                keys:keys});
        }).catch((err)=>{
            console.log("error to convert csv to json",err);
            return res.send(err);
        })


    }).catch((err)=>{
        console.log("Error to find data from db",err);
        return res.send(err);
    })
    
  
  
}



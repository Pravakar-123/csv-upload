const express=require('express');
const router=express.Router();
const index=require('../controllers/index.js');
router.get('/',index.home);
router.post('/upload-file',index.fileUpload);
router.get('/delete/:destination',index.delete);
router.get('/open-file/:id',index.openFile);


module.exports=router;
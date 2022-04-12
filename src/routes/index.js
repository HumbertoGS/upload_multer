const { Router } = require('express');
const router = Router();

//Rutas
router.get('/', (req, res)=>{
    res.render('index');
});

router.post('/upload', (req, res)=>{
    if(req.file){
        console.log(req.file);
        res.render('okey');
    }
    else{
        console.log('No imagen');
        res.redirect('/');
    }
    
});

module.exports = router;
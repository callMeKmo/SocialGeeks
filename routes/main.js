// imports

const express = require('express')
const router = express.Router()

//home request route

router.get('/',(req,res)=>{
    res.render('home')
})

//export route

module.exports = router
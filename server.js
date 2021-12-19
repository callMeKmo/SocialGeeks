// configration enviroment variables

if (process.env.NODE_ENV !== 'production'){
    if (process.env.NODE_ENV !== 'development'){
        require('dotenv').config()
        console.log("Enviroment status: Local")
    } else {
        console.log("Enviroment status: development")
    }
}else {
    console.log('Enviroment status: Production')
}

//node modules

const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const bodyparser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http')
const mongoose = require('mongoose')
const app = express()
const server = http.createServer(app)

// webapp routes

const mainRoute = require('./routes/main')

// express app configration

app.set("view engine", "ejs")
app.set("views", __dirname + "/webApp")
app.set("layout", "layouts/main")
app.use(expressEjsLayouts)
app.use(bodyparser.urlencoded({limit: '10mb', extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(methodOverride("_override"))
app.use(express.static('public'))
app.use(bodyparser.json({type: 'application/json'}))
app.use(bodyparser.json({type: 'application/csp-report'}))

app.use( (req,res,next)=>{
    res.setHeader("Content-Security-Policy", 'report-uri /csp/send')
    next()
})

// connecting to database (NoSql mongodb server)

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const database = mongoose.connection

database.on('error',err=>{
    console.log(err)
})

database.once('open',()=>{
    console.log("Database status: Running")
})

// app routes

app.use('/',mainRoute)


//hosting server

server.listen(
    process.env.PORT || 3000,
    console.log('Server status: Running')
)

server.on('error',err=>{
    console.log(err)
})
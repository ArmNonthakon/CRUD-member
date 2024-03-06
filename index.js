const express = require('express')
const app = express()
const router = require('./router/myRouter')
app.use(express.json());
 
app.use(express.urlencoded({ extended: true }));

app.use(router)

app.listen(3000,()=>{
    console.log('start server in port in 3000')
})
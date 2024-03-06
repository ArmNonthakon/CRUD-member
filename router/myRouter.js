const exprss = require('express')
const router = exprss.Router()
const path = require('path')
const index = path.join(__dirname, '../src/index.html')
const url = require('url')
let mysql = require('mysql')
let connection = mysql.createConnection({
    host: "localhost",
    port: '3306',
    user: "root",
    password: "Ninjaarm-2003",
    database: "test"
});
connection.connect((err) => {
    if (err) return console.error(err.message);

    console.log('Connected to the MySQL server.');
});


router.get('/', (req, res) => {
    res.status(200)
    res.sendFile(index)

})

router.get('/member', (req, res) => {

    const { pathname, query } = url.parse(req.url, true);

    if (query.id == undefined) {
        connection.query("SELECT * FROM Persons", function (err, result, fields) {
            if (err) return console.error(err.message);
            console.log('Respond all members.')
            res.send(result)


        });
    }
    else {
        connection.query(`SELECT * FROM Persons where PersonId = '${query.id}'`, function (err, result, fields) {
            if (err) return console.error(err.message);
            console.log(`Respond members where id = ${query.id}.`)
            res.send(result[0])
        });
    }

})
router.post('/member',(req,res)=>{
    const { pathname, query } = url.parse(req.url, true);
    const date = new Date();
    const newId = date.getTime()
    connection.query(`insert into Persons value('${newId}','${req.body.LastName}','${req.body.FirstName}','${req.body.Address}','${req.body.City}');`,function(err,result,fields){
        if (err) throw err;
        connection.query(`SELECT * FROM Persons where PersonId = '${newId}'`, function (err, result, fields) {
            if (err) return console.error(err.message);
            res.send(result[0])
            res.status(200)
        });
    })
    
    
})
router.put('/member',(req,res)=>{
    const { pathname, query } = url.parse(req.url, true);
    connection.query(`UPDATE Persons SET LastName = '${req.body.LastName}',FirstName = '${req.body.FirstName}'  WHERE PersonID = '${query.id}';`,function(err,result,fields){
        if (err) return console.error(err.message);
        connection.query(`SELECT * FROM Persons where PersonId = '${query.id}'`, function (err, result, fields) {
            if (err) return console.error(err.message);
            res.send(result[0])
            res.status(200)
        });
    })
    
    
})
router.delete('/member',(req,res)=>{
    const { pathname, query } = url.parse(req.url, true);
    connection.query(`DELETE FROM Persons  WHERE PersonID = '${query.id}';`,function(err,result,fields){
        if (err) return console.error(err.message);
        res.send(`Delete member id: ${query.id}`)
        
    })
    
    
})



module.exports = router

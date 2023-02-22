const express = require('express');
const app = express();
var mysql = require('./main').con;

app.set("view engine", "hbs");
app.set("views", "./view");

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/add", (req, res) => {
    res.render("add")
})
app.get("/adding", (req, res) => {
    //fetch data from form
    const { Name, addr, contact, gender } = req.query;
    console.log(Name, addr, contact, gender);
    //sanitization XSS............
    let qry = "SELECT * FROM myDetail WHERE Contact=?"
    mysql.query(qry, [contact], (err, results) => {
        if (err) throw err;
        else {
            if (results.length > 0) {
                res.render("add", {checkMsg: true})
            }
            else {
                let qry2 = "INSERT INTO myDetail (Name, Address, Contact, Gender) VALUES(?,?,?,?)";
                mysql.query(qry2, [Name, addr, contact, gender], (err, result) => {
                    if(result.affectedRows > 0){
                        res.render("add", {checkMsg: true})
                    }
                })
            }
        }
    })
})
app.listen(8000, (err) => {
    if (err) throw err;
    else console.log("Running in the port........................");
})













// const emitter = require('events').EventEmitter;
// var em = new emitter;

// em.addListener('FirstEvent',(data)=>{
//     console.log('First Subscriber:' + data);
// })
// em.addListener('SecondEvent',(data)=>{
//     console.log('Second Subscriber:' + data);
// })
// em.emit('FirstEvent','This is me');

// em.emit('SecondEvent','This is you');
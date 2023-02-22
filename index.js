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
app.get("/delete", (req, res) => {
    res.render("remove")
})


//*********************** Add data to Databse **************************//
app.get("/read", (req, res) => {
    let qry = "SELECT * FROM myDetail"
    mysql.query(qry, (err, result) => {
        if (err) throw err;
        else{
            res.render("read", {data: result});
        }
    })
})




//*********************** Add data to Databse **************************//
app.get("/adding", (req, res) => {
    //fetch data from form
    const { Name, addr, contact, gender } = req.query;
    //sanitization XSS............
    let qry = "SELECT * FROM myDetail WHERE Contact=?"
    mysql.query(qry, [contact], (err, results) => {
        if (err) throw err;
        else {
            if (results.length > 0) {
                // res.send(results);
                res.render("add", { checkMsg: true })
            }
            else {
                let qry2 = "INSERT INTO myDetail (Name, Address, Contact, Gender) VALUES(?,?,?,?)";
                mysql.query(qry2, [Name, addr, contact, gender], (err, result) => {
                    if (result.affectedRows > 0) {
                        res.render("add", { successMsg: true })
                    }
                })
            }
        }
    })
})



//*********************** Add data to Databse **************************//
app.get("/remove", (req, res) => {
    const { Name, contact } = req.query;
    let qry = "SELECT * FROM myDetail WHERE Contact=? and Name=?"
    mysql.query(qry, [contact, Name], (err, result) => {
        if (err) throw err;
        else {
            if (result.length > 0) {
                let qry2 = "DELETE FROM myDetail WHERE Contact=? and Name=?"
                mysql.query(qry2, [contact, Name], (err, result) => {
                    if (err) throw err;
                    else {
                        res.render("remove", { successDelete: true })
                    }
                })
            } else {
                res.render("remove", { dataNotFound: true })
            }
        }
    })
})



app.listen(8000, (err) => {
    if (err) throw err;
    else console.log("Running in the port........................");
})
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "rahul",
    password: "password123",
    database: "myDb",
    port: "3306"
})
con.connect((err) => {
    if (err) throw err;
    else {
        console.log("Connection Created.............")
    }
})

// con.query("SELECT * FROM myDetail",(err, result)=>{
//     if(err) throw err;
// })


module.exports.con = con;
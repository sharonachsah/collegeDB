const express =require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'justforfun',
    database : 'college'
});

db.connect((err) => {
    if(err) throw err;
    console.log("MySQL is Connected...");
});


const app = express();
 
app.get('/getstdata/:data', (req,res) => {
    let sql = `SELECT s.student_id, s.student_name, s.student_class, s.result, s.remark, d.dept_name, d.dept_head FROM student s, department d WHERE s.course_id = d.dept_id AND s.student_name = + '${req.params.data}'`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.listen('3306', () => {
    console.log("Server is listening on port 3306...");
});



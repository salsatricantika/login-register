const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(express.json());

// koneksi ke database mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'log-regDB'
});

// implementasi cors
app.use(cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true
})
);

// implementasikan body-parser
app.use(bodyparser.urlencoded({ extended: true }))

// proses register ke database disini
app.post("/register", (req, res) => {
    // mengambil data yang dikirim dari frontend
    const username = req.body.username;
    const password = req.body.password;
    const nama = req.body.nama;

    // console.log(username, password, nama);
    bcrypt.hash(password, 10, (err, hash) => {
        db.query("INSERT INTO users(username,password,nama) VALUES(?,?,?)", [username, hash, nama]);
    })
})
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "select * from users where username = ?;",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            console.log(result);
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        let token = jwt.sign(
                            { userId: result[0].id, username: result[0].username },
                            "secretkeyappearshere",
                            { expiresIn: "1h" }
                        );
                        res.send(token);
                    } else {
                        res.send({ message: "Kombinasi username/password salah!" });
                    }
                });
            } else {
                res.send({ message: "User tidak ditemukan!" });
            }
        }
    );
});

app.listen('3001', () => {
    console.log('server running!')
})
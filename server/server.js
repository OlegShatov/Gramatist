const mysql = require("mysql2");
const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

app.use(cors())
process.env.SECRET_KEY = 'secret'

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "angular",
    database: "grammatist",
    password: ""
});

// array to object
function toObject(data) {
    let object = {};
    for (var i = 0; i < data.length; ++i)
        object[i] = data[i];
    return object;
}; // array to object

// declaration of requests
app.post("/login", bodyParser.json(), function (req, res) {
    if (!req.body) return res.sendStatus(400);
    pool.execute("SELECT * FROM users WHERE email = ? AND password = ?",
        [req.body.email, req.body.password],
        function(err, data) {
            let user = toObject(data);
            if (user) {
                let token = jwt.sign(user, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                user['token'] = token;
                res.json(user)
            } else {
                res.send('User does not exist')
            }
    })
});

app.get('/lessons', (req, res) => {
    // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    pool.execute("SELECT id, name FROM lessons",function(err, data) {
        if(err) return console.log(err);

        res.send(data);
    });
})

app.get('/phrases/:id', (req, res) => {
    // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    let request_id = req.params.id;
    console.log("Id: ", request_id);
    pool.query("SELECT `lessons`.`name`, `lessonsphrase`.`phraseID`, `phrases`.`textRus`, " +
        "`phrases`.`textEng` FROM `lessonsphrase`" +
        "INNER JOIN `phrases` ON `lessonsphrase`.`phraseID` = `phrases`.`id`" +
        "INNER JOIN `lessons` ON `lessonsphrase`.`lessonID` = `lessons`.`id`" +
        "WHERE `lessons`.`id` = ? ;",[request_id], function(err, data) {
        if(err) return console.log(err);
        console.log(toObject(data));
        res.json(toObject(data));
    });
})




// начинаем прослушивать подключения на 4000 порту
app.listen(4000, function(){
    console.log("Server listening on port 4000");
});

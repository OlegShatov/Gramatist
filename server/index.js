const mysql = require("mysql2");
const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

app.use(cors())
process.env.SECRET_KEY = 'secret'

const Sequelize = require("sequelize");
const sequelize = new Sequelize("grammatist", "angular", "", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});

// declaration of table model
const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        // allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        // allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        // allowNull: false
    }
});

const Lesson = sequelize.define("lesson", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE
        // allowNull: false
    }
});

const Lessonsphrase = sequelize.define("lessonsphrase", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    lessonId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    phraseId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const Phrase = sequelize.define("phrase", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    textRus: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    textEng: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lessonId: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
})

Lesson.belongsTo(Phrase, { foreignKey: 'id', targetKey: 'lessonId'});



// declaration of requests
app.post("/login", bodyParser.json(), function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        .then(user => {
            if (user) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                user.dataValues['token'] = token;
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

app.get('/lessons', (req, res) => {
    // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    Lesson.findAll({
        raw: true
    })
        .then(lessons => {
            if (lessons) {
                res.json(lessons);
            } else {
                res.send('Lessons do not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

app.get('/phrases/:id', (req, res) => {
    // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    let request_id = req.params.id;
    let queryParams = {
        where: {id: request_id},
        include: [
            {
                model: Phrase,
                required: true
            }
        ]
    };

    Lesson.findAll(queryParams).then(res => {
        console.log(JSON.stringify(res))
    });


})


// начинаем прослушивать подключения на 4000 порту
app.listen(4000, function(){
    console.log("Server listening on port 4000");
});

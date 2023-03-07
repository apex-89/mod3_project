const express = require('express');
const path = require('path');
const logger = require('morgan');

// cross origin access 
const cors = require('cors');
const bcrypt = require('bcrypt');

// MODEL/S
const Todo = require('./models/todo');
const User = require('./models/user');

const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./config/passport-config')

require('dotenv').config();
require('./config/database');

const app = express();

// access
app.use(cors({
    origin: "*"
}));

// logs the different requests to our server
app.use(logger('dev'));

//parse stringified objects (JSON)
app.use(express.json());

initializePassport(
    passport,
    // passport tells us that they want a function that will return the correct user given an email
    async email => {
        let user = User.findOne({email: email})
        return user;
    },
    async id => {
        let user = User.findById(id);
        return user;
    },
);

app.use(session({
    secure: true,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { originalMaxAge: 3600000 }
}));
app.use(passport.session())

// server build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('/test_route', (req, res) => {
    res.send("good route!");
});

app.get('/session-info', (req, res) => {
    res.json({
        session: req.session
    });
});

app.post('/logout', (req, res) => {
    console.log("logging out")
    req.logOut(function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.json("logged out")
})

app.post('/users/signup',async (req, res) => {
    console.log(req.body);
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword);
    // use User model to place user in the database
    let userFromCollection = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword
    })
    console.log(userFromCollection);
    // sending user response after creation or login
    res.json("user created")
});

app.put('/users/login', async (req, res, next) => {
    console.log(req.body);
    // passport authentication
    passport.authenticate("local", (err, user, message) => {
        console.log(message);
        if (err) throw err;
        if (!user) {
            res.json({
                message: "login failed",
                user: false
            })
        } else {
            // delete user.password;
            req.logIn(user, err => {
                if (err) throw err;
                res.json({
                    message: "successfully authenticated",
                    // remove user
                })
            })
        }
    })(req, res, next);
})

app.post('/todos/new', async (req, res) => {
    console.log(req.session.passport.user._id)
    let todo = await Todo.create({
        user: req.session.passport.user._id,
        text: req.body.text,
    });
    res.json(todo);
});

app.get('/todos', async (req, res) => {
    let todos = await Todo.getTodos(req.session.passport.user._id);
    res.json(todos);
});

app.put('/todos/update/:id', async (req, res) => {
    let todo = await Todo.findByIdAndUpdate(req.params.id);
    todo.completed = !todo.completed;
    todo.save();
    res.json(todo);
});

app.delete('/todos/delete/:id', async (req, res) => {
    let todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});
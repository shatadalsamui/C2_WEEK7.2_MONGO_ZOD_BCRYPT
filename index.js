const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {z} = require("zod");

mongoose.connect("mongodb+srv://admin:wr5mh6M8D6FEnbbj@cluster0.ahwxs.mongodb.net/todos-shatadal")

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {

    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password : z.string().min(3).max(100),
        name : z.string().min(3).max(100),

    })

    const pasredDatawithSuccess = requiredBody.safeParse(req.body);

    if(!pasredDatawithSuccess.success){
        res.json({
            message : " Inccorrect format",
            error : pasredDatawithSuccess.error
        })
        return
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;


    const hasedPassword = await bcrypt.hash(password,10);


    await UserModel.create({
        email: email,
        password: hasedPassword,
        name: name
    });

    res.json({
        message: "You are signed up",
    })
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
    });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user && passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000);
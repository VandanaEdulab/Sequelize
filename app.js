const express = require('express');
const app = express();

require('./models/model');
const port = 8080;

var userController = require('./controllers/userController')

app.get("/", (req, res) => {
    res.send("Home Page")
})


app.get("/About", (req, res) => {
    res.send("About Page")
})

app.get("/Contactus", (req, res) => {
    res.send("Contact Us")
})



app.get("/about", (req, res) => {
    res.send("Home Page")
})


app.get("/add", userController.addUser)
app.get("/crud",userController.crudOperation)
app.get("/query",userController.QueryData)
app.get("/finder",userController.finderData)
app.get("/get-set",userController.gettersetter)
app.get("/valid",userController.Validator)
app.get("/rawquery",userController.rawQuery)
app.get("/OneToOne",userController.oneToOne)
app.get("/belongsto",userController.belongsTo)
app.get("/OneToMany",userController.onetomany)
app.get("/ManyToMany",userController.manytomany)
app.get("/ManyToMany",userController.manytomany)

app.get("/rawquery",userController.rawQuery)




app.listen(port, () => {
    console.log(`app is Listening${port}`)
})


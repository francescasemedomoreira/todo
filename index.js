// Version2
// const express = require('express');
// const app = express();
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

// dotenv.config();

// app.use('/static', express.static('public'));

// app.use(express.urlencoded({extented: true}));

// // connection to db
// mongoose.set("useFindAndModify", false);

// mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
//     console.log("Connected to db!");
    
//     app.listen(3000, () => console.log("Server Up and running"));
// });

// app.set('view engine', 'ejs');

// //models
// const TodoTask = require("./models/TodoTask");

// app.use(express.json());


// // GET METHOD
// app.get("/", (req, res) => {
//     TodoTask.find({}, (err, tasks) => {
//         res.render("pages/todolist", { todoTasks: tasks });
//     });
//     });

// app.post('/', async (req, res)=>{
//     const todoTask = new TodoTask({
//         content: req.body.content
//         });
//         try {
//             await todoTask.save();
//             res.redirect("/");
//         } catch (err) {
//             res.redirect("/");
//         }
// });

// //UPDATE
// app
//     .route("/edit/:id")
//     .get((req, res) => {
//         const id = req.params.id;
//         TodoTask.find({}, (err, tasks) => {
//             res.render("pages/todoEdit.ejs", { todoTasks: tasks, idTask: id });
//         });
//     })
//     .post((req, res) => {
//         const id = req.params.id;
//         TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
//             if (err) return res.send(500, err);
//             res.redirect("/");
//         });
//     });

// //DELETE
// app.route("/remove/:id").get((req, res) => {
//     const id = req.params.id;
//     TodoTask.findByIdAndRemove(id, err => {
//         if (err) return res.send(500, err);
//             res.redirect("/");
//     });
// });


// Version 1
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extented: false}));
app.use(session({
    secret: 'keybord cat',
    resave: false,
    saveUninitialized: true,
}));
app.use('/static', express.static('public'));

app.set('view engine', 'ejs');

//Fixtures
// const taches = [
//     // {
//     //     title: "Rendre mon projet Symfony",
//     //     terminer: false,
//     // },
//     // {
//     //     title: "Rendre mon projet Node",
//     //     terminer: true,
//     // }
// ];

app.get('/', (request, response)=>{
    if(!request.session.taches){
        request.session.taches=[];
    }
    response.render('pages/todolist', {taches: request.session.taches});
});

app.get('/tache/:id/terminer', (request, response)=>{
    if(request.session.taches[request.params.id]){
        request.session.taches[request.params.id].terminer = true;
    }
    response.redirect('/');
});

app.get('/tache/:id/supprimer', (request, response)=>{
    if(request.session.taches[request.params.id]){
        request.session.taches.splice(request.params.id, 1);    
    }
    response.redirect('/');
});

app.post('/create', (request, response) => {
    if(request.body.tache){
        request.session.taches.push({
            title: request.body.tache,
            terminer: false,
        });
    }
    response.redirect('/');
});

app.listen(port, ()=>{
    console.log(`Server lancé sur le port ${port}`);
})
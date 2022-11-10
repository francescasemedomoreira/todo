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
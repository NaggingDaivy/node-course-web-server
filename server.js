const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials') // indique l'endroit des partials
app.set('view engine', 'hbs'); // utilse hbs comme view engine pour faire des pages dynamqieus


app.use((req, res, next) => { // ce qui va se passer quand on fait une requête (n'importe laquelle)
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} `;

    console.log();

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
            console.log('Unable to append to server.log');
    });

    next(); //next permet dedire qu'on a terminé, si on ne le fait on ne passe jamais à la ligne suivante

});

// app.use((req, res, next) => { // come avant, il va intercepter toutes les request
//     res.render('maintenance.hbs'); // pas de next, donc boucle ici et ne passe pas à la ligne suivante

// });  // Maintenance mode

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear()); // élément statique qui peut être réutilisé par tout les hbs en utilisant le nom approprié
hbs.registerHelper('screamIt', (text) => text.toUpperCase()); //possibilité d'utiliser des fonctions, voir home.hbs

app.get("/", (req, res) => { // res 

    // res.send('<h1>Hello express</h1>');
    // res.send({
    //     name:'Daivy',
    //     likes: [
    //         'Games',
    //         'Movies'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "You are to the home page !",
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });

});

app.get('/bad', (req, res) => {
    res.send({
        error: "Unable to fulfill the request"
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
// Express toevoegen aan Node.js
const express = require('express');
const app = express();

// bibliotheek inladen om paden naar folder te maken
const path = require('path');

// applicatiepoort instellen
const port = 5001;

// vertel aan de webserver waar de publieke bestanden zitten
app.use(express.static('public'));

// EJS configureren
app.set('view engine', 'ejs');
app.set('views',  path.resolve(__dirname, 'views'));

// databestand inladen
const projectposts = require('./data/project.json');

// route naar "homepagina" laten werken
app.get('/', function(req,res){
  res.render('home');
});

app.get("/designs", function(request, response){
  response.render("museum", {
    posts: projectposts.project
  });
    });

app.get("/contact", function(request, response){
    response.render("contact");
  });

    // Array van blogberichten doorgeven aan de renderfunctie om op de homepagina te tonen.
app.get('/project/:postid', function(req,res){
  res.render('detail', {
    post: projectposts.project[req.params.postid]
  });
});

// Heroku poort instellingen
app.set('port', (process.env.PORT || 5001));
app.listen(app.get('port'));

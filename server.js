const express = require('express');
const parser = require('body-parser');

const app = express();
const technoDoc = require('techno-gendoc');

app.use('/', express.static('public', {maxAge: 1}));
technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/soc', express.static(__dirname + '/node_modules/bootstrap-social'));



app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${process.env.PORT || 3000}`);
});

function pseudoUrlHandler(req, res) {
  res.sendFile('public/index.html', {root: __dirname });
}

app.get('/login', pseudoUrlHandler);
app.get('/register', pseudoUrlHandler);
app.get('/singlePlayer', pseudoUrlHandler);
app.get('/play', pseudoUrlHandler);
app.get('/playchoose', pseudoUrlHandler);
app.get('/scores', pseudoUrlHandler);
app.get('/multiPlayer', pseudoUrlHandler);

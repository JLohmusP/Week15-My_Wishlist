const express = require('express');
const Wish = require('./model/wish');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (request, response) => {
    Wish.fetchAllWishes(wishesFromFile => {
        console.log(wishesFromFile);
        response.render('index', {myWishes: wishesFromFile});
    });

});

app.post('/wish', (request, response) => {
    let userData = request.body.userWish;

    let newWish = new Wish(userData);
    newWish.saveWish();
    response.redirect('/');
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running ${port}.`);
});
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

/*GET HOME */
app.get ('/', (req, res, next) => {
  res.render('index.hbs');
});

/*GET BEERS PAGE*/
app.get('/beers', (req, res, next) => {
 punkAPI.getBeers()
    .then((beersFromApi) => {
      res.render('beers.hbs', {beers: beersFromApi})
     //console.log('Beers from the database:', beersFromApi)
    })
    .catch ((error) => {
      console.log(error);
    });
})


/*GET RANDOM BEER PAGE */
app.get('/randombeers', (req, res, next) => {
  punkAPI.getRandom()
  .then ((responseFromAPI) => {
    res.render('random-beer.hbs', {randomBeer: responseFromAPI});
  })
 .catch ((error)  => {
   console.log(error)
 })
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));

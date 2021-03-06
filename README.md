# Treasure Cruiser
## Project 2 - Full Stack App

http://treasurecruiser.herokuapp.com/

For the Second project in the WDI course at GA, I wanted to combine my new full-stack skills with my love of Magic the Gathering.
About three years ago, I started playing Magic and it has quickly become one of my favorite hobbies. In these past few years I started to notice some gaps in resources and wanted to start creating solutions to fill these gaps. For my first full-stack app, I decided to make a tool that would make it easier for players to trade cards. Players usually have a binder full of cards they bring to tournaments to trade and usually trading involves using your phone to search the value of each card in the trade, writing that value down and then getting the sum of their value. I thought it would be useful if an app did that for you. Once the cards you are trading are identified, you can add them to the trade page. Eventually I'd like to create an app that views two users collections simultaneously and counts the value of both user's trade cards to make a execute fair trades.

### User Stories
1. Johnny is an avid magic collector that hauls around thousands of cards and can't possibly keep track of the values of all of them
1. Timmy likes to casually trade magic cards and is looking for some cool new cards to put in his EDH deck. He has some valuable cards, but he'd rather trade them for fun stuff.  He doesn't bother bringing too many extra things like pencil and paper to play. So he doesn't want to have to keep track of card values.
1. Spike is a competitive player that is always looking to play the best deck. He wants to quickly make trades before a tournament so that his deck is the best deck to play.

### Getting Started:
I wanted to start this project with having good wireframes and planning my routes out as much as possible.
![alt text](/public/img/wireframe1.png)
![alt text](/public/img/wireframe2.png)
![alt text](/public/img/wireframe3.png)


### Models
| Table     |   Attributes                  | Associations         |
| --------- | :---------------------------: | :------------------- |
| user   |   id, name, password   |   models.user.hasMany(models.collection) & models.user.hasMany(models.trade)   |
| collection   |   id, cardName, setName, price, img, bigImg, rarity, multiverseId, userId   |   models.collection.belongsToMany(models.user)   |
|   trade   |   id, cardName, price, userId   |   models.trade.belongsToMany(models.user)   |

### Routes
| Method | URL           | Description              |
| ------ |:-------------:| :------------------------|
| GET    | /             | Displays home page        |
| GET    | /profile      | Displays users Profile Page |
| GET    | /contact      | Displays my personal contact info |
| GET    | /signup       | Brings new user to sign up page   |
| POST   | /signup       | Creates a new user or denies access if user exists already |
| GET    | /login        | Brings user to the login screen |
| POST   | /login        | Checks for password success from user |
| GET    | /logout       | Logs the user out and redirects to the homepage |
| GET    | /collection         | Finds and displays the user's collection |
| POST   | /collection         | Adds a card to the user's collection |
| DELETE | /collection/:id     | Deletes a specific card (:id) from user's collection |
| PUT    | /collection/:id     | Updates the price of the card in user's collection with API call |
| GET    | /search             | Displays a basic search page for user |
| POST   | /search/results     | Calls the api with a user query |
| GET    | /trade              | Displays Trades page and any cards the user may have in the trade |
| POST   | /trade              | Adds card from user's collection to user's trade |
| DELETE | /trade/:id          | Removes a card from trade that user doesn't want to trade |
| DELETE | /trade/:idx/execute | Executes a trade and removes all cards in trade   | 

### Javascript logic
Most of the Javascript for this project involved calling on a backend database through sequelize and rendering the results. It involved less logic problems and conditionals than my previous project but still had its own challenges. One bit of code I was happy to have figured out was how to sum the values of an individual users collection and then display that value on a page. I had never passed multiple parameters through a promise before so it was cool to figure out how that worked. 
```
.then(function(result) {
        //Calculate sum of collection
        var priceArray = [];
        for (var i = 0; i < result.length; i++) {
            var makeNum = parseFloat(result[i].price);
            if (makeNum > 0) {
                priceArray.push(makeNum);
            }
        }
        var priceSum = (priceArray.reduce(function(a, b) {
            return a + b;
        }, 0)).toFixed(2);
        res.render('collection/index', { result: result, priceSum: priceSum });

```



### Additional Styling & Edits




### Resources:
* https://scryfall.com/ - API i used; Free, open sourced, had pretty much everything I needed
* http://www.espn.com/nba/tradeMachine - The inspiration for the app. If you can pretend to trade basketball players, why not MTG cards?
* https://fontawesome.bootstrapcheatsheets.com/ - Bootstrap & Font Awesome icons
* Google Fonts - for fonts of course
* https://css-tricks.com/almanac/properties/s/scrollbar/ - scrollbar manipulation (it gone)
* https://www.w3.org/TR/CSS21/colors.html#background-properties - keep my background image in place and the same size
* https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers - used this to figure out how to sum collections and trade values
* http://docs.sequelizejs.com/manual/tutorial/migrations.html - general help on using sequelize, especially with all my migrations;
* 
* 


### Technologies Used:
* HTML
* CSS
* Javascript
* Node.js
* Express
* SQL
* Postgres
* Bootstrap

### To Do:
* Add a second user option to trades
* Fix when the user searches for a card that doesn't exist
* Better profile page for users
* Change to Materialize

### Acknowledgments
* 

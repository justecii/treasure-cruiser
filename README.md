# Treasure Cruiser
## Project 2 - Full Stack App

For the Second project in the WDI course at GA, I wanted to combine my new full-stack skills with my love of Magic the Gathering.
About three years ago, I started playing Magic and it has quickly become one of my favorite hobbies. In these past few years I started to notice some gaps in resources and wanted to start creating solutions to fill these gaps. For my first full-stack app, I decided to make a tool that would make it easier for players to trade cards. Players usually have a binder full of cards they bring to tournaments to trade and usually trading involves using your phone to search the value of each card in the trade, writing that value down and then getting the sum of their value. I thought it would be useful if an app did that for you. Once the cards you are trading are identified, you can add them to the trade page. Eventually I'd like to create an app that views two users collections simultaneously and counts the value of both user's trade cards to make a execute fair trades.

### Getting Started:
I wanted to start this project with having good wireframes and planning my routes out as much as possible.
![alt text](images/IMG_20170917_213511.jpg)

//Example of list
1. Bet 1 - Only Payline 1 as possible victory
1. Bet 3 - Paylines 1-3 as possible victory
1. Bet 5 - All 5 paylines
1. Bet 20 - same as Bet 1 but with 20x greater reward
1. Bet 60 - same as Bet 3 but with 20x greater reward
1. Bet 100 - same as Bet 5 but with 20x greater reward

### Models

### Routes

### Javascript logic
```
function drySpin(num) {
    var randomFirst = Math.floor(Math.random()*10);
    var randomSecond = Math.floor(Math.random()*10);
    var randomThird = Math.floor(Math.random()*10);
    middleRow[num].appendChild(document.createElement("img")).src = slotImages[randomFirst].source;
    middleRow[num].childNodes.className = slotImages[randomFirst].name;
    topRow[num].appendChild(document.createElement("img")).src = slotImages[randomSecond].source;
    topRow[num].childNodes.className = slotImages[randomSecond].name;
    bottomRow[num].appendChild(document.createElement("img")).src =slotImages[randomThird].source;
    bottomRow[num].childNodes.className = slotImages[randomThird].name;
};
```
Once i got the images to appear, I went back to trying different stylings to get them to appear. I poured over dozens of examples and spent hours trying to have a traditional slot animation. After all this time, I concluded that there was no solution that involved a language I am currently comfortable with and I would spin too much time on this project trying to learn a new language just for an animation. The problem was i couldn't find something that would rotate along the z-axis while also fitting into place 3 images in 3 different table rows. I decided to get creative in different ways and use animations to make my spins more attractive and desirable. I decided to use an animation of the Millennium Falcon "flying" across my screen and the slots displaying as it passed by them.

Once I was satisfied with my slot animations, i moved to working on the logic for determining game wins. I decided to compare if the elements on a particular line were the same by comparing their classes since they were all given a class coresponding to the image in the array. Since I had already determined that I was going to allow for a win if only three elements on a payline were the same, I needed to use a lot of if statements, with nested if's to compare different possible wins: I drew out the paylines and then figured out all of the different potential victories i might have for each payline. Once that was all completed. I created a few more functions to contain my different win functions and tied them to which bet had been chosen by the user. This also required me to make sure the user's bet wasn't larger than the amount of credits they had available to them.
![alt text](/public/img/wireframe1.png)

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

### Acknowledgments
* 

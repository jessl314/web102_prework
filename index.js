/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card'); 
        gameCard.innerHTML = `
           <h3>${games[i].name}</h3>
           <img src="${games[i].img}" class="game-img" alt="${games[i].name}" />
           <p>${games[i].description}</p>
         `;
        // appends each gameCard to the container
        document.querySelector('#games-container').appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

// acc is the accumulator and adds all backers attribute values from the games array of GAMES_JSON
// initial is 0
const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers
}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `
<p>${totalContributions.toLocaleString('en-US')}</p>`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalPledged = GAMES_JSON.reduce( (acc, game) => {
    // whatever is in accumulator + new value
    // for game in GAMES_JSON
    return acc + game.pledged
}, 0);


// set inner HTML using template literal
// adds the comma to the number as per US custom
raisedCard.innerHTML = `
<p>$${totalPledged.toLocaleString('en-US')}</p>`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce( (acc, game) => {
    return acc + 1
}, 0);


// set inner HTML using template literal

gamesCard.innerHTML = `
<p>${totalGames.toLocaleString('en-US')}</p>`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let notGoal = GAMES_JSON.filter ( (game) => {
        // notGoal is an array with games 
        // where pledged money is less than goal money
        return game.pledged < game.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(notGoal);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    let Goal = GAMES_JSON.filter ( (game) => {
        // Goal is an array with games 
        // where pledged money is >= goal money
        return game.pledged >= game.goal;
    });
    // use the function we previously created to add the funded games to the DOM
    addGamesToPage(Goal);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
//document.getElementById("myBtn").addEventListener("click", displayDate);
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const notGoal = GAMES_JSON.reduce ( (game) =>{
    return game.pledged < game.goal;
}, 0);

const unFundedGames = notGoal.length;


// create a string that explains the number of unfunded games using the ternary operator

const descriptionElement = document.createElement("p");

descriptionElement.innerText = `A total of $${totalPledged.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${unFundedGames == 1 ? "game remains" : "games remain"} unfunded. We need your help to fund these amazing games!`;


// create a new DOM element containing the template string and append it to the description container

descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [firstGame, secondGame] = sortedGames;

const firstEle = document.createElement("p");

firstEle.innerText = firstGame.name;

firstGameContainer.appendChild(firstEle);


const secondEle = document.createElement("p");

secondEle.innerText = secondGame.name;

secondGameContainer.appendChild(secondEle);

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item


// BONUS: users can search for a game they want

const searchForm = document.getElementById("search-form")

const searchBar = document.getElementById("search-bar")

const dropdown = document.getElementById("dropdown")

// creates a drop down menu of the games that match input

searchBar.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase()
    dropdown.innerHTML = "";
    if (searchForm.length === 0) return;
    const filteredGames = GAMES_JSON.filter( (game) => game.name.toLowerCase().includes(searchText));

    filteredGames.forEach ((game) => {
        const option = document.createElement("div");
        option.classList.add("dropdown-item");
        option.innerText = game.name;
        option.addEventListener("click", () => {
            searchBar.value = game.name;
            dropdown.innerHTML = "";
        });
        dropdown.appendChild(option);
    });
})

// shows the card that corresponds to desired game and clears input field
searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevents refresh
    deleteChildElements(gamesContainer);
    // making text all lowercase for easier matching
    const searchText = searchBar.value.toLowerCase()
    // using includes so user does not have to type whole name
    const filteredGames = GAMES_JSON.filter( (game) => game.name.toLowerCase().includes(searchText));
    addGamesToPage(filteredGames);
    dropdown.innerHTML = "";
    searchBar.value = "";
});

const buttonContainer = document.getElementById('button-container');

buttonContainer.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        searchBar.value = "";
        dropdown.innerHTML = "";
    }
})
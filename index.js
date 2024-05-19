"use strict";
const animalsPlace = document.querySelector(".animalsPlace");
const gameMain = document.querySelector(".game");
const playButton = document.getElementById("play");
const chooseAnimal = document.querySelector(".chooseAnimal");
const walkingPlace = document.querySelector(".walkingPlace");
const healthBar = document.querySelector(".healthBar");
const hungryBar = document.querySelector(".hungryBar");
const funBar = document.querySelector(".funBar");
const playWithPetButton = document.getElementById("playWithPet");
const feedButton = document.getElementById("feed");
const gameContainer = document.querySelector(".gameContainer");
const pointsHTML = document.querySelector("h3");
const playingContainer = document.querySelector(".playingContainer");
const foodItems = document.querySelector(".foodItems");
const levelHtml = document.querySelector("h4");
const animals = ["🐱", "🐭", "🐰", "🐶", "🐯", "🐮", "🐷", "🐵"];
const bigAnimals = ["🐈", "🐀", "🐇", "🐕", "🐅", "🐄", "🐖", "🐒"];
const food = ["🥩", "🍗", "🍖", "🦴", "🌭", "🍔"];
const walkingPlaceArr = [
    1, 1, 1, 1, 1,
    1, 1, 1, 1, 1,
    1, 1, 1, 1, 1,
    1, 1, 1, 1, 1,
    1, 1, 1, 1, 1,
];
let selectedAnimal = [];
let health = 100;
let hungry = 100;
let fun = 100;
let points = 0;
let gameTrigger = false;
let level = 0;
let petSize = 50;
animals.forEach((animal, index) => {
    const animalDiv = document.createElement('div');
    animalDiv.classList.add('box');
    animalDiv.textContent = animal;
    animalDiv.onclick = () => {
        if (selectedAnimal.length < 1) {
            animalDiv.classList.add('selected');
            animalDiv.id = index.toString();
            animalDiv.style.backgroundColor = 'rgba(210, 207, 207, 0.95)';
            selectedAnimal.push(animalDiv);
            console.log(selectedAnimal[0].id);
        }
        else {
            if (selectedAnimal.length === 1 && animalDiv.classList.contains("selected")) {
                animalDiv.style.backgroundColor = '';
                animalDiv.classList.remove('selected');
                selectedAnimal = [];
            }
        }
    };
    animalsPlace.appendChild(animalDiv);
});
playButton.onclick = () => {
    if (selectedAnimal.length > 0) {
        gameMain.classList.remove("d-none");
        funInterval();
        hungryInterval();
        chooseAnimal.classList.add("d-none");
        const pet = document.createElement("div");
        pet.className = "pet";
        pet.innerHTML = selectedAnimal[0].innerHTML;
        walkingPlace.appendChild(pet);
        const levelInterval = setInterval(() => {
            level++;
            levelHtml.textContent = `Level: ${level}`;
            petSize += 25;
            pet.style.fontSize = `${petSize}px`;
            if (level === 4) {
                const biggerPet = selectedAnimal[0].id;
                pet.style.fontSize = "200px";
                pet.innerHTML = bigAnimals[biggerPet];
            }
        }, 1000);
    }
    else {
        alert("You must choose the animal!");
    }
};
function updateBars() {
    healthBar.style.width = `${health}%`;
    hungryBar.style.width = `${hungry}%`;
    funBar.style.width = `${fun}%`;
}
function funInterval() {
    const mainInterval = setInterval(() => {
        fun -= 5;
        updateBars();
        if (fun <= 0) {
            healthInterval();
            clearInterval(mainInterval);
        }
    }, 1000);
}
function hungryInterval() {
    const secondInterval = setInterval(() => {
        hungry -= 2;
        updateBars();
        if (hungry <= 0) {
            healthInterval();
            clearInterval(secondInterval);
        }
    }, 1000);
}
function healthInterval() {
    if (hungry <= 0 || fun <= 0) {
        const healthInterval = setInterval(() => {
            health--;
            updateBars();
            if (health <= 0) {
                clearInterval(healthInterval);
                alert('Game over');
            }
        }, 1000);
    }
}
updateBars(); // Initial call to set bars to starting values
playWithPetButton.onclick = () => {
    if (!gameTrigger) {
        walkingPlace.classList.add("d-none");
        playingContainer.classList.remove("d-none");
        playWithPetButton.textContent = "Close game";
    }
    else {
        walkingPlace.classList.remove("d-none");
        playingContainer.classList.add("d-none");
        playWithPetButton.textContent = "Play with Pet";
    }
    gameTrigger = !gameTrigger;
    // Clear existing cells
    gameContainer.innerHTML = '';
    function turnRandomCellRed() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (cell.firstChild) {
                cell.removeChild(cell.firstChild);
            }
        });
        const rndNum = Math.floor(Math.random() * walkingPlaceArr.length);
        const gamePet = document.createElement("div");
        gamePet.className = "gamePet";
        gamePet.innerHTML = selectedAnimal[0].innerHTML;
        cells[rndNum].appendChild(gamePet);
    }
    function handleCellClick(event) {
        if (event.target.classList.contains("gamePet")) {
            points++;
            pointsHTML.textContent = `Points: ${points}`;
            if (points === 5) {
                fun = 100;
                updateBars();
                clearInterval(petGame);
                alert("Your pet is happy 100 % ! ");
            }
        }
    }
    walkingPlaceArr.forEach((_, index) => {
        const div = document.createElement("div");
        div.className = "cell";
        div.onclick = handleCellClick;
        gameContainer.appendChild(div);
    });
    const petGame = setInterval(turnRandomCellRed, 1000);
};
feedButton.onclick = () => {
    food.forEach(el => {
        const item = document.createElement("div");
        item.classList.add("food");
        item.textContent = el;
        foodItems.appendChild(item);
        item.onclick = () => {
            hungry += 20;
            updateBars();
            foodItems.removeChild(item);
        };
    });
};

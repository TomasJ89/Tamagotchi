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
const spriteDiv = document.querySelector(".sprite");
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
let position = 0;
let position1 = 0;
let startPosition = 100;
let backgroundSize = 400;
let widthHeight = 100;
let firstMove = 300;
let secondMove = 600;
let thirdMove = 900;
let lastMove = 1200;
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
        pet.className = "sprite";
        pet.classList.add("pet");
        walkingPlace.appendChild(pet);
        const spriteDiv = document.querySelector(".sprite");
        setInterval(() => {
            spriteDiv.style.backgroundPosition = `-${position1}px -${position}px`;
            position += startPosition;
            if (position > firstMove) {
                spriteDiv.style.backgroundPosition = `-${position1}px -${position}px`;
                position1 = startPosition;
            }
            if (position > secondMove) {
                spriteDiv.style.backgroundPosition = `-${position1}px -${position}px`;
                position1 += startPosition;
            }
            if (position > thirdMove) {
                spriteDiv.style.backgroundPosition = `-${position1}px -${position}px`;
                position1 += startPosition;
            }
            if (position > lastMove) {
                position = 0;
                position1 = 0;
            }
        }, 300);
        function growing() {
            startPosition *= 2;
            backgroundSize *= 2;
            widthHeight *= 2;
            firstMove *= 2;
            secondMove *= 2;
            thirdMove *= 2;
            lastMove *= 2;
            spriteDiv.style.backgroundSize = `${backgroundSize}px ${backgroundSize}px`;
            spriteDiv.style.height = `${widthHeight}px`;
            spriteDiv.style.width = `${widthHeight}px`;
        }
        const levelInterval = setInterval(() => {
            level++;
            levelHtml.textContent = `Level: ${level}`;
            // petSize+=25
            // pet.style.fontSize= `${petSize}px`
            if (level === 5) {
                growing();
            }
            if (level === 10) {
                growing();
            }
        }, 5000);
        if (health <= 0) {
            clearInterval(levelInterval);
        }
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
let mainInterval = 0;
function funInterval() {
    mainInterval = setInterval(() => {
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
    if (fun === 100 && hungry === 100) {
        health = 100;
        updateBars();
    }
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
updateBars();
playWithPetButton.onclick = () => {
    const petGame = setInterval(turnRandomCellRed, 1000);
    if (!gameTrigger) {
        walkingPlace.classList.add("d-none");
        playingContainer.classList.remove("d-none");
        playWithPetButton.textContent = "Close game";
        points = 0;
        pointsHTML.textContent = `Points: ${points}`;
        clearInterval(mainInterval);
    }
    else {
        walkingPlace.classList.remove("d-none");
        playingContainer.classList.add("d-none");
        playWithPetButton.textContent = "Play with Pet";
        clearInterval(petGame);
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
                if (health < 100) {
                    health += 20;
                    updateBars();
                }
                funInterval();
                points = 0;
                pointsHTML.textContent = `Points: ${points}`;
                walkingPlace.classList.remove("d-none");
                playingContainer.classList.add("d-none");
                playWithPetButton.textContent = "Play with Pet";
                clearInterval(petGame);
                gameTrigger = !gameTrigger;
            }
        }
    }
    walkingPlaceArr.forEach((_, index) => {
        const div = document.createElement("div");
        div.className = "cell";
        div.onclick = handleCellClick;
        gameContainer.appendChild(div);
    });
};
feedButton.onclick = () => {
    food.forEach(el => {
        const item = document.createElement("div");
        item.classList.add("food");
        item.textContent = el;
        foodItems.appendChild(item);
        item.onclick = () => {
            if (health < 100) {
                health++;
                updateBars();
            }
            hungry += 20;
            updateBars();
            foodItems.removeChild(item);
        };
    });
};

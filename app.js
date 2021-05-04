"use strict"


/*
    Hanging-man new attempt:


    // - need make function for display windows
    - add new questions to array (need to make local storage);
    - local storage (need check JSON);
    // - fix bug in last chk for final question when arr.length = 0
    
    // + CSS

*/


// Functional ----------------------------------------------------------------------------------------------------------------------------------

function getId(id) {
    return document.getElementById(id);
};

function q(str) {
    return console.log(str);
};


const questionHtml = getId("question");
const answerHtml = getId("answer");

const image = getId("image");

const startBtn = getId("startBtn");
const playAgainBtn = getId("playAgainBtn");
const restartBtn = getId("restartBtn");
const lettersBtn = document.querySelectorAll(".letter");

const startWin = getId("startWin");
const runWin = getId("runWin");
const newRunWin = getId("newRunWin");
const winWin = getId("winWin");
const loseWin = getId("loseWin");


const questionAnswerArr = [
    {question: "Name of biggest river?", answer: "AMAZON"},
    {question: "Current month?", answer: "APRIL"},
    {question: "Chips with mustage?", answer: "PRINGLES"},
];


const imageArr = [
    "img/img0.png",
    "img/img1.png",
    "img/img2.png",
    "img/img3.png",
    "img/img4.png",
    "img/img5.png",
    "img/img6.png",
    "img/img7.png",
];


let run = {
    arr: [],
    index: null,
    question: "",
    answer: [],
    hidden: [],
    image: imageArr,
    clicked: new Set(),
    wrong: new Set(),


    run() {

        this.reset();

        this.addIndex(0, run.arr.length - 1);
        this.addAnswer(run.index, run.arr);
        this.addQuestion(run.index, run.arr);
        this.addHidden();
    },


    addArr(arr) {
        this.arr = arr.concat();
    },


    addIndex(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        this.index = Math.floor(Math.random() * (max - min + 1) + min);
    },


    addQuestion(index) {
        this.question = this.arr[index].question;
    },

    removeQuestion(index) {
        this.arr.splice(index, 1);
    },

    addAnswer(index) {
        this.answer = this.arr[index].answer.split('')
    },


    addHidden() {
        
        for (let i = 0; i < this.answer.length; i++) {
            this.hidden.push("_");
        };
    },

    reset() {
        this.index = null;
        this.question = "";
        this.answer = [];
        this.hidden = [];
        this.question = [];
        this.clicked.clear();
        this.wrong.clear();

        lettersBtn.forEach(function(letter) {
            letter.classList.remove("blackLetter")
        })
    },
};


// Main ----------------------------------------------------------------------------------------------------------------------------------
function main() {
    
    run.run();

    displayQuestion();
    displayAnswer();
    displayImage();
};

// Buttons ----------------------------------------------------------------------------------------------------------------------------------
startBtn.onclick = function() {

    if (run.arr.length == 0) {
        run.addArr(questionAnswerArr);
    };

    displayThisWindow(runWin);

    main();
};


playAgainBtn.onclick = function() {

    run.removeQuestion(run.index);

    if (run.arr.length > 0) {
        main();

        displayThisWindow(runWin);

    } else {
        questionHtml.innerHTML = "Congratulation! You have answered on all questions! Start new game?"

        displayThisWindow(startWin);
    }
    

};


restartBtn.onclick = function() {
    main();

    displayThisWindow(runWin);
};


lettersBtn.forEach(function(letterBtn) {
    letterBtn.addEventListener("click", function() {

        let clickedLetter = letterBtn.textContent;

        // console.log(clickedLetter);

        chkForCorrect(clickedLetter);

        chkForWinLose();

        letterBtn.classList.add("blackLetter");

    });
});


//  Display things ----------------------------------------------------------------------------------------------------------------------------------
function displayQuestion() {
    questionHtml.innerHTML = run.question;
};


function displayAnswer() {
    answerHtml.innerHTML = run.hidden.join("");
};


function displayImage() {
    image.src = run.image[0];
};


function nextImage() {
    image.src = run.image[run.wrong.size];
};


function displayWindow(window) {
    window.style.display = "flex";
};


function hideWindow(window) {
    window.style.display = "none";
};


function displayThisWindow(window) {
    switch(window) {
        case startWin:
            hideWindow(runWin);
            hideWindow(newRunWin);
            hideWindow(winWin);
            hideWindow(loseWin);
            displayWindow(startWin);

            break;

        case runWin:
            hideWindow(startWin);
            hideWindow(newRunWin);
            hideWindow(winWin);
            hideWindow(loseWin);
            displayWindow(runWin);

            break;

        case winWin:

            hideWindow(startWin);
            hideWindow(runWin);
            hideWindow(loseWin);
            displayWindow(newRunWin);
            displayWindow(winWin);

            break; 

        case loseWin:

            hideWindow(startWin);
            hideWindow(runWin);
            hideWindow(winWin);
            displayWindow(newRunWin);
            displayWindow(loseWin);

            break; 
    };
};


//  Checks ----------------------------------------------------------------------------------------------------------------------------------
function chkForCorrect(letter) {
    if (run.answer.includes(letter)) {
        run.answer.findIndex(function(item, indexOfLetter) {
            if (letter == item) {
                // console.log(indexOfLetter);
                run.hidden[indexOfLetter] = letter;
            };
        });

        displayAnswer();

    } else {
        run.wrong.add(letter);
        nextImage();
    };

    run.clicked.add(letter);
};



function chkForWinLose() {
    if (run.answer.join("") == run.hidden.join("")) {
        // console.log("You Won");

        questionHtml.innerHTML = `Congratulation! You have guess the word: ${run.answer.join("")}!`

        displayThisWindow(winWin);

    } else if (run.wrong.size == 6) {
        // console.log("You Lost");

        questionHtml.innerHTML = `You did not guess the word! Restart?`

        displayThisWindow(loseWin);
    };
};


// CONSOLE INFO ----------------------------------------------------------------------------------------------------------------------------------
// function displayInfo() {
//     console.log(run.arr)
//     console.log(run.index)
//     console.log(run.question)
//     console.log(run.answer)
//     console.log(run.hidden)
// }

// displayInfo();
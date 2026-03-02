//============= FULLPAGE JS INITIALIZATION ============= 
// Fullpage scrolling using the fullpage.js library here https://alvarotrigo.com/fullPage/ 
// this code set up the auto scroll between the sections 
// Navigation dots on the right side with tooltips

new fullpage('#fullpage', {
    //options here
    autoScrolling:true,
    scrollHorizontally: true,
    navigation: true,
    navigationTooltips: ['Home','Who are we', 'Word List', 'Quiz', 'Resources'],
    showActiveTooltip: true,
    navigationPosition: 'right',
    slidesNavPosition: 'bottom',
    controlArrows: false,
});


// =============== BUTTON NAVIGATION =================

//SECTION 2
// The sl button "Teach me" in section 2 needs to move to the word list 
const s2Btn = document.getElementById('s2-btn');
if (s2Btn) {
  s2Btn.addEventListener('click', () => {
    fullpage_api.moveTo(3); // Move to section 3
  });
}

//SECTION 3
// The sl button "next" in section 3 needs to move to the quiz
const s3Btn = document.getElementById('s3-btn');
if (s3Btn) {
  s3Btn.addEventListener('click', () => {
    fullpage_api.moveTo(4); // Move to section 4
  });
}

//SECTION 4
const s4Btn = document.getElementById('s4-btn');
if (s4Btn) {
  s4Btn.addEventListener('click', () => {
    fullpage_api.moveTo(5); // Move to section 5
  });
}


// =============== POPUP BY SHOELACE ====================
// Welcome dialog on page load
window.addEventListener('load', () => {
  const dialog = document.querySelector('#welcome-dialog');
  const closeBtn = dialog.querySelector('.dialog-close');
  
  if (dialog) {
    dialog.open = true;
  }
  
  // Close dialog on click
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      dialog.hide();
    });
  }
});



// =============== SECTION 3 =================
// Audio play back for the word cards 
// Adds event listener on the word cards
// when clicked plays the audio files stored with the same word name 

document.querySelectorAll('.word-card').forEach(card => {
  card.addEventListener('click', function() {
    const cardId = this.id;
    const audio = new Audio(`audio/${cardId}.m4a`);
    audio.play();
  });
});

// =============== SECTION 4 =================

//============= JSQUIZ ============= 
// created with the help of the Youtube Tutorial https://www.youtube.com/watch?v=PBcqGxrr9g8 


//Quiz questions array:
// - 10 questions 
// - with 4 multiple choice options
// - Each answer option is marked as true or false 
const questions = [
    {
        question : "Translate this word: Apmere", 
        answers: [
            {text: "Good", correct: false},
            {text: "Country", correct: true},
            {text: "Water", correct: false},
            {text: "Hello", correct: false},
        ]
    },
    {
        question : "What does Kele mean?", 
        answers: [
            {text: "Hello", correct: false},
            {text: "Goodbye", correct: false},
            {text: "Okay", correct: true},
            {text: "What", correct: false},
        ]

    },
    {
        question : "Translate this word: Kwatye", 
        answers: [
            {text: "Water", correct: true},
            {text: "Woman", correct: false},
            {text: "Wind", correct: false},
            {text: "Camp", correct: false},
        ]
       
    },
    {
        question : "What is the Arrernte word for Yes?", 
        answers: [
            {text: "Ye", correct: true},
            {text: "Kele", correct: false},
            {text: "Mwarre", correct: false},
            {text: "Iwenhe", correct: false},
        ]
    },
    {
        question : "Translate this word: Arrangkwe", 
        answers: [
            {text: "Hello", correct: false},
            {text: "Maybe", correct: false},
            {text: "No", correct: true},
            {text: "Yes", correct: false},
        ]

    },
    {
        question : "What is goodbye?", 
        answers: [
            {text: "Urreke", correct: true},
            {text: "Werte", correct: false},
            {text: "Apmere", correct: false},
            {text: "Inwenhe", correct: false},
        ]

    },
    {
        question : "Translate this word: Inwenhe", 
        answers: [
            {text: "Why", correct: false},
            {text: "Where", correct: false},
            {text: "Who", correct: false},
            {text: "What", correct: true},
        ]

    },
    {
        question : "Translate this word: Angwenhe", 
        answers: [
            {text: "Who", correct: true},
            {text: "Where", correct: false},
            {text: "What", correct: false},
            {text: "Why", correct: false},
        ]

    },

    {
        question : "What is good, well or fine?", 
        answers: [
            {text: "Apmere", correct: false},
            {text: "Mwarre", correct: true},
            {text: "Kele", correct: false},
            {text: "Arrangkwe", correct: false},
        ]

    },
    {
        question : "What is hello?", 
        answers: [
            {text: "Ye", correct: false},
            {text: "Kele", correct: false},
            {text: "Werte", correct: true},
            {text: "Urreke", correct: false},
        ]

    }

];

// DOM Eelement references 
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById('quizProgressBar'); // sl progress bar 

//Quiz variables to track the questions the user is upto and the score
let currentQuestionIndex = 0;
let score = 0;

//Start quiz function 
// This will reset the question Index and score to zero 
// Shows the first question of the quiz 
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;  /*scores are set to 0 when the quiz is started*/ 
    updateProgress(0); // Sl progress bar is set to 0*/
    nextButton.innerHTML = "Next";


    showQuestion();
}

// Show question function 
// This will show the current question & answers according to the index 
// Adds the event listener to the option buttons provided
function showQuestion(){
    resetState();
    
    let currentQuestion = questions [currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

//Reset state function 
// Will reset & hide the next button
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//Select answer function 
// Controls what happens when a user clicks on an answer 
// - Check if the answer selected is correct 
// - Displays the feedback message determined if correct or incorrect
// - visual style for correct (green) / incorrect (red) 
// - disables buttons after answer is selected 
// - updates the sl progress bar 
// - shows the next button for the user to proceed to the next question

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    // Showing progress bar after the first answer is selected
    if (progressBar && currentQuestionIndex === 0){
        progressBar.style.display = "block";
    }

    if(isCorrect){
        selectedBtn.classList.add("correct");
        outputMessage.innerHTML = `You got it! Nice work!`;//message to display if answer selected is correct
        score++;//add increment to the quiz score to display at the end
        
    }else{
        selectedBtn.classList.add("incorrect");
        outputMessage.innerHTML = `Better luck next time!`; // message to displlay if answer selected is wrong 
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){ // if the 
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // Calculating & update the sl progress
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100; // total progress is (question number / question length of 10 multiplied by 100; ie 1 question answered is (1/100*100 = 10%) )
    updateProgress(progress); // update sl progress bar to the user 
    nextButton.style.display = "block"; // shows the next button for the user to go to the next question in the quiz
}
// Show score function
// Will display the final score of the quiz at the end 
// Button will show "play again"
// clears the feedback message 
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    outputMessage.innerHTML = ``;
    nextButton.style.display = "block";

    // Hiding the progress bar 
    if (progressBar) {
        progressBar.style.display = "none";
    }

}

// Handle next button function 
// Moves to the next question or shows the final score depending if the current question is smaller then the total number of questions.
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){ //if the current question index is smaller then the length of the questions it will show the next question
        showQuestion();
    }else{
        showScore(); // if the current question is not smaller then the length of the question then it will show the score - meaning its the end of the quiz
    }
}

// Next button event listener 
// Hands the next and play again button clicks 
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Update progress function  
// update the sl progress bar value as the user moves through the quiz questions
function updateProgress(newValue) {
    if (progressBar) {
        progressBar.value = newValue;
        //Updating the sl progress bar label
        const progressLabel = document.getElementById('progressLabel');
        if (progressLabel) {
            progressLabel.textContent = `${newValue}%`;
        }

    }


}
// Starts the quiz when the page loads 
startQuiz();

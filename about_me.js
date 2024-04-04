let playerName;
let playerScoreBoard=[];
let quizCompleted = false;
displayScoreboard();

function getPlayerName() {
    let playerName = prompt("Enter your name:");
    return playerName;
  }


const question = [
  {
    questions: "What is Priyanshi's favourite colour?",
    answers: [
      { text: "Red", correct: false },
      { text: "Yellow", correct: false },
      { text: "Green", correct: true },
      { text: "Blue", correct: false },
    ],
  },
  {
    questions: "Who is Priyanshi ka muh bola bhai?",
    answers: [
      { text: "Hartik", correct: false },
      { text: "Pankaj", correct: false },
      { text: "Malik", correct: false },
      { text: "Sarthak", correct: true },
    ],
  },
  {
    questions: "What is Priyanshi's favourite sweet?",
    answers: [
      { text: "Om sweets ki kaju barfi", correct: true },
      { text: "Om sweets ki rabdi", correct: false },
      { text: "Om sweets ke laddu", correct: false },
      { text: "Om sweets ke rasgulle", correct: false },
    ],
  },

  {
    questions: "How many best friends does Priyanshi has?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "No-one", correct: false },
    ],
  },
  {
    questions: "who is Priyanshi's favourite avenger?",
    answers: [
      { text: "Iron man", correct: true },
      { text: "Thor", correct: false },
      { text: "Spider-man", correct: false },
      { text: "Black widow", correct: false },
    ],
  },
  {
    questions: "Who is Priyanshi's fav korean actor?",
    answers: [
      { text: "Kim soo hyun", correct: false },
      { text: "Song Kang", correct: true },
      { text: "Park Hyung Sik", correct: false },
      { text: "Lee Min Ho", correct: false },
    ],
  },
  {
    questions: "Which is Priyanshi's favourite drama?",
    answers: [
      { text: "All of us are dead", correct: false },
      { text: "Someday or one day", correct: false },
      { text: "Its okay to not be okay", correct: false },
      { text: "Mr queen", correct: true },
    ],
  },
  {
    questions: "Who does Priyanshi like more",
    answers: [
      { text: "Zendaya", correct: true },
      { text: "Jisoo", correct: false },
      { text: "Seo Yea Ji", correct: false },
      { text: "Ariana Grande", correct: false },
    ],
  },
  {
    questions: "will Priyanshi date in her college ",
    answers: [
      { text: "Never", correct: false },
      { text: "No", correct: false },
      { text: "She will never find a perfect match", correct: true },
      { text: "She will remain single", correct: false },
    ],
  },
];

const questionElement = document.querySelector(".block");
const answerButton = document.querySelector(".margin");
const nextButton = document.getElementById("btn");


let currentquestionindex = 0;
let score = 0;
function startquiz() {
    let playerName = getPlayerName();
  currentquestionindex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function resetstate() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
  // answerButton.innerHTML = '';// here i cleare the inner html
}
function showQuestion() {
  // let currentquestion= question[currentquestionindex];
  // let questionNo= currentquestionindex+ 1;
  // questionElement.innerHTML=questionNo+"." +currentquestion.question;
  resetstate();
  let currentquestion = question[currentquestionindex];
  let questionNo = currentquestionindex + 1;
  questionElement.innerHTML = questionNo + ". " + currentquestion.questions;

  //    currentquestion.answers.forEach(answer=>{
  //     const button=document.createElement("button");
  //     button.innerHTML= answer.text;
  //     button.classList.add("btn");
  //     answerButton.appendChild(button);
  //    });

  //here

  currentquestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    // button.classList.add("mar");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
// function selectAnswer(e){
//     const selectedbtn= e.target;
//     const isCorrect= selectedbtn.dataset.correct==="true";
//     if(isCorrect){
//         selectedbtn.classList.add("correct");
//     }
//     else{
//         selectedbtn.classList.add("incorrect");
//     }
// }
function selectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }

  // // Disable further button clicks after selecting an answer
  // const buttons = answerButton.querySelectorAll('button');
  // buttons.forEach(button => {
  //     button.removeEventListener('click', selectAnswer);
  // });

  // // Show next button after selecting an answer
  nextButton.style.display = "block";
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
// Add a variable to track whether the quiz is completed


function showScore() {
  resetstate();
  const playerScore = { name: playerName, score: score };
  playerScoreBoard.push(playerScore);

  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

  localStorage.setItem("playerScoreboard", JSON.stringify(playerScoreBoard));
  quizCompleted = true;
  displayScoreboard();
 
}
// function handleNextbutton(){
//     currentquestionindex++;
//     if(currentquestionindex<questions.length){
//         showQuestion();
//     }
//     else{
//         showScore();
//     }
// }

function handleNextbutton() {
  currentquestionindex++;
  if (currentquestionindex < question.length) {
    // Check if there are more questions to display
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentquestionindex < question.length) {
    handleNextbutton();
  } else {
    startquiz();
  }
});

startquiz();

function displayScoreboard() {
  const savedScoreboard = JSON.parse(localStorage.getItem("playerScoreboard"));
  if (savedScoreboard) {
    playerScoreBoard = savedScoreboard;
    playerScoreBoard.sort((a, b) => b.score - a.score);
    //display scoreboard
    let scoreboardhtml = "<h2>Scoreboard</h2>";


    playerScoreBoard.forEach((player, index) => {
      scoreboardhtml += `<p>${index+1}.${player.name}: ${player.score}</p>`;
    });
    if (quizCompleted){
      document.querySelector(".scoreboard-container").style.display = "block";
      document.querySelector(".scoreboard").innerHTML = scoreboardhtml;
    }
    
  }
}

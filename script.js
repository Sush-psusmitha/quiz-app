const questions = [
    {
        question: "How many days do we have in a week?",
        answers:[
            {text: "5", correct: false },
            {text: "7", correct: true },
            {text: "9", correct: false },
            {text: "6", correct: false },
        ]
    }, 
    {
        question: "Which animal is known as the 'Ship of the Desert?",
        answers:[
            {text: "Monkey", correct: false },
            {text: "Elephant", correct: false },
            {text: "Camel", correct: true },
            {text: "Lion", correct: false },
        ]
    },
    {
        question: "How many letters are in the English alphabet?",
        answers:[
            {text: "26", correct: true },
            {text: "24", correct: false },
            {text: "25", correct: false },
            {text: "27", correct: false },
        ]
    }, 
    {
        question: "What festival is known as the festival of colors?",
        answers:[
            {text: "Pongal", correct: false },
            {text: "Holi", correct: true },
            {text: "Christmas", correct: false },
            {text: "Diwali", correct: false },
        ]
    }, 
    {    
        question: "Which month comes after May?",
        answers:[
            {text: "July", correct: false },
            {text: "October", correct: false },
            {text: "Auguest", correct: false },
            {text: "June", correct: true },
        ]
    },  
];

const questionElement = document.getElementById("question");
const anwserButtons= document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn"); 

let currentQuestionIndex = 0; 
let score = 0; 

function startQuiz(){
    currentQuestionIndex = 0; 
    score = 0; 
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){  
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; 
    let questionNo = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{ 
        const button = document.createElement("button"); 
        button.innerHTML = answer.text; 
        button.classList.add("btn"); 
        anwserButtons.appendChild(button); 
        if(answer.correct){ 
            button.dataset.correct = answer.correct; 
        } 
        button.addEventListener("click", selectAnswer); 
    });  
}

function resetState(){ 
    nextButton.style.display="none"; 
    while(anwserButtons.firstChild){
        anwserButtons.removeChild(anwserButtons.firstChild);
    }
}

function selectAnswer(e){
   const selectedBtn = e.target;
   const isCorrect = selectedBtn.dataset.correct === "true"; 
   if(isCorrect){
     selectedBtn.classList.add("correct");
     score++;
   } else{
    selectedBtn.classList.add("incorrect");
   }   

   Array.from(anwserButtons.children).forEach(button =>{
    if(button.dataset.correct ==="true"){
        button.classList.add("correct");
    } 
    button.disabled = true;
   }); 
   nextButton.style.display = "block";

}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`; 
    nextButton.innerHTML="play Again"; 
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++; 
    if(currentQuestionIndex < questions.length){
        showQuestion(); 
    } 
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz();
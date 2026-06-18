const questionContainer = document.querySelector('.questionContainer');

let currentQuestion = 0;

// Questions array with effect=true only for impactful questions
const questions = [
  { question: "What is your gender?", options: ["Male", "Female", "Other"], effect: false, answer: null },
  { question: "How many years have you been training?", options: ["<1", "1-3", "3-5", "5+"], effect: true, answer: null },
  { question: "Do you prefer low volume over high?", options: ["Yes", "No"], effect: true, answer: null },
  { question: "How many times a week do you train?", options: ["1-2", "3-4", "5+"], effect: true, answer: null },
  { question: "Do you like bodybuilding?", options: ["Yes", "No"], effect: true, answer: null },
  { question: "How old are you?", options: ["<18", "18-25", "25-35", "35+"], effect: false, answer: null },
  { question: "Do you like full body splits?", options: ["Yes", "No"], effect: true, answer: null },
];

// Show one question at a time
function showQuestion(index) {
  questionContainer.innerHTML = "";

  const q = questions[index];
  const questionText = document.createElement("p");
  questionText.innerText = q.question;
  questionText.classList.add("quiz-question");
  questionContainer.appendChild(questionText);

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("quiz-btn");
    btn.addEventListener("click", () => handleAnswer(index, option));
    questionContainer.appendChild(btn);
  });
}

// Handle answer click
function handleAnswer(index, selectedOption) {
  questions[index].answer = selectedOption;

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    showResult();
  }
}

// Show the final program recommendation
function showResult() {
  let program = "Essentials Program"; // default program

  // Logic to determine which program to show
  const years = questions[1].answer;
  const lowVolume = questions[2].answer;
  const freq = questions[3].answer;
  const bodybuilding = questions[4].answer;
  const fullBody = questions[6].answer;

  if (bodybuilding === "Yes" && years === "5+") {
    program = "Pure Body Building";
  } else if (fullBody === "Yes" && years === "<3") {
    program = "Full Body Program";
  } else if (lowVolume === "Yes" && freq === "3-4") {
    program = "BTS Program";
  } else if (years === "3-5") {
    program = "Min-Max Program";
  }

  // Display the recommended program
  questionContainer.innerHTML = `<h2>The Program We Recommend For You:</h2>
                                 <p>${program}</p>`;
}

// Start the quiz
showQuestion(currentQuestion);

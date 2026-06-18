const questions = [
    { question: "Wat betekent HTML?", answer: ["HyperText Markup Language"], options: ["HighText Machine Language", "HyperText Markup Language", "Hyper Transfer Main Link"] },
    { question: "Welke tag gebruik je om een link te maken?", answer: ["<a>"], options: ["<link>", "<a>", "<href>"] },
    { question: "Wat doet de tag <p>?", answer: ["Voegt een paragraaf toe"], options: ["Voegt een paragraaf toe", "Voegt een afbeelding toe", "Maakt tekst blauw"] },
    { question: "Wat betekent de tag <img>?", answer: ["Een afbeelding toevoegen"], options: ["Een afbeelding toevoegen", "Een link maken", "Tekst vet maken"] },
    { question: "Welke extensie heeft een HTML-bestand?", answer: [".html"], options: [".js", ".html", ".css"] },
    { question: "Wat betekent CSS?", answer: ["Cascading Style Sheets"], options: ["Color Styling System", "Creative Style Setup", "Cascading Style Sheets"] },
    { question: "Wat doe je met CSS?", answer: ["HTML Opmaken"], options: ["HTML Opmaken", "Maakt script", "Niks"] },
    { question: "Hoe verander je de tekstkleur in CSS?", answer: ["color"], options: ["font-color", "text", "color"] },
    { question: "Met welk symbool geef je een klasse aan in CSS?", answer: ["."], options: ["#", ".", "/"] },
    { question: "Wat gebruik je om websites te stijlen?", answer: ["CSS"], options: ["HTML", "CSS", "JavaScript"] },
    { question: "Wat is JS?", answer: ["JavaScript"], options: ["jasonScrips", "Json", "JavaScript"] },
    { question: "Wat doet de 'console.log()' functie?", answer: ["Print iets in de console"], options: ["Start een loop", "Print iets in de console", "Maakt een tabel"] },
    { question: "Wat is een variabele?", answer: ["Een opslagplek voor data"], options: ["Een opslagplek voor data", "Een functie", "Een database"] },
    { question: "Wat doet een if-statement?", answer: ["Voert code uit als een voorwaarde waar is"], options: ["Voert code uit als een voorwaarde waar is", "Start altijd", "Herhaalt oneindig"] },
    { question: "Waarvoor gebruik je een for-loop?", answer: ["Om code te herhalen"], options: ["Om code te herhalen", "Om CSS te maken", "Om fouten te vinden"] },
    { question: "Wat betekent ICT?", answer: ["Informatie en Communicatie Technologie"], options: ["Internet Code Training", "Informatie en Communicatie Technologie", "Inter Computer Taal"] },
    { question: "Wat is een bug?", answer: ["Een fout in de code"], options: ["Een fout in de code", "Een software-update", "Een type variabele"] },
    { question: "Wat is een array?", answer: ["Een lijst van waarden"], options: ["Een lijst van waarden", "Een soort bug", "Een database"] },
    { question: "Wat is een functie in programmeren?", answer: ["Een blok code dat iets uitvoert"], options: ["Een blok code dat iets uitvoert", "Een foutmelding", "Een variabele"] },
    { question: "Wat gebruik je om een database te beheren?", answer: ["SQL"], options: ["SQL", "CSS", "HTML"] }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.querySelector("#text");
const optionsContainer = document.querySelector("#optionsContainer");
const blurbg = document.querySelector("#blur-background");
const feedback = document.querySelector("#feedback");
const scoreContainer = document.querySelector("#score");
const powerup1 = document.getElementById("50Btn");
const powerup2 = document.getElementById("SkipBtn");
const restartBtn = document.getElementById("restartBtn");
const Menu = document.getElementById("BackToMenu");


questions.sort(() => Math.random() - 0.5);
questions.forEach(q => q.options.sort(() => Math.random() - 0.5));

let name = prompt ("Enter Name");
const Uname = document.getElementById ("name");
Uname.innerHTML = `Username: ${name}`;




function loadQuestion() {
    scoreContainer.innerHTML = `Score: ${score}`;
    const currentQuestion = questions[currentQuestionIndex];
    const CRNTquestion = document.getElementById("CRNTQuestion");
    CRNTquestion.textContent = `Vraag ${currentQuestionIndex + 1} / ${questions.length}`;
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    feedback.classList.remove("correct", "wrong", "show", "hidden");

    document.querySelectorAll("#optionsContainer button").forEach(btn => btn.disabled = true);

    if (currentQuestion.answer.includes(selectedOption)) {
        score++;
        feedback.textContent = "Correct!";
        feedback.classList.add("correct");
    } else {
        if(score==0){score=0;}
        else{score--}
        feedback.textContent = `Fout! Juist antwoord: ${currentQuestion.answer.join(", ")}`;
        feedback.classList.add("wrong");
    }

    blurbg.style.display = "block";
    feedback.classList.add("show");

    setTimeout(() => {
        feedback.classList.remove("show");
        feedback.classList.add("hidden");
        blurbg.style.display = "none";
        nextQuestion();
    }, 1500);
}

function nextQuestion() {
    currentQuestionIndex++;
    powerup1.disabled = false;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionText.textContent = `Quiz klaar! Score: ${score}/${questions.length}`;
        optionsContainer.innerHTML = "";
        feedback.classList.add("hidden");
        scoreContainer.style.display="none";
        restartBtn.style.display = "inline-block";
        Menu.style.display = "inline-block";

    }
}
restartBtn.addEventListener("click", function() {
    currentQuestionIndex = 0;
    score = 0;
    skips = 0;
    scoreContainer.style.display = "block";
    restartBtn.style.display = "none";
    Menu.style.display = "none";

    loadQuestion();
});

powerup1.addEventListener("click", function(){
    
    let randomIdx = Math.floor(Math.random() * questions[currentQuestionIndex].options.length);
    while(randomIdx == questions[currentQuestionIndex].options.indexOf(questions[currentQuestionIndex].answer[0])){
        randomIdx = Math.floor(Math.random() * questions[currentQuestionIndex].options.length);
    }
    optionsContainer.removeChild(optionsContainer.children[randomIdx]);
    powerup1.disabled = true;

})    
let skips = 0;

powerup2.addEventListener("click", function(){
    if (skips === 20){
        return;
    }
    skips++;
    nextQuestion()
})

loadQuestion();

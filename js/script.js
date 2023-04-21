const questions = [ //Fragen erstellen
  {
    question: "Wie viele Sitzplätze hat der ID. 7?",
    answers: [
      { text: "4 Sitzplätze", correct: false },
      { text: "5 Sitzplätze", correct: false },
      { text: "6 Sitzplätze", correct: false },
      { text: "7 Sitzplätze", correct: true }
    ]
  },
  {
    question: "Wie groß ist die Batteriekapazität des ID. 7?",
    answers: [
      { text: "55 kWh", correct: false },
      { text: "77 kWh", correct: true },
      { text: "92 kWh", correct: false },
      { text: "125 Kwh", correct: false }
    ]
  },
  {
    question: "Welche Ladeleistung unterstützt der ID. 7 bei einer DC-Schnellladesäule?",
    answers: [
      { text: "95 kW", correct: false },
      { text: "150 kW", correct: false },
      { text: "170 kW", correct: true },
      { text: "200 Kw", correct: false }
    ]
  },
  {
    question: "Wie hoch ist die maximale Leistung des VW ID.7?",
    answers: [
      { text: "150 PS", correct: false },
      { text: "200 PS", correct: false },
      { text: "250 PS", correct: true },
      { text: "300 PS", correct: false }
    ]
  },
  {
    question: "Wie viel Kofferraum Volumen bietet der VW ID. 7?",
    answers: [
      { text: "800 Liter (c.a. Tuareg)", correct: false },
      { text: "650 Liter (ca. Passat B8)", correct: true },
      { text: "500 Liter (ca. Tiguan)", correct: false },
      { text: "380 Liter (ca. Golf 8)", correct: false }
    ]
  },
  {
    question: "Welche Assistenzsysteme sind im ID. 7 verfügbar?",
    answers: [
      { text: "ACC", correct: false },
      { text: "Spurhalteassistent", correct: false },
      { text: "Notbremsassistent", correct: false },
      { text: "alle der oben genannten", correct: true }
    ]
  },
  {
    question: "Wie ist die maximale Reichweite mit der Pro S Version (WLTP)?",
    answers: [
      { text: "500 Kilometer", correct: false },
      { text: "600 Kilometer", correct: false },
      { text: "700 Kilometer", correct: true },
      { text: "800 Kilometer", correct: false }
    ]
  },

  {
    question: "Wie lange dauert es, von 10 auf 80 % zu Laden mit 200kW DC?",
    answers: [
      { text: "c.a. 20 Minuten", correct: true},
      { text: "c.a. 30 Minuten", correct: false},
      { text: "c.a. 45 Minuten", correct: false},
      { text: "c.a. 45 - 60 Minuten", correct: false}

    ]
  },

  {
    question: "Was findest du am besten beim neuen ID. 7?",
    answers: [
      { text: "Das neue Elektrochromdach ", correct: true},
      { text: "700 KM Reichweite mit fast 30min laden ", correct: true},
      { text: "Das Limousinen Design als Elektro", correct: true},
      { text: "Die neuen klimatisierten Sitze im ID.7", correct: true}
  
    ]
  },


  ];

  //Definition der Konstanten
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const createPDFButton = document.getElementById("create-pdf-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() { //Beim Rundenstart von vorne zählen
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() { //Initialisieren der Fragen
  resetState ();
    let currentQuestion = questions [currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      button.dataset.correct = answer.correct;
      /* button.type = "hidden" */
      answerButtons.appendChild(button);
      
      if (button.correct) { //Bei richtiger Antwort nächste Frage
            button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });      
}


function resetState(){
    nextButton.style.display = "none";
    createPDFButton.style.display = "none";
    while(answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer (e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct;
  console.log(isCorrect); 
  
  if (isCorrect === "true") {
    selectedBtn.classList.add("correct"); //correct klasse hinzufügen
    score++; //bei richtiger antwort Score um 1 erhöhen
  }else{
    selectedBtn.classList.add("incorrect"); //incorrect klasse hinzufügen
    /* alert("Falsche Antwort"); */
    }
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true") {
            button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }

   function showScore() {
    resetState();
    questionElement.innerHTML = `Du hast ${score} von ${questions.
    length} Fragen zum ID. 7 richtig beantwortet!`;
    nextButton.innerHTML = "Nochmal versuchen";
    nextButton.style.display = "block"; //button nur im end-screen anzeigen
    createPDFButton.innerHTML = "Ergebnis als PDF speichern";
    createPDFButton.style.display = "block"; //button nur im end-screen anzeigen
  } 
  
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) { //überprüfen ob das quiz schon vorbei ist
      showQuestion ();
    } else {
      showScore ();
    }
  }
  
  nextButton.addEventListener("click", () =>{
    if (currentQuestionIndex < questions.length) {
      handleNextButton(); //next button anzeigen, damit er nicht im end-screen erscheint
    } else {
      startQuiz ();
    }
  });


startQuiz();
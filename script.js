//your JS code here.
// This array will store the user's answers. Initialize it with null values.
const progress = new Array(questions.length).fill(null);

// Function to update userAnswers array when a choice is selected
function updateAnswer(questionIndex, selectedChoice) {
  progress[questionIndex] = selectedChoice;
  // Save userAnswers to session storage
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Function to calculate and display the user's score
function calculateAndDisplayScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Save the user's score to local storage
  localStorage.setItem("score", score);

  // Display the score on the page
  const scoreElement = document.createElement("div");
  const scoreText = document.createTextNode(`Your Score: ${score}/${questions.length}`);
  scoreElement.appendChild(scoreText);
  questionsElement.appendChild(scoreElement);
}

// Add an event listener to the quiz questions to update the user's answers
questionsElement.addEventListener("change", (event) => {
  const selectedChoice = event.target.value;
  if (event.target.type === "radio") {
    const questionIndex = parseInt(event.target.getAttribute("name").replace("question-", ""));
    updateAnswer(questionIndex, selectedChoice);
  }
});

// Load userAnswers from session storage, if available
const storedUserAnswers = sessionStorage.getItem("progress");
if (storedUserAnswers) {
  userAnswers = JSON.parse(storedUserAnswers);

  // Update the radio buttons to reflect the user's previous choices
  renderQuestions();
}

// Calculate and display the user's score, if all questions are answered
if (!userAnswers.includes(null)) {
  calculateAndDisplayScore();
}
// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
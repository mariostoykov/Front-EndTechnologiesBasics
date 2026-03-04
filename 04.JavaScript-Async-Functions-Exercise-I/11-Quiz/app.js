function askQuestion(question, answers) {
    return new Promise((resolve) => {
        let message = question + '\n';
        answers.forEach((answer, index) => {
            message += `${index + 1}. ${answer}\n`;
        });
        const answer = prompt(message);
        resolve(parseInt(answer) - 1);
    })
}

const questions = [
    {
        question: "What is 3 - 1?",
        answers: ["1", "2", "3"],
        correct: 1
    },
    {
        question: "What is the capital of Bulgaria",
        answers: ["Sofia", "Serbia", "Athens"],
        correct: 0
    },
    {
        question: "What is the longest river in the World",
        answers: ["Amazon", "Danube", "Nile"],
        correct: 2
    }
];

async function startQuiz() {
    console.log("Quiz started");
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        const { question, answers, correct } = questions[i];
        const userAnswer = await askQuestion(question, answers);
        if (userAnswer === correct) {
            console.log("Correct!");
            score++;
        } else {
            console.log("Wrong!");
        }
    }
    console.log(`\nYou scored ${score} out of ${questions.length}.`);
}

window.startQuiz = startQuiz;
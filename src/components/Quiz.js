import { useState, useEffect } from "react"
import Question from "./Question"

const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context('../quizzes/reactjs', false, /\.md$/))
    .sort()
    .reverse();

const QUIZ_LENGHT = 3

const Quiz = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const fetchQuizzes = async () => {
        const quizzes = await Promise.all(markdownFiles.map((file) => fetch(file).then((res) => res.text())))
        .catch((err) => console.error(err))

        if(quizzes.length > 0){
            // split questions to question array
            let allQuestions = quizzes[0].split(/(?=####)/g)
            // remove first element
            allQuestions.shift()
            
            const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random())
            setSelectedQuestions(shuffledQuestions.slice(0, QUIZ_LENGHT))
        }
    }

    useEffect(() => {
        fetchQuizzes();
    }, [])

    const handleAnswer = answer => {
        let answersArray = [...answers]
        answersArray[questionIndex] = answer

        setAnswers(answersArray)
        setQuestionIndex(questionIndex +1)
    }

    if (selectedQuestions.length === 0){
        return null
    }

    if (questionIndex > QUIZ_LENGHT-1){

        let score = 0

        answers.forEach(element => {
            score += element
        })

        return (
            <h1>Your score: {score}/{QUIZ_LENGHT}</h1>
        )
    }

    return (
        <section className="section">
            <h1>Question {questionIndex+1} of {QUIZ_LENGHT}</h1>
            <Question
                question={selectedQuestions[questionIndex]}
                questionIndex={questionIndex}
                handleAnswer={(answer)=>handleAnswer(answer)}
            />
        </section>
    )
}

export default Quiz
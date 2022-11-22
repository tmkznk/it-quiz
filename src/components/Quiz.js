import { useState } from "react"
import Intro from './Intro'
import Question from "./Question"
import Summary from "./Summary"
import Layout from "./Layout"

const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context('../quizzes/', true, /\.md$/))
    .sort();

const Quiz = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [quizLength, setQuizLength] = useState(0);
    const [quizTime, setQuizTime] = useState(0);

    const loadQuiz = async (quizSettings) => {
        if(quizSettings.save){
            localStorage.setItem('quizSettings', JSON.stringify(quizSettings))
        }

        const quiz = await fetch(quizSettings.quiz)
            .then((res) => res.text())
            .catch(err => console.log(err));

        // split questions to question array
        let allQuestions = quiz.split(/(?=####)/g)
        // remove first element
        allQuestions.shift()
            
        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random())
        setSelectedQuestions(shuffledQuestions.slice(0, quizSettings.length))

        setQuizLength(quizSettings.length)
        setQuizTime(quizSettings.time)
    }

    const handleAnswer = answer => {
        let answersArray = [...answers]
        answersArray[questionIndex] =  JSON.parse(answer)

        setAnswers(answersArray)
        setQuestionIndex(questionIndex +1)
    }

    if (selectedQuestions.length === 0){
        return (
            <Intro
                markdownFiles={markdownFiles}
                loadQuiz={loadQuiz}
            />
        )
    }

    if (questionIndex > quizLength-1){

        let score = 0

        answers.forEach(element => {
            score += element.answerValue
        })

        return (
            <Summary
                score={score}
                quizLength={quizLength}
                selectedQuestions={selectedQuestions}
                answers={answers}
            />
        )
    }

    return (
        <Layout>
            <h1>Question {questionIndex+1} of {quizLength}</h1>
            <Question
                question={selectedQuestions[questionIndex]}
                questionIndex={questionIndex}
                handleAnswer={(answer)=>handleAnswer(answer)}
                quizTime={quizTime}
            />
        </Layout>
    )
}

export default Quiz
import { useState, useEffect } from "react"
import Intro from './Intro'
import Question from "./Question"
import Summary from "./Summary"
import Layout from "./Layout"

const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context('../quizzes/', true, /\.md$/))
    .sort();

const QUIZ_LENGTH = 3

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
            setSelectedQuestions(shuffledQuestions.slice(0, QUIZ_LENGTH))
        }
    }

    // useEffect(() => {
    //     fetchQuizzes();
    // }, [])

    const loadQuiz = async (file) => {
        const quiz = await fetch(file)
            .then((res) => res.text())
            .catch(err => console.log(err));

        // split questions to question array
        let allQuestions = quiz.split(/(?=####)/g)
        // remove first element
        allQuestions.shift()
            
        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random())
        setSelectedQuestions(shuffledQuestions.slice(0, QUIZ_LENGTH))
    }

    const handleAnswer = answer => {
        let answersArray = [...answers]
        answersArray[questionIndex] = answer

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

    if (questionIndex > QUIZ_LENGTH-1){

        let score = 0

        answers.forEach(element => {
            score += element
        })

        return (
            <Summary score={score} quizLength={QUIZ_LENGTH} />
        )
    }

    return (
        <Layout>
            <h1>Question {questionIndex+1} of {QUIZ_LENGTH}</h1>
            <Question
                question={selectedQuestions[questionIndex]}
                questionIndex={questionIndex}
                handleAnswer={(answer)=>handleAnswer(answer)}
            />
        </Layout>
    )
}

export default Quiz
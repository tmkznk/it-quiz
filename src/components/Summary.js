import Layout from "./Layout"
import Question from "./Question"

const Summary = ({score, quizLength, selectedQuestions, answers}) => {    
    
    
    return (
        <Layout>
            <h1>Your score: {score}/{quizLength}</h1>

            <h2>Correct answers:</h2>
            <hr />
            {selectedQuestions.map((question, idx) =>  (
                <Question
                    key={idx}
                    question={question}
                    answers={answers}
                    questionIndex={idx}
                />
            ))}

            <button
                className="btn btn-lg btn-primary w-100 mt-4"
                onClick={()=>{window.location.reload()}}
            >
                Play again
            </button>
        </Layout>
    )
}

export default Summary
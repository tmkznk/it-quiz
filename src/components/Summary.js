import Layout from "./Layout"

const Summary = ({score, quizLength}) => {    
    return (
        <Layout>
            <h1>Your score: {score}/{quizLength}</h1>

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
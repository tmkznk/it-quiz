import { useState } from 'react'
import Layout from "./Layout"

const Intro = ({markdownFiles, loadQuiz}) => {   
    const [quiz, selectQuiz] = useState('')

    const handleChange = event => {
        selectQuiz(event.target.value)
    }

    const onlyEnglishTests = markdownFiles.filter(el => !(el.includes('quiz-it') || el.includes('quiz-es') || el.includes('quiz-fr')))

    return (
        <Layout>
            <h1>IT Quiz</h1>
            <p>Welcome in IT Quiz. This quiz is based on Linkedin skill assessments quizes. <br/>
            Every Quiz has 15 questions. For each question you have 60 s.</p>
            <p><strong>Good luck!</strong></p>
            <hr />
            <div>
                <label htmlFor="quiz-select">Choose a quiz:</label>
                <select id="quiz-select" className="form-select" aria-label="Select quiz" onChange={handleChange}>
                    <option defaultValue value="">Please choose an option</option>
                    {onlyEnglishTests.map(file=>(
                        <option value={file} key={file}>{file.replace('/static/media/', '').split('-quiz')[0]}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-lg btn-primary w-100 mt-4" onClick={()=>loadQuiz(quiz)}>Start quiz</button>
        </Layout>
    )
}

export default Intro
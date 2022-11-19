import { useState } from 'react'
import Layout from "./Layout"

const Intro = ({markdownFiles, loadQuiz}) => {   

    const savedQuizSettings = JSON.parse(localStorage.getItem('quizSettings'))
    const defaultQuizSettings = {quiz: '', length: 15, time: 90, save: false}

    const [quizSettings, setQuizSettings] = useState(savedQuizSettings ? savedQuizSettings : defaultQuizSettings)

    const handleChange = event => {
        const name = event.target.name
        const value = event.target.value
        const checked = event.target.checked

        if (name === 'save'){
            setQuizSettings({...quizSettings, [name]: checked})    
        } else {
            setQuizSettings({...quizSettings, [name]: value})
        }
    }

    const onlyEnglishTests = markdownFiles.filter(el => !(el.includes('quiz-it') || el.includes('quiz-es') || el.includes('quiz-fr')))

    return (
        <Layout>
            <h1>IT Quiz</h1>
            <p>Welcome in IT Quiz. This quiz is based on Linkedin skill assessments quizes. <br/>
            You can choose quiz topic, set number of questions and time to answer.</p>
            <p><strong>Good luck!</strong></p>
            
            <div className="mt-4 mb-3">
                <label htmlFor="quiz-select" className="form-label">Choose a quiz:</label>
                <select name="quiz" value={quizSettings.quiz} id="quiz-select" className="form-select" aria-label="Select quiz" onChange={handleChange}>
                    <option value="">Please choose an option</option>
                    {onlyEnglishTests.map(file=>(
                        <option value={file} key={file}>{file.replace('/static/media/', '').split('-quiz')[0]}</option>
                    ))}
                </select>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="quiz-length" className="form-label">Set the number of questions in the quiz</label>
                        <input name="length" type="number" value={quizSettings.length} className="form-control" id="quiz-length" placeholder="" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="quiz-time" className="form-label">Set the time to answer the question</label>
                        <input name="time" type="number" value={quizSettings.time} className="form-control" id="quiz-time" placeholder="" onChange={handleChange} />
                    </div>
                </div>
            </div>

            <div className="form-check">
                <input name="save" className="form-check-input" type="checkbox" id="quiz-save" onChange={handleChange} />
                <label className="form-check-label" htmlFor="quiz-save">
                    Save quiz settings
                </label>
            </div>
            
            <button className="btn btn-lg btn-primary w-100 mt-4" onClick={()=>loadQuiz(quizSettings)}>Start quiz</button>
        </Layout>
    )
}

export default Intro
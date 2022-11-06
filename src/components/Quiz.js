import { useState, useEffect } from "react"
import Markdown from "markdown-to-jsx"

const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context('../quizzes/reactjs', false, /\.md$/))
    .sort()
    .reverse();

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);

    const fetchQuizzes = async () => {
        const quizzes = await Promise.all(markdownFiles.map((file) => fetch(file).then((res) => res.text())))
        .catch((err) => console.error(err))
        setQuizzes(quizzes)
    }

    useEffect(() => {
        fetchQuizzes();
    }, [])

    let questionArray = []

    if(quizzes.length > 0){
        questionArray = quizzes[0].split(/(?=####)/g);
    }

    return (

        <section className="section">
            {
                questionArray.map((post, idx) => (
                    <div className="card" key={idx}>
                        <div className="card-content">
                            <div className="content">
                                <h1>{idx}</h1>
                                <Markdown>{post}</Markdown>
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default Quiz
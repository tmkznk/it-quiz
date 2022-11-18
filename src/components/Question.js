import { useRef } from 'react'
import Markdown from "markdown-to-jsx"
import Countdown from "./Countdown";

const Question = ({question, questionIndex, handleAnswer}) => {    
    const MyInput = ({ children, ...props }) => {
        return (
            <input
                type="radio"
                name="question"
                value={+props.checked}
            />
        )
    };

    const handleSubmit = event => {
        event.preventDefault();
        handleAnswer(+event.currentTarget['question'].value);
    }

    const formRef = useRef();

    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit}>    
                <Countdown formRef={formRef} handleAnswe={handleAnswer} questionIndex={questionIndex} />
                <Markdown
                    options={{
                        overrides: {
                            input: {
                                component: MyInput,
                            },
                        },
                    }}
                >
                    {question}
                </Markdown>
                <button className="btn btn-lg btn-primary w-100 mt-4" type="submit">Next</button>
            </form>
        </>
    )
}

export default Question
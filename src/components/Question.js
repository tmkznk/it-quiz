import { useState } from 'react'
import Markdown from "markdown-to-jsx"
import Countdown from "./Countdown";

const Question = ({question, handleAnswer}) => {    
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

    return (
        <>
            <Countdown />
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Next</button>
            </form>
        </>
    )
}

export default Question
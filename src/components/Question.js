import { useRef } from 'react'
import Markdown from "markdown-to-jsx"
import Countdown from "./Countdown";

const Question = ({question, questionIndex, handleAnswer, quizTime, answers}) => {    
    
    let answerIdx = 0
    
    const MyInput = ({ children, ...props }) => {
        ++answerIdx

        return (
            <input
                type="radio"
                name="question"
                value={ JSON.stringify({answerValue: +props.checked, selectedAnswerIdx: answerIdx})}
            />
        )
    };

    const myLi = ({ children }) => {
        return (
            <li><label>{children}</label></li>
        )
    };

    const MyInput2 = ({ children, ...props }) => {
        return (
            <input
                type="radio"
                defaultChecked={props.checked}
            />
        )
    };

    const myLi2 = ({ children }) => {
        ++answerIdx;    
        let className = '';

        if(children[0].props.checked){
            className += " correct"
        }

        if(answers[questionIndex].selectedAnswerIdx === answerIdx){
            className += " your-answer"
        }

        return (
            <li className={className}>{children}</li>
        )
    };

    const handleSubmit = event => {
        event.preventDefault();
        handleAnswer(event.currentTarget['question'].value);
    }

    const formRef = useRef();

    if(handleAnswer){
        return (
            <>
                <form ref={formRef} onSubmit={handleSubmit}>    
                    {quizTime && (
                        <Countdown
                            formRef={formRef}
                            handleAnswe={handleAnswer}
                            questionIndex={questionIndex}
                            quizTime={quizTime}
                        />
                    )}
                    
                    <Markdown
                        options={{
                            overrides: {
                                input: {
                                    component: MyInput,
                                },
                                li: {
                                    component: myLi,
                                }
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

    return (
        <>
            <Markdown
                options={{
                    overrides: {
                        input: {
                            component: MyInput2,
                        },
                        li: {
                            component: myLi2,
                        }
                    },
                }}
            >
                {question}
            </Markdown>
            <hr />
        </>
    )

    
}

export default Question
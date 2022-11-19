import {useState, useEffect} from 'react'

const Countdown = ({formRef, questionIndex, quizTime}) => {    
    const [countdown, setCountdown] = useState(quizTime)

    useEffect(()=>{
        setCountdown(quizTime)
    }, [questionIndex]);

    useEffect(() => {
        let timer1 = setTimeout(() => setCountdown(countdown - 1), 1000);    
        if(countdown === 0){
            formRef.current.dispatchEvent(new Event("submit", {bubbles: true, cancelable: true}))
        }
        return () => {
            clearTimeout(timer1);
        };
    }, [countdown])

    return (
        <p className="my-4">Time left: {countdown} s.</p>    
    )
}

export default Countdown

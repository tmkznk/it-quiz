import {useState, useEffect} from 'react'

const Countdown = () => {    
    const [countdown, setCountdown] = useState(10)
    
    useEffect(() => {
        if(countdown > 0){
            setTimeout(()=>(
                setCountdown(countdown - 1)
            ), 1000)
        }
    }, [countdown])

    return (
        <p>Time left: {countdown}</p>    
    )
}

export default Countdown
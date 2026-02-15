import { useState } from 'react'

const Statistics = (props) => {
    const {good, bad, neutral} = props;
    const all = good + neutral + bad;
    const average = (good + bad * -1) / all;
    const positive = good / all * 100;
    
    return (
        <>
            <h1>statistics</h1>
            {all > 0 && 
                <div>
                    <table>
                        <tbody>
                            <StatisticLine text="good" value={good} />
                            <StatisticLine text="neutral" value={neutral}/>
                            <StatisticLine text="bad" value={bad}/>
                            <StatisticLine text="all" value={all}/>
                            <StatisticLine text="average" value={average ? average : 0}/>
                            <StatisticLine text="positive" value={positive ? `${positive} %` : 0}/>
                        </tbody>
                    </table>
                </div>
            }
            {all === 0 && 
                <div>
                    <p>No feedback given</p>
                </div>
            }
        </>
    )
}

const StatisticLine = (props) => {
    const {text, value} = props;
    
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = (props) => {
    const {onClick, text} = props;
    
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    return (
        <>
            <h1>give feedback</h1>
            <div>
                <Button onClick={() => setGood(good + 1)} text='good' />
                <Button onClick={() => setNeutral(neutral + 1)} text='neutral'></Button>
                <Button onClick={() => setBad(bad + 1)} text='bad'/>
            </div>
            <Statistics good={good} bad={bad} neutral={neutral} />
        </>
    )
}

export default App
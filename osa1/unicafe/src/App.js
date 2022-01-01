import React, { useState } from 'react'
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)



const Statistics = ({ data }) => {
  const [good, neutral, bad] = data
  const all = good + neutral + bad
  const avg = (good * 1 + bad * (-1)) / all
  const pos = (good / all * 100)+'%'
  if(all==0){
    return(
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={avg}/>
      <StatisticLine text='positive' value={pos}/>
      </tbody>
    </table>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addClick = (func, test) => {
    func(test + 1)
    console.log(test)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => addClick(setGood, good)} text='good' />
      <Button handleClick={() => addClick(setNeutral, neutral)} text='neutral' />
      <Button handleClick={() => addClick(setBad, bad)} text='bad' />
      <h1>statistics</h1>
      <Statistics data={[good, neutral, bad]} />
    </div>
  )
}

export default App
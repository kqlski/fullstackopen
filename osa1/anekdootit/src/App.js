import React, { useState } from 'react'
let mostVotes = 0
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const voteClick= ()=>{
    const newVotes= votes[selected]+1
    setVote({...votes,[selected]:newVotes})
    if(newVotes>mostVotes){
      mostVotes=newVotes
      setTopAnecdote(selected)
    }
  }
  const [topAnecdote,setTopAnecdote] = useState(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVote]= useState([0,0,0,0,0,0,0])
  const next =()=>{
    let random = (Math.floor(Math.random()*anecdotes.length))
    while (random === selected){
      random = (Math.floor(Math.random()*anecdotes.length))
    }
    setSelected(random)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteClick}>vote</button>
      <button onClick={next}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[topAnecdote]}</p>
      <p>has {votes[topAnecdote]} votes</p>
    </div>
  )
}

export default App
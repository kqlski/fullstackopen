import React from 'react'
const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }
  const Part = (props) => {
  
    return (
      <p>{props.name} {props.exercises}</p>
    )
  }
  const Content = ({ parts }) => {
  
    return (
      <div>
        {parts.map(n =>
          <Part key={n.id} name={n.name} exercises={n.exercises} />
        )}
      </div>
    )
  }
  
  
  const Total = ({ parts }) => {
    const sumOfExercises = parts.map(n => n.exercises).reduce((s, n) => s + n)
    return (
      <div>
        <b>Total exercises {sumOfExercises}</b>
      </div>
    )
  
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course
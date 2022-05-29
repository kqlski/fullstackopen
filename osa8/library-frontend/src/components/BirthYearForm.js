import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'
import Select from 'react-select'
const BirthYearForm = ({ authors }) => {
  const [authorName,setAuthorName]=useState('')
  const [birthYear, setBirthYear] = useState('')

  const [setBirth] = useMutation(SET_BIRTHYEAR)
  const submit = async (event) => {
    event.preventDefault()
    setBirth({ variables: {name:authorName, setBornTo: Number(birthYear) } })
    // console.log('add book...')
    setBirthYear('')
  }
  const options =
    authors.map(author =>
      ({ value: author.name, label:author.name})
    )

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select options={options} onChange={(target)=>setAuthorName(target.value)}/>
        <div>
          born
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button disabled={authorName.length===0||birthYear.length===0}type="submit">create book</button>
      </form>
    </div>
  )
}

export default BirthYearForm

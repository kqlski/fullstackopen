import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(props.genre)
  const allBooksRes = useQuery(ALL_BOOKS)
  const booksRes = useQuery(ALL_BOOKS, {
    variables: {
      genre: props.genre ? props.genre : genreFilter
    }
  })

  if (!props.show) {
    return null
  }
  if (booksRes.loading || allBooksRes.loading) {
    return <div>loading...</div>
  }
  const books = genreFilter?booksRes.data.allBooks:allBooksRes.data.allBooks
  const allGenres = [...new Set(allBooksRes.data.allBooks.flatMap(n => n.genres))]
  return (
    <div>
      <h2>books</h2>
      {
        genreFilter ?
          <div>in genre <strong>{genreFilter}</strong></div> :
          <div>all genres</div>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!props.hideFilters &&
        <>
          {allGenres.map((g) =>
            <button key={g} onClick={() => setGenreFilter(g)}>{g}</button>
          )}
          <button onClick={() => setGenreFilter(null)}>all genres</button>
        </>
      }
    </div>
  )
}

export default Books

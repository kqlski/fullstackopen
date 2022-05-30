import { useQuery } from "@apollo/client"
import { USER } from "../queries"
import Books from "./Books"

const Recommended = (props) => {
  const userInfo = useQuery(USER)
  if (!props.show) return null
  if (userInfo.loading) return <div>loading...</div>
  const favGenre = userInfo.data.me.favoriteGenre
  return <div>
    <h2>recommendations</h2>
    <div>books in your favorite genre <strong>{favGenre}</strong></div>
    <Books show genre={favGenre} hideFilters />
  </div>
}
export default Recommended
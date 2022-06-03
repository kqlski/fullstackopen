import {gql} from '@apollo/client'

export const ALL_AUTHORS=gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS=gql`
query($genre:String) {
  allBooks(genre:$genre) {
    title
    author{
      name
    }
    genres
    published
    id
  }
}
`
export const ADD_BOOKS=gql`
mutation ($title:String!,$author:String!,$published:Int!,$genres:[String!]!){
  addBook(
    title:$title,
    author:$author,
    published:$published,
    genres:$genres
  ){
    title
    author{
      name
    }
    published
    genres
    id
  }
}
`
export const SET_BIRTHYEAR=gql`
mutation ($name:String!,$setBornTo:Int!){
  editAuthor(
    name:$name,
    setBornTo:$setBornTo
  ){
    born
    id
  }
}
`
export const LOGIN = gql`
mutation login($username:String!,$password:String!){
  login (username: $username, password: $password){
    value
  }
}
`
export const USER = gql`
query Me {
  me {
    username
    favoriteGenre
  }
}
`

export const BOOK_ADDED=gql`
subscription {
  bookAdded{
    title
    author{
      name
    }
    published
    genres
    id
  }
}
`
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
query {
  allBooks {
    title
    author
    published
    id
  }
}
`
export const ADD_BOOKS=gql`
mutation ($title:String!,$author:String!,$published:Int!,$genres:[String!]){
  addBook(
    title:$title,
    author:$author,
    published:$published,
    genres:$genres
  ){
    title
    author
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
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
const blog = {
  title: 'cooking with a coder',
  url: 'codercooker.com',
  author: 'Patrick',
  likes: 0
}
let component
let mockHandler
beforeEach(() => {
  mockHandler = jest.fn()
  component = render(
    <Blog blog={blog} addLike={mockHandler} />
  )
})

test('renders title and author but nothing else', () => {


  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(component.container.querySelector('.togglable')).toHaveStyle('display: none')
})

test('when show clicked shows all the content', () => {
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(component.container.querySelector('.togglable')).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container.querySelector('.togglable')).not.toHaveStyle('display: none')

})
test('like works when clicked twice', () => {
  const button = component.container.querySelector('.likeButton')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})
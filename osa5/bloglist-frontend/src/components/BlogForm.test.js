import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
const blog = {
  title: 'cooking with a coder',
  url: 'codercooker.com',
  author: 'Patrick',
  likes: 0
}

test('create new blog with specific information', () => {
  const mockHandler = jest.fn()
  const component = render(
    <BlogForm createBlog={mockHandler} />
  )
  const title = component.container.querySelector('#title')
  fireEvent.change(title, {
    target: { value: blog.title }
  })
  const author = component.container.querySelector('#author')
  fireEvent.change(author, {
    target: { value: blog.author }
  })
  const url = component.container.querySelector('#url')
  fireEvent.change(url, {
    target: { value: blog.url }
  })
  const form = component.container.querySelector('.form')
  fireEvent.submit(form)
  console.log(mockHandler.mock.calls[0][0])
  expect(mockHandler.mock.calls[0][0]).toEqual({ ...blog, likes: undefined })
})
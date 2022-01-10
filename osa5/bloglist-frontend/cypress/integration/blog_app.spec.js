describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      username: 'test',
      password: 'test',
      name: 'tester man'
    }
    cy.request('POST', 'http://localhost:3001/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username').find('input')
    cy.contains('password').get('input')
    cy.contains('login')
  })
  it('login works', function () {
    cy.get('#username').type('test')
    cy.get('#password').type('test')
    cy.contains('login').click()
    cy.get('html').contains('login succesful')
  })
  it('login doesn\'t work when bad credentials', function () {
    cy.get('#username').type('wrong')
    cy.get('#password').type('password')
    cy.contains('login').click()
    cy.contains('wrong username/password').should('have.css', 'color', 'rgb(255, 0, 0)')
  })
  describe('when login works', () => {
    beforeEach(() => {
      cy.login({ username: 'test', password: 'test' })
    })
    it('A blog can be created', () => {
      cy.contains('create new blog').click()
      cy.get('#title').type('testing adventures with cypress')
      cy.get('#author').type('Mr. Krabs')
      cy.get('#url').type('www.cypressrox.com')
      cy.get('#submit').click()
      cy.contains('added')
      cy.get('.blog').should('contain', 'testing adventures with cypress')
    })
    it('blogs can be liked', () => {
      cy.createBlog({ title: 'test blog by cypress', url: 'www.cypress.io' })
      cy.contains('view').click().parent()
        .contains('likes 0')
        .find('button').click()
        .then(() => {
          cy.contains('likes 1')
        })
      cy.visit('http://localhost:3000')
      cy.contains('view').click().parent()
        .contains('likes 1')
    })
    it.only('blogs can be removed', () => {
      cy.createBlog({ title: 'test blog by cypress', url: 'www.cypress.io' })
      cy.contains('view').click().parent()
        .contains('remove').click()
        .then(() => {
          cy.contains('test blog by cypress').should('not.exist')
        })
    })
    it('blogs are ordered by likes', () => {
      cy.createBlog({ title: 'first blog title', url: '<insert url here 1>' })
      cy.createBlog({ title: 'second blog title', url: '<insert url here 2>' })
      cy.createBlog({ title: 'third blog title', url: '<insert url here 3>' })
      cy.get('.blog').contains('first blog title').as('first').contains('view').click()
      cy.contains('third').as('third')
      cy.get('@third')
        .contains('view').click().parent()
        .contains('like').as('likeThird').click()
        .then(() => cy.get('@likeThird').click())
        .then(() => cy.get('@likeThird').click())
      cy.contains('second blog title').as('second')
      cy.get('@second')
        .contains('view').click().parent()
        .contains('like').as('likeSecond').click()
        .then(() => cy.get('@likeSecond').click())
        .then(() => cy.get('@likeSecond').click())
        .then(() => cy.get('@likeSecond').click())
      cy.get('.blog').contains('second blog title')
        .parent()
        .find('.blog').contains('third')
    })

  })
})
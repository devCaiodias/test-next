import makeNewTodo from '@/core/todo/factories/make-new-todo'

describe('makeNewTodo (unit)', () => {
  it('shoud return a new valid todo', () => {
    // AAA -> Arrange, Act, Assert
    // Arrange -> Create the things i need
    const expectedTodo = {
      id: expect.any(String),
      description: 'my new todo',
      createAt: expect.any(String)
    }

    // Act
    const newTodo = makeNewTodo('my new todo')

    // Assert
    // tobe ===
    // checking only the description
    expect(newTodo.description).toBe(expectedTodo.description)

    // checking the object all
    expect(newTodo).toStrictEqual(expectedTodo)

  })
})


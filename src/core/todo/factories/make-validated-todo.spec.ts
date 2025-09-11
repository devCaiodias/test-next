import { InvalidTodo, makeValidatedTodo, ValidTodo } from "./make-validated-todo"
import * as makeNewTodoMod from "./make-new-todo"
import * as sanitizeStrMod from "@/utils/sanitize-str"
import * as validateTodoDescriptionMod from "@/core/todo/schemas/validete-todo-description"

const makeMocks = (description = 'abcd') => {
  const errors = ['any', 'error']
  const todo = {
    id: 'any-id',
    description,
    createAt: new Date().toISOString()
  }
  // Mockar -> Substituir algumas coisas temporariamente
  const sanitizeStrSpy = vi.spyOn(sanitizeStrMod, 'sanitizeStr').mockReturnValue(description)
  const validateTodoDescriptionSpy = vi.spyOn(validateTodoDescriptionMod, 'validateTodoDescription').mockReturnValue({
    errors: [],
    success: true
  })
  const makeNewTodoSpy = vi.spyOn(makeNewTodoMod, 'makeNewTodo').mockReturnValue(todo)

  return {
    errors,
    todo,
    description,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
    makeNewTodoSpy
  }
}

describe('makeValidatedTodo (Unit)', () => {
  it('must call the sanitizeStr function with the correct value', () => {
    //Arrange
    const { description, sanitizeStrSpy } = makeMocks()

    // Act
    makeValidatedTodo(description)

    // Assert
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description)
  })

  it('must call the validateTodoDescription with the return sanitizeStr', () => {
    //Arrange
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } = makeMocks()
    const sanitizeStrSpyReturn = 'return sanitizeStr'
    sanitizeStrSpy.mockReturnValue(sanitizeStrSpyReturn)

    // Act
    makeValidatedTodo(description)

    // Assert
    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(sanitizeStrSpyReturn)

  })

  it('must call makeNewTodo if validateTodoDescription return success', () => {
    const { description, } = makeMocks()
    const result = makeValidatedTodo(description) as ValidTodo

    expect(result.success).toBe(true)
    expect(result.data).toStrictEqual({
      id: 'any-id',
      description: 'abcd',
      createAt: expect.any(String)
    })
  })

  it('must call return validateTodoDescription.erro if the validation failed', () => {
    const { description, errors, validateTodoDescriptionSpy } = makeMocks()
    validateTodoDescriptionSpy.mockReturnValue({
      errors,
      success: false
    })
    const result = makeValidatedTodo(description) as InvalidTodo

    expect(result).toStrictEqual({
      errors,
      success: false
    })
  })
})

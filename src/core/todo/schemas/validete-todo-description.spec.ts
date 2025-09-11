import validateTodoDescription from "./validete-todo-description"

describe('validateTodoDescription (unit)', () => {
  test('should return errors when the description is less than 4 characters', () => {
    const description = 'abc'
    const result = validateTodoDescription(description)
    expect(result.errors).toStrictEqual([
      "description must be more than 3 characters"
    ])
    expect(result.success).toBe(false)
  })

  it('should return success when the description has more than 3 characters', () => {
    const description = 'abcd'
    const result = validateTodoDescription(description)
    expect(result.errors).toStrictEqual([])
    expect(result.success).toBe(true)
  })
})

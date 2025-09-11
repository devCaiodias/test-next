type ValidateTodoDescription = {
  success: boolean,
  errors: string[]
}

export default function validateTodoDescription(description: string): ValidateTodoDescription {
  const errors = []

  if (description.length <= 3) {
    errors.push('description must be more than 3 characters')
  }

  return {
    success: errors.length === 0,
    errors
  }
}

import {sanitizeStr} from "./sanitize-str"

describe('sanitizeStr (unit)', () => {
  it('return an empty string when given a false value', () => {
    // @ts-expect-error testing the function without parameter
    expect(sanitizeStr()).toBe('')
  })

  it('return an empty string when given a false value, which is not a string', () => {
    // @ts-expect-error testing the function with incorrect
    expect(sanitizeStr(112)).toBe('')
  })

  it('ensure the trim of the sent string', () => {
    expect(sanitizeStr('   a  ')).toBe('a')
  })

  it('ensure the string is normalized with NFC', () => {
    const original = 'e\u0301'
    const expected = 'é'
      expect(expected).toBe(sanitizeStr(original))
  })
})

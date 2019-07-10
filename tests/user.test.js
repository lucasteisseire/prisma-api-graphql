
import { getFirstName, isValidPassword } from '../src/utils/user'

test('Should return first name when given full name', () => {
    const firstName = getFirstName('Lucas Teisseire')
    expect(firstName).toBe('Lucas')
})

test('Should return first name when given first name', () => {
    const firstName = getFirstName('jen')
    expect(firstName).toBe('jen')
})

test('Should reject password shorter than 8 characters', () => {
    const isValid = isValidPassword('jen')
    expect(isValid).toBe(false)
})
test('Should reject password that contains word password', () => {
    const isValid = isValidPassword('password')
    expect(isValid).toBe(false)
})
test('Should correctly validate password', () => {
    const isValid = isValidPassword('azertyuiop')
    expect(isValid).toBe(true)
})





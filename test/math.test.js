const { 
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
} = require('../src/math')


test('should calculate tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('should calculate default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12)
})

test('converts fahrenheitToCelsius', () => {
    const value = fahrenheitToCelsius(12)
    expect(value).toBe( -11.11111111111111)
})

test('converts celsiusToFahrenheit', () => {
    const value = celsiusToFahrenheit(145)
    expect(value).toBe(293)
})
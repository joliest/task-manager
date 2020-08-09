const { 
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
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

test('async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 2000)
})


test('Should add two numbers', (done) => {
    add(2, 3).then(sum => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async await', async (done) => {
    const sum = await add(2, 3)
    expect(sum).toBe(5)
    done()
})
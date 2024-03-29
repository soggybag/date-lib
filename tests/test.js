/* eslint-disable no-undef */
/* eslint-disable semi */
const D = require('../dist/d')

const epoch = new D(0)

describe('Getters', () => {
  test('Year', () => {
    expect(epoch.year).toBe(1970)
  })

  test('short year', () => {
    expect(epoch.shortYear).toBe(70)
  })

  test('month', () => {
    expect(epoch.month).toBe('January')
  })

  test('short month', () => {
    expect(epoch.shortMonth).toBe('Jan')
  })

  test('day', () => {
    expect(epoch.day).toBe('Friday')
  })

  test('short day', () => {
    expect(epoch.shortDay).toBe('Fir')
  })

  test('date', () => {
    expect(epoch.date).toBe(1)
  })
})

// Formatting

describe('Format', () => {
  const d = new D(2017, 0, 2, 3, 4, 5)

  test('D.format() - default format', () => {
    expect(d.format()).toBe('January 02, 2017')
  })

  test('D.format()', () => {
    expect(d.format('M d Y')).toBe('January 2 2017')
    expect(d.format('M, d Y')).toBe('January, 2 2017')
    expect(d.format('y/m/d')).toBe('17/Jan/2')
    expect(d.format('H:I:S')).toBe('03:04:05')
    expect(d.format('h:i:s')).toBe('3:4:5')
    expect(d.format('Y-M-D h:I:S')).toBe('2017-January-02 3:04:05')
  })
})

describe('When', () => {
  const today = new Date()

  // **** Year

  test('D.when() - 1 year from now', () => {
    const d = new D(today.getFullYear() + 1, today.getMonth())
    expect(d.when()).toBe('1 year from now')
  })

  test('D.when() - 3 years from now', () => {
    const d = new D(today.getFullYear() + 3, today.getMonth())
    expect(d.when()).toBe('3 years from now')
  })

  test('D.when() - 1 year ago', () => {
    const d = new D(today.getFullYear() - 1, today.getMonth())
    expect(d.when()).toBe('1 year ago')
  })

  test('D.when() - 7 years ago', () => {
    const d = new D(today.getFullYear() - 7, today.getMonth())
    expect(d.when()).toBe('7 years ago')
  })

  // **** Month

  test('D.when() - 1 month from now', () => {
    const d = new D(today.getFullYear(), today.getMonth() + 1)
    expect(d.when()).toBe('1 month from now')
  })

  test('D.when() - 5 months from now', () => {
    const d = new D(today.getFullYear(), today.getMonth() + 5)
    expect(d.when()).toBe('5 months from now')
  })

  test('D.when() - 1 month ago', () => {
    const d = new D(today.getFullYear(), today.getMonth() - 1)
    expect(d.when()).toBe('1 month ago')
  })

  test('D.when() - 2 months ago', () => {
    const d = new D(today.getFullYear(), today.getMonth() - 2)
    expect(d.when()).toBe('2 months ago')
  })

  // FIXME: When months roll back to the previous year
  test('D.when() - 4 months ago 1 year ago?', () => {
    const d = new D(today.getFullYear(), today.getMonth() - 4)
    expect(d.when()).toBe('4 months ago')
  })

  // **** Days

  test('D.when() - days from now', () => {
    const d = new D(today.getFullYear() + 5, today.getMonth())
    expect(d.when()).toBe('5 years from now')
  })

  test('D.when() - days from now', () => {
    const now = new Date()
    now.setDate(now.getDate() - 3)
    const d = new D(now)
    expect(d.when()).toBe('3 days from now')
  })


  // **** Today

  test('D.when() - days from now', () => {
    // const d5 = new D()
    // expect(d5.when()).toBe('today')
  })
})


// new Date()
// new Date('January 1 1970')
// new Date(new Date())
// new Date(1970, 0, 1)

const t = new Date()
t.getFullYear() // instance method
Date.now() // class method

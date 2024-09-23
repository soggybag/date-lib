/* eslint-disable no-else-return */
/* eslint-disable semi */

interface DateConstructor
{
    new(...args: number[]): Date; // for new Date(...[a,b, etc]), predefined-constructor requires at least two numbers, so doesn't work with spread since that could be 0 arguments...
}

// npm i @types/node

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function padWithZero(n: number): string {
  if (n < 10) {
    return `0${n}`
  }
  return n.toString()
}

class D {
  _date: Date
  // Constructor
  constructor(...args: any[]) {
    // this._date = new Date(...args)
    this._date = new Date(...(args as [number, number, number, number?, number?, number?, number?]));

  }

  // Getters

  get year() {
    return this._date.getFullYear()
  }

  get yr() {
    return parseInt(this._date.getFullYear().toString().slice(-2))
  }

  get month() {
    return months[this._date.getMonth()]
  }

  get mon() {
    return monthsShort[this._date.getMonth()]
  }

  get day() {
    return days[this._date.getDay()]
  }

  get dy() {
    return daysShort[this._date.getDay()]
  }

  get date() {
    return this._date.getDate()
  }

  get hours() {
    return padWithZero(this._date.getHours())
  }

  get hrs() {
    return this._date.getHours()
  }

  get minutes() {
    return padWithZero(this._date.getMinutes())
  }

  get mins() {
    return this._date.getMinutes()
  }

  get seconds() {
    return padWithZero(this._date.getSeconds())
  }

  get secs() {
    return this._date.getSeconds()
  }

  // Setters

  // TODO: Create Setters

  // set year(newYear) {
  //   this._date.setFullYear(newYear)
  // }

  // Format
  format(mask = 'M D, Y') {
    const maskArray = mask.split('')
    let dateStr = ''
    maskArray.forEach((char) => {
      switch (char) {
        case 'Y':
          dateStr += this.year
          break
        case 'y':
          dateStr += this.yr
          break
        case 'M':
          dateStr += this.month
          break
        case 'm':
          dateStr += this.mon
          break
        case 'D':
          dateStr += padWithZero(this._date.getDate())
          break
        case 'd':
          dateStr += this._date.getDate()
          break
        case 'H':
          dateStr += padWithZero(this._date.getHours())
          break
        case 'h':
          dateStr += this._date.getHours()
          break
        case 'I':
          dateStr += padWithZero(this._date.getMinutes())
          break
        case 'i':
          dateStr += this._date.getMinutes()
          break
        case 'S':
          dateStr += padWithZero(this._date.getSeconds())
          break
        case 's':
          dateStr += this._date.getSeconds()
          break
        default:
          dateStr += char
      }
    });
    return dateStr
  }

  // When
  when() {
    const now = new D()
    const dy = this.year - now.year
    const dm = this._date.getMonth() - now._date.getMonth() + dy * 12
    const dd = this.date - now.date
    const monthsDiff = dy * 12 + dm

    // FIXME: When months would roll back to previous year
    // For example: the difference between  Feb 2020 and
    // Oct 2019 is 4 Months but there is also 1 year diff

    // dy = 1 = 2021 - 2020
    // dm = 5 = 4 - 11 + dy * 12
    // monthsdiff = 5

    if (dm > 11) {
      return `${Math.abs(dy)} year${dy > 1 ? 's' : ''} from now`
    } else if (dm < -11) {
      return `${Math.abs(dy)} year${dy < -1 ? 's' : ''} ago`
    } else if (dm > 0) {
      return `${dm} month${dm > 1 ? 's' : ''} from now`
    } else if (dm < 0) {
      return `${Math.abs(dm)} month${dm < -1 ? 's' : ''} ago`
    } else if (dd > 0) {
      return `${dd} days ago`
    } else if (dd < 0) {
      return `${Math.abs(dd)} days from now`
    } else {
      return 'today'
    }
  }
}

// module.exports = D
export default D






// const d = new D()
// console.log(d)

// const date = new Date()
// console.log(date.getFullYear())
// const d = new D(date.getFullYear() - 1, 2)
// console.log(d.year)
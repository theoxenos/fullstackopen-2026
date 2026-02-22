export default class DuplicateError extends Error {
  constructor(message = 'Duplicate entry') {
    super(message)
    this.name = 'DuplicateError'
  }
}
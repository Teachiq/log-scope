import logScope from 'src/logScope.js'

global.console = {
  warn: jest.fn(),
  trace: jest.fn(),
  error: jest.fn(),
  log: jest.fn()
}

beforeEach(() => {
  global.console.warn.mockRestore()
  global.console.trace.mockRestore()
  global.console.error.mockRestore()
  global.console.log.mockRestore()
})

test('logScope exists', () => {
  expect(logScope).toBeTruthy()
})

test('Create a log scope', () => {
  const log = logScope('test')

  log.debug('first')
  expect(console.log).toHaveBeenCalledWith('%c test [DEBUG] (0): first', 'color: blue')

  log.debug('second')
  expect(console.log).toHaveBeenCalledWith('%c test [DEBUG] (1): second', 'color: blue')
})

test('Dont print sequence', () => {
  const log = logScope('sequence')
  log.sequence('test')
  expect(console.log).toHaveBeenCalledTimes(0)
})

test('Get history of log', () => {
  const log = logScope('test')
  log.debug('1')
  log.debug('2')
  log.debug('3')

  expect(log.read('debug')).toContain('1', '2', '3')
})

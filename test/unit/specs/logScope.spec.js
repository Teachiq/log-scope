import logScope, { init, Log } from '@/wrapper/index'

global.console = {
  warn: jest.fn(),
  trace: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
}

beforeEach(() => {
  global.console.warn.mockRestore()
  global.console.trace.mockRestore()
  global.console.error.mockRestore()
  global.console.log.mockRestore()

  // Reset static attributes
  Log.print = true
})

test('logScope exists', () => {
  expect(logScope).toBeTruthy()
})

test('Create a log scope', () => {
  const log = logScope('test')

  log.debug('first')
  expect(console.log).toHaveBeenCalledWith('%c test [DEBUG] (0): first', 'color: #0093B4')

  log.debug('second')
  expect(console.log).toHaveBeenCalledWith('%c test [DEBUG] (1): second', 'color: #0093B4')
})

test('Dont print sequence', () => {
  const log = logScope('sequence')
  log.sequence('test')
  expect(console.log).toHaveBeenCalledTimes(0)
})

test.skip('Get history of log', () => {
  const log = logScope('test')
  log.debug('1')
  log.debug('2')
  log.debug('3')

  expect(log.read('debug')).toContain('1', '2', '3')
})

test('Change settings from init', () => {
  init({
    print: false,
  })

  const log = logScope('test')
  log.debug('Hello')
  expect(console.log).not.toHaveBeenCalled()

  init({
    print: true,
  })

  log.debug('Hello again')
  expect(console.log).toHaveBeenCalled()
})

test('Callback on error', () => {
  const onErrorCallback = jest.fn()
  const log = logScope('Test')

  init({
    onError: onErrorCallback,
  })

  expect(onErrorCallback).not.toHaveBeenCalled()
  log.warning('Test')
  expect(onErrorCallback).not.toHaveBeenCalled()
  log.error('Test')
  expect(onErrorCallback).toHaveBeenCalled()
  expect(onErrorCallback).toHaveBeenCalledWith(new Error('Test'), { message: 'Test', data: [] })
})

test('Callback error include message', () => {
  const message = 'the message'
  const onErrorCallback = jest.fn()
  const log = logScope('Test')
  const err = new Error('the error')
  const data = 'the data'

  init({
    onError: onErrorCallback,
  })

  log.error(message, err, data)

  expect(onErrorCallback).toHaveBeenCalledWith(err, {
    message,
    data: [data],
  })
})

test('Callback error include message even if err is not passed in', () => {
  const message = 'the message'
  const onErrorCallback = jest.fn()
  const log = logScope('Test')
  const err = new Error(message)
  const data = 'the data'

  init({
    onError: onErrorCallback,
  })

  log.error(message, data)

  expect(onErrorCallback).toHaveBeenCalledWith(err, {
    message,
    data: [data],
  })
})

test('Pause all logs', () => {
  const log = logScope('pauseScope')

  log.pause()

  expect(console.log).toHaveBeenCalledTimes(0)
  log.debug('debug')
  expect(console.log).toHaveBeenCalledTimes(0)
  log.success('success')
  expect(console.log).toHaveBeenCalledTimes(0)
  log.danger('danger')
  expect(console.log).toHaveBeenCalledTimes(0)
})

test('Pause specific log type', () => {
  const log = logScope('pauseScope')

  log.pause('debug')

  expect(console.log).toHaveBeenCalledTimes(0)
  log.debug('debug')
  expect(console.log).toHaveBeenCalledTimes(0)
  log.success('success')
  expect(console.log).not.toHaveBeenCalledTimes(0)
})

test('Print only from one selected scope', () => {
  const logA = logScope('A')
  const logB = logScope('B')

  expect(console.log).toHaveBeenCalledTimes(0)

  logB.only()
  expect(console.log).toHaveBeenCalledTimes(1)

  logA.debug('test')
  expect(console.log).toHaveBeenCalledTimes(1)

  logB.debug('test')
  expect(console.log).toHaveBeenCalledTimes(2)
})

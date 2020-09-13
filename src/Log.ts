import { getColor } from '@/color'
import logTypeObjectFactory from '@/logTypeObjectFactory'

type errorCallback = (err: Error, data?: { message: string, data?: any[] }) => void

export default class Log {
  serviceName: string
  private count: Record<logType, number> = logTypeObjectFactory(0)
  private active: Record<logType, boolean> = logTypeObjectFactory(true)
  private static print = true
  private static counter = true
  private static onlyScope = ''
  private static onError: null | errorCallback = null

  constructor (serviceName: string) {
    this.serviceName = serviceName

    // Default setup
    this.active.sequence = false
  }

  pause (type?: logType) {
    if (!type) {
      Log.print = false
      return
    }

    this.active[type] = false
  }

  resume (type?: logType) {
    if (!type) {
      Log.print = false
      return
    }

    this.active[type] = true
  }

  only (scopeName = this.serviceName) {
    // eslint-disable-next-line
    console.log(`%c Only printing scope: ${scopeName}`, 'color: red')
    Log.onlyScope = scopeName
  }

  private logToConsole (type: logType, message: string, ...data: any[]) {
    if (!this.active[type] || !Log.print) {
      return
    }

    if (Log.onlyScope && this.serviceName !== Log.onlyScope) {
      return
    }

    const color = getColor(type)
    const count = Log.counter ? `(${this.count[type]})` : ''

    if (data) {
      // eslint-disable-next-line
      console.log(`%c ${this.serviceName} [${type.toUpperCase()}] ${count}: ${message}`, `color: ${color}`, ...data)
    } else {
      // eslint-disable-next-line
      console.log(`%c ${this.serviceName} [${type.toUpperCase()}] ${count}: ${message}`, `color: ${color}`)
    }

    this.count[type]++
  }

  debug (message: string, ...data: any[]) {
    this.logToConsole('debug', message, ...data)
  }

  warning (message: string, ...data: any[]) {
    this.logToConsole('warning', message, ...data)
  }

  danger (message: string, ...data: any[]) {
    this.logToConsole('danger', message, ...data)
  }

  info (message: string, ...data: any[]) {
    this.logToConsole('info', message, ...data)
  }

  success (message: string, ...data: any[]) {
    this.logToConsole('success', message, ...data)
  }

  fixme (message: string, ...data: any[]) {
    this.logToConsole('fixme', message, ...data)
  }

  todo (message: string, ...data: any[]) {
    this.logToConsole('todo', message, ...data)
  }

  sequence (message: string, ...data: any[]) {
    this.logToConsole('sequence', message, ...data)
  }

  error (message: string, err: Error | string, ...data: any[]) {
    // eslint-disable-next-line
    console.trace(`%c ${this.serviceName} [ERROR]: (${this.count.error++})`, 'color: red', message);

    // Build error
    if (err && !(err instanceof Error)) {
      data = [...data, err]
    }

    if (!err || !(err instanceof Error)) {
      err = new Error(message)
    }

    // Emit error
    if (Log.onError) {
      const callbackData: {
        message: string
        data?: any[]
      } = data ? { message, data } : { message }

      Log.onError(err, callbackData)
    }

    // Log ev. additional data
    if (data) {
      console.log(err, ...data)
    } else {
      console.log(err)
    }
  }

  static init (config: {
    print?: boolean
    counter?: boolean
    onError?: errorCallback
  }) {
    if (!config) {
      return
    }

    Log.print = config.print ?? true
    Log.counter = config.counter ?? true
    Log.onError = config.onError || null
  }
}

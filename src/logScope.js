const startTime = +(new Date())
let onlyScope = null

export default (importingServiceName) => {
  let log = {
    serviceName: importingServiceName,
    print: true,
    setup: {
      debug: {
        color: 'blue', logToConsole: true
      },
      warning: {
        color: 'orange', logToConsole: true
      },
      info: {
        color: 'blue', logToConsole: true
      },
      todo: {
        color: 'purple', logToConsole: true
      },
      fixme: {
        color: 'red', logToConsole: true
      },
      success: {
        color: 'green', logToConsole: true
      },
      error: {
        color: 'red', logToConsole: true
      },
      danger: {
        color: 'red', logToConsole: true
      },
      sequence: {
        color: 'black', logToConsole: false
      }
    },
    active: {},
    history: {},
    count: {}
  }

  // Functionality
  log.logToConsole = (type, message, ...data) => {
    if (!log.active[type] ||
      !log.print) {
      return
    }

    // Check only scope
    if (onlyScope && log.serviceName !== onlyScope) {
      return
    }

    const color = log.setup[type].color
    const count = log.count[type]

    // eslint-disable-next-line
    console.log(`%c ${log.serviceName} [${type.toUpperCase()}] (${count}): ${message}`, `color: ${color}`);

    if (data) {
      // eslint-disable-next-line
      console.log(...data);
    }
  }

  log.pause = (type) => {
    log.active[type] = false
  }

  log.resume = (type) => {
    log.active[type] = true
  }

  log.only = type => {
    if (!type) {
      type = log.serviceName
    }

    // eslint-disable-next-line
    console.log(`%c Only printing scope: ${type}`, 'color: red')
    onlyScope = type
  }

  // Return the time in seconds since login
  log.getTime = () => (+(new Date()) - startTime) / 1000

  log.storeToHistory = (type, message) => {
    // See if the previous history is the same as log message
    const LAST_ITEM_INDEX = log.history[type].length - 1

    if (LAST_ITEM_INDEX >= 0) {
      const PREVIOUS_MESSAGE = log.history[type][LAST_ITEM_INDEX]
      const TRIM_INDEX = PREVIOUS_MESSAGE.indexOf(':') + 2
      const PREVIOUS_MESSAGE_TRIMMED = PREVIOUS_MESSAGE
        .substring(TRIM_INDEX, PREVIOUS_MESSAGE.length)

      // Adjust message to display multiple similar messages
      if (PREVIOUS_MESSAGE_TRIMMED === message) {
        // Count number of similar messages
        const END_COUNT_INDEX = PREVIOUS_MESSAGE.indexOf(')')
        const COUNT = (END_COUNT_INDEX === -1)
          ? 2
          : Number(PREVIOUS_MESSAGE.substring(2, END_COUNT_INDEX)) + 1

        // Adjust message
        log.history[type][LAST_ITEM_INDEX] = `(x${COUNT}) ${log.getTime()}: ${message}`

        log.count[type] += 1

        return
      }
    }

    // Store
    log.history[type].push(`${log.getTime()}: ${message}`)
    log.count[type] += 1
  }

  log.latest = () => {
    // eslint-disable-next-line
    console.log(log.read('sequence', 10));
  }

  // Custom logs
  log.error = (message) => {
    // eslint-disable-next-line
    console.trace(`⚠️ ERROR: (${log.count['error']})`, message);

    // Log sequences
    log.latest()

    log.storeToHistory('error', message)
  }

  // Translate logs
  log.read = (type, preferredLength) => {
    // Translate the history for a type into a string
    const history = log.history[type]
    let translation = ''
    let historyLength = preferredLength

    if (!historyLength ||
      historyLength > history.length) {
      historyLength = history.length
    }

    for (let i = history.length - 1; i >= history.length - historyLength; i -= 1) {
      translation += `${history[i]}\n`
    }

    return translation
  }

  ;
  (log.initialize = () => {
    Object.entries(log.setup).forEach(([type, setup]) => {
      log.active[type] = setup.logToConsole === true
      log.history[type] = []
      log.count[type] = 0

      // Create methods
      log[type] = (message, ...data) => {
        log.logToConsole(type, message, ...data)
        log.storeToHistory(type, message)
      }
    })
  })()

  return log
}

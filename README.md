# Usage
## Installation
```npm install log-scope```

## Create new log scope
```js
import logScope from 'log-scope'
const log = logScope('scopeName')

log.success('We have a new scope!')
// scopeName [SUCCESS] (0): We have a new scope!

log.success('It has a counter per type & scope')
// scopeName [SUCCESS] (1): It has a counter per type & scope

log.debug('Use another type for debugging')
// scopeName [DEBUG] (0): Use another type for debugging
```
Types can be paused in a scope when you don't need e.g. debug-loggs
```js
log.pause('debug')
log.debug('Disable logs for a type in a scope')
```
Create other scopes to clarify where the logs comes from in the console
```js
// Create scopes, it's super convenient for e.g. different modules
const anotherLog = logScope('anotherScopeName')
anotherLog.success('Another scope!')
// anotherScopeName [SUCCESS] (0): Another scope!
```
If you only want logs from one scope, use the ```.only()``` method
```js
// Only print from this scope
anotherLog.only()

log.info('This will not print since another log scope has the only-flag active')
```
Include data and other params in the logs. You can have as many parameters as you want. The types don't matter, they are printed to the console via the regular ```console.log```-function
```js
log.success('Logging some data', 1, 'a string', { key: 'Value' })
// scopeName [SUCCESS] (2): Logging some data
// 1  'a string'  { key: "Value" }
```

## Log types
The types logs different colors in the console.
```js
const message = 'Some log message'
const data = null // Optional, can be any loggable type

log.debug(message, ...data)     // blue
log.info(message, ...data)      // blue
log.success(message, ...data)   // green
log.todo(message, ...data)      // purple
log.fixme(message, ...data)     // red
log.sequence(message, ...data)  // black
log.danger(message, ...data)    // red
log.warning(message, ...data)   // orange
log.error(message, ...data)     // red
```

## Print only from one scope
```js
// Select scope to only print for
log.only('scopeName')

// OR

// No input scope name defaults to active scope
log.only()
```

## Pause/resume scope type
```js
const type = 'debug' // Or any other type
log.pause(type)
log.resume(type)
```

## Initialize log scope
```js
import logScope, { init } from 'log-scope'
// OR: import { init } from 'log-scope'

const onErrorCallback = err => {
  ... // do something
}

init({
  print: true, // Print to console
  store: true, // Stores all logs in log.history
  conter: true, // Include log counter in print
  onError: onErrorCallback
})
```

# Developement
- ```npm install```
- ```npm run dev```
- Go to localhost:8080/log-scope

# Production
Run lint, tests and builds for production
```bash
npm run prod
```
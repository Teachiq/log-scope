# Usage
## Installation
```npm install log-scope```

## Create new log scope
```js
import logScope from 'log-scope'
const log = logScope('scopeName')

log.success('We have a new scope!')
```

## Log types
```js
const message = 'Some log message'
const data = null // Optional, can be any loggable type

log.debug(message, ...data)
log.info(message, ...data)
log.todo(message, ...data)
log.fixme(message, ...data)
log.sequence(message, ...data)
log.danger(message, ...data)
log.warning(message, ...data)
log.error(message, ...data)
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
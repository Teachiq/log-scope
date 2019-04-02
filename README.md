# Usage
## Installation
```npm install log-scope```

## Get levels from IPs (IPv4)
```js
import logScope from 'log-scope'
const log = logScope('scopeName')

log.todo('Remember this')
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
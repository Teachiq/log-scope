import Log from '@/Log'

const logScope = (serviceName: string) => new Log(serviceName)
const init = Log.init

export { logScope, init, Log }

export default logScope

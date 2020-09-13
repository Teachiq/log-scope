export default function logTypeObjectFactory<T> (foo: T) {
  const types: logType[] = ['debug', 'warning', 'info', 'todo', 'fixme', 'success', 'error', 'danger', 'sequence']
  return types.reduce((acc, type) => ({
    ...acc,
    [type]: foo,
  }), {} as Record<logType, T>)
}

export function isObject(arg: unknown) {
  return Object.prototype.toString.call(arg) === '[object Object]'
}

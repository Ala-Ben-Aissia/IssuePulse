export function wait(timeOut: number) {
  return new Promise((res) => setTimeout(res, timeOut));
}

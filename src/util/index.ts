
// Printing data more usefully that .toString()
// Generally mimicing the ffx console behavior, although much less polished
// This does a good enough job for now, will extend if needed
export const printData = (data: any):string => {
  if (data === null)
    return 'null';

  if (data === undefined)
    return 'undefined';

  if (typeof(data) === 'string')
    return `'${data.toString()}'`;

  if (Array.isArray(data)) {
    if (data.length > 2**10)
      return `[Array(${data.length})]`;

    return `[${data.map(printData).join(', ')}]`
  }

  if (data instanceof Error) {
    return `Caught Error: ${data.message}`;
  }

  if (typeof(data) === 'object') {
    const inner = Object.entries(data).map(([k, v]) => `${k}: ${printData(v)}`).join(', ');
    return `{${inner}}`;
  }

  return data.toString();
}

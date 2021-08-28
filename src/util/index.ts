
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


// This fn will do, don't want to bring in an entire lib for something small like this
export const dateToString = (dateString: string): string => {
  const date = new Date(dateString);

  const monthName = (month: number): string => {
    switch (month) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        return '';
    }
  };

  return `${monthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
}

import ChartData from './chart-data.json';

const getYear = (date) => new Date(date).getYear() + 1900;

const getMonth = (date) => new Date(date).getMonth() + 1;

const getData = (fromDate, toDate, serie) => {

    const fromYear = getYear(fromDate);
    const fromMonth = getMonth(fromDate);
    const toYear = getYear(toDate);
    const toMonth = getMonth(toDate);

    const graphData = ChartData
      .filter(val => {
        const year = parseFloat(val.yyyy);
        const month = parseFloat(val.month);

        return ((year === fromYear && month >= fromMonth) || year > fromYear ) &&
               ((year === toYear && month <= toMonth) || year < toYear);
      })
      .map(val => {
        return { x: new Date(`${val.yyyy}-${val.month}-01`), y: parseFloat(val[serie]) }
      });

    return graphData;
}

export { getData as default };
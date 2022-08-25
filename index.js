const fs = require("fs");
const json2csv = require('json2csv').parse;

fs.readFile('data.txt', 'utf-8', (err, data) => {
    let rows = data.split('----------------------');
    let result = [];

    rows.forEach(row => {
        let columns = row.split('\n');
        let obj = {};

        columns.forEach(column => {
            let keyValue = column.split(' ');
            if (keyValue[0] != '\r' && keyValue[0] != '') {
                obj[keyValue[0]] = keyValue[keyValue.length - 1].replace('\r', '');
            }	
        });

        if (Object.keys(obj).length) {
            result.push(obj);
        }
    } );

    let csv = json2csv(result);

    fs.writeFile('data.csv', csv, (err) => {
        if (err) throw err;
        console.log('Los datos se guardaron en el archivo data.csv');
    });
});
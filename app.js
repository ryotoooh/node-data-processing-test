const csv = require('csv-parser');
const fs  = require('fs');
const util  = require('util');

// Task-1
/*
let taskOneObj = {};
taskOneObj.Regions = {};
taskOneObj.ItemTypes = {};

fs.createReadStream('data/test.csv')
  .pipe((csv()))
  .on('data', (row) => {
    let region = row.Region;
    if (typeof taskOneObj.Regions[region] === 'undefined') {
      taskOneObj.Regions[region] = {};
      taskOneObj.Regions[region].Total = {};
      taskOneObj.Regions[region].Total.Revenue = parseInt(row['Total Revenue']);
      taskOneObj.Regions[region].Total.Cost = parseInt(row['Total Cost']);
      taskOneObj.Regions[region].Total.Profit = parseInt(row['Total Profit']);      
    } else {
      taskOneObj.Regions[region].Total.Revenue += parseInt(row['Total Revenue']);
      taskOneObj.Regions[region].Total.Cost += parseInt(row['Total Cost']);
      taskOneObj.Regions[region].Total.Profit += parseInt(row['Total Profit']);
    }

    let country = row.Country;
    let itemType = row['Item Type'];
    if (typeof taskOneObj.Regions[region].Countries === 'undefined') {
      taskOneObj.Regions[region].Countries = {};
      taskOneObj.Regions[region].Countries[country] = {};
      taskOneObj.Regions[region].Countries[country].Total = {};
      taskOneObj.Regions[region].Countries[country].Total.Revenue = parseInt(row['Total Revenue']);
      taskOneObj.Regions[region].Countries[country].Total.Cost = parseInt(row['Total Cost']);
      taskOneObj.Regions[region].Countries[country].Total.Profit = parseInt(row['Total Profit']);

      taskOneObj.Regions[region].Countries[country].ItemTypes = {};
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue = parseInt(row['Total Revenue']);
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Cost = parseInt(row['Total Cost']);
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Profit = parseInt(row['Total Profit']);

    } else if (typeof taskOneObj.Regions[region].Countries[country] === 'undefined') {
      taskOneObj.Regions[region].Countries[country] = {};
      taskOneObj.Regions[region].Countries[country].Total = {};
      taskOneObj.Regions[region].Countries[country].Total.Revenue = parseInt(row['Total Revenue']);
      taskOneObj.Regions[region].Countries[country].Total.Cost = parseInt(row['Total Cost']);
      taskOneObj.Regions[region].Countries[country].Total.Profit = parseInt(row['Total Profit']);

      taskOneObj.Regions[region].Countries[country].ItemTypes = {};
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue = parseInt(row['Total Revenue']);
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Cost = parseInt(row['Total Cost']);
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Profit = parseInt(row['Total Profit']);

    } else {
      taskOneObj.Regions[region].Countries[country].Total.Revenue += parseInt(row['Total Revenue']);
      taskOneObj.Regions[region].Countries[country].Total.Cost += parseInt(row['Total Cost']);
      taskOneObj.Regions[region].Countries[country].Total.Profit += parseInt(row['Total Profit']);

      if (typeof taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] === 'undefined') {
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue = parseInt(row['Total Revenue']);
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Cost = parseInt(row['Total Cost']);
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Profit = parseInt(row['Total Profit']);
      } else {
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue += parseInt(row['Total Revenue']);
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Cost += parseInt(row['Total Cost']);
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Profit += parseInt(row['Total Profit']);
      }

    }

    if (typeof taskOneObj.ItemTypes[itemType] === 'undefined') {
      taskOneObj.ItemTypes[itemType] = {};
      taskOneObj.ItemTypes[itemType].Revenue = parseInt(row['Total Revenue']);
      taskOneObj.ItemTypes[itemType].Cost = parseInt(row['Total Cost']);
      taskOneObj.ItemTypes[itemType].Profit = parseInt(row['Total Profit']); 
    } else {
      taskOneObj.ItemTypes[itemType].Revenue += parseInt(row['Total Revenue']);
      taskOneObj.ItemTypes[itemType].Cost += parseInt(row['Total Cost']);
      taskOneObj.ItemTypes[itemType].Profit += parseInt(row['Total Profit']);
    }
    
  })
  .on('end', () => {
    // console.log(util.inspect(taskOneObj, {showHidden: false, depth: null}));

    let json = JSON.stringify(taskOneObj);
    fs.writeFile('results/task-1.json', json, 'utf-8', function (err, data) {
      if (err){
        console.log(err);
      }
    });
    
    console.log('Task-1 end');
  });
*/

// Task-2
/*
let taskTwoObj = {};

fs.createReadStream('data/test.csv')
  .pipe((csv()))
  .on('data', (row) => {
    let year = row['Order Date'].split('/')[2];
    let month = row['Order Date'].split('/')[0];
    let priority = row['Order Priority'];
    
    if (typeof taskTwoObj[year] === 'undefined') {
      taskTwoObj[year] = {};
      taskTwoObj[year][month] = {}
      taskTwoObj[year][month][priority] = 1;

    } else if (typeof taskTwoObj[year][month] === 'undefined') {
      taskTwoObj[year][month] = {}
      taskTwoObj[year][month][priority] = 1;

    } else if (typeof taskTwoObj[year][month][priority] === 'undefined') {
      taskTwoObj[year][month][priority] = 1;

    } else {
      taskTwoObj[year][month][priority] ++;
    }

    // console.log(row['Order Date'].split('/')[2], row['Order Date'].split('/')[0], row['Order Priority'])
  })
  .on('end', () => {
    // console.log(util.inspect(taskTwoObj, {showHidden: false, depth: null}));

    let json = JSON.stringify(taskTwoObj);
    fs.writeFile('results/task-2.json', json, 'utf-8', function (err, data) {
      if (err){
        console.log(err);
      }
    });
    
    console.log('Task-2 end');
  });
*/

// Task-3

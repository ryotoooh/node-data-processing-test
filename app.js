const csv = require('csv-parser');
const fs  = require('fs');
const util  = require('util');

// const start = new Date();
// console.log(start);
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
      taskOneObj.Regions[region].Total.Revenue = parseFloat(row['Total Revenue']);
      taskOneObj.Regions[region].Total.Cost = parseFloat(row['Total Cost']);
      taskOneObj.Regions[region].Total.Profit = parseFloat(row['Total Profit']);      
    } else {
      taskOneObj.Regions[region].Total.Revenue += parseFloat(row['Total Revenue']);
      taskOneObj.Regions[region].Total.Cost += parseFloat(row['Total Cost']);
      taskOneObj.Regions[region].Total.Profit += parseFloat(row['Total Profit']);
    }

    let country = row.Country;
    let itemType = row['Item Type'];
    if (typeof taskOneObj.Regions[region].Countries === 'undefined') {
      taskOneObj.Regions[region].Countries = {};
      taskOneObj.Regions[region].Countries[country] = {};
      taskOneObj.Regions[region].Countries[country].Total = {};
      taskOneObj.Regions[region].Countries[country].Total.Revenue = parseFloat(row['Total Revenue']);
      taskOneObj.Regions[region].Countries[country].Total.Cost = parseFloat(row['Total Cost']);
      taskOneObj.Regions[region].Countries[country].Total.Profit = parseFloat(row['Total Profit']);

      taskOneObj.Regions[region].Countries[country].ItemTypes = {};
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue = parseFloat(row['Total Revenue']);
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Cost = parseFloat(row['Total Cost']);
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Profit = parseFloat(row['Total Profit']);

    } else if (typeof taskOneObj.Regions[region].Countries[country] === 'undefined') {
      taskOneObj.Regions[region].Countries[country] = {};
      taskOneObj.Regions[region].Countries[country].Total = {};
      taskOneObj.Regions[region].Countries[country].Total.Revenue = parseFloat(row['Total Revenue']);
      taskOneObj.Regions[region].Countries[country].Total.Cost = parseFloat(row['Total Cost']);
      taskOneObj.Regions[region].Countries[country].Total.Profit = parseFloat(row['Total Profit']);

      taskOneObj.Regions[region].Countries[country].ItemTypes = {};
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue = parseFloat(row['Total Revenue']);
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Cost = parseFloat(row['Total Cost']);
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Profit = parseFloat(row['Total Profit']);

    } else {
      taskOneObj.Regions[region].Countries[country].Total.Revenue += parseFloat(row['Total Revenue']);
      taskOneObj.Regions[region].Countries[country].Total.Cost += parseFloat(row['Total Cost']);
      taskOneObj.Regions[region].Countries[country].Total.Profit += parseFloat(row['Total Profit']);

      if (typeof taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] === 'undefined') {
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue = parseFloat(row['Total Revenue']);
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Cost = parseFloat(row['Total Cost']);
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Profit = parseFloat(row['Total Profit']);
      } else {
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue += parseFloat(row['Total Revenue']);
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Cost += parseFloat(row['Total Cost']);
        taskOneObj.Regions[region].Countries[country].ItemTypes[itemType].Profit += parseFloat(row['Total Profit']);
      }

    }

    if (typeof taskOneObj.ItemTypes[itemType] === 'undefined') {
      taskOneObj.ItemTypes[itemType] = {};
      taskOneObj.ItemTypes[itemType].Revenue = parseFloat(row['Total Revenue']);
      taskOneObj.ItemTypes[itemType].Cost = parseFloat(row['Total Cost']);
      taskOneObj.ItemTypes[itemType].Profit = parseFloat(row['Total Profit']); 
    } else {
      taskOneObj.ItemTypes[itemType].Revenue += parseFloat(row['Total Revenue']);
      taskOneObj.ItemTypes[itemType].Cost += parseFloat(row['Total Cost']);
      taskOneObj.ItemTypes[itemType].Profit += parseFloat(row['Total Profit']);
    }
    
  })
  .on('end', () => {

    for (let region in taskOneObj.Regions) {
      taskOneObj.Regions[region].Total.Revenue = Math.round(taskOneObj.Regions[region].Total.Revenue);
      taskOneObj.Regions[region].Total.Cost = Math.round(taskOneObj.Regions[region].Total.Cost);
      taskOneObj.Regions[region].Total.Profit = Math.round(taskOneObj.Regions[region].Total.Profit);

      for (let country in taskOneObj.Regions[region].Countries) {
        taskOneObj.Regions[region].Countries[country].Total.Revenue = Math.round(taskOneObj.Regions[region].Countries[country].Total.Revenue);
        taskOneObj.Regions[region].Countries[country].Total.Cost = Math.round(taskOneObj.Regions[region].Countries[country].Total.Cost);
        taskOneObj.Regions[region].Countries[country].Total.Profit = Math.round(taskOneObj.Regions[region].Countries[country].Total.Profit);

        for (let item in taskOneObj.Regions[region].Countries[country].ItemTypes) {
          taskOneObj.Regions[region].Countries[country].ItemTypes[item].Revenue = Math.round(taskOneObj.Regions[region].Countries[country].ItemTypes[item].Revenue);
          taskOneObj.Regions[region].Countries[country].ItemTypes[item].Cost = Math.round(taskOneObj.Regions[region].Countries[country].ItemTypes[item].Cost);
          taskOneObj.Regions[region].Countries[country].ItemTypes[item].Profit = Math.round(taskOneObj.Regions[region].Countries[country].ItemTypes[item].Profit);
        }
      }
    }

    for (let item in taskOneObj.ItemTypes) {
      taskOneObj.ItemTypes[item].Revenue = Math.round(taskOneObj.ItemTypes[item].Revenue);
      taskOneObj.ItemTypes[item].Cost = Math.round(taskOneObj.ItemTypes[item].Cost);
      taskOneObj.ItemTypes[item].Profit = Math.round(taskOneObj.ItemTypes[item].Profit);
    }

    console.log(util.inspect(taskOneObj, {showHidden: false, depth: null}));

    // let json = JSON.stringify(taskOneObj);
    // fs.writeFile('results/task-1.json', json, 'utf-8', function (err, data) {
    //   if (err){
    //     console.log(err);
    //   }
    // });
    
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

let taskThreeObj = {};

fs.createReadStream('data/test.csv')
  .pipe((csv()))
  .on('data', (row) => {
    let region = row.Region;
    let country = row.Country;

    let orderDate = new Date();
    let orderYear = row['Order Date'].split('/')[2];
    let orderMonth = row['Order Date'].split('/')[0];
    let orderDay = row['Order Date'].split('/')[1];
    orderDate.setFullYear(orderYear);
    orderDate.setMonth(orderMonth - 1);
    orderDate.setDate(orderDay);

    let shipDate = new Date();
    let shipYear = row['Ship Date'].split('/')[2];
    let shipMonth = row['Ship Date'].split('/')[0];
    let shipDay = row['Ship Date'].split('/')[1];
    shipDate.setFullYear(shipYear);
    shipDate.setMonth(shipMonth - 1);
    shipDate.setDate(shipDay);

    let daysToShip = parseInt(Math.round(shipDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

    if (typeof taskThreeObj[orderYear] === 'undefined') {
      taskThreeObj[orderYear] = {};
      taskThreeObj[orderYear][orderMonth] = {}
      taskThreeObj[orderYear][orderMonth].TotalDaysToShip = daysToShip;
      taskThreeObj[orderYear][orderMonth].AvgDaysToShip = 0;
      taskThreeObj[orderYear][orderMonth].NumberOfOrders = 1;

      taskThreeObj[orderYear][orderMonth].Regions = {};
      taskThreeObj[orderYear][orderMonth].Regions[region] = {};
      taskThreeObj[orderYear][orderMonth].Regions[region].TotalDaysToShip = daysToShip;
      taskThreeObj[orderYear][orderMonth].Regions[region].AvgDaysToShip = 0;
      taskThreeObj[orderYear][orderMonth].Regions[region].NumberOfOrders = 1;
      
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries = {};
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country] = {};
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].TotalDaysToShip = daysToShip;
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].AvgDaysToShip = 0;
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].NumberOfOrders = 1;

    } else if (typeof taskThreeObj[orderYear][orderMonth] === 'undefined') {
      taskThreeObj[orderYear][orderMonth] = {}
      taskThreeObj[orderYear][orderMonth].TotalDaysToShip = daysToShip;
      taskThreeObj[orderYear][orderMonth].AvgDaysToShip = 0;
      taskThreeObj[orderYear][orderMonth].NumberOfOrders = 1;

      taskThreeObj[orderYear][orderMonth].Regions = {};
      taskThreeObj[orderYear][orderMonth].Regions[region] = {};
      taskThreeObj[orderYear][orderMonth].Regions[region].TotalDaysToShip = daysToShip;
      taskThreeObj[orderYear][orderMonth].Regions[region].AvgDaysToShip = 0;
      taskThreeObj[orderYear][orderMonth].Regions[region].NumberOfOrders = 1;

      taskThreeObj[orderYear][orderMonth].Regions[region].Countries = {};
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country] = {};
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].TotalDaysToShip = daysToShip;
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].AvgDaysToShip = 0;
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].NumberOfOrders = 1;

    } else {
      taskThreeObj[orderYear][orderMonth].TotalDaysToShip += daysToShip;
      taskThreeObj[orderYear][orderMonth].AvgDaysToShip = 0;
      taskThreeObj[orderYear][orderMonth].NumberOfOrders ++;

      if (typeof taskThreeObj[orderYear][orderMonth].Regions[region] === 'undefined') {
        taskThreeObj[orderYear][orderMonth].Regions[region] = {};
        taskThreeObj[orderYear][orderMonth].Regions[region].TotalDaysToShip = daysToShip;
        taskThreeObj[orderYear][orderMonth].Regions[region].AvgDaysToShip = 0;
        taskThreeObj[orderYear][orderMonth].Regions[region].NumberOfOrders = 1;

        taskThreeObj[orderYear][orderMonth].Regions[region].Countries = {};
        taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country] = {};
        taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].TotalDaysToShip = daysToShip;
        taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].AvgDaysToShip = 0;
        taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].NumberOfOrders = 1;

      } else {
        taskThreeObj[orderYear][orderMonth].Regions[region].TotalDaysToShip += daysToShip;
        taskThreeObj[orderYear][orderMonth].Regions[region].AvgDaysToShip = 0;
        taskThreeObj[orderYear][orderMonth].Regions[region].NumberOfOrders ++;

        if (typeof taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country] === 'undefined') {
          taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country] = {};
          taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].TotalDaysToShip = daysToShip;
          taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].AvgDaysToShip = 0;
          taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].NumberOfOrders = 1;
          
        } else {
          taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].TotalDaysToShip += daysToShip;
          taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].AvgDaysToShip = 0;
          taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country].NumberOfOrders ++;
        }
      }
    }

    // console.log(row);
  })
  .on('end', () => {
    
    for (let year in taskThreeObj) {
      for (let month in taskThreeObj[year]) {
        taskThreeObj[year][month].AvgDaysToShip = Math.round(taskThreeObj[year][month].TotalDaysToShip / taskThreeObj[year][month].NumberOfOrders);
        for (let region in taskThreeObj[year][month].Regions) {
          taskThreeObj[year][month].Regions[region].AvgDaysToShip = Math.round(taskThreeObj[year][month].Regions[region].TotalDaysToShip / taskThreeObj[year][month].Regions[region].NumberOfOrders);
          for (let country in taskThreeObj[year][month].Regions[region].Countries) {
            taskThreeObj[year][month].Regions[region].Countries[country].AvgDaysToShip = Math.round(taskThreeObj[year][month].Regions[region].Countries[country].TotalDaysToShip / taskThreeObj[year][month].Regions[region].Countries[country].NumberOfOrders);
          }
        }
      }
    }

    // console.log(util.inspect(taskThreeObj, {showHidden: false, depth: null}));
    let json = JSON.stringify(taskThreeObj);
    fs.writeFile('results/task-3.json', json, 'utf-8', function (err, data) {
      if (err){
        console.log(err);
      }
    });
    
    console.log('Task-3 end');
  });

// const end = new Date();
// console.log(end);
// console.log(end - start);
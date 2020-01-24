const csv = require('csv-parser');
const fs  = require('fs');
const util  = require('util');

let taskOneObj = {};
    taskOneObj.Regions = {};
    taskOneObj.ItemTypes = {};
let taskTwoObj = {};
let taskThreeObj = {};

fs.createReadStream('test.csv')
  .pipe((csv()))
  .on('data', (row) => {
    let region = row.Region;
    let country = row.Country;
    let itemType = row['Item Type'];
    let priority = row['Order Priority'];

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

    const isEmpty = function(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }

    const addTotalValuesToTaskOneObj = function(obj) {
      if (isEmpty(obj)) {
        obj.Revenue = parseFloat(row['Total Revenue']);
        obj.Cost = parseFloat(row['Total Cost']);
        obj.Profit = parseFloat(row['Total Profit']);
      } else {
        obj.Revenue += parseFloat(row['Total Revenue']);
        obj.Cost += parseFloat(row['Total Cost']);
        obj.Profit += parseFloat(row['Total Profit']);
      }
    }

    let daysToShip = parseInt(Math.round(shipDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

    // Task-1
    // Create Region objects
    if (typeof taskOneObj.Regions[region] === 'undefined') {
      taskOneObj.Regions[region] = {};
      taskOneObj.Regions[region].Total = {};
      taskOneObj.Regions[region].Countries = {};
    }
    addTotalValuesToTaskOneObj(taskOneObj.Regions[region].Total);

    // Create Regions/Country objects
    if (typeof taskOneObj.Regions[region].Countries[country] === 'undefined') {
      taskOneObj.Regions[region].Countries[country] = {};
      taskOneObj.Regions[region].Countries[country].Total = {};
      taskOneObj.Regions[region].Countries[country].ItemTypes = {};
    }
    addTotalValuesToTaskOneObj(taskOneObj.Regions[region].Countries[country].Total);

    // Create Regions/Countries/ItemType objects
    if (typeof taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] === 'undefined') {
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
    }
    addTotalValuesToTaskOneObj(taskOneObj.Regions[region].Countries[country].ItemTypes[itemType]);

    // Create ItemType objects
    if (typeof taskOneObj.ItemTypes[itemType] === 'undefined') {
      taskOneObj.ItemTypes[itemType] = {};
    }
    addTotalValuesToTaskOneObj(taskOneObj.ItemTypes[itemType]);
    
    // Task-2
    if (typeof taskTwoObj[orderYear] === 'undefined') {
      taskTwoObj[orderYear] = {};
      taskTwoObj[orderYear][orderMonth] = {}
      taskTwoObj[orderYear][orderMonth][priority] = 1;

    } else if (typeof taskTwoObj[orderYear][orderMonth] === 'undefined') {
      taskTwoObj[orderYear][orderMonth] = {}
      taskTwoObj[orderYear][orderMonth][priority] = 1;

    } else if (typeof taskTwoObj[orderYear][orderMonth][priority] === 'undefined') {
      taskTwoObj[orderYear][orderMonth][priority] = 1;

    } else {
      taskTwoObj[orderYear][orderMonth][priority] ++;
    }

    // Task-3
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

  })
  .on('end', () => {

    // Task-1
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

    // console.log(util.inspect(taskOneObj, {showHidden: false, depth: null}));
    let taskOneJson = JSON.stringify(taskOneObj);
    fs.writeFile('task-1.json', taskOneJson, 'utf-8', function (err, data) {
      if (err){
        console.log(err);
      }
    });
    console.log('Task-1 end');

    // Task-2
    // console.log(util.inspect(taskTwoObj, {showHidden: false, depth: null}));
    let taskTwoJson = JSON.stringify(taskTwoObj);
    fs.writeFile('task-2.json', taskTwoJson, 'utf-8', function (err, data) {
      if (err){
        console.log(err);
      }
    });
    console.log('Task-2 end');

    // Task-3
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
    let taskThreeJson = JSON.stringify(taskThreeObj);
    fs.writeFile('task-3.json', taskThreeJson, 'utf-8', function (err, data) {
      if (err){
        console.log(err);
      }
    });
    console.log('Task-3 end');
  });

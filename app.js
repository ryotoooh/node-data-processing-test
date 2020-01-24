const csv = require('csv-parser');
const fs  = require('fs');
const util  = require('util');

const { addTotalValues, roundTotalValues, addOrderValues, roundDate, createJSON } = require('./functions');

let taskOneObj = {};
    taskOneObj.Regions = {};
    taskOneObj.ItemTypes = {};
let taskTwoObj = {};
let taskThreeObj = {};

fs.createReadStream('node-data-processing-medium-data.csv')
  .pipe((csv()))
  .on('data', (row) => {
    let region = row.Region;
    let country = row.Country;
    let itemType = row['Item Type'];
    let priority = row['Order Priority'];
    let orderYear = row['Order Date'].split('/')[2];
    let orderMonth = row['Order Date'].split('/')[0];

    // Task-1
    // Create Region objects
    if (typeof taskOneObj.Regions[region] === 'undefined') {
      taskOneObj.Regions[region] = {};
      taskOneObj.Regions[region].Total = {};
      taskOneObj.Regions[region].Countries = {};
    }
    addTotalValues(taskOneObj.Regions[region].Total, row);

    // Create Regions/Country objects
    if (typeof taskOneObj.Regions[region].Countries[country] === 'undefined') {
      taskOneObj.Regions[region].Countries[country] = {};
      taskOneObj.Regions[region].Countries[country].Total = {};
      taskOneObj.Regions[region].Countries[country].ItemTypes = {};
    }
    addTotalValues(taskOneObj.Regions[region].Countries[country].Total, row);

    // Create Regions/Countries/ItemType objects
    if (typeof taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] === 'undefined') {
      taskOneObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
    }
    addTotalValues(taskOneObj.Regions[region].Countries[country].ItemTypes[itemType], row);

    // Create ItemType objects
    if (typeof taskOneObj.ItemTypes[itemType] === 'undefined') {
      taskOneObj.ItemTypes[itemType] = {};
    }
    addTotalValues(taskOneObj.ItemTypes[itemType], row);
    
    // Task-2
    // Create Year objects
    if (typeof taskTwoObj[orderYear] === 'undefined') {
      taskTwoObj[orderYear] = {};
    } 
    
    // Create Month objects
    if (typeof taskTwoObj[orderYear][orderMonth] === 'undefined') {
      taskTwoObj[orderYear][orderMonth] = {}
    } 
    
    // Create Priority objects
    if (typeof taskTwoObj[orderYear][orderMonth][priority] === 'undefined') {
      taskTwoObj[orderYear][orderMonth][priority] = 1;
    } else {
      taskTwoObj[orderYear][orderMonth][priority] ++;
    }

    // Task-3
    // Create Year objects
    if (typeof taskThreeObj[orderYear] === 'undefined') {
      taskThreeObj[orderYear] = {};
    }
    
    // Create Month objects
    if (typeof taskThreeObj[orderYear][orderMonth] === 'undefined') {
      taskThreeObj[orderYear][orderMonth] = {}
    }
    addOrderValues(taskThreeObj[orderYear][orderMonth], row);

    // Create Region objects
    if (typeof taskThreeObj[orderYear][orderMonth].Regions === 'undefined') {
      taskThreeObj[orderYear][orderMonth].Regions = {};
    }
    if (typeof taskThreeObj[orderYear][orderMonth].Regions[region] === 'undefined'){
      taskThreeObj[orderYear][orderMonth].Regions[region] = {};
    }
    addOrderValues(taskThreeObj[orderYear][orderMonth].Regions[region], row);

    // Create Country objects
    if (typeof taskThreeObj[orderYear][orderMonth].Regions[region].Countries === 'undefined') {
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries = {};
    }
    if (typeof taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country] === 'undefined') {
      taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country] = {};
    }
    addOrderValues(taskThreeObj[orderYear][orderMonth].Regions[region].Countries[country], row);

  })
  .on('end', () => {

    // Task-1
    // Round total values
    for (let region in taskOneObj.Regions) {
      roundTotalValues(taskOneObj.Regions[region].Total);
      for (let country in taskOneObj.Regions[region].Countries) {
        roundTotalValues(taskOneObj.Regions[region].Countries[country].Total);
        for (let item in taskOneObj.Regions[region].Countries[country].ItemTypes) {
          roundTotalValues(taskOneObj.Regions[region].Countries[country].ItemTypes[item]);
        }
      }
    }
    for (let item in taskOneObj.ItemTypes) {
      roundTotalValues(taskOneObj.ItemTypes[item]);
    }

    // console.log(util.inspect(taskOneObj, {showHidden: false, depth: null}));
    createJSON(taskOneObj, 'task-1');
    console.log('Task-1 end');

    // Task-2
    // console.log(util.inspect(taskTwoObj, {showHidden: false, depth: null}));
    createJSON(taskTwoObj, 'task-2');
    console.log('Task-2 end');

    // Task-3
    // Round date values
    for (let year in taskThreeObj) {
      for (let month in taskThreeObj[year]) {
        roundDate(taskThreeObj[year][month]);
        for (let region in taskThreeObj[year][month].Regions) {
          roundDate(taskThreeObj[year][month].Regions[region]);
          for (let country in taskThreeObj[year][month].Regions[region].Countries) {
            roundDate(taskThreeObj[year][month].Regions[region].Countries[country]);
          }
        }
      }
    }

    // console.log(util.inspect(taskThreeObj, {showHidden: false, depth: null}));
    createJSON(taskThreeObj, 'task-3');
    console.log('Task-3 end');
  });

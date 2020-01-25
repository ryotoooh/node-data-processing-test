const csv = require('csv-parser');
const fs  = require('fs');
const util  = require('util');

const { createJSON } = require('./functions');
const { taskOne, taskOneCleanUp } = require('./task-1');
const { taskTwo } = require('./task-2');
const { taskThree, taskThreeCleanUp } = require('./task-3');

let taskOneObj = {};
    taskOneObj.Regions = {};
    taskOneObj.ItemTypes = {};
let taskTwoObj = {};
let taskThreeObj = {};

fs.createReadStream('node-data-processing-medium-data.csv')
  .pipe((csv()))
  .on('data', (row) => {
    taskOne(taskOneObj, row);
    taskTwo(taskTwoObj, row);
    taskThree(taskThreeObj, row);
  })
  .on('end', () => {
    // Task-1
    taskOneCleanUp(taskOneObj);
    // console.log(util.inspect(taskOneObj, {showHidden: false, depth: null}));
    createJSON(taskOneObj, 'task-1');
    console.log('Task-1 end');

    // Task-2
    // console.log(util.inspect(taskTwoObj, {showHidden: false, depth: null}));
    createJSON(taskTwoObj, 'task-2');
    console.log('Task-2 end');

    // Task-3
    taskThreeCleanUp(taskThreeObj);
    // console.log(util.inspect(taskThreeObj, {showHidden: false, depth: null}));
    createJSON(taskThreeObj, 'task-3');
    console.log('Task-3 end');
  });

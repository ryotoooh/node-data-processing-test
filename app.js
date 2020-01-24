const csv = require('csv-parser');
const fs  = require('fs');
const util  = require('util');
let resultObj = {};
resultObj.Regions = {};
resultObj.ItemTypes = {};

fs.createReadStream('test.csv')
  .pipe((csv()))
  .on('data', (row) => {
    let region = row.Region;
    if (typeof resultObj.Regions[region] === 'undefined') {
      resultObj.Regions[region] = {};
      resultObj.Regions[region].Total = {};
      resultObj.Regions[region].Total.Revenue = parseInt(row['Total Revenue']);
      resultObj.Regions[region].Total.Cost = parseInt(row['Total Cost']);
      resultObj.Regions[region].Total.Profit = parseInt(row['Total Profit']);      
    } else {
      resultObj.Regions[region].Total.Revenue += parseInt(row['Total Revenue']);
      resultObj.Regions[region].Total.Cost += parseInt(row['Total Cost']);
      resultObj.Regions[region].Total.Profit += parseInt(row['Total Profit']);
    }

    let country = row.Country;
    let itemType = row['Item Type'];
    if (typeof resultObj.Regions[region].Countries === 'undefined') {
      resultObj.Regions[region].Countries = {};
      resultObj.Regions[region].Countries[country] = {};
      resultObj.Regions[region].Countries[country].Total = {};
      resultObj.Regions[region].Countries[country].Total.Revenue = parseInt(row['Total Revenue']);
      resultObj.Regions[region].Countries[country].Total.Cost = parseInt(row['Total Cost']);
      resultObj.Regions[region].Countries[country].Total.Profit = parseInt(row['Total Profit']);

      resultObj.Regions[region].Countries[country].ItemTypes = {};
      resultObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
      resultObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue = parseInt(row['Total Revenue']);
      resultObj.Regions[region].Countries[country].ItemTypes[itemType].Cost = parseInt(row['Total Cost']);
      resultObj.Regions[region].Countries[country].ItemTypes[itemType].Profit = parseInt(row['Total Profit']);

    } else if (typeof resultObj.Regions[region].Countries[country] === 'undefined') {
      resultObj.Regions[region].Countries[country] = {};
      resultObj.Regions[region].Countries[country].Total = {};
      resultObj.Regions[region].Countries[country].Total.Revenue = parseInt(row['Total Revenue']);
      resultObj.Regions[region].Countries[country].Total.Cost = parseInt(row['Total Cost']);
      resultObj.Regions[region].Countries[country].Total.Profit = parseInt(row['Total Profit']);

      resultObj.Regions[region].Countries[country].ItemTypes = {};
      resultObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
      resultObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue = parseInt(row['Total Revenue']);
      resultObj.Regions[region].Countries[country].ItemTypes[itemType].Cost = parseInt(row['Total Cost']);
      resultObj.Regions[region].Countries[country].ItemTypes[itemType].Profit = parseInt(row['Total Profit']);

    } else {
      resultObj.Regions[region].Countries[country].Total.Revenue += parseInt(row['Total Revenue']);
      resultObj.Regions[region].Countries[country].Total.Cost += parseInt(row['Total Cost']);
      resultObj.Regions[region].Countries[country].Total.Profit += parseInt(row['Total Profit']);

      if (typeof resultObj.Regions[region].Countries[country].ItemTypes[itemType] === 'undefined') {
        resultObj.Regions[region].Countries[country].ItemTypes[itemType] = {};
        resultObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue = parseInt(row['Total Revenue']);
        resultObj.Regions[region].Countries[country].ItemTypes[itemType].Cost = parseInt(row['Total Cost']);
        resultObj.Regions[region].Countries[country].ItemTypes[itemType].Profit = parseInt(row['Total Profit']);
      } else {
        resultObj.Regions[region].Countries[country].ItemTypes[itemType].Revenue += parseInt(row['Total Revenue']);
        resultObj.Regions[region].Countries[country].ItemTypes[itemType].Cost += parseInt(row['Total Cost']);
        resultObj.Regions[region].Countries[country].ItemTypes[itemType].Profit += parseInt(row['Total Profit']);
      }

    }

    if (typeof resultObj.ItemTypes[itemType] === 'undefined') {
      resultObj.ItemTypes[itemType] = {};
      resultObj.ItemTypes[itemType].Revenue = parseInt(row['Total Revenue']);
      resultObj.ItemTypes[itemType].Cost = parseInt(row['Total Cost']);
      resultObj.ItemTypes[itemType].Profit = parseInt(row['Total Profit']); 
    } else {
      resultObj.ItemTypes[itemType].Revenue += parseInt(row['Total Revenue']);
      resultObj.ItemTypes[itemType].Cost += parseInt(row['Total Cost']);
      resultObj.ItemTypes[itemType].Profit += parseInt(row['Total Profit']);
    }
    
    // console.log(row);
    // console.log(row.Region, row['Total Revenue']);
  })
  .on('end', () => {
    console.log(util.inspect(resultObj, {showHidden: false, depth: null}));
    console.log('End');
  });
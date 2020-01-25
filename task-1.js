const { addTotalValues, roundTotalValues } = require('./functions');

const taskOne = function(obj, row) {
  let region = row.Region;
  let country = row.Country;
  let itemType = row['Item Type'];

  // Create Region objects
  if (typeof obj.Regions[region] === 'undefined') {
    obj.Regions[region] = {};
    obj.Regions[region].Total = {};
    obj.Regions[region].Countries = {};
  }
  addTotalValues(obj.Regions[region].Total, row);

  // Create Regions/Country objects
  if (typeof obj.Regions[region].Countries[country] === 'undefined') {
    obj.Regions[region].Countries[country] = {};
    obj.Regions[region].Countries[country].Total = {};
    obj.Regions[region].Countries[country].ItemTypes = {};
  }
  addTotalValues(obj.Regions[region].Countries[country].Total, row);

  // Create Regions/Countries/ItemType objects
  if (typeof obj.Regions[region].Countries[country].ItemTypes[itemType] === 'undefined') {
    obj.Regions[region].Countries[country].ItemTypes[itemType] = {};
  }
  addTotalValues(obj.Regions[region].Countries[country].ItemTypes[itemType], row);

  // Create ItemType objects
  if (typeof obj.ItemTypes[itemType] === 'undefined') {
    obj.ItemTypes[itemType] = {};
  }
  addTotalValues(obj.ItemTypes[itemType], row);
}

// Round total values
const taskOneCleanUp = function(obj) {
  for (let region in obj.Regions) {
    roundTotalValues(obj.Regions[region].Total);
    for (let country in obj.Regions[region].Countries) {
      roundTotalValues(obj.Regions[region].Countries[country].Total);
      for (let item in obj.Regions[region].Countries[country].ItemTypes) {
        roundTotalValues(obj.Regions[region].Countries[country].ItemTypes[item]);
      }
    }
  }
  for (let item in obj.ItemTypes) {
    roundTotalValues(obj.ItemTypes[item]);
  }
}

module.exports = {
  taskOne,
  taskOneCleanUp
};
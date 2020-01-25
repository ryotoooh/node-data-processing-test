const { addOrderValues, roundDate } = require('./functions');

const taskThree = function(obj, row) {
  let region = row.Region;
  let country = row.Country;
  let orderYear = row['Order Date'].split('/')[2];
  let orderMonth = row['Order Date'].split('/')[0];

  // Create Year objects
  if (typeof obj[orderYear] === 'undefined') {
    obj[orderYear] = {};
  }
  
  // Create Month objects
  if (typeof obj[orderYear][orderMonth] === 'undefined') {
    obj[orderYear][orderMonth] = {}
  }
  addOrderValues(obj[orderYear][orderMonth], row);

  // Create Region objects
  if (typeof obj[orderYear][orderMonth].Regions === 'undefined') {
    obj[orderYear][orderMonth].Regions = {};
  }
  if (typeof obj[orderYear][orderMonth].Regions[region] === 'undefined'){
    obj[orderYear][orderMonth].Regions[region] = {};
  }
  addOrderValues(obj[orderYear][orderMonth].Regions[region], row);

  // Create Country objects
  if (typeof obj[orderYear][orderMonth].Regions[region].Countries === 'undefined') {
    obj[orderYear][orderMonth].Regions[region].Countries = {};
  }
  if (typeof obj[orderYear][orderMonth].Regions[region].Countries[country] === 'undefined') {
    obj[orderYear][orderMonth].Regions[region].Countries[country] = {};
  }
  addOrderValues(obj[orderYear][orderMonth].Regions[region].Countries[country], row);
}

// Round date values
const taskThreeCleanUp = function(obj) {
  for (let year in obj) {
    for (let month in obj[year]) {
      roundDate(obj[year][month]);
      for (let region in obj[year][month].Regions) {
        roundDate(obj[year][month].Regions[region]);
        for (let country in obj[year][month].Regions[region].Countries) {
          roundDate(obj[year][month].Regions[region].Countries[country]);
        }
      }
    }
  }
}

module.exports = {
  taskThree,
  taskThreeCleanUp
};
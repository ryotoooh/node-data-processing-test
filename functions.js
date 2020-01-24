const fs  = require('fs');

const isEmpty = function(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
    return false;
  }
  return true;
}

const addTotalValues = function(obj, row) {
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

const roundTotalValues = function(obj) {
  obj.Revenue = Math.round(obj.Revenue);
  obj.Cost = Math.round(obj.Cost);
  obj.Profit = Math.round(obj.Profit);
}

const addOrderValues = function(obj, row) {
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

  if (isEmpty(obj)) {
    obj.TotalDaysToShip = daysToShip;
    obj.AvgDaysToShip = 0;
    obj.NumberOfOrders = 1;
  } else {
    obj.TotalDaysToShip += daysToShip;
    obj.NumberOfOrders ++;
  }
}

const roundDate = function(obj) {
  obj.AvgDaysToShip = Math.round(obj.TotalDaysToShip / obj.NumberOfOrders);
}

const createJSON = function (obj, name) {
  let json = JSON.stringify(obj);
  fs.writeFile(name + '.json', json, 'utf-8', function (err, data) {
    if (err){
      console.log(err);
    }
  });
}

module.exports = {
    addTotalValues,
    roundTotalValues,
    addOrderValues,
    roundDate,
    createJSON,
};
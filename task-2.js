const taskTwo = function(obj, row) {
  let priority = row['Order Priority'];
  let orderYear = row['Order Date'].split('/')[2];
  let orderMonth = row['Order Date'].split('/')[0];

  if (typeof obj[orderYear] === 'undefined') {
      obj[orderYear] = {};
    } 
    
    // Create Month objects
    if (typeof obj[orderYear][orderMonth] === 'undefined') {
      obj[orderYear][orderMonth] = {}
    } 
    
    // Create Priority objects
    if (typeof obj[orderYear][orderMonth][priority] === 'undefined') {
      obj[orderYear][orderMonth][priority] = 1;
    } else {
      obj[orderYear][orderMonth][priority] ++;
    }
}

module.exports = {
  taskTwo,
};
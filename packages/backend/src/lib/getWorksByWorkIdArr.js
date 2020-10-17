const getWorkByWorkId = require('./getWorkByWorkId')
module.exports = (arr) => Promise.all(arr.map((item, index) => getWorkByWorkId(item)))
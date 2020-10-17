const getImageByWorkId = require('./getImageByWorkId')
module.exports = (works) => Promise.all(works.map((item, index) => getImageByWorkId(item.id)))
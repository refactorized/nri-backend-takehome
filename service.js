// using synchronous uglies around here, till I sort my promise foo a bit better
// it beats going 2-3 extra levels deep in call back hell

const fs = require('fs')
const parse = require('csv-parse/lib/sync')
const cfg = {
  parser: {
    columns: true,
    auto_parse: true
  }
}

// I capitalize collections right now, I find it a more useful convention then
// capitalizing js constructors, maybe that will change with more es2015
const Questions = parse(fs.readFileSync('./questions.csv'), cfg.parser)
const Usage = parse(fs.readFileSync('./usage.csv'), cfg.parser)

module.exports = { Questions, Usage }

// using synchronous uglies around here, till I sort my promise foo a bit better
// it beats going 2-3 extra levels deep in call back hell

const fs = require('fs')
const parse = require('csv-parse/lib/sync')
const r = require('ramda')

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

var strands = r.uniq(r.map(q => q.strand_id)(Questions))
var strandsMap = r.groupBy(q => q.strand_id)(Questions)

const roundRobin = arr => i => arr[i % array.length]

console.dir(Questions)

funciton getQuestions = (n) =>

module.exports = {
  Questions,
  Usage,
  strands,
  strandsMap
}

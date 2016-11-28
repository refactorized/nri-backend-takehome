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

// sets, maps and such, using var because they may change - really they should be
// immutable functions on the Questions collection with clever caching/memoing
var strands = r.uniq(r.map(q => q.strand_id)(Questions))
var strandsMap = r.groupBy(q => q.strand_id)(Questions)

const roundRobin = arr => i => arr[i % arr.length]

// this smells really bad - we don't need it with better use of roundRobin.
function makeIndex (list) {
  let indicies = {}
  for (var i = 0; i < list.length; i++) {
    indicies[list[i]] = 0
  }
  return indicies
}

function getQuestions (n) {
  let indicies = makeIndex(strands)
  let Qs = []
  let strandRr = roundRobin(strands)
  for (var i = 0; i < n; i++) {
    let strand = strandRr(i)
    let qI = indicies[strand]
    // round robin questions in each strand
    // should refactor to use roundRobin fn and avoid indicies malarky
    indicies[strand] = (indicies[strand] + 1) % strandsMap[strand].length
    Qs.push(strandsMap[strand][qI])
  }
  return Qs
}

module.exports = {
  Questions,
  Usage,
  strands,
  strandsMap,
  getQuestions
}

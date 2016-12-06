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
// const Usage = parse(fs.readFileSync('./usage.csv'), cfg.parser)

// keyless groupBy
const divy = fn => C => r.values(r.groupBy(fn)(r.values(C)))

// predicate, is the thing a function?
const isFn = fn => r.type(fn) === 'Function'

// recursive round robin
const reRobin = (_arr) => {
  let arr = r.map(r.when(r.isArrayLike, reRobin))(_arr)
  let i = -1
  return () => {
    i = (i + 1) % arr.length
    return r.when(isFn, x => x())(arr[i])
  }
}

// build out heirarchical sets of questions to be round-robinned.
var strandsMap = divy(q => q.strand_id)(Questions)
var standardsMap = r.map(divy(q => q.standard_id))(strandsMap)

// the actual service method
function getQuestions (n) {
  let selector = reRobin(standardsMap)
  return r.times(selector, n)
}

module.exports = {
  // Questions,
  // Usage,
  // strandsMap,
  // standardsMap,
  getQuestions
}

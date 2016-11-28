const svc = require('./service.js')
const r = require('ramda')

var Qs = svc.getQuestions(process.argv[2])

console.log(r.map(x => x.question_id)(Qs).join(','));

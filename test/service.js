/* global describe, it */

const assert = require('chai').assert
const svc = require('../service.js')

describe('CSV', function () {
  describe('Questions', function () {
    it('should load with service layer (sync)', function () {
      assert.isArray(svc.Questions)
      assert.lengthOf(svc.Questions, 12)
    })
  })

  describe('Usage', function () {
    it('should load on service layer init', function () {
      assert.isArray(svc.Usage)
      assert.lengthOf(svc.Usage, 17)
    })
  })
})

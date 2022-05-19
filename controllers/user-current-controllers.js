const CurrentService = require('../services/current')
const httpCodes = require('../helpers/http-codes')

const current = async (req, res) => {
  const user = await CurrentService.current(req)
  return res.status(httpCodes.OK).json({ 
      status: 'success',
      code: httpCodes.OK,
      data: { ...user }
  })
}
  
  module.exports = {current}
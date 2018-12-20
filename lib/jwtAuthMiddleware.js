
'Use strict'

const jwt = require('jsonwebtoken')

module.exports = () => {
  return (req, res, next) => {
    const jwtoken = req.body.jwttoken || req.query.jwtoken || req.get('x-access-token')

    if (!jwtoken) {
      const err = new Error('No token provided')
      err.status = 401
      return next(err)
    }
    jwt.verify(jwtoken, process.env.JWT_SECRET, (err, tokenDescodificado) => {
      if (err) {
        return next(err)
      }

      req.user_id = tokenDescodificado.user_id
      next()
    })
  }
}

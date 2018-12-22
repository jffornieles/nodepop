
'Use strict'

const jwt = require('jsonwebtoken')
const i18n = require('i18n')

module.exports = () => {
  return (req, res, next) => {
    const lang = req.query.lang || req.body.lang || 'es'
    i18n.setLocale(res, lang)
    const jwtoken = req.body.jwttoken || req.query.jwtoken || req.get('x-access-token')

    if (!jwtoken) {
      res.json({ succes: false, error: res.__('ERR_NO_TOKEN') })
      return
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

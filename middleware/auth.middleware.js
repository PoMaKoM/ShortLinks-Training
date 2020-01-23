const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1] // 'Bearer TOKEN'

    if (!token) {
      return res.status(401).json({ message: 'Вы не авторизованы. Выполните вход заново'})
    }

    const decoded = jwt.verify(token, config.get('jwtKey'))
    req.user = decoded
    next()

  } catch (e) {
    res.status(401).json({ message: 'Вы не авторизованы. Выполните вход заново'})
  }
}
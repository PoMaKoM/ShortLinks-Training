const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const config = require('config')
const shortId = require('short-id')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate',
  [
    auth,
    check('UrlLong', 'Неверный URL').isURL({ require_protocol: true })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Ошибка. Проверьте вводимые данные'
        })
      }

      const baseUrl = config.get('baseUrl')
      const code = shortId.generate()

      const { UrlLong } = req.body

      const existing = await Link.findOne({ UrlLong })

      if (existing) {
        return res.json({ link: existing })
      }

      const UrlShort = baseUrl + '/r/' + code

      const link = new Link({
        code, UrlShort, UrlLong, owner: req.user.userId
      })

      await link.save()

      res.status(201).json({ link })
    } catch (e) {
      res.status(500).json({ message: `Что - то пошло не так. Ошибка: ${e}` })
    }
  })

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: `Что - то пошло не так. Ошибка: ${e}` })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const links = await Link.findById(req.params.id)
    res.json(links)
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(404).json({
        message: `Ссылка не найдена. Проверьте URL
      <a href="/">Вернуться на главную</a>` })
    }
    res.status(500).json({ message: `Что - то пошло не так. Ошибка: ${e}` })
  }
})

module.exports = router
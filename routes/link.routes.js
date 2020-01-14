const { Router } = require('express')
const config = require('config')
const shortId = require('short-id')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const code = shortId.generate()

    const { UrlLong } = req.body
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

    if (!urlPattern.test(UrlLong)) {
      return res.status(400).json({
        message: 'Некорректный URL'
      })
    }

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
    if(e.name === 'CastError') {
      res.status(404).json({ message: `Ссылка не найдена. Проверьте URL` })
    }
    res.status(500).json({ message: `Что - то пошло не так. Ошибка: ${e}` })
  }
})

module.exports = router
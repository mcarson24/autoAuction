const { redirect } = require("express/lib/response")
const { Car } = require("../models")

module.exports = {
  authenticated: (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login')
    }

    next()
  },
  didNotSubmitCar: async (req, res, next) => {
    const car = await Car.findByPk(req.params.id)

    if (req.session.user.id === car.user_id) {
      return res.redirect(`/cars/${req.params.id}`)
    }
  }
}
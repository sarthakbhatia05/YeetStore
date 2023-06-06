const errorHandeler = (err, req, res, next) => {
  if (err.status == 404) {
    res.status(404)
    res.render('Errors/error404')
  } else {
    res.status(err.status || 500)
    res.render('Errors/allerrors', {status: err.status || 500,
      message: err.message})
  }
}
module.exports = errorHandeler

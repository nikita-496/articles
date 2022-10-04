const paginatedResults = (controller) => {
  return async (req, res, next) => {
    const model = await controller.handleAllPosts()
    const page = parseInt((req.query.page))
    const limit = parseInt(req.query.limit)

    const startIndex= (page - 1) * limit
    const endIndex = page * limit

    const results = {}
    if(endIndex < await model.length) {
      results.next = {
        page: page + 1,
        limit
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page -1,
        limit
      }
    }

    results.results = await model.slice(startIndex, endIndex)

    res.paginatedResults = results
    next()
  }
}

module.exports = paginatedResults;
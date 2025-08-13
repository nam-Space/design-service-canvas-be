
const authenticatedRequest = (req, res, next) => {
    const userId = req.headers['x-user-id']
    const email = req.headers['x-user-email']

    if (!userId) {
        return res.status(401).json({
            error: 'Access denied! Please login to continue'
        })
    }

    req.user = { userId, email }
    next()
}

module.exports = authenticatedRequest
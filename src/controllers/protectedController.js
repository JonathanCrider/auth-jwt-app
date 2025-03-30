export const protectedResource = (req, res, next) => {
  const username = req.user.userId
  res.status(200).send(`Successful login. Welcome ${username}!`)
}

import { db } from '../db/db.js'


// Get ALL users
// If implementing an actual DB, might create single instance db connection class to handle queries
export const getUsers = (req, res, next) => {
  return res.json(db.users)
}

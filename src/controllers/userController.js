import { db } from '../db/db.js'


// This could also be a class with methods
// Probably should be a class, can import secret key as private variable, etc

// Get ALL users
export const getUsers = (req, res, next) => {
  return res.json(db.users)
}

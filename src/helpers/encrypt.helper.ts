import * as bcrypt from 'bcryptjs'

export const encryptPassword = async (password: string): Promise<string> => {
  const { SALT } = process.env
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}
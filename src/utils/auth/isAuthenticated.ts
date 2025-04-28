import { getSession } from "./getSession"

export const isAuthenticated = () => { // check if user is authenticated
  const session = getSession() // get session from local storage
  return session?.token ? true : false // return true if token is found, false otherwise
}

export const isManager = () => {
  const session = getSession()
  return session?.user.role === 'MANAGER'
}

export const isDelegator = () => {
  const session = getSession()
  return session?.user.role === 'DELEGATOR'
}

export const isDisplaced = () => {
  const session = getSession()
  return session?.user.role === 'DISPLACED'
}

export const isSecretary = () => {
  const session = getSession()
  return session?.user.role === 'SECRETARY'
}

export const isSecurityOfficer = () => {
  const session = getSession()
  return session?.user.role === 'SECURITY_OFFICER'
}






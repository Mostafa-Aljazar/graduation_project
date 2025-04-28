import { LOCALSTORAGE_SESSION_KEY } from "@/constants/sessionKey"
import { z } from "zod"
import { User } from "@/@types/auth/loginResponse.type"
import { USER_TYPE } from "@/constants/userTypes"

// Schema to validate the session data structure
const SessionSchema = z.object({
  token: z.string().min(1),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    phone_number: z.string(),
    created_at: z.date(),
    role: z.enum(['DISPLACED', 'DELEGATOR', 'MANAGER', 'SECRETARY', 'SECURITY_OFFICER'])
  })
})

/**
 * Gets the user session from localStorage
 * 
 * Returns the session object containing:
 * - token: The authentication token
 * - user: The user information (id, name, email, etc)
 * 
 * Returns null if:
 * - No session found in localStorage
 * - Session data is invalid
 * - Any error occurs while parsing
 */
export const getSession = (): { token: string; user: User } | null => {
  try {
    const rawSession = localStorage.getItem(LOCALSTORAGE_SESSION_KEY)
    if (!rawSession) return null

    // Parse the session data from localStorage
    const parsedSession = JSON.parse(rawSession)

    // Validate the session data structure
    const session = SessionSchema.safeParse(parsedSession)

    // Return the validated session data or null if invalid
    return session.success ? session.data : null
  } catch (error) {
    console.error("Error parsing session:", error)
    return null
  }
}



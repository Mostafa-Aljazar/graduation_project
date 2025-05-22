import { LOCALSTORAGE_SESSION_KEY } from "@/constants/sessionKey"
import { z } from "zod"
import { User } from "@/@types/auth/loginResponse.type"

// Schema to validate the session data structure
const SessionSchema = z.object({
  token: z.string().min(1),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    idNumber: z.number(),
    phone_number: z.string(),
    created_at: z.union([z.string(), z.date()]), // Accept both string and date
    role: z.enum(['DISPLACED', 'DELEGATE', 'MANAGER', 'SECURITY', 'SECURITY_OFFICER']),
    image: z.string().nullable()
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

    // Extract the relevant data
    const sessionData = {
      token: parsedSession.token,
      user: {
        id: parsedSession.user.id,
        name: parsedSession.user.name,
        email: parsedSession.user.email,
        idNumber: parsedSession.user.idNumber,
        phone_number: parsedSession.user.phone_number,
        created_at: parsedSession.user.created_at,
        role: parsedSession.user.role,
        image: parsedSession.user.image || null
      }
    }

    // Validate the data structure
    const session = SessionSchema.safeParse(sessionData)
    if (!session.success) return null

    // Transform the validated data to match the expected return type
    return {
      token: session.data.token,
      user: {
        ...session.data.user,
        created_at: new Date(session.data.user.created_at)
      }
    }
  } catch (error) {
    console.error("Error parsing session:", error)
    return null
  }
}



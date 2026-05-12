import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Standard client for non-SSR/generic use
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Browser client for client components (Singleton pattern)
let client: ReturnType<typeof createBrowserClient> | undefined

export const createClientComponentClient = () => {
  if (client) return client
  
  client = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return client
}

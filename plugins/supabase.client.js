import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const supabaseUrl = useRuntimeConfig().public.SUPABASE_URL
  const supabaseKey = useRuntimeConfig().public.SUPABASE_KEY

  const supabase = createClient(supabaseUrl, supabaseKey)

  return {
    provide: {
      supabase
    }
  }
})

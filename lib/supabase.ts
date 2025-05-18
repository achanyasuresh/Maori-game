import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://znzmynuyyznxzpgdckjm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuem15bnV5eXpueHpwZ2Rja2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MTg0MzYsImV4cCI6MjA1MjI5NDQzNn0.lQCcxMlHqi8Gl21K4WM7X7CHyoP3A4kQxl6dzMbE0PE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
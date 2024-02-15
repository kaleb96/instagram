import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hemtznujjsqltxercoeq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlbXR6bnVqanNxbHR4ZXJjb2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NzQyODYsImV4cCI6MjAyMzU1MDI4Nn0.RwxXBbhNAfrz1d0b9cYGIssXSU253E0QUCL7cw5zfr8'
export const supabase = createClient(supabaseUrl, supabaseKey)
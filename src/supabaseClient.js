// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Use environment variables from Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Validate environment variables
if (!supabaseUrl || supabaseUrl === 'your-supabase-url') {
  console.warn('⚠️ VITE_SUPABASE_URL is not set. Please check your .env.local file');
}

if (!supabaseKey || supabaseKey === 'your-supabase-anon-key') {
  console.warn('⚠️ VITE_SUPABASE_ANON_KEY is not set. Please check your .env.local file');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Debug info (only in development)
// if (import.meta.env.VITE_ENV === 'development') {
//  console.log('🔗 Supabase client initialized');
//  console.log('📍 URL:', supabaseUrl?.substring(0, 30) + '...');
//  console.log('🔑 Has Key:', !!supabaseKey);
//}

export default supabase;
import { supabase } from './supabase'

const ADMIN_EMAILS = [
  'admin@cecmaster.com',
  'davidsalinas22@yahoo.com',
]

export const isAdminEmail = (email: string | null | undefined): boolean => {
  return ADMIN_EMAILS.includes(email?.toLowerCase().trim() ?? '')
}

export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single()

    if (error || !data) return false
    return data.is_admin === true
  } catch {
    return false
  }
}

export const setIsAdmin = async (userId: string, admin: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: admin })
      .eq('id', userId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Failed to set admin status:', error)
    return false
  }
}

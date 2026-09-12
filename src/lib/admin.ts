const ADMIN_EMAILS = [
  'admin@cecmaster.com',
  'davidsalinas22@yahoo.com',
]

export const isAdmin = (email: string | null | undefined): boolean => {
  return ADMIN_EMAILS.includes(email?.toLowerCase().trim() ?? '')
}

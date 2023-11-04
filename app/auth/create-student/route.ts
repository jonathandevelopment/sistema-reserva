import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const name = String(formData.get('name'))
  const last_name = String(formData.get('last_name'))
 const academy_id = parseInt(String(formData.get('academy_id')),1);
  

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from('student').insert([
    {
      name,
      last_name, 
      academy_id,
    }, 
  ]);

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not create user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=Student Created`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  )
}

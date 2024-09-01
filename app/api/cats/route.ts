import { getCats } from '@/lib/api'
import { NextResponse } from 'next/server'

// We use a route handler here to expose the cat api
// in order to not expose the API_KEY on the client side
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page')) ?? 0

  const data = await getCats(10, page)

  return NextResponse.json(data)
}

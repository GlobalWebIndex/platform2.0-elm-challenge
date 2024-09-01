import { getBreedsWithImages } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page')) ?? 0

  const breeds = await getBreedsWithImages(10, page)

  return NextResponse.json(breeds)
}

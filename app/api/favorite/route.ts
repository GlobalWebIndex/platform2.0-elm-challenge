import { NextResponse } from 'next/server'

const API_KEY = process.env.API_KEY

export async function POST(request: Request) {
  if (!API_KEY) {
    throw new Error('API_KEY is not defined in the environment variables')
  }

  const body = await request.json()

  const res = await fetch('https://api.thecatapi.com/v1/favourites', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify({
      image_id: body.id
    })
  })

  if (!res.ok)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )

  const data = await res.json()

  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  if (!API_KEY) {
    throw new Error('API_KEY is not defined in the environment variables')
  }

  const { id } = await request.json()

  const res = await fetch(`https://api.thecatapi.com/v1/favourites/${id}`, {
    cache: 'no-store',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    }
  })

  if (!res.ok)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )

  const data = await res.json()

  return NextResponse.json(data)
}

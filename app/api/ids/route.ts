import { NextResponse } from "next/server";

// TODO: api for getting ids

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const character = searchParams.get("character");
  

  return NextResponse.json({ character});
}

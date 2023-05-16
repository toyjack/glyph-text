import { NextResponse } from "next/server";

export async function POST(request: Request){
  if (request.bodyUsed){
    const body = await request.json();
    return NextResponse.json({ body});
  }


}
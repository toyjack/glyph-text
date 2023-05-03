import { NextResponse } from "next/server";
import { idsfind } from "idsfind";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");
  if (term){
    const result = idsfind(term);
    if (result){
      return NextResponse.json(result);
    }
    return NextResponse.json([]);
  }

  return NextResponse.json([]);
}

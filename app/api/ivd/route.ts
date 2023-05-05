import { NextResponse } from "next/server";
import { readFile } from "fs/promises";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const unicode = searchParams.get("unicode")?.toUpperCase();
  
  if (unicode) {
    try{
      const ivdFile = await readFile("./app/api/ivd/IVD_Sequences.txt", "utf-8");
      const regexStr = `\\n${unicode}\\s([^;]+;)\\s([^;]+;)\\s(.+)`;
      const regex = new RegExp(regexStr, "g");
      

      const found = Array.from(ivdFile.matchAll(regex)).map((match) => {
        return {
          selector: match[1],
          collection: match[2],
          code_in_collection: match[3],
        };
      });

      return NextResponse.json({ unicode, found });
    } catch (err){
      console.log(err);
    }
    return NextResponse.json({unicode});
  }

  // return NextResponse.json([]);
}

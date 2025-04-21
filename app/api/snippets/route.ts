
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import snippetSchema from "./schema";

const prisma = new PrismaClient();


export async function GET() {
  try {
    const snippets = await prisma.snippet.findMany();
    return NextResponse.json(snippets);
  } catch (err: any) {
    console.error("GET /api/snippets error:", err); // Log the actual issue
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function POST(request: NextRequest){
    const body = await request.json();
  
    if (!body) {
      return NextResponse.json({ error: "Request body is null" }, { status: 400 });
    }
  
    const validation = snippetSchema.safeParse(body);
  
    if(!validation.success){
      return NextResponse.json({error: validation.error.errors}, {status: 400});
    }
  
    const snippet = await prisma.snippet.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        language: body.language,
        
      }
    });
    return NextResponse.json({snippet}, {status: 201});
  }
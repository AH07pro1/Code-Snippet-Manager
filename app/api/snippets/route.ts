
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  language: z.string().min(1, { message: "Language is required" }), // ← ADD THIS
});


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
  
    const validation = schema.safeParse(body);
  
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
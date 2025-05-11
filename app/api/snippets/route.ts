// /app/api/snippets/route.ts (or /pages/api/snippets/index.ts if using pages dir)

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // NEW
import { authOptions } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";
import snippetSchema from "./schema";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId"); // 👈 read projectId from query string

  try {
    const whereCondition: any = {
      userId: session.user.id,
    };

    if (projectId) {
      // 📌 If we have a projectId, only get snippets for that project OR global snippets (where projectId is null)
      whereCondition.OR = [
        { projectId: projectId },
        { projectId: null }, // ALSO include snippets not attached to any project
      ];
    }

    const snippets = await prisma.snippet.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(snippets);
  } catch (err: any) {
    console.error("GET /api/snippets error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions); // NEW: get session

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body) {
    return NextResponse.json({ error: "Request body is null" }, { status: 400 });
  }

  const validation = snippetSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });
  }

  try {
    const snippet = await prisma.snippet.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        language: body.language,
        icon: body.icon,
        userId: session.user.id, // <--- Attach userId automatically here
        projectId: body.projectId, // <--- Attach projectId if provided
      },
    });

    return NextResponse.json({ snippet }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/snippets error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

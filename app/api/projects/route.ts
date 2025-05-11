import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import projectSchema from "./schema";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        _count: {
          select: { snippets: true }, // <-- ADD THIS
        },
      },
    });

    return NextResponse.json(projects);
  } catch (err: any) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body) {
    return NextResponse.json({ error: "Request body is null" }, { status: 400 });
  }

  const validation = projectSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      title: body.title,
      description: body.description,
      icon: body.icon,
      // If you have snippets to connect, you can add here
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}

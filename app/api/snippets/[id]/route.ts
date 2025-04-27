import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import snippetSchema from "../schema";

const prisma = new PrismaClient();

interface Context {
  params: { id: string }; // ❗️Fix: no longer a Promise
}

// GET a snippet by ID
export async function GET(_req: NextRequest, context: Context) {
  const { id } = context.params;

  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    return NextResponse.json(snippet, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch snippet" }, { status: 500 });
  }
}

// PUT: Update a snippet by ID
export async function PUT(request: NextRequest, context: Context) {
  const { id } = context.params;

  try {
    const body = await request.json();

    console.log("PUT id:", id);
    console.log("PUT body:", body);

    if (!body) {
      return NextResponse.json({ error: "Request body is null" }, { status: 400 });
    }

    const validation = snippetSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }

    const updatedSnippet = await prisma.snippet.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
      },
    });

    return NextResponse.json({ updatedSnippet }, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Failed to update snippet" }, { status: 500 });
  }
}

// DELETE a snippet by ID
export async function DELETE(_req: NextRequest, context: Context) {
  const { id } = context.params;

  try {
    const deletedSnippet = await prisma.snippet.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Snippet deleted successfully", deletedSnippet },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete snippet" }, { status: 500 });
  }
}

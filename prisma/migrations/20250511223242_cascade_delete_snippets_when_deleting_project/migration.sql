-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

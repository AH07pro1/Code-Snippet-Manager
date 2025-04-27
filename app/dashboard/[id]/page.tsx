'use client'
import React, { use, useEffect, useState } from 'react'
import SnippetDetailComponent from './SnippetDetail'

interface Props {
  params: Promise<{ id: string }> // note it's now a promise
}

function SnippetDetail({ params }: Props) {
  const resolvedParams = use(params) 
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSnippet() {
      try {
        const res = await fetch(`http://localhost:3000/api/snippets/${resolvedParams.id}`)
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error('Failed to fetch snippet:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSnippet()
  }, [resolvedParams.id])

  if (loading) return <div>Loading snippet...</div>
  if (!data) return <div>Snippet not found.</div>

  return (
    <SnippetDetailComponent
      title={data.title}
      description={data.description}
      language={data.language}
      content={data.content}
      tags={data.tags || []}
      createdAt={new Date(data.createdAt)}
      updatedAt={new Date(data.updatedAt)}
      snippetId={resolvedParams.id} // Pass the ID to the component
    />
  )
}

export default SnippetDetail

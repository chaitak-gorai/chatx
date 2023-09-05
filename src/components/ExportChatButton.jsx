// Import necessary dependencies and change the component name to ExportChatButton
'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from './ui/Button'
// Assuming you have a validation schema for exporting chat

const ExportChatButton = ({ chatId }) => {
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState(null)

  const exportChat = async () => {
    try {
      setExporting(true)
      setExportError(null)

      // Hit the export chat API
      const response = await axios.post('/api/msg', {
        chatId: chatId,
      })

      // Trigger the file download

      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `chat-${chatId}.txt`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)

      setExporting(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError('chatId', { message: error.message })
      } else {
        setExportError('Something went wrong while exporting the chat.')
      }
      setExporting(false)
    }
  }

  return (
    <>
      {!exporting && (
        <Button disabled={exporting} onClick={exportChat}>
          Export Chat
        </Button>
      )}

      {exportError && (
        <p className='mt-1 text-sm text-red-600'>{exportError}</p>
      )}
      {exporting && <p className='mt-1 text-sm text-gray-600'>Exporting...</p>}
    </>
  )
}

export default ExportChatButton

'use client'

import { useCallback } from 'react'
import { useAtomValue } from 'jotai'
import { everythingAtomLoadable } from '@/store/atoms/everythingAtom'
import { Button } from '@/components/ui/button'
import type { CatalogueWithWebsites } from '@/types/types'
import { Website } from '@/prisma/generated/zod'

export default function ExportData() {
  const everything = useAtomValue(everythingAtomLoadable)

  const handleExport = useCallback(() => {
    if (everything.state !== 'hasData') return

    const exportData = everything.data?.map((catalogue: CatalogueWithWebsites) => ({
      name: catalogue.name,
      websites: catalogue.websites.map((website: Website) => ({
        name: website.name,
        url: website.url,
        favicon: website.favicon,
      })),
    }))

    const json = JSON.stringify(exportData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url

    link.download = `webmellon-user-data-${new Date().toISOString()}.json`
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [everything])

  return (
    <Button onClick={handleExport} className='bg-blue-600'>
      Export Data
    </Button>
  )
}

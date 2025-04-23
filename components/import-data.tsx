'use client'

import { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { importJSON } from '@/actions/import'
import { userAtom } from '@/store/atoms/userAtom'
import { useAtomValue } from 'jotai'
import { toast } from 'sonner'

export default function ImportData() {
  const user = useAtomValue(userAtom);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/json') {
      throw new Error('Please select a valid JSON file.')
    }

    try {
      await importJSON(file, user?.id ?? "");
      toast.success("Data imported", {
        description: "Check out your newly added websites!",
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload()
          },
        },
      })

    } catch (err) {
      toast.error("Data NOT imported", {
        description: "Please verify your json and try again",
        action: {
          label: "Close",
          onClick: () => {
            window.location.reload()
          },
        },
      })
      throw new Error('Whoopsie we got an error')
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".json,application/json"
        onChange={handleFile}
        className='hidden'
      />
      <Button
        onClick={() => document.querySelector<HTMLInputElement>('input[type=file]')?.click()}
        className='bg-green-600 w-full'
      >
        Import Data
      </Button>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Journal() {
  const [entry, setEntry] = useState('')
  const [date, setDate] = useState(new Date())
  const [isFearJournal, setIsFearJournal] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    const savedEntry = localStorage.getItem(`journal_${date.toISOString().split('T')[0]}`)
    if (savedEntry) {
      setEntry(savedEntry)
    } else {
      setEntry('')
    }
  }, [date])

  useEffect(() => {
    const saveEntry = () => {
      localStorage.setItem(`journal_${date.toISOString().split('T')[0]}`, entry)
    }

    const debounce = setTimeout(saveEntry, 1000)
    return () => clearTimeout(debounce)
  }, [entry, date])

  const handleSubmit = () => {
    alert('Journal entry saved!')
  }

  return (
    <div className={`container mx-auto p-4 ${isFullScreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Journal</h1>
        <Button onClick={() => setIsFullScreen(!isFullScreen)}>
          {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-grow">
          <CardContent className="p-4">
            <Textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Write your journal entry here..."
              className="w-full h-64 mb-4"
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </CardContent>
        </Card>
        <Card className="md:w-64">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="mb-4"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="fear-journal"
                checked={isFearJournal}
                onCheckedChange={setIsFearJournal}
              />
              <Label htmlFor="fear-journal">Fear Journal</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
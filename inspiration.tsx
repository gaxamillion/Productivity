import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const motivationalFigures = [
  "Steve Jobs",
  "Oprah Winfrey",
  "Elon Musk",
  "Michelle Obama",
  "Tony Robbins",
  "Brené Brown",
  "Gary Vaynerchuk",
  "Malala Yousafzai"
]

const quotes = {
  "Steve Jobs": "The only way to do great work is to love what you do.",
  "Oprah Winfrey": "The biggest adventure you can take is to live the life of your dreams.",
  "Elon Musk": "When something is important enough, you do it even if the odds are not in your favor.",
  "Michelle Obama": "Success isn't about how much money you make. It's about the difference you make in people's lives.",
  "Tony Robbins": "The only impossible journey is the one you never begin.",
  "Brené Brown": "Vulnerability is the birthplace of innovation, creativity and change.",
  "Gary Vaynerchuk": "Skills are cheap. Passion is priceless.",
  "Malala Yousafzai": "One child, one teacher, one book and one pen can change the world."
}

export default function Inspiration() {
  const [selectedFigure, setSelectedFigure] = useState(motivationalFigures[0])
  const [quote, setQuote] = useState(quotes[selectedFigure])

  useEffect(() => {
    setQuote(quotes[selectedFigure])
  }, [selectedFigure])

  const refreshQuote = () => {
    // In a real application, this would fetch a new quote from an API
    const newQuote = "This is a refreshed quote for " + selectedFigure + "."
    setQuote(newQuote)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Inspiration</h1>
      <Card className="mb-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <CardContent className="p-6">
          <p className="text-2xl font-medium italic mb-4">{quote}</p>
          <p className="text-right">- {selectedFigure}</p>
        </CardContent>
      </Card>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Select value={selectedFigure} onValueChange={setSelectedFigure}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select motivational figure" />
          </SelectTrigger>
          <SelectContent>
            {motivationalFigures.map((figure) => (
              <SelectItem key={figure} value={figure}>
                {figure}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={refreshQuote}>Refresh Quote</Button>
      </div>
    </div>
  )
}
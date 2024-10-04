import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { LayoutDashboard, Target, ListTodo, BookOpen, Zap, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const goalCategories = [
  { name: 'Home', color: '#3b82f6', progress: 75 },
  { name: 'Health', color: '#22c55e', progress: 60 },
  { name: 'Wealth', color: '#eab308', progress: 40 },
  { name: 'Growth', color: '#ef4444', progress: 90 },
]

const priorities = [
  "Complete project proposal",
  "30 minutes of exercise",
  "Read 20 pages of current book"
]

const journalSnippet = "Today was a productive day. I managed to..."

const quote = "The only way to do great work is to love what you do. - Steve Jobs"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <nav className="w-20 bg-white shadow-md flex flex-col items-center py-4">
        <div className="flex-1 space-y-4">
          <Button variant="ghost" size="icon" className="w-12 h-12 text-blue-600">
            <LayoutDashboard className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <Target className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <ListTodo className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <BookOpen className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <Zap className="h-6 w-6" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="w-12 h-12 mt-auto">
          <User className="h-6 w-6" />
        </Button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">SoloPro AI</h1>

        {/* Goals Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Goals Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            {goalCategories.map((category) => (
              <div key={category.name} className="w-24">
                <CircularProgressbar
                  value={category.progress}
                  text={`${category.progress}%`}
                  styles={buildStyles({
                    textSize: '1.5rem',
                    pathColor: category.color,
                    textColor: category.color,
                  })}
                />
                <p className="text-center mt-2 text-sm font-medium">{category.name}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* This Week's Top 3 Priorities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>This Week's Top 3 Priorities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {priorities.map((priority, index) => (
                <li key={index} className="mb-2">{priority}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Latest Journal Entry Snippet */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Latest Journal Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{journalSnippet}</p>
          </CardContent>
        </Card>

        {/* Motivational Quote */}
        <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <CardContent className="p-6">
            <p className="text-lg font-medium italic">{quote}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
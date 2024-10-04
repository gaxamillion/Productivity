import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'

const goalCategories = ['Home', 'Health', 'Wealth', 'Growth']

const initialGoals = {
  '2024 Goals': {
    Home: ['Renovate the kitchen', 'Create a home office space', 'Start a garden'],
    Health: ['Run a marathon', 'Meditate daily for 10 minutes', 'Cook healthy meals 5 days a week'],
    Wealth: ['Save 20% of income', 'Start a side business', 'Invest in index funds'],
    Growth: ['Read 24 books', 'Learn a new language', 'Attend a professional conference']
  },
  'Monthly Goals': {
    Home: ['Declutter one room', 'Fix leaky faucet', 'Organize digital photos'],
    Health: ['Exercise 3 times a week', 'Try a new healthy recipe', 'Get 7-8 hours of sleep nightly'],
    Wealth: ['Review and adjust budget', 'Research investment options', 'Negotiate a bill'],
    Growth: ['Complete an online course', 'Practice public speaking', 'Write in journal 3 times a week']
  }
}

export default function Goals() {
  const [goals, setGoals] = useState(initialGoals)
  const [activeTab, setActiveTab] = useState('2024 Goals')

  const addGoal = (category: string) => {
    const newGoal = prompt(`Enter a new ${activeTab} goal for ${category}:`)
    if (newGoal) {
      setGoals(prevGoals => ({
        ...prevGoals,
        [activeTab]: {
          ...prevGoals[activeTab],
          [category]: [...prevGoals[activeTab][category], newGoal]
        }
      }))
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Goals</h1>
      <Tabs defaultValue="2024 Goals" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="2024 Goals">2024 Goals</TabsTrigger>
          <TabsTrigger value="Monthly Goals">Monthly Goals</TabsTrigger>
        </TabsList>
        {['2024 Goals', 'Monthly Goals'].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            {goalCategories.map((category) => (
              <Card key={category} className="mb-4">
                <Collapsible>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>{category}</CardTitle>
                      <ChevronDown className="h-4 w-4" />
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <ul className="list-disc pl-5">
                        {goals[tabValue][category].map((goal, index) => (
                          <li key={index} className="mb-2">{goal}</li>
                        ))}
                      </ul>
                      <Button onClick={() => addGoal(category)} className="mt-4">
                        <Plus className="h-4 w-4 mr-2" /> Add Goal
                      </Button>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
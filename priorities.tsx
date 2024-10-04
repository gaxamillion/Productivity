import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from 'lucide-react'

const initialPriorities = {
  Home: [
    { id: 'home1', content: 'Clean the garage', habit: false },
    { id: 'home2', content: 'Plan family dinner', habit: true },
  ],
  Health: [
    { id: 'health1', content: 'Go for a 30-minute run', habit: true },
    { id: 'health2', content: 'Meal prep for the week', habit: false },
  ],
  Wealth: [
    { id: 'wealth1', content: 'Review investment portfolio', habit: false },
    { id: 'wealth2', content: 'Work on side project', habit: true },
  ],
  Growth: [
    { id: 'growth1', content: 'Read 20 pages of current book', habit: true },
    { id: 'growth2', content: 'Practice meditation', habit: true },
  ],
}

export default function Priorities() {
  const [priorities, setPriorities] = useState(initialPriorities)

  const onDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result
    const sourceColumn = priorities[source.droppableId]
    const destColumn = priorities[destination.droppableId]
    const [removed] = sourceColumn.splice(source.index, 1)
    destColumn.splice(destination.index, 0, removed)

    setPriorities({
      ...priorities,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    })
  }

  const addPriority = (category) => {
    const newPriority = prompt(`Enter a new priority for ${category}:`)
    if (newPriority) {
      setPriorities(prev => ({
        ...prev,
        [category]: [
          ...prev[category],
          { id: `${category}${prev[category].length + 1}`, content: newPriority, habit: false }
        ]
      }))
    }
  }

  const toggleHabit = (category, id) => {
    setPriorities(prev => ({
      ...prev,
      [category]: prev[category].map(priority => 
        priority.id === id ? { ...priority, habit: !priority.habit } : priority
      )
    }))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">This Week's Priorities</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(priorities).map(([category, items]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={category}>
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-2 rounded shadow"
                            >
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={item.habit}
                                  onCheckedChange={() => toggleHabit(category, item.id)}
                                />
                                <span>{item.content}</span>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
                <Button onClick={() => addPriority(category)} className="mt-4 w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Priority
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
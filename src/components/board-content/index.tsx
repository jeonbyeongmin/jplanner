import { TaskList } from '@/components/task-list'
import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'

interface TaskList {
  id: string
  name: string
  tasks: Task[]
}

interface Task {
  id: string
  name: string
  description: string
  completed: boolean
}

export function BoardContent() {
  const [taskLists, setTaskLists] = useState(tls)

  const reorder = (lists: TaskList[], startIndex: number, endIndex: number) => {
    const result = Array.from(lists)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    // dropped outside the list
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // reorder task lists
    if (type === 'tasklist') {
      const newTaskLists = reorder(taskLists, source.index, destination.index)
      setTaskLists(newTaskLists)
      return
    }

    // reorder tasks
    if (type === 'task') {
      const sourceTaskList = taskLists.find((tl) => tl.id === source.droppableId)
      const destinationTaskList = taskLists.find((tl) => tl.id === destination.droppableId)

      if (sourceTaskList && destinationTaskList) {
        if (sourceTaskList.id === destinationTaskList.id) {
          const newTaskLists = taskLists.map((tl) => {
            if (tl.id === sourceTaskList.id) {
              const tasks = Array.from(tl.tasks)
              const [removed] = tasks.splice(source.index, 1)
              tasks.splice(destination.index, 0, removed)
              return { ...tl, tasks }
            } else {
              return tl
            }
          })
          setTaskLists(newTaskLists)
        } else {
          const sourceTasks = Array.from(sourceTaskList.tasks)
          const [removed] = sourceTasks.splice(source.index, 1)
          destinationTaskList.tasks.splice(destination.index, 0, removed)

          const newTaskLists = taskLists.map((tl) => {
            if (tl.id === sourceTaskList.id) {
              return { ...tl, tasks: sourceTasks }
            } else if (tl.id === destinationTaskList.id) {
              return { ...tl, tasks: destinationTaskList.tasks }
            } else {
              return tl
            }
          })

          setTaskLists(newTaskLists)
        }
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='tasklist' direction='horizontal' type='tasklist'>
        {(provided) => (
          <Flex ref={provided.innerRef} {...provided.droppableProps} align='start'>
            {taskLists.map(({ id, name, tasks }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <Flex mr={5} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TaskList key={id} listID={id} tasks={tasks} listTitle={name} />
                  </Flex>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const tls = [
  {
    id: 'asdf1234',
    name: 'Todo',
    tasks: [
      {
        id: '1asdfzxcv',
        name: 'Too long task name Too long task name Too long task name Too long task name Too long task name Too long task name Too long task name Too long task name Too long task name  ',
        description: 'Description 1',
        completed: false,
      },
      {
        id: '2asdfcxzv',
        name: 'Task 2asdf',
        description: 'Description 2',
        completed: false,
      },
      {
        id: '3zxcvzxcv',
        name: 'Taskasdfzxv 3',
        description: 'Description 3',
        completed: false,
      },
      {
        id: '4qwerasdfsa',
        name: 'Tsadfasask 4',
        description: 'Description 3',
        completed: false,
      },
    ],
  },
  {
    id: 'asdf1235',
    name: 'In progress',
    tasks: [
      {
        id: '5asdfqasdf',
        name: 'Tasqwerk 1',
        description: 'Description 1',
        completed: false,
      },
      {
        id: '6asdfasdf',
        name: 'Tasdfzxcvsk 2',
        description: 'Description 2',
        completed: false,
      },
      {
        id: '7xcvzcv',
        name: 'Tazxcvxsdfask 3',
        description: 'Description 3',
        completed: false,
      },
    ],
  },
  {
    id: 'asdf1236',
    name: 'Done',
    tasks: [
      {
        id: '8zxcva',
        name: 'Taswerqdsafk 1',
        description: 'Description 1',
        completed: false,
      },
      {
        id: '9sadfsa',
        name: 'Taxcfvadsk 2',
        description: 'Description 2',
        completed: false,
      },
      {
        id: '10asdfasfd',
        name: 'Tsdfasvcsask 3',
        description: 'Description 3',
        completed: false,
      },
    ],
  },
]

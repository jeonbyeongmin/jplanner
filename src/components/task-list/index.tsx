import { Task } from '@/components/task'
import { TaskListHeader } from '@/components/task-list/task-list-header'
import { Flex } from '@chakra-ui/react'

interface Task {
  id: string
  name: string
  description: string
  completed: boolean
}

interface TaskListProps {
  listTitle: string
  tasks: Task[]
}

export function TaskList({ listTitle, tasks }: TaskListProps) {
  return (
    <Flex
      role='group'
      w={'96'}
      direction='column'
      gap={5}
      p={3}
      pt={4}
      pb={6}
      bgColor='white'
      border='1px'
      borderColor='gray.200'
      shadow='lg'
      borderRadius='lg'
    >
      <TaskListHeader listTitle={listTitle} numberOfTasks={tasks.length} />
      <Flex gap={5} direction='column'>
        {tasks.map(({ id, ...rest }) => (
          <Task key={id} id={id} {...rest} />
        ))}
      </Flex>
    </Flex>
  )
}

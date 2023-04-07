import { BoardHeader } from '@/components/board-header'
import { TaskList } from '@/components/task-list'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

interface PlannerDetailProps {
  plannerID: string
}

export default function PlannerDetail({ plannerID }: PlannerDetailProps) {
  return (
    <Flex direction='column'>
      <BoardHeader />

      <Flex p={5}>
        <Flex gap={5} align='start'>
          {taskList.map(({ id, name, tasks }) => (
            <TaskList key={id} tasks={tasks} listTitle={name} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context

  return {
    props: {
      plannerID: params?.id,
    },
  }
}

const taskList = [
  {
    id: '1',
    name: 'Todo',
    tasks: [
      {
        id: '1',
        name: 'Too long task name Too long task name Too long task name Too long task name Too long task name Too long task name Too long task name Too long task name Too long task name  ',
        description: 'Description 1',
        completed: false,
      },
      {
        id: '2',
        name: 'Task 2',
        description: 'Description 2',
        completed: false,
      },
      {
        id: '3',
        name: 'Task 3',
        description: 'Description 3',
        completed: false,
      },
      {
        id: '4',
        name: 'Task 4',
        description: 'Description 3',
        completed: false,
      },
    ],
  },
  {
    id: '2',
    name: 'In progress',
    tasks: [
      {
        id: '1',
        name: 'Task 1',
        description: 'Description 1',
        completed: false,
      },
      {
        id: '2',
        name: 'Task 2',
        description: 'Description 2',
        completed: false,
      },
      {
        id: '3',
        name: 'Task 3',
        description: 'Description 3',
        completed: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Done',
    tasks: [
      {
        id: '1',
        name: 'Task 1',
        description: 'Description 1',
        completed: false,
      },
      {
        id: '2',
        name: 'Task 2',
        description: 'Description 2',
        completed: false,
      },
      {
        id: '3',
        name: 'Task 3',
        description: 'Description 3',
        completed: false,
      },
    ],
  },
]

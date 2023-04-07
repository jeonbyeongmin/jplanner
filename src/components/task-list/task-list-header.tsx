import { TaskListMenu } from '@/components/task-list/task-list-menu'
import { Flex, IconButton, Text, Tooltip } from '@chakra-ui/react'
import { HiPlus } from 'react-icons/hi'

interface TaskListHeaderProps {
  listTitle: string
  numberOfTasks?: number
}

export function TaskListHeader({ listTitle, numberOfTasks }: TaskListHeaderProps) {
  return (
    <Flex bgColor='white' borderRadius='md' align='center' justify='space-between' gap={2}>
      <Flex align='center' gap={1}>
        <Flex _hover={{ bgColor: 'gray.50' }} py={2} px={3} borderRadius='md' userSelect='none' cursor='pointer'>
          <Text wordBreak='break-all' noOfLines={1} fontWeight='semibold'>
            {listTitle}
          </Text>
        </Flex>
        <Flex borderRadius='md' bgColor='gray.100' px={3} py={1}>
          <Text color='gray.500' fontSize='sm' fontWeight='bold'>
            {numberOfTasks}
          </Text>
        </Flex>
      </Flex>
      <Flex align='center'>
        <Tooltip label='Add new task'>
          <IconButton
            aria-label='Add'
            icon={<HiPlus />}
            size='sm'
            variant='ghost'
            fontSize='lg'
            color='gray.500'
            visibility='hidden'
            _groupHover={{ visibility: 'visible' }}
          />
        </Tooltip>
        <TaskListMenu />
      </Flex>
    </Flex>
  )
}

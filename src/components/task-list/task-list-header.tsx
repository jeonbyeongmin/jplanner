import { HiPlus } from 'react-icons/hi';

import { TaskListMenu } from '@/components/task-list/task-list-menu';
import { Flex, IconButton, Text, Tooltip } from '@chakra-ui/react';

interface Props {
  listTitle: string;
  numberOfTasks?: number;
}

export function TaskListHeader({ listTitle, numberOfTasks }: Props) {
  return (
    <Flex bgColor='white' borderRadius='md' align='center' justify='space-between' gap={2}>
      <Flex align='center' gap={1}>
        <Flex _hover={{ bgColor: 'gray.100' }} py={1} px={3} borderRadius='md' userSelect='none' cursor='pointer'>
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
        <Tooltip label='새로운 작업 추가'>
          <IconButton
            aria-label='Add'
            icon={<HiPlus />}
            size='sm'
            variant='ghost'
            fontSize='lg'
            color='gray.500'
            opacity={0}
            _groupHover={{ opacity: 1 }}
          />
        </Tooltip>
        <TaskListMenu />
      </Flex>
    </Flex>
  );
}

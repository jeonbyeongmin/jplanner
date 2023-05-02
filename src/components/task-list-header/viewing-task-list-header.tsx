import { HiPlus } from 'react-icons/hi';

import { TaskListHeaderMenu } from '@/components/task-list-header/task-list-header-menu';
import { Flex, IconButton, Text, Tooltip } from '@chakra-ui/react';

interface Props {
  listTitle?: string;
  numberOfTasks?: number;
  handleEdit: () => void;
}

export function ViewingTaskListHeader({
  listTitle,
  numberOfTasks,
  handleEdit,
}: Props) {
  return (
    <>
      <Flex align='center' gap={1}>
        <Flex
          _hover={{ bgColor: 'gray.100' }}
          py={1}
          px={3}
          borderRadius='md'
          userSelect='none'
          cursor='pointer'
          onClick={handleEdit}
        >
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
        <TaskListHeaderMenu handleEdit={handleEdit} />
      </Flex>
    </>
  );
}

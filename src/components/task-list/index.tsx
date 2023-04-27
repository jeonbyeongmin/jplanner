import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Task } from '@/components/task';
import { TaskListHeader } from '@/components/task-list/task-list-header';
import { Flex } from '@chakra-ui/react';

import type { TaskType } from '@/types/task.type';
interface Props {
  listID: string;
  listTitle: string;
  tasks: TaskType[];
}

export function TaskList({ listID, listTitle, tasks }: Props) {
  return (
    <Flex
      role='group'
      w={'96'}
      bgColor='white'
      border='1px'
      borderColor='gray.200'
      shadow='lg'
      borderRadius='xl'
      position='relative'
    >
      <Flex direction='column' gap={5} p={3} pt={4} w='full'>
        <TaskListHeader listTitle={listTitle} numberOfTasks={tasks.length} />
        <Droppable droppableId={listID} type='task'>
          {(provided) => (
            <Flex ref={provided.innerRef} direction='column' w='full'>
              {tasks.map(({ id, title }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <Flex
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      w='full'
                    >
                      <Task key={id} title={title} />
                    </Flex>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </Flex>
    </Flex>
  );
}

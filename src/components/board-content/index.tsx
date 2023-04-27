import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { TaskList } from '@/components/task-list';
import { Flex } from '@chakra-ui/react';

import type { TaskListType } from '@/types/task-list.type';
import type { DropResult } from 'react-beautiful-dnd';
interface Props {
  taskLists: TaskListType[];
}

export function BoardContent({ taskLists: list }: Props) {
  const [taskLists, setTaskLists] = useState<TaskListType[]>(list);

  const reorder = (
    lists: TaskListType[],
    startIndex: number,
    endIndex: number,
  ) => {
    const result = Array.from(lists);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // dropped outside the list
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // reorder task lists
    if (type === 'tasklist') {
      const newTaskLists = reorder(taskLists, source.index, destination.index);
      setTaskLists(newTaskLists);
      return;
    }

    // reorder tasks
    if (type === 'task') {
      const sourceTaskList = taskLists.find(
        (tl) => tl.id === source.droppableId,
      );
      const destinationTaskList = taskLists.find(
        (tl) => tl.id === destination.droppableId,
      );

      if (sourceTaskList && destinationTaskList) {
        if (sourceTaskList.id === destinationTaskList.id) {
          const newTaskLists = taskLists.map((tl) => {
            if (tl.id === sourceTaskList.id) {
              const tasks = Array.from(tl.tasks);
              const [removed] = tasks.splice(source.index, 1);
              tasks.splice(destination.index, 0, removed);
              return { ...tl, tasks };
            } else {
              return tl;
            }
          });
          setTaskLists(newTaskLists);
        } else {
          const sourceTasks = Array.from(sourceTaskList.tasks);
          const [removed] = sourceTasks.splice(source.index, 1);
          destinationTaskList.tasks.splice(destination.index, 0, removed);

          const newTaskLists = taskLists.map((tl) => {
            if (tl.id === sourceTaskList.id) {
              return { ...tl, tasks: sourceTasks };
            } else if (tl.id === destinationTaskList.id) {
              return { ...tl, tasks: destinationTaskList.tasks };
            } else {
              return tl;
            }
          });

          setTaskLists(newTaskLists);
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='tasklist' direction='horizontal' type='tasklist'>
        {(provided) => (
          <Flex
            ref={provided.innerRef}
            {...provided.droppableProps}
            align='start'
          >
            {taskLists.map(({ id, title, tasks }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <Flex
                    mr={5}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskList
                      key={id}
                      listID={id}
                      tasks={tasks}
                      listTitle={title}
                    />
                  </Flex>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  );
}

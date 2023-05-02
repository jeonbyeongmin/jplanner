import type { TaskListHeaderState } from '@/reducers/task-list-header.reducer';

import { useImmerReducer } from 'use-immer';

import { SwitchCase } from '@/components/switch-case';
import { EditingTaskListHeader } from '@/components/task-list-header/editing-task-list-header';
import { ViewingTaskListHeader } from '@/components/task-list-header/viewing-task-list-header';
import { taskListHeaderReducer } from '@/reducers/task-list-header.reducer';
import { Flex } from '@chakra-ui/react';

interface Props {
  listTitle?: string;
  numberOfTasks?: number;
  initialStatus?: TaskListHeaderState;
}

export function TaskListHeader({
  listTitle,
  numberOfTasks,
  initialStatus,
}: Props) {
  const [current, dispatch] = useImmerReducer(taskListHeaderReducer, {
    state: initialStatus ?? 'viewing',
    context: {
      pendingTitle: listTitle ?? '',
      prev: listTitle ?? '',
    },
  });

  const handleEdit = () => {
    dispatch({ type: 'EDIT' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'CHANGE', payload: e.target.value });
  };

  const handleCancel = () => {
    dispatch({ type: 'CANCEL' });
  };

  const handleSubmit = () => {
    dispatch({ type: 'SUBMIT' });
  };

  return (
    <Flex
      bgColor='white'
      borderRadius='md'
      align='center'
      justify='space-between'
      gap={2}
    >
      <SwitchCase
        value={current.state}
        caseBy={{
          viewing: (
            <ViewingTaskListHeader
              listTitle={listTitle}
              numberOfTasks={numberOfTasks}
              handleEdit={handleEdit}
            />
          ),
          editing: (
            <EditingTaskListHeader
              pendingTitle={current.context.pendingTitle}
              handChange={handleChange}
              handleCancel={handleCancel}
              handleSubmit={handleSubmit}
            />
          ),
        }}
      />
    </Flex>
  );
}

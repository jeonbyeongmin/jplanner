import { useState } from 'react';

import { SwitchCase } from '@/components/switch-case';
import { Viewing } from '@/components/task-list-header/viewing';
import { Flex } from '@chakra-ui/react';

type Status = 'creating' | 'editing' | 'viewing';

interface Props {
  listTitle?: string;
  numberOfTasks?: number;
  initialStatus?: Status;
}

export function TaskListHeader({
  listTitle,
  numberOfTasks,
  initialStatus,
}: Props) {
  const [status, setStatus] = useState<Status>(initialStatus || 'viewing');

  return (
    <Flex
      bgColor='white'
      borderRadius='md'
      align='center'
      justify='space-between'
      gap={2}
    >
      <SwitchCase
        value={status}
        caseBy={{
          viewing: (
            <Viewing listTitle={listTitle} numberOfTasks={numberOfTasks} />
          ),
          // creating: <TypeB />,
          // editing: <TypeC />,
        }}
        defaultComponent={
          <Viewing listTitle={listTitle} numberOfTasks={numberOfTasks} />
        }
      />
    </Flex>
  );
}

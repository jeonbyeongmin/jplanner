import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HiPlus } from 'react-icons/hi';

import { BoardHeaderMenu } from '@/components/board-header/board-header-menu';
import { EditingBoardHeader } from '@/components/board-header/editing-board-header';
import { ViewingBoardHeader } from '@/components/board-header/viewing-board-header';
import { SwitchCase } from '@/components/switch-case';
import { BoardActorContext } from '@/contexts/board-actor-provider';
import { boardTitleMachine } from '@/machines/board/board-title-machine';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';

interface Props {
  boardID: string;
  title: string;
  handleAddButtonClick: () => void;
}

export function BoardHeader({ title, boardID, handleAddButtonClick }: Props) {
  const router = useRouter();

  const boardRef = BoardActorContext.useActorRef();
  const [current, send] = useMachine(boardTitleMachine, {
    context: { boardRef },
  });

  const handleSubmit = () => {
    send({ type: 'SUBMIT', boardID });
  };

  const handleEdit = () => {
    send('EDIT');
  };

  const handleCancel = () => {
    send('CANCEL');
  };

  const handleDelete = () => {
    boardRef.send({
      type: 'DELETE_BOARD',
      payload: { boardID },
      navigateToBoard: (id) => router.push(`/board/${id}`),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    send({ type: 'CHANGE', value: e.target.value });
  };

  useEffect(() => {
    send({
      type: 'INITIALIZE',
      value: title,
    });
  }, [title, send]);

  return (
    <Flex
      bgColor='white'
      h={20}
      borderBottom='1px'
      borderColor='gray.200'
      px={5}
      align='center'
      justify='space-between'
      gap={5}
      w='full'
      position='absolute'
    >
      <SwitchCase
        value={current.value.toString()}
        caseBy={{
          editing: (
            <EditingBoardHeader
              pendingTitle={current.context.pendingTitle}
              handChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          ),
          viewing: <ViewingBoardHeader title={title} handleEdit={handleEdit} />,
        }}
        defaultComponent={
          <ViewingBoardHeader title={title} handleEdit={handleEdit} />
        }
      />

      <Flex gap={2}>
        <Tooltip label='새로운 작업 리스트 추가'>
          <IconButton
            aria-label='Add'
            icon={<HiPlus />}
            variant='outline'
            fontSize={20}
            color='gray.500'
            onClick={handleAddButtonClick}
          />
        </Tooltip>
        <BoardHeaderMenu onEdit={handleEdit} onDelete={handleDelete} />
      </Flex>
    </Flex>
  );
}

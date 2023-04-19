import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { HiPlus } from 'react-icons/hi';

import { BoardHeaderMenu } from '@/components/board-header/board-header-menu';
import { BoardActorContext } from '@/contexts/global-state-provider';
import { boardTitleMachine } from '@/machines/board/board-title-machine';
import { Box, Button, Flex, IconButton, Input, Text, Tooltip, useOutsideClick } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';

interface Props {
  boardID: string;
  title: string;
}

export function BoardHeader({ title, boardID }: Props) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const boardRef = BoardActorContext.useActorRef();
  const [current, send] = useMachine(boardTitleMachine, { context: { boardRef } });

  const handleSubmit = () => {
    send({ type: 'SUBMIT', id: boardID });
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
      payload: { id: boardID },
      navigateToBoard: (id) => router.push(`/board/${id}`),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  useOutsideClick({
    ref: ref,
    handler: current.matches('editing') ? handleCancel : undefined,
  });

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
      {current.matches('editing') ? (
        <Flex flex={1} gap={2} ref={ref}>
          <Input
            variant='outline'
            defaultValue={current.context.pendingTitle}
            onChange={(e) => send('CHANGE', { value: e.target.value })}
            onKeyDown={handleKeyDown}
            fontSize='xl'
            fontWeight='bold'
            p={2}
            autoFocus
          />
          <Button onClick={handleSubmit} isDisabled={!current.context.pendingTitle}>
            확인
          </Button>
          <Button onClick={handleCancel}>취소</Button>
        </Flex>
      ) : (
        <Flex p={2} px={3} _hover={{ bgColor: 'gray.100' }} borderRadius='lg' gap={2} align='center'>
          <Box w={2} h={2} bgColor='green.400' flexShrink={0} borderRadius='full' />
          <Tooltip label={title} openDelay={1000}>
            <Text
              fontSize='xl'
              fontWeight='bold'
              cursor='pointer'
              userSelect='none'
              onClick={handleEdit}
              noOfLines={1}
              color='blackAlpha.900'
            >
              {title}
            </Text>
          </Tooltip>
        </Flex>
      )}
      <Flex gap={2}>
        <Tooltip label='새로운 작업 리스트 추가'>
          <IconButton aria-label='Add' icon={<HiPlus />} variant='outline' fontSize={20} color='gray.500' />
        </Tooltip>
        <BoardHeaderMenu onEdit={handleEdit} onDelete={handleDelete} />
      </Flex>
    </Flex>
  );
}

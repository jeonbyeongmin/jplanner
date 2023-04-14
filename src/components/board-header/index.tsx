import { BoardHeaderMenu } from '@/components/board-header/board-header-menu'
import { boardTitleMachine } from '@/machines/board-title-machine'
import { Button, Flex, IconButton, Input, Text, Tooltip, useOutsideClick } from '@chakra-ui/react'
import { useMachine } from '@xstate/react'
import { useEffect, useRef } from 'react'
import { HiPlus } from 'react-icons/hi'

interface BoardHeaderProps {
  title: string
}

export function BoardHeader({ title }: BoardHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [current, send] = useMachine(boardTitleMachine, {
    devTools: true,
    context: {
      title: title,
      pendingTitle: title,
    },
  })

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      send('SUBMIT')
    }
  }

  useOutsideClick({
    ref: ref,
    handler: current.matches('editing') ? () => send('CANCEL') : undefined,
  })

  useEffect(() => {
    send({
      type: 'INITIATE',
      value: title,
    })
  }, [send, title])

  return (
    <Flex
      ref={ref}
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
        <Flex flex={1} gap={2}>
          <Input
            variant='outline'
            defaultValue={current.context.pendingTitle}
            onChange={(e) => send('CHANGE', { value: e.target.value })}
            onKeyDown={handleEnterKeyDown}
            fontSize='xl'
            fontWeight='bold'
            p={2}
            autoFocus
          />
          <Button onClick={() => send('SUBMIT')} disabled={!current.can({ type: 'SUBMIT' })}>
            확인
          </Button>
          <Button onClick={() => send('CANCEL')}>취소</Button>
        </Flex>
      ) : (
        <Flex p={2} _hover={{ bgColor: 'gray.50' }} borderRadius='md'>
          <Tooltip label={current.context.title} openDelay={1000}>
            <Text
              fontSize='xl'
              fontWeight='bold'
              cursor='pointer'
              userSelect='none'
              onClick={() => send('EDIT')}
              noOfLines={1}
              color='blackAlpha.900'
            >
              {current.context.title}
            </Text>
          </Tooltip>
        </Flex>
      )}
      <Flex gap={2}>
        <Tooltip label='Add new task list'>
          <IconButton aria-label='Add' icon={<HiPlus />} variant='outline' fontSize={20} color='gray.500' />
        </Tooltip>
        <BoardHeaderMenu />
      </Flex>
    </Flex>
  )
}

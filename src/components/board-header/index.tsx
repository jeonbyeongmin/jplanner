import { BoardHeaderMenu } from '@/components/board-header/board-header-menu'
import { Button, Flex, IconButton, Input, Text, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi'

export function BoardHeader() {
  const router = useRouter()

  // TODO: title, editmode 상태관리
  const found = headerTitleData.find((item) => item.id === router.query.id)

  const [title, setTitle] = useState<string>(found?.title ?? '')
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleModeChange = () => {
    setTitle((prev) => prev.trim())
    setIsEdit((prev) => !prev)
  }

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleModeChange()
    }
  }

  useEffect(() => {
    if (found) {
      setTitle(found.title)
    }
  }, [found])

  return (
    <Flex
      bgColor='white'
      h={16}
      borderBottom='1px'
      borderColor='gray.200'
      px={5}
      align='center'
      justify='space-between'
      gap={5}
    >
      {isEdit ? (
        <Flex flex={1} gap={2}>
          <Input
            variant='outline'
            defaultValue={title}
            onBlur={handleModeChange}
            onChange={handleTitle}
            onKeyDown={handleEnterKeyDown}
            fontSize='xl'
            fontWeight='bold'
            p={2}
            autoFocus
          />
          <Button>확인</Button>
          <Button>취소</Button>
        </Flex>
      ) : (
        <Flex p={2} _hover={{ bgColor: 'gray.50' }} borderRadius='md'>
          <Text
            fontSize='xl'
            fontWeight='bold'
            cursor='pointer'
            userSelect='none'
            onClick={handleModeChange}
            noOfLines={1}
            color='blackAlpha.900'
          >
            {title}
          </Text>
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

const headerTitleData = [
  { id: '1', title: '계획 제목을 입력하고 Enter를 누르면 저장됩니다. 취소하려면 다른 곳을 클릭해주세요' },
  { id: '2', title: 'Plan Title2' },
  { id: '3', title: 'Plan Title3' },
  { id: '4', title: 'Plan Title4' },
  { id: '5', title: 'Plan Title5' },
  { id: '6', title: 'Plan Title6' },
  { id: '7', title: 'Plan Title7' },
  { id: '8', title: 'Plan Title8' },
  { id: '9', title: 'Plan Title9' },
  { id: '10', title: 'Plan Title10' },
  { id: '11', title: 'Plan Title11' },
  { id: '12', title: 'Plan Title12' },
  { id: '13', title: 'Plan Title13' },
  { id: '14', title: 'Plan Title14' },
  { id: '15', title: 'Plan Title15' },
  { id: '16', title: 'Plan Title16' },
  { id: '17', title: 'Plan Title17' },
  { id: '18', title: 'Plan Title18' },
  { id: '19', title: 'Plan Title19' },
  { id: '20', title: 'Plan Title20' },
  { id: '21', title: 'Plan Title21' },
  { id: '22', title: 'Plan Title22' },
  { id: '23', title: 'Plan Title23' },
  { id: '24', title: 'Plan Title24' },
  { id: '25', title: 'Plan Title25' },
  { id: '26', title: 'Plan Title26' },
  { id: '27', title: 'Plan Title27' },
]

import { NavItem } from '@/components/layout/nav-item'
import { getBoardRoute } from '@/utils/routes'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export function Nav() {
  const router = useRouter()

  const handleMoveToPlan = (planID: string) => {
    router.push(getBoardRoute(planID))
  }

  // TODO: store current planID in context
  const isCurrent = (id: string) => {
    return router.query.id === id
  }

  return (
    <Flex
      as='ul'
      direction='column'
      flex={1}
      overflowY='scroll'
      marginX='-2'
      paddingLeft={2}
      paddingRight={1}
      visibility='hidden'
      _hover={{ visibility: 'visible' }}
    >
      {navItems.map(({ planID, label }) => (
        <NavItem key={planID} content={label} onClick={() => handleMoveToPlan(planID)} isCurrent={isCurrent(planID)} />
      ))}
    </Flex>
  )
}

const navItems = [
  {
    planID: '1',
    label: '계획 제목을 입력하고 Enter를 누르면 저장됩니다. 취소하려면 다른 곳을 클릭해주세요',
  },
  {
    planID: '2',
    label: 'Study Chakra',
  },
  {
    planID: '3',
    label: 'Study Next',
  },
  {
    planID: '4',
    label: 'Study TypeScript',
  },
  {
    planID: '5',
    label: 'Study GraphQL',
  },
  {
    planID: '6',
    label: 'Study Apollo',
  },
  {
    planID: '7',
    label: 'Study React',
  },
  {
    planID: '8',
    label: 'Study Chakra',
  },
  {
    planID: '9',
    label: 'Study Next',
  },
  {
    planID: '10',
    label: 'Study TypeScript',
  },
  {
    planID: '11',
    label: 'Study GraphQL',
  },
  {
    planID: '12',
    label: 'Study Apollo',
  },
  {
    planID: '13',
    label: 'Study React',
  },
  {
    planID: '14',
    label: 'Study Chakra',
  },
  {
    planID: '15',
    label: 'Study Next',
  },
  {
    planID: '16',
    label: 'Study TypeScript',
  },
  {
    planID: '17',
    label: 'Study GraphQL',
  },
  {
    planID: '18',
    label: 'Study Apollo',
  },
  {
    planID: '19',
    label: 'Study React',
  },
  {
    planID: '20',
    label: 'Study Chakra',
  },
  {
    planID: '21',
    label: 'Study Next',
  },
  {
    planID: '22',
    label: 'Study TypeScript',
  },
  {
    planID: '23',
    label: 'Study GraphQL',
  },
  {
    planID: '24',
    label: 'Study Apollo',
  },
  {
    planID: '25',
    label: 'Study React',
  },
  {
    planID: '26',
    label: 'Study Chakra',
  },
  {
    planID: '27',
    label: 'Study Next',
  },
]

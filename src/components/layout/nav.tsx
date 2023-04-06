import { NavItem } from '@/components/layout/nav-item'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export function Nav() {
  const router = useRouter()

  const handleMoveToPlan = (planID: string) => {
    router.push(planID)
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
      _hover={{ opacity: '1' }}
    >
      {navItems.map(({ planID, label }) => (
        <NavItem key={planID} content={label} onClick={() => handleMoveToPlan(planID)} />
      ))}
    </Flex>
  )
}

const navItems = [
  {
    planID: 'inbox',
    label: 'Study React',
  },
  {
    planID: 'today',
    label: 'Study Chakra',
  },
  {
    planID: 'next',
    label: 'Study Next',
  },
  {
    planID: 'scheduled',
    label: 'Study TypeScript',
  },
  {
    planID: 'logbook',
    label: 'Study GraphQL',
  },
  {
    planID: 'projects',
    label: 'Study Apollo',
  },
  {
    planID: 'inbox2',
    label: 'Study React',
  },
  {
    planID: 'today2',
    label: 'Study Chakra',
  },
  {
    planID: 'next2',
    label: 'Study Next',
  },
  {
    planID: 'scheduled2',
    label: 'Study TypeScript',
  },
  {
    planID: 'logbook2',
    label: 'Study GraphQL',
  },
  {
    planID: 'projects2',
    label: 'Study Apollo',
  },
  {
    planID: 'inbox3',
    label: 'Study React',
  },
  {
    planID: 'today3',
    label: 'Study Chakra',
  },
  {
    planID: 'next3',
    label: 'Study Next',
  },
  {
    planID: 'scheduled3',
    label: 'Study TypeScript',
  },
  {
    planID: 'logbook3',
    label: 'Study GraphQL',
  },
  {
    planID: 'projects3',
    label: 'Study Apollo',
  },
  {
    planID: 'inbox23',
    label: 'Study React',
  },
  {
    planID: 'today23',
    label: 'Study Chakra',
  },
  {
    planID: 'next23',
    label: 'Study Next',
  },
  {
    planID: 'scheduled23',
    label: 'Study TypeScript',
  },
  {
    planID: 'logbook23',
    label: 'Study GraphQL',
  },
  {
    planID: 'projects23',
    label: 'Study Apollo',
  },
  {
    planID: 'inbox4',
    label: 'Study React',
  },
  {
    planID: 'today4',
    label: 'Study Chakra',
  },
  {
    planID: 'next4',
    label: 'Study Next',
  },
]

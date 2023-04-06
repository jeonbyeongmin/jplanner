import { Nav } from '@/components/layout/nav'
import { Box, Button, Flex } from '@chakra-ui/react'

export function Sidebar() {
  return (
    <Flex h='full' direction='column' borderRight='1px' borderColor='gray.200'>
      <Flex as='nav' h='full' flex={1} gap={1} p={2} direction='column'>
        <Button variant='outline' size='lg' flexShrink={0}>
          New plan
        </Button>
        <Box h='2' />
        <Nav />
      </Flex>
    </Flex>
  )
}

import { useRouter } from 'next/router';

import { Nav } from '@/components/layout/nav';
import { BoardActorContext } from '@/contexts/global-state-provider';
import { Button, Flex } from '@chakra-ui/react';

export function Sidebar() {
  const router = useRouter();
  const boardActorRef = BoardActorContext.useActorRef();

  const handleNewBoard = async () => {
    boardActorRef.send({
      type: 'ADD_BOARD',
      payload: { title: 'New board' },
      navigateToBoard: (boardID: string) => router.push(`/board/${boardID}`),
    });
  };

  return (
    <Flex h='full' direction='column' borderRight='1px' borderColor='gray.200'>
      <Flex as='nav' h='full' flex={1} gap={3} px={2} py={3} pb={10} direction='column'>
        {/* <Flex align='center' justify='space-between' px={3} py={2} _hover={{ bgColor: 'gray.100' }} borderRadius='md'>
          <Flex gap={4} align='center'>
            <Avatar size='md' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' borderRadius='md' />
            <Text fontWeight='bold' fontSize='lg'>
              전병민
            </Text>
          </Flex>
          <HiChevronDown fontSize={18} />
        </Flex> */}
        <Button variant='outline' size='lg' py={6} mt={1} flexShrink={0} onClick={handleNewBoard}>
          New board
        </Button>
        <Nav />
      </Flex>
    </Flex>
  );
}

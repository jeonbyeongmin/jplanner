import { Flex } from '@chakra-ui/react';

export function NewTaskList() {
  return (
    <Flex
      role='group'
      w={'96'}
      bgColor='white'
      border='1px'
      borderColor='gray.200'
      shadow='lg'
      borderRadius='xl'
      position='relative'
      alignSelf='start'
    >
      <Flex direction='column' gap={5} p={3} pt={4} w='full'></Flex>
    </Flex>
  );
}

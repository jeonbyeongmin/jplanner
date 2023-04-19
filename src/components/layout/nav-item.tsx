import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';

interface Props {
  content: string;
  isCurrent?: boolean;
}

export function NavItem({ content, isCurrent }: Props) {
  const bgColors = {
    default: isCurrent ? 'gray.100' : 'white',
    hover: isCurrent ? 'gray.200' : 'gray.100',
  };

  return (
    <Tooltip label={content} aria-label={content} openDelay={1000}>
      <Flex
        role='group'
        bgColor={bgColors.default}
        _hover={{ bgColor: bgColors.hover }}
        p={3}
        borderRadius='md'
        cursor='pointer'
        userSelect='none'
        position='relative'
        visibility='visible'
      >
        <Flex flex={1} overflow='hidden' h={7} wordBreak='break-all' position='relative'>
          <Flex align='center' gap={2} flexShrink={0}>
            <Box w={1.5} h={1.5} bgColor='green.400' borderRadius='full' />
            <Text>{content}</Text>
          </Flex>
          <Box
            position='absolute'
            insetY={0}
            right={0}
            zIndex={10}
            w={20}
            bgGradient={`linear(to-l, ${bgColors.default}, rgba(0,0,0,0))`}
            _groupHover={{ bgGradient: `linear(to-l, ${bgColors.hover}, rgba(0,0,0,0))` }}
          />
        </Flex>
      </Flex>
    </Tooltip>
  );
}

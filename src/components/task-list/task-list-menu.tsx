import { useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { HiDotsVertical } from 'react-icons/hi'
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

export function TaskListMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Menu placement='bottom-end' isOpen={isOpen} onOpen={handleToggle} onClose={handleToggle}>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HiDotsVertical />}
        variant='ghost'
        size='sm'
        color='gray.500'
        fontSize='lg'
        visibility={isOpen ? 'visible' : 'hidden'}
        zIndex='dropdown'
        _groupHover={{ visibility: 'visible' }}
      />
      <MenuList zIndex='dropdown'>
        <MenuItem icon={<FiEdit size={16} />} iconSpacing={5}>
          리스트 제목 수정
        </MenuItem>
        <MenuItem icon={<FiTrash2 size={16} />} iconSpacing={5}>
          이 리스트 삭제
        </MenuItem>
      </MenuList>
      <Box
        left={0}
        top={0}
        position='absolute'
        zIndex={1}
        bgColor='white'
        opacity='0.7'
        w='full'
        h='full'
        borderRadius='xl'
        visibility={isOpen ? 'visible' : 'hidden'}
      />
    </Menu>
  )
}

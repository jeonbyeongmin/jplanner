import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'

export function TaskListMenu() {
  return (
    <Menu placement='bottom-end'>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HiDotsVertical />}
        variant='ghost'
        size='sm'
        color='gray.500'
        fontSize='lg'
        visibility='hidden'
        _groupHover={{ visibility: 'visible' }}
      />
      <MenuList>
        <MenuItem>Edit title</MenuItem>
        <MenuItem>Delete this list</MenuItem>
      </MenuList>
    </Menu>
  )
}

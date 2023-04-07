import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'

export function HeaderMenu() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HiDotsVertical />}
        variant='outline'
        color='gray.500'
        fontSize={20}
      />
      <MenuList>
        <MenuItem command='⌘T'>Edit title</MenuItem>
        <MenuItem command='⌘N'>Move to archive</MenuItem>
      </MenuList>
    </Menu>
  )
}

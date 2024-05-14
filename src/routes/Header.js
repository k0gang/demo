import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react';
import VideoList from '../components/VideoList';

const Header = () => {
    return (
        <>
            <Heading>검색 서비스</Heading>
            <Menu>
                <MenuButton
                    px={4}
                    py={2}
                    transition="all 0.2s"
                    borderRadius="md"
                    borderWidth="1px"
                    _hover={{ bg: 'gray.400' }}
                    _expanded={{ bg: 'blue.400' }}
                    _focus={{ boxShadow: 'outline' }}
                >
                    Video
                </MenuButton>
                <MenuList>
                    <MenuItem as="a" href="/demo/video/list">
                        추천 영상
                    </MenuItem>
                    <MenuItem as="a" href="/demo/video">
                        영상 검색
                    </MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton
                    px={4}
                    py={2}
                    transition="all 0.2s"
                    borderRadius="md"
                    borderWidth="1px"
                    _hover={{ bg: 'gray.400' }}
                    _expanded={{ bg: 'blue.400' }}
                    _focus={{ boxShadow: 'outline' }}
                >
                    Book
                </MenuButton>
                <MenuList>
                    <MenuItem as="a" href="/demo/book/list">
                        추천 도서
                    </MenuItem>
                    <MenuItem as="a" href="/demo/book">
                        도서 검색
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};
export default Header;

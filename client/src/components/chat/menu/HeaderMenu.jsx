
import { useContext, useState } from 'react';

import {  MoreVert } from "@mui/icons-material";
import { Menu, MenuItem, styled } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';


const MenuOption = styled(MenuItem)`
    font-size: 14px;
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`
const Logout = styled('a')({
    textDecoration: "none",
    color: 'black'
})


const HeaderMenu = ({ setOpenDrawer }) => {

    const [open, setOpen] = useState(null);

    const { setAccount } = useContext(AccountContext);

    const handleClose = () => {
        setOpen(null);
    }

    const handleClick = (e) => {
        setOpen(e.currentTarget);
    }

    const logOut = () => {
        setAccount(null);
    }

    return (
        <>
            <MoreVert style={{cursor: 'pointer'}} onClick={handleClick} />
            <Menu
                anchorEl={open}
                keepMounted
                open={open}
                onClose={handleClose}
                getContentAnchorE1={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuOption onClick={() => { handleClose(); setOpenDrawer(true); }}>Profile</MenuOption>
                <MenuOption onClick={() => { logOut()}}>Logout</MenuOption>
                {/* <MenuOption ><Logout href='http://localhost:3000/'>Logout</Logout></MenuOption> */}
            </Menu>
        </>
    )
}

export default HeaderMenu;

import { Drawer, Box, Typography,styled } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Profile from './Profile';

const drawerStyle = {
    left: 20,
    top: 23,
    height: '95%',
    width: '23.5%',
    boxShadow: 'none',
    minWidth: '450px'
}

const Header = styled(Box)`
    background: #008069;
    height: 102px;
    color: #FFFFFF;
    display: flex;
    & > svg, & > p {
        margin-top: auto;
        padding: 15px;
        font-weight: 600;
    }
`;

const Component = styled(Box)`
    background: #ededed;
    height: 88%;
`;

const Text = styled(Typography)`
    font-size: 18px;
`;

const InfoDrawer = ({ open, setOpen }) => {

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: drawerStyle}}
            style={{ zIndex: 1500}}
            //hideBackdrop={true}
        >
            <Header>
                <ArrowBack onClick= { () => setOpen(false) } />
                <Text> Profile </Text>
            </Header>
            <Component>
                <Profile />
            </Component>
        </Drawer>
    )
}

export default InfoDrawer;
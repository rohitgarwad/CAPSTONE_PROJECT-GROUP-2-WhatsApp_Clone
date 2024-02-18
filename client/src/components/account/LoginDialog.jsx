import { useContext } from 'react';

import { Dialog, Box, Typography, List, ListItem, styled } from '@mui/material';

import { qrCodeImage } from '../../constants/data';
import QrCode from "../../QrCode.png";
import { AccountContext } from '../../context/AccountProvider';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { addUser } from '../../service/api';



const Component = styled(Box)`
    margin-top: 7%;
    display: flex;
`;

const Container = styled(Box)`
    padding: 56px 0 56px 56px;
`;

const QRCode = styled('img')({
    height: 264,
    width: 264,
    margin: '50px 0 0 50px'
});

const Title = styled(Typography)`
    font-size: 26px;
    color: #525252;
    font-weight: 326;
    font-family: inherit;
    margin-bottom: 25px;
`;

const StyledList = styled(List)`
    & > li {
        padding: 0;
        margin-top: 15px;
        font-size: 18px;
        line-height: 28px;
        color: #4a4a4a;
    } 
`;

const dialogStyle = {
    height: '80%',
    width: '55%',
    maxWidth: '100%',
    maxHeight: '100%',
    marginTop: '15%',
    marginBottom: '10%',
    boxShadow: 'none',
    overflow: 'hidden',
    backgroundColor: 'none'
}


const LoginDialog = () => {

    const { setAccount } = useContext(AccountContext);

    const onLoginSuccess = async(res) => {
        const decoded = jwtDecode(res.credential);
        setAccount(decoded);
        await addUser(decoded);
    }

    const onLoginError = (res) => {
        console.log('Login Failed ', res);
    }

    return (
        <Dialog 
            open={true}
            PaperProps={{sx: dialogStyle}}
            hideBackdrop={true}
        >
            <Component>
                <Container>
                    <Title>
                        To Use WhatsApp-Clone on your computer
                    </Title>
                    <StyledList>
                        <ListItem>
                            1. Open WhatsApp-Clone on your Browser
                        </ListItem>
                        <ListItem>
                            2. Scan QR code for New Google account registration
                        </ListItem>
                        <ListItem>
                            3. Click-On Link in QR code for Login
                        </ListItem>
                        <ListItem>
                            4. Select your Google account to Login
                        </ListItem>
                        <ListItem>
                                <h4> Happy Chatting ! </h4>
                        </ListItem>
                    </StyledList>
                </Container>
                <Box style={{ position: 'relative' }}>
                    <QRCode src={QrCode} alt='QR CODE'></QRCode>
                    <Box style={{ position: 'absolute', top: '45%', transform: 'translateX(52%)' }}>
                        <GoogleLogin 
                            onSuccess={onLoginSuccess}
                            onError={onLoginError}
                        />
                    </Box>
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;
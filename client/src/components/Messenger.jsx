import { useContext } from "react";

import { AppBar, Toolbar, styled, Box } from "@mui/material";

import { AccountContext } from "../context/AccountProvider";

//components
import LoginDialog from "./account/LoginDialog";
import ChatDialog from "./chat/ChatDialog";
import chatIcon from "../chatIcon.png";

const Component = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const ChatHeader = styled(AppBar)`
  height: 125px;
  background-color: #00A884;
  box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
  height: 225px;
  background-color: #00bfa5;
  box-shadow: none;
`;

const Messenger = () => {
  const { account } = useContext(AccountContext);

  return (
    <Component>
      {account ? (
        <>
          <ChatHeader>
            <Toolbar></Toolbar>
          </ChatHeader>
          <ChatDialog />
        </>
      ) : (
        <>
          <LoginHeader>

            <div style={{ display: "flex", marginLeft: '360px', marginTop: '40px', fontSize: '20px' }}>
              <img style={{ height: '40px', width: '40px', marginTop: '20px' }} src={chatIcon} alt="whatsappIcon" />
              <h3 style={{ fontFamily: "cursive", fontWeight: '600', marginLeft: '10px'}}>WHATSAPP CLONE WEB</h3>
            </div>
          </LoginHeader>
          <LoginDialog />
        </>
      )}
    </Component>
  );
};

export default Messenger;

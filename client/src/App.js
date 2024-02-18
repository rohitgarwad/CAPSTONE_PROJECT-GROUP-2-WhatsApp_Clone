

import { GoogleOAuthProvider } from '@react-oauth/google';

//components
import Messenger from "./components/Messenger";
import AccountProvider from './context/AccountProvider';


function App() {

  const clientId = "428003604735-rsac58lgobe6pobrv78fprj0nd74meuo.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

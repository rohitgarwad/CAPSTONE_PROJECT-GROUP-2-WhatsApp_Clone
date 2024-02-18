import { useContext, useState, useEffect, useRef } from 'react';

import { Box, styled } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider';

// Components
import ChatFooter from './ChatFooter';
import { getMessages, newMessage } from '../../../service/api';
import Message from './Message';

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    width: 100%;
    height: 92%;
    background-size: 50%;
`;

const Components = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 3px 80px;
`

const Messages = ({ person, conversation }) => {

    const [ value, setValue ] = useState('');

    const [ messages, setMessages ] = useState([]);

    const [ file, setFile ] = useState();
    
    const [ image, setImage ] = useState('');

    const [ incomingMessage, setIncomingMessage ] = useState(null);

    const scrollRef = useRef();

    const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);


    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation._id);
            setMessages(data);
        }
        conversation._id && getMessageDetails();
    }, [person._id, conversation._id, newMessageFlag]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: 'smooth' });
    }, [messages, person._id, conversation._id])

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && setMessages(prev => [...prev, incomingMessage]);
    }, [incomingMessage, conversation, conversation.senderId])

    const sendText = async (e) => {
        const code = e.keyCode || e.which;
        if (code === 13) {
            let message
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                }
            } else {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image
                }
            }

            socket.current.emit('sendMessage', message);

            await newMessage(message);

            setValue('');
            setFile('');
            setImage('');

            setNewMessageFlag(prev => !prev);
        }
    }

    return (
        <Wrapper>
            <Components>
               {
                 messages && messages.map(message => (
                    <Container ref={scrollRef}>
                        <Message message={message} />
                    </Container>
                 ))
               }
            </Components>
            <ChatFooter 
                sendText={sendText}
                setValue={setValue}
                value={value}
                file={file}
                setFile={setFile}
                setImage={setImage}
            />
        </Wrapper>
    )
}

export default Messages;
import { useEffect } from "react";

import { Box, InputBase, styled } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFile, Mic } from '@mui/icons-material';
import { uploadFile } from "../../../service/api";


const Container = styled(Box)`
    display: flex;
    height: 56px;
    background: #ededed;
    width: 100%;
    align-items: center;
    padding: 0 15px;
    & > * {
        margin: 5px;
        color: #919191;
    }
`;

const SearchBox = styled(Box)`
    background-color: #FFFFFF;
    border-radius: 10px;
    width: calc( 95% - 100px );
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    height: 20px;
    padding-left: 25px;
    font-size: 15px;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(45deg);
`

const ChatFooter = ({ sendText, setValue, value, file, setFile, setImage }) => {


    useEffect(() => {
        const getImage = async () => {
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                let response = await uploadFile(data);
                setImage(response.data);
            }
        }
        getImage();
    }, [file]);

    const onFileChange = (e) => {
        console.log(e);
        setFile(e.target.files[0]);
        setValue(e.target.files[0].name);
    }

    return (
        <Container>
            <EmojiEmotionsOutlined />
            <label htmlFor="fileInput">
                <ClipIcon />
            </label>
            <input 
                type="file" 
                id="fileInput"
                style={ {display: 'none'} }
                onChange={(e) => onFileChange(e)}    
            />
            <SearchBox>
                <InputField 
                    placeholder="Type a message"
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => sendText(e)}
                    value={value}
                />
            </SearchBox>
            <Mic />
        </Container>
    )
}

export default ChatFooter;
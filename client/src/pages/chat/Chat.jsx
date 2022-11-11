import { Box, Drawer, Grid, useMediaQuery } from "@mui/material";
import LeftContent from "components/chat/LeftContent";
import MessagesArea from "components/chat/MessagesArea"; 
import useTitle from "hooks/useTitle";
import {  useState } from "react";
import {useAuthSlice} from "redux/features";
import { fetchChats,selectChats, setNotification } from "redux/features/chat/chatSlice";
import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react"; 
 

const Chat = () => {
  
  useTitle("Chat");
  const dispatch = useDispatch();
  const {user}=useAuthSlice();
  const [openLeft, setOpenLeft] = useState(false);
  const chats=useSelector(selectChats);
const notification=useSelector(state=>state.chat.notification);
  const selectedChat = useSelector((state) => state.chat.chat);
  const downMd = useMediaQuery(theme => theme.breakpoints.down("md"));
 
console.log("user",user);
  useEffect(() => {
    dispatch(fetchChats(user));
  }, [dispatch]);

console.log("Chats",chats);
  
   
  return <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        {downMd ? <Drawer anchor="left" open={openLeft} onClose={() => setOpenLeft(false)}>
            <Box width={380} padding={2}>
             <LeftContent user={user} chats={chats}/>
            </Box>
          </Drawer> : <Grid item lg={3} md={5}>
          <LeftContent user={user} chats={chats}/>
          </Grid>}

        <Grid item lg={9} md={10} xs={12}>
           <MessagesArea selectedChat={selectedChat} setOpenLeft={setOpenLeft} user={user} setNotification={setNotification} notification={notification} /> 
        </Grid>

        
      </Grid>
    </Box>;
};
 
export default Chat;
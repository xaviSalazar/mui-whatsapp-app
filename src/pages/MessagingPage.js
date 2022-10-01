import Sidebar from '../components/Sidebar/Sidebar';
import Chat from '../components/Chat/Chat';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import { getUsers } from '../redux/GetUsers/UsersAction';
import { getUsers } from '../redux/GetUsers/UsersAction'
import Box from '@mui/material/Box';

const MessagingPage = ({socket}) => {

    let auth = useSelector(state => state.customerReducer.auth)

    const [selectedChat, setChat] = useState();
    const dispatch = useDispatch();   

    useEffect( ()=>{
        dispatch(getUsers(auth?.data?.responseData?._id))
        }, [dispatch, auth])      
  
return (
  <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          width: 1,
        }}
      >
    {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}> */}
        <Grid container spacing={3} sx={{ mt: 4, mb: 4}}>
          <Grid item xs={4}>
            <Sidebar setChat = {setChat} socket = {socket} />
          </Grid> 
          <Grid item xs>
            <Chat selectedChat = {selectedChat} socket = {socket}/>
          </Grid>
        </Grid>
    {/* <Chat selectedChat = {selectedChat} socket = {socket}/> */}
    {/* </Container>   */}
    </Box>
)

}

export default MessagingPage;
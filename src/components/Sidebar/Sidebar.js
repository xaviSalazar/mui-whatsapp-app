import React, {useState, useEffect} from "react";
import './Sidebar.css';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat/SidebarChat'
import { useSelector } from "react-redux";
// import { searchOneUser } from '../../redux/GetUsers/UsersAction'
import { useDispatch } from 'react-redux';
// import { getUsers } from '../../redux/GetUsers/UsersAction';
import Box from '@mui/material/Box';

import Input from '@mui/material/Input';

const Sidebar = (props) => {
  
    // 
    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState("");
    const [socket, setSocket] = useState(props.socket)
    const [selectedActive, setSelectedActive] = useState([])
    // use selectors
    const contactList  = useSelector((state) => state.getUsers);
    // let auth = useSelector(state => state.customerReducer.auth)
    //console.log("rendering")

    // useEffect(() => {

    //     const eventListener2 = ({ messages }) => {
    //         //console.log("new user contact");  
    //         // dispatch(getUsers(auth?.data?.responseData?._id))
    //     };
    //     socket.on('new_user_contact', eventListener2);

    //     const eventListener1 = ({ messages }) => {
    //         //console.log("new user contact");  
    //         // dispatch(getUsers(auth?.data?.responseData?._id))
    //     };
    //     socket.on('user_answered', eventListener1);


    //     return () => {
    //         socket.off('new_user_contact') 
    //         socket.off('user_answered') 
    //     }

    // }, [socket, dispatch, auth?.data?.responseData?._id])

    const onSearchTextChanged = async (searchText) => {
        setSearchString(searchText);
        //console.log(searchText);
        // to do: implement phone validation
        // dispatch(searchOneUser(searchText))
    }

  

    return (
        <Box
        component="main"
        display = "flex"
        flexDirection={"column"}
        minHeight={900}
        maxHeight={900}
        >
            <div className="sidebar__header">
                {/* <Avatar >{auth?.data?.responseData?.firstName.charAt(0) + auth?.data?.responseData?.lastName.charAt(0)}</Avatar> */}
               <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

                <Box
                display = "flex"
                >
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon />
                    <Input
                     placeholder="Search or start new chat" 
                     type="text" 
                     value = {searchString}
                     onChange={(e) => onSearchTextChanged(e.target.value)}

                    />
                 
                </div>
                </Box>

            <div className="sidebar__chats">
                {
                    
                    contactList.sort((a,b)=> b.lastMessage > a.lastMessage).map((userData, index) => (                    
                        <SidebarChat   
                            key={index} 
                            idColumn={index}
                            userData = {userData} 
                            setChat = {props.setChat}
                            setSelectedActive = {setSelectedActive}
                            selectedActive ={selectedActive}
                        />
                    ))
                }
            </div>

            </Box>
    )
}

export default Sidebar;
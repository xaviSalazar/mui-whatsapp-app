import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { doSaveTokens } from '../../redux/ConfigToken/Actions'
import { sendCredentials } from '../../api/index'
import * as crypto from 'crypto-js';

export const SettingsTokens = (props) => {

  let auth = useSelector(state => state.customerReducer.auth)
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    phone_number: '',
    phone_id: '',
    waba: '',
    waba_token: ''
  });

  useEffect(() => { 

    const itemStr = localStorage.getItem("whatsapp_app")

    if(!itemStr) 
    {
        return;
    }

    const item = JSON.parse(itemStr);
    setValues({
      phone_number: item.phoneNumber,
      phone_id: item.phoneNumberId,
      waba: item.businessId,
      waba_token: item.token 
    })

}, [])


  const [isDisabled, setIsDisabled] = useState({phone_number: true, phone_id: true, waba: true, waba_token: true});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleClick = ( event ) => {
    const name = event.currentTarget.name
    setIsDisabled({
      ...isDisabled,
      [event.currentTarget.name]: !isDisabled[name]
    })
  }

  const setConfigurations = () => {

    if( values.phone_number !== '' && 
        values.phone_id !== '' && 
        values.waba !== '' && 
        values.waba_token !== '' )
    {
        //console.log('clicked')

        const config = {
            phoneNumber : values.phone_number,
            token : values.waba_token,
            phoneNumberId : values.phone_id ,
            businessId: values.waba ,
            userId: auth?.data?.responseData?._id
        }

        //let phoneEncrypt = crypto.AES.encrypt(phoneNumber, 'anykeyhere').toString();
        let tokenEncrypt = crypto.AES.encrypt(values.waba_token, 'anykeyhere').toString();
        let phoneNumberIdEncrypt = crypto.AES.encrypt(values.phone_id ,'anykeyhere').toString();
        let businessIdEncrypt = crypto.AES.encrypt(values.waba , 'anykeyhere').toString();

        const configEncrypt = {
            phoneNumber: values.phone_number,
            secretToken: tokenEncrypt,
            phoneNumberId: phoneNumberIdEncrypt,
            businessId: businessIdEncrypt,
            userId: auth?.data?.responseData?._id
        }

        //console.log(`phone ${phoneEncrypt}, token ${tokenEncrypt}, phoneId ${phoneIdEncrypt}`)
        sendCredentials(configEncrypt)
        dispatch(doSaveTokens(config))
    }
}

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="update tokens"
          title="Whatsapp Token Configuration"
        />
        <Divider />
        <CardContent>

          <TextField 
          label="Phone Number"
          margin="normal"
          name="phone_number"
          type="text"
          onChange={handleChange}
          disabled={isDisabled.phone_number}
          value={values.phone_number}
          variant="outlined"
          />
          <IconButton name="phone_number" onClick = {handleClick}>
             <EditIcon/>
          </IconButton>
          
          <br/>    
          <TextField 
          label="Phone ID"
          margin="normal"
          name="phone_id"
          type="text"
          onChange={handleChange}
          disabled={isDisabled.phone_id}
          value={values.phone_id}
          variant="outlined"
          />
          <IconButton name="phone_id" onClick = {handleClick}>
             <EditIcon/>
          </IconButton>

          <br/>
            
          <TextField 
          label="Whatsapp Business ID"
          margin="normal"
          name="waba"
          type="text"
          onChange={handleChange}
          disabled={isDisabled.waba}
          value={values.waba}
          variant="outlined"
          />
          <IconButton name="waba" onClick = {handleClick}>
             <EditIcon/>
          </IconButton>

          <br/>
            
          <TextField 
          label="Whatsapp Token"
          margin="normal"
          name="waba_token"
          type="text"
          onChange={handleChange}
          disabled={isDisabled.waba_token}
          value={values.waba_token}
          variant="outlined"
          />
          <IconButton name="waba_token" onClick = {handleClick}>
             <EditIcon/>
          </IconButton>


        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick = {setConfigurations}
          >
            Update Values
          </Button>
        </Box>
      </Card>
    </form>
  );
};

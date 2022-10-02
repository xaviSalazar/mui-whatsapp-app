import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography, formControlClasses
  } from '@mui/material';
  import { Search as SearchIcon } from '../../icons/search';
  import { Upload as UploadIcon } from '../../icons/upload';
  import { Download as DownloadIcon } from '../../icons/download';
  import React, { useState } from 'react';
  import AddContact from './customer-add-form'
  import { useSelector } from "react-redux";
  import {createUser } from '../../api'
  import { ImportCSV } from './importCSV';
  import { ExportCSV } from './ExportCSV';

 
  
   const CustomerListToolbar = ({excelContacts}) => {

    const [contactToggle, setContactToggle] = useState(false);

    const hiddenFileInput = React.useRef(null);
    let auth = useSelector(state => state.customerReducer.auth)
    const [addFormData, setAddFormData] = useState({
      Asunto: "",
      Apellidos: "",
      Nombres: "",
      'Lugar de Trabajo': "",
      Email: "",
      Celular: "",
      Direccion: "",
      Notas: "",
    });


    const handleAddFormChange = (event) => {
      if(event.target) {
      const fieldName = event.target.name
      const fieldValue = event.target.value;
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;
      setAddFormData(newFormData);
      } else {
        const newFormData = { ...addFormData };
        const firstFilter = event.replace('+','')
        const newoutput = firstFilter.replace(/ /g , '')
        newFormData['Celular'] = newoutput;
        setAddFormData(newFormData);
      }
    };

    const handleAddFormSubmit = async (event) => {
    
      const sendDatabase = {
        'asunto': addFormData.Asunto,
        'lastname': addFormData.Apellidos,
        'name': addFormData.Nombres,
        'workplace': addFormData['Lugar de Trabajo'],
        'email': addFormData.Email,
        'phoneNumber': addFormData.Celular,
        'address': addFormData.Direccion,
        'notes': addFormData.Notas,
        'owner': auth?.data?.responseData?._id,
        }

      await createUser(sendDatabase);
      
      setContactToggle(false);
    };

    const handleClick = event => {
      hiddenFileInput.current.click();
    };

    return (
    <Box >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Clientes
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
            onClick = {handleClick}
          >
            Importar Excel
            <ImportCSV hiddenFileInput = {hiddenFileInput} />
          </Button>  
          <ExportCSV contacts={excelContacts} fileName="Exported Contacts"/>
          {/* <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Exportar Excel
          </Button> */}
          <Button
            color="primary"
            variant="contained"
            onClick = { () => setContactToggle(!contactToggle)}
          >
            Agregar Contacto
          </Button>
          <AddContact handleAddFormSubmit = {handleAddFormSubmit} handleAddFormChange={handleAddFormChange} setContactToggle = {setContactToggle} contactToggle = {contactToggle} />
        </Box>

      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
    )
  };

  export default CustomerListToolbar
  
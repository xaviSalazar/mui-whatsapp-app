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
  import { useState } from 'react';
  import AddContact from './customer-add-form'
  
   const CustomerListToolbar = (props) => {

    const [contactToggle, setContactToggle] = useState(false);
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
  
      console.log(newFormData)
      setAddFormData(newFormData);
      } else {
        const newFormData = { ...addFormData };
        newFormData['Celular'] = event;
        setAddFormData(newFormData);
      }
    };

    return (
    <Box {...props}>
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
          >
            Importar Excel
          </Button>
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Exportar Excel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick = { () => setContactToggle(!contactToggle)}
          >
            Agregar Contacto
          </Button>
          <AddContact handleAddFormChange={handleAddFormChange} setContactToggle = {setContactToggle} contactToggle = {contactToggle} />
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
  
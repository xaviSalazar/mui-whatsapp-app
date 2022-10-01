import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiPhoneNumber from 'material-ui-phone-number';
import './customer-add-form.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function AddContact({setContactToggle, contactToggle, handleOnChangeNumber, handleAddFormSubmit, handleAddFormChange}) {

  return (
    // <React.Fragment>
    <Modal
    open={contactToggle}
    onClose={() => setContactToggle(!contactToggle)}
    aria-labelledby="parent-modal-title"
    aria-describedby="parent-modal-description"
    >
    <Box sx={{ ...style, width: 400 }}>
      <Typography variant="h6" gutterBottom>
        Datos de Contacto
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            id="Asunto"
            name="Asunto"
            label="Asunto"
            fullWidth
            autoComplete=""
            variant="standard"
            onChange = {handleAddFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Apellidos"
            name="Apellidos"
            label="Apellidos"
            fullWidth
            autoComplete=""
            variant="standard"
            onChange = {handleAddFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Nombres"
            name="Nombres"
            label="Nombres"
            fullWidth
            autoComplete=""
            variant="standard"
            onChange = {handleAddFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Lugar de Trabajo"
            name="Lugar de Trabajo"
            label="Donde Trabaja"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange = {handleAddFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Email"
            name="Email"
            label="Email"
            fullWidth
            autoComplete=""
            variant="standard"
            onChange = {handleAddFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <TextField
            required
            id="Celular"
            name="Celular"
            label="Numero de Celular"
            fullWidth
            autoComplete=""
            variant="standard"
          /> */}
        <MuiPhoneNumber 
            required
            id="Celular"
            name="Celular"
            label="Numero de Celular"
            defaultCountry='ec' 
            onChange={handleAddFormChange}
        />

        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Direccion"
            name="Direccion"
            label="Direccion"
            fullWidth
            autoComplete=""
            variant="standard"
            onChange = {handleAddFormChange}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid> */}
        <Grid item xs={12} >
          <TextField
            id="Notas"
            name="Notas"
            label="Alguna nota o detalle"
            fullWidth
            autoComplete=""
            variant="standard"
            onChange = {handleAddFormChange}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid> */}
        <Grid item xs={12}>

        <Button
                    variant="contained"
                    // onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    onClick = { handleAddFormSubmit }
                  >
         Agregar Contacto
        </Button>
        </Grid>
      </Grid>
      </Box>
   
    </Modal>
    // </React.Fragment>
  );
}

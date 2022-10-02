import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/GetUsers/UsersAction'
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import SelectTemplate from '../whatsapp-template/SelectTemplate'
import ConfirmDialog from '../../utils/confirm-dialog'
import SendIcon from '@mui/icons-material/Send';

// template initial state
// Note: Do not put unnecessary elements in components
const initialState = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: "PHONE_NUMBER",
  type: "template",
  template: {
    name: "TEMPLATE_NAME",
    language: {
      code: "LANGUAGE_AND_LOCALE_CODE"
    },
  components: []
  }
}

export const CustomerListResults = ({ setExcelContacts, ...rest }) => {

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([])
  const contactsList = useSelector((state) => state.getUsers)
  const [initConvTemplate, setInitConvTemplate] = useState(initialState);
  const [modalToggle, setModalToggle] = useState(false);
  let auth = useSelector(state => state.customerReducer.auth)
  // to retrieve all my users 
  console.log(initConvTemplate)
  useEffect(() => {
    dispatch(getUsers(auth?.data?.responseData?._id))
}, [dispatch, auth?.data?.responseData?._id])

// tranlaste values 
useEffect(() => {
    
  const newTranslation = contactsList.map(item => {
    return {
      'Asunto': item.asunto,
      'Apellidos': item.lastname,
      'Nombres': item.name,
      'Lugar de Trabajo': item.workplace,
      'Email': item.email,
      'Celular': item.phoneNumber,
      'Direccion': item.address,
      'Notas': item.notes,
      '_id': item._id,
      }
  });

  const newExcelContact = contactsList.map(item => {
    return {
      'Asunto': item.asunto,
      'Apellidos': item.lastname,
      'Nombres': item.name,
      'Lugar de Trabajo': item.workplace,
      'Email': item.email,
      'Celular': item.phoneNumber,
      'Direccion': item.address,
      'Notas': item.notes,
      }
  });

  setCustomers(newTranslation)
  setExcelContacts(newExcelContact)

}, [contactsList])

  // Select all customers
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    if (event.target.checked) {
      // newSelectedCustomerIds = customers.map((customer) => customer._id);
      newSelectedCustomerIds = customers
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  // handle select single customer
  const handleSelectOne = (event, customer) => {
    const selectedIndex = selectedCustomerIds.map(customer => customer._id).indexOf(customer._id);
    console.log(selectedIndex)
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, customer);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setModalToggle(!modalToggle)
  };

  const handleConfirm = () => {
    console.log(`sending messageses`)
    setModalToggle(!modalToggle)
  }
 
  return (
    <Card {...rest}>

          <Button
            color="primary"
            variant="contained"
            onClick = { () => setModalToggle(!modalToggle)}
            endIcon={<SendIcon />}
          >
            ENVIAR MENSAJE
          </Button>

        <ConfirmDialog open = {modalToggle} handleClose = {handleClose} handleConfirm = {handleConfirm}/>
      <PerfectScrollbar>
        <SelectTemplate initConvTemplate={initConvTemplate} setInitConvTemplate={setInitConvTemplate}/>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Contacto
                </TableCell> 
                <TableCell>
                  Celular
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Direccion
                </TableCell>
                <TableCell>
                  Lugar de Trabajo
                </TableCell>
                <TableCell>
                  Asunto
                </TableCell> 
                <TableCell>
                  Notas
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(page*limit, limit*(page+1)).map((customer) => (
                <TableRow
                  hover
                  key={customer._id}
                  selected={selectedCustomerIds.indexOf(customer._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked = {selectedCustomerIds.map(customer => customer._id).indexOf(customer._id) !== -1}
                      // checked={selectedCustomerIds.indexOf(customer._id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.Nombres)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${customer.Nombres} ${customer.Apellidos}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.Celular}
                  </TableCell>
                  <TableCell>
                    {customer.Email}
                  </TableCell>
                  <TableCell>
                    {customer.Direccion}
                  </TableCell>
                  <TableCell>
                    {customer['Lugar de Trabajo']}
                  </TableCell>
                  <TableCell>
                    {customer.Asunto}
                  </TableCell>
                  <TableCell>
                   {customer.Notas}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>

  );
};

// CustomerListResults.propTypes = {
//   customers: PropTypes.array.isRequired
// };

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
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import SelectTemplate from '../whatsapp-template/SelectTemplate'

export const CustomerListResults = ({  ...rest }) => {

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([])
  const contactsList = useSelector((state) => state.getUsers)
  let auth = useSelector(state => state.customerReducer.auth)
  // to retrieve all my users 
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

  console.log(newTranslation)
  setCustomers(newTranslation)

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


  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <SelectTemplate />
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

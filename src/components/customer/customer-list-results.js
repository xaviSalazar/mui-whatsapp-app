import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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

export const CustomerListResults = ({  ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([])
  const contactsList = useSelector((state) => state.getUsers);
  let auth = useSelector(state => state.customerReducer.auth)

  console.log(selectedCustomerIds)

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
      '__rowNum__': item.__rowNum__,
      '_id': item._id,
      'isChecked': false
      }
  });

  console.log(newTranslation)
  setCustomers(newTranslation)

}, [contactsList])

  // Select all customers
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  // handle select single customer
  const handleSelectOne = (event, _id) => {
    const selectedIndex = selectedCustomerIds.indexOf(_id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, _id);
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
                      checked={selectedCustomerIds.indexOf(customer._id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer._id)}
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

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

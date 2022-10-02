// import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { CustomerListResults } from '../components/customer/customer-list-results';
import  CustomerListToolbar  from '../components/customer/customer-list-toolbar';
// import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Customers = () => {

  const [excelContacts, setExcelContacts] = useState()
  
  return (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar excelContacts = { excelContacts }/>
        <Box sx={{ mt: 3 }}>
          <CustomerListResults setExcelContacts = { setExcelContacts } />
        </Box>
      </Container>
    </Box>
  </>
  )
};

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Customers;

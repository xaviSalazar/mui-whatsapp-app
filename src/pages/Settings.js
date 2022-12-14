
import { Box, Container, Typography } from '@mui/material';
import { SettingsNotifications } from '../components/settings/settings-notifications';
import { SettingsTokens } from '../components/settings/settings-tokens';

const Settings = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Settings
        </Typography>
        {/* <SettingsNotifications /> */}
        <Box sx={{ pt: 3 }}>
          <SettingsTokens />
        </Box>
      </Container>
    </Box>
  </>
);

export default Settings;

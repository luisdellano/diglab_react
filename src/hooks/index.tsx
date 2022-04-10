import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/default.theme';
import { MQTTProvider } from './useMQTT';

const AppProvider: React.FC = ({ children }) => (
    <MQTTProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MQTTProvider>
);

export default AppProvider;

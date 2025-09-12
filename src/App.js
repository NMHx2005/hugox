import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import AppRouter from './routes/AppRouter';
import { AppProvider } from './contexts/AppProvider';
import './App.css';
function App() {
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(AppProvider, { children: _jsx(AppRouter, {}) })] }));
}
export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@material-ui/core';
import theme from './providers/theme-service';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
     <ThemeProvider theme={theme}>
                <App />
        </ThemeProvider>,
)

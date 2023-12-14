import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { ThemeProvider } from '@material-ui/core';
import theme from './providers/theme-service';
import './index.css'

ReactDOM.render(
     <ThemeProvider theme={theme}>
                <App />
        </ThemeProvider>,
        document.getElementById('root')
)

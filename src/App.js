import { Home } from './pages/Home';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import GenresTest from './components/GenresTest';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes> 
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/test' element={<GenresTest/>} ></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

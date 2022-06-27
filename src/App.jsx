import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import { Explore } from './pages/Explore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ContactUs } from './pages/Contact';
import { AboutUs } from './pages/About';
import { Category } from './pages/Category';
import { Calender } from './components/Calender';
import { Head } from './pages/Head';
import { Swiper1 } from './components/Swiper/Swiper';
const theme = createTheme({
  palette: {
    primary: {
      light: '#e6ffb6',
      main: '#ffcfb6',
      dark: '#b6c1ff',
      contrastText: '#fffff'
    }
  },
  typography: {
    fontFamily: ['Segoe UI', 'Tahoma', 'sans-serif'].join(',')
  }
});

function App () {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Head />
        <Swiper1 />
        <Explore />
        <Category />
        <AboutUs />
        <Calender />
        <ContactUs />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;

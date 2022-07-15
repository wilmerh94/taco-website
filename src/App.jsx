import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import { Explore } from './pages/Explore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ContactUs } from './pages/Contact';
import { AboutUs } from './pages/About';
import { Category } from './pages/Category';
import { Calender } from './components/Calender';
import { Head } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { CardItem } from './components/CardItem';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { CreatingItems } from './pages/CreatingItems';
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
        <Routes>
          <Route path="/" element={<Head />} />
          <Route path="/category" element={<Category />} />
          <Route path="/calendar" element={<Calender />} />
          <Route path="/menu" element={<CardItem />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          /> */}
          <Route
            path="/create-listing"
            element={<CreatingItems />}
          />

          {/* <Route
            path="/edit-listing/:listingId"
            element={<EditListing />}
          /> */}
        </Routes>
        <Footer />
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default App;

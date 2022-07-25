import { Route, Routes } from 'react-router-dom';

// Components
import { ToastContainer } from 'react-toastify';
import { CardItem } from './components/CardItem/CardItem';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Calender } from './components/Calendar/Calendar';

// Pages
import { Explore } from './pages/Explore';
import { Head } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Category } from './pages/Category';
import { AboutUs } from './pages/About';
import { ContactUs } from './pages/Contact';
import { EditingItems } from './pages/EditingItems';

// Style
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Profile } from './pages/Profile';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { AddingItem } from './pages/AddingItem';
import { useAuthContext } from './Hooks/useAuthContext';
import { TransactionForm } from './pages/TransactionForm';
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
  const { authIsReady, user, isAdmin } = useAuthContext();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Head />} />
          <Route path="/category" element={<Category />} />
          <Route path="/calendar" element={<Calender />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/menu"
            element={<CardItem isAdmin={isAdmin} />}
          />
          {authIsReady && (
            <>
              <Route
                path="/payment"
                element={<TransactionForm uid={user.uid} />}
              />
              <Route path="/profile" element={<PrivateRoute />}>
                <Route
                  path="/profile"
                  element={<Profile user={user} isAdmin={isAdmin} />}
                />
              </Route>
              <Route path="/addingItem" element={<PrivateRoute />}>
                <Route
                  path="/addingItem"
                  element={<AddingItem uid={user.uid} />}
                />
              </Route>
              <Route
                path="/edit-listing/:listingId"
                element={<PrivateRoute />}
              >
                <Route
                  path="/edit-listing/:listingId"
                  element={<EditingItems />}
                />
              </Route>
            </>
          )}
          {/* <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          /> */}
        </Routes>
        <Footer />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;

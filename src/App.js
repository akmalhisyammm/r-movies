import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Search from './components/movie/Search';
import Section from './components/movie/Section';
import Genre from './components/movie/Genre';
import MovieDetail from './components/movie/Detail';
import PersonDetail from './components/person/Detail';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  });

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <header>
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </header>
        <main>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/movie/search' exact component={Search} />
            <Route path='/movies/:section' exact component={Section} />
            <Route path='/movies/genre/:id' exact component={Genre} />
            <Route path='/movie/:id' exact component={MovieDetail} />
            <Route path='/person/:id' exact component={PersonDetail} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </ThemeProvider>
  );
};

export default App;

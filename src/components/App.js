import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { DANGER_COLOR } from 'config';
import Header from './Header/Header';
import MapGL from './Map';
import Drawer from './Drawer/Drawer';
import Menu from './Menu/Menu';
import Snackbar from './Snackbar';
import Loader from './Loader';
import { Router } from 'react-router-dom';
import { history } from 'store';
import themeSelector, { isDarkSelector } from 'selectors/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

class Component extends React.Component {
  componentDidMount() {
    this.updateBodyCss(this.props.isDark);
  }

  componentWillReceiveProps({ isDark }) {
    if (isDark !== this.props.isDark) {
      this.updateBodyCss(isDark);
    }
  }

  updateBodyCss(isDark) {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.remove('light');
    root.classList.add(isDark ? 'dark' : 'light');
  }

  render() {
    const { error, isLoaded, theme } = this.props;

    let pane;
    if (error) {
      pane = <div style={{ padding: 50, color: DANGER_COLOR }}>{error}</div>;
    } else if (isLoaded) {
      pane = (
        <div>
          <MapGL />
          <Header />
          <Drawer />
          <Menu />
          <Snackbar />
        </div>
      );
    } else {
      pane = <Loader />;
    }
    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Router {...{ history }}>
          <div>{pane}</div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default connect(state => {
  const { app, user } = state;
  const { isLoaded, error } = app;
  let err;
  if (error) {
    console.log(error);
    err = error.message || 'Error Loading Application!';
  }

  return {
    isLoaded,
    user,
    error: err,
    theme: themeSelector(state),
    isDark: isDarkSelector(state),
  };
}, mapDispatchToProps)(Component);

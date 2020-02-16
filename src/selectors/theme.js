import { createMuiTheme } from '@material-ui/core/styles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from 'config';
import { createSelector } from 'reselect';

export const isDarkSelector = createSelector(
  state => state.app.theme,
  theme => theme === 'dark'
);

export default createSelector(isDarkSelector, isDark =>
  createMuiTheme({
    typography: {
      fontFamily: [
        'Roboto',
        'Avenir',
        'proxima-nova',
        'Source Sans Pro',
        'Avenir',
        'sans-serif',
      ].join(','),
    },
    palette: {
      type: isDark ? 'dark' : 'light',
      primary: {
        main: isDark ? '#ffffff' : '#373836',
      },
      secondary: {
        main: SECONDARY_COLOR,
      },
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 2,
        },
      },
    },
  })
);

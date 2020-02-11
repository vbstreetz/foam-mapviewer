import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import {
  HEADER_HEIGHT,
  MENU_WIDTH,
  DRAWER_TYPE_WALLET,
  DRAWER_TYPE_LAYERS,
} from 'config';
import LayersIcon from '@material-ui/icons/Layers';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AddIcon from '@material-ui/icons/Add';
import HelpIcon from '@material-ui/icons/Help';
import Button from './MenuButton';
import Tour from './MenuTour';
import Add from './MenuAdd';

const BUTTONS = [
  {
    type: DRAWER_TYPE_LAYERS,
    tip: 'Layers',
    label: 'Layers',
    Icon: LayersIcon,
  },
  {
    type: DRAWER_TYPE_WALLET,
    tip: 'Wallet',
    label: 'Wallet',
    Icon: WalletIcon,
  },
  {
    type: 'ADD',
    tip: 'Add Points of Interest, Signals ... etc',
    label: 'Add',
    Icon: AddIcon,
    Component: Add,
  },
  {
    type: 'HELP',
    tip: 'Help',
    label: 'Help',
    Icon: HelpIcon,
    Component: Tour,
  },
];

class Component extends React.Component {
  render() {
    const { showingMenu } = this.props;
    const style = {
      left: showingMenu ? 0 : -MENU_WIDTH,
      top: HEADER_HEIGHT,
      width: MENU_WIDTH,
    };

    return (
      <div className="menu" style={style}>
        {BUTTONS.map(({ type, Component = Button, ...args }) => (
          <Component key={type} {...args} {...{ type }} />
        ))}
      </div>
    );
  }
}

export default connect(state => {
  const { drawer, menu } = state;
  return {
    showingDrawer: drawer.isShowing,
    showingMenu: menu.isShowing,
  };
}, mapDispatchToProps)(Component);

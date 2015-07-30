// =========================================
// Main
// ----
// Entry point for app
// =========================================

// ---- External Dependencies ----
import React from 'react';

// ---- Internal Dependencies ----
import MasterBar from './components/master-bar.jsx';
import DemoArea from './components/demo-area.jsx';
import Sidebar from './components/sidebar/index.jsx';

// ---- Styles ----
import 'abb-reset-css';

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignContent: 'center',
  width: '100%',
  height: '100%',
  paddingTop: 75,
  backgroundColor: '#e9eff3'
};

class Main extends React.Component {

  render() {
    return (
      <div style={ styles }>
        <MasterBar />
        <DemoArea>
          <Sidebar />
        </DemoArea>
      </div>
    )
  }

}

React.render(<Main />, document.getElementById('app'));

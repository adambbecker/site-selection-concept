// =========================================
// Main
// ----
// Entry point for app
// =========================================

// ---- External Dependencies ----
import React from 'react';
import uuid from 'node-uuid';
import ga from './ga.js';

// ---- Internal Dependencies ----
import MasterBar from './components/master-bar.jsx';
import DemoArea from './components/demo-area.jsx';
import Sidebar from './components/sidebar/index.jsx';

// ---- Internal Variables ----
const { GA_TRACKING_ID, NO_TRACK_UUID } = process.env;

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

  componentDidMount() {
    const visitorUUID = (typeof localStorage.visitorUUID !== 'undefined') ? localStorage.visitorUUID : uuid.v4();

    localStorage.visitorUUID = visitorUUID;

    if (typeof GA_TRACKING_ID !== 'undefined' && visitorUUID !== NO_TRACK_UUID) {
      ga('create', GA_TRACKING_ID, { 'userId': visitorUUID });
      ga('send', 'pageview');
    }
  }

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

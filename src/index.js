import React from 'react';
import { render } from 'react-dom';
import uuid from 'node-uuid';
import ga from './ga.js';

import MasterBar from './components/master-bar';
import DemoArea from './components/demo-area';
import Sidebar from './components/sidebar';

const { GA_TRACKING_ID, NO_TRACK_UUID } = process.env;

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

render(<Main />, document.getElementById('app'));

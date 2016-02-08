import React from 'react';

import SidebarDemo from './demo';

const styles = {
  position: 'relative',
  width: '100%',
  maxWidth: 266,
  height: 564
};

export default class Sidebar extends React.Component {

  render() {
    return (
      <div style={ styles }>
        <SidebarDemo />
      </div>
    )
  }

};

// =========================================
// Demo Area
// ----
// Section for each demo
// =========================================

// ---- External Dependencies ----
import React from 'react';

// ---- Styles ----
const styles = {
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

// ---- React Class ----
class DemoArea extends React.Component {

  render() {
    return (
      <div style={ styles }>
        { this.props.children }
      </div>
    )
  }

  // Header
  // ------------

}

// ==== Module Export ====
export default DemoArea;

// =========================================
// Master Bar
// ----
// Fake master bar for sticky header
// =========================================

// ---- External Dependencies ----
import React from 'react';

// ---- Styles ----
const styles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 47,
  backgroundColor: '#0087be'
};

// ---- React Class ----
class MasterBar extends React.Component {

  render() {
    return (
      <div style={ styles } />
    )
  }

  // Header
  // ------------

}

// ==== Module Export ====
export default MasterBar;

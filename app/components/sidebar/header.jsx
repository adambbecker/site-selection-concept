// =========================================
// Sidebar - Header
// ----
// Section header for grouped links
// =========================================

// ---- External Dependencies ----
import React from 'react';

// ---- Styles ----
const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8
  },
  text: {
    marginRight: 8,
    fontSize: 11,
    fontWeight: 400,
    lineHeight: '16px',
    color: '#87a6bc',
    textTransform: 'uppercase'
  },
  border: {
    flex: '1 0 auto',
    height: 1,
    backgroundColor: '#c8d7e1'
  }
};

// ---- React Class ----
class SidebarHeader extends React.Component {

  render() {
    return (
      <h6 style={ styles.base }>
        <span style={ styles.text }>{ this.props.children }</span>
        <span style={ styles.border }></span>
      </h6>
    )
  }

  // Header
  // ------------

}

// ==== Module Export ====
export default SidebarHeader;

// =========================================
// Sidebar - Link Group
// ----
// Section link group
// =========================================

// ---- External Dependencies ----
import React from 'react';

// ---- Styles ----
const styles = {
  marginBottom: 16
};

// ---- React Class ----
class SidebarLinkGroup extends React.Component {

  render() {
    return (
      <ul style={ styles }>
        { this.props.children }
      </ul>
    )
  }

  // Header
  // ------------

}

// ==== Module Export ====
export default SidebarLinkGroup;

// =========================================
// Sidebar
// ----
// Container for sidebar
// =========================================

// ---- External Dependencies ----
import React from 'react';

// ---- Internal Dependencies ----
import SidebarDemo from './demo.jsx';

// ---- Styles ----
const styles = {
  position: 'relative',
  width: '100%',
  maxWidth: 266
};

// ---- React Class ----
class Sidebar extends React.Component {

  render() {
    return (
      <div style={ styles }>
        <SidebarDemo />
      </div>
    )
  }

  // Header
  // ------------

}

// ==== Module Export ====
export default Sidebar;

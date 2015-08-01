// ===================================================
// Current Site Container
// ----
// Top bar that represents the currently selected site
// ===================================================

// ---- External Dependencies ----
import React from 'react';
import Radium from 'radium';

// ---- Internal Dependencies ----
import CurrentCardContainer from './card-container.jsx';
import SwitchSite from './switch-site.jsx';

// ---- Styles ----
import { projectStyles } from '../../../project-vars.js';
const styles = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'rgba(200, 215, 225, 0.5)',
  backgroundColor: '#f3f6f8',
  marginBottom: 16,
  transition: `border-color ${ projectStyles.timings.color } ${ projectStyles.easings.color }`,
  overflow: 'hidden',
  cursor: 'pointer',
  ':hover': {
    borderColor: 'rgb( 168, 190, 206 )'
  }
};

// ---- React Class ----
class CurrentSite extends React.Component {

  render() {
    const { sites, active, onClick, springConfig } = this.props;

    return (
      <div
        ref="base"
        style={ [
          styles,
          active && styles[':hover']
        ] }
        onClick={ onClick }>
        <CurrentCardContainer sites={ sites } springConfig={ springConfig } />
        <SwitchSite hovering={ Radium.getState(this.state, 'base', ':hover') } active={ active } />
      </div>
    )
  }

  // Header
  // ------------

}

// ==== Module Export ====
export default Radium(CurrentSite);

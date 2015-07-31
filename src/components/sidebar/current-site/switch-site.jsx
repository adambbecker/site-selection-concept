// ===================================================
// Switch Site
// ----
// Button that initiates the site switch
// ===================================================

// ---- External Dependencies ----
import React from 'react';
import Radium from 'radium';

// ---- Styles ----
import { projectStyles } from '../../../project-vars.js';
const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    padding: '7px 16px 8px',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#F3F6F8',
    backgroundColor: '#F3F6F8',
    transition: `border-top-color ${ projectStyles.timings.color } ${ projectStyles.easings.color }`
  },
  active: {
    borderTopColor: 'rgb( 168, 190, 206 )'
  },
  cardCon: {
    position: 'relative',
    display: 'block',
    height: 16
  },
  card: {
    base: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: `transform 0.6s ease`
    },
    flipped: {
      transform: 'rotateX(180deg)'
    }
  },
  cardPanel: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden'
  },
  backCardPanel: {
    transform: 'rotateX(180deg)'
  },
  text: {
    base: {
      flex: '1 0 auto',
      fontSize: 10,
      lineHeight: '16px',
      textTransform: 'uppercase',
      color: '#4f748e',
      transition: `color ${ projectStyles.timings.color } ${ projectStyles.easings.color }`
    },
    hovering: {
      color: '#00AADD'
    }
  },
  icon: {
    base: {
      display: 'block',
      width: 12,
      height: 12,
      marginLeft: 2,
      marginRight: 16,
      fill: '#4f748e',
      transition: `fill ${ projectStyles.timings.color } ${ projectStyles.easings.color }`
    },
    hovering: {
      fill: '#00AADD'
    }
  }
};

// ---- React Class ----
class SiteSwitcher extends React.Component {

  render() {
    return (
      <div style={ [
        styles.base,
        this.props.active && styles.active
      ] }>
        <svg
          style={ [
            styles.icon.base,
            this.props.hovering && styles.icon.hovering
          ] }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
            <path d={
              ( this.props.active ) ?
                'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'
              : 'M22.086 9.914L20 7.828V18c0 1.105-.895 2-2 2h-7v-2h7V7.828l-2.086 2.086L14.5 8.5 19 4l4.5 4.5-1.414 1.414zM6 16.172V6h7V4H6c-1.105 0-2 .895-2 2v10.172l-2.086-2.086L.5 15.5 5 20l4.5-4.5-1.414-1.414L6 16.172z'
            } />
        </svg>
        <div style={ [
          styles.text.base,
          this.props.hovering && styles.text.hovering
        ] }>{
          ( this.props.active ) ?
            'Cancel'
          : 'Switch Site'
        }</div>
      </div>
    )
  }

  // Header
  // ------------

}

// ==== Module Export ====
export default Radium(SiteSwitcher);

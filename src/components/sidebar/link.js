import React from 'react';
import Radium from 'radium';

import { projectStyles } from '../../project-vars';
const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    cursor: 'pointer',
    transition: `background-color ${ projectStyles.timings.color } ${ projectStyles.easings.color }`,
    ':hover': {
      backgroundColor: '#F3F6F8'
    }
  },
  icon: {
    fill: '#87a6bc',
    width: 16,
    height: 16,
    marginLeft: 16
  },
  text: {
    flex: '1 0 auto',
    padding: '0 16px',
    fontSize: 14,
    color: '#2e4453',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: `color ${ projectStyles.timings.color } ${ projectStyles.easings.color }`
  },
  textHover: {
    color: '#00AADD'
  },
  button: {
    padding: '4px 10px',
    marginRight: 8,
    borderRadius: 2,
    fontSize: 11,
    color: '#87a6bc',
    backgroundColor: '#f3f6f8'
  },
  external: {
    width: 12,
    height: 12,
    marginLeft: 0,
    marginRight: 12
  }
};

class SidebarLink extends React.Component {

  render() {
    return (
      <li key="base" style={ styles.base }>
        { ( this.props.iconPath ) ?
          <svg
            style={ styles.icon }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
              <path d={ this.props.iconPath } />
          </svg>
        : null }
        <span style={ [
          styles.text,
          Radium.getState(this.state, 'base', ':hover') && styles.textHover
        ] }>{ this.props.children }</span>
        { ( this.props.button ) ?
          <span style={ styles.button }>Add</span>
          : null
        }
        { ( this.props.external ) ?
          <svg
            style={ [ styles.icon, styles.external ] }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
              <path d="M16 17v2c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V5c0-1.105.895-2 2-2h9c1.105 0 2 .895 2 2v2h-2V5H5v14h9v-2h2zm2.5-10.5l-1.414 1.414L20.172 11H10v2h10.172l-3.086 3.086L18.5 17.5 24 12l-5.5-5.5z"/>
          </svg>
          : null
        }
      </li>
    )
  }

}

export default Radium(SidebarLink);

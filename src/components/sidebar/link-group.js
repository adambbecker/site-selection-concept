import React from 'react';

const styles = {
  marginBottom: 16
};

export default class SidebarLinkGroup extends React.Component {

  render() {
    return (
      <ul style={ styles }>
        { this.props.children }
      </ul>
    )
  }

};

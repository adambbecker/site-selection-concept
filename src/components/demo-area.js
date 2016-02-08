import React from 'react';

const styles = {
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

export default class DemoArea extends React.Component {

  render() {
    return (
      <div style={ styles }>
        { this.props.children }
      </div>
    )
  }

}

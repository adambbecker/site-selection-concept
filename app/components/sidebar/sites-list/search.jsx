// =========================================
// Search
// ----
// Search functionality in the sites list
// =========================================

// ---- External Dependencies ----
require('babel-core/polyfill'); // needed for Object.assign
import React from 'react';

// ---- Internal Dependencies ----

// ---- Styles ----
const styles = {
  base: {
    position: 'relative',
    // border: 'solid 1px rgba(200, 215, 225, 0.5)',
    // backgroundColor: '#fff'
  },
  input: {
    width: '100%',
    padding: '12px 12px 12px 46px',
    fontSize: 12,
    fontFamily: "'Open Sans', sans-serif",
    lineHeight: '18px',
    color: '#87A6BC'
  },
  icon: {
    position: 'absolute',
    left: 18,
    top: 15,
    width: 12,
    height: 12,
    fill: '#C8D7E1'
  }
};

// ---- React Class ----
class Search extends React.Component {

  render() {
    return (
      <div style={ Object.assign(this.props.style, styles.base) }>
        <svg style={ styles.icon } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 19l-5.154-5.154C16.574 12.742 17 11.42 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.42 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"/></svg>
        <input type="text" value={ this.props.value } onChange={ this.props.onChange } onFocus={ this.props.onFocus } onBlur={ this.props.onBlur } style={ styles.input } placeholder="Find Site..." />
      </div>
    )
  }

  // Header
  // ------------

}

// ==== Module Export ====
export default Search;

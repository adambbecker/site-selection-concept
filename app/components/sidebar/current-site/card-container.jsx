// =====================================================
// Current Site Card Container
// ----
// Contains animation container for swtiching site cards
// =====================================================

// ---- External Dependencies ----
require('babel-core/polyfill'); // needed for Object.assign
import React from 'react';
import { TransitionSpring } from 'react-motion';

// ---- Internal Dependencies ----
import SiteCard from '../site-card.jsx';

// ---- Styles ----
const styles = {
  base: {
    position: 'relative',
    width: '100%',
    height: 66,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  card: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%'
  }
};

// ---- React Class ----
// class CurrentCardContainer extends React.Component {
const CurrentCardContainer = React.createClass({

  render() {
    return (
      <div style={ styles.base }>
        <TransitionSpring
          endValue={ this.getEndValue() }
          willLeave={ this.willLeave }
          willEnter={ this.willEnter }>
          { currentValue =>
            <div>
              { Object.keys(currentValue).map(key => {
                const config = currentValue[key];
                const { data, opacity, translateY } = config;
                const style = {
                  transform: `translate3d(0, ${ translateY.val }%, 0)`,
                  opacity: opacity.val
                };

                return (
                  <div key={ `current-${ key }` } style={ Object.assign(style, styles.card) }>
                    <SiteCard title={ data.title } url={ data.url } />
                  </div>
                );
              }) }
            </div>
          }
        </TransitionSpring>
      </div>
    )
  },

  // Animation - sites list
  // ----------------------
  getEndValue() {
    const { sites } = this.props;
    let configs = {};

    Object
      .keys(sites)
      .filter(key => {
        return sites[key].selected
      })
      .forEach(key => {
        const keyConfig = {
          translateY: { val: 0 },
          opacity: { val: 1 },
          data: sites[key]
        };

        configs[key] = keyConfig;
      });

    return configs;
  },

  willEnter(key) {
    return {
      translateY: { val: 100 },
      opacity: { val: 0 },
      data: this.props.sites[key]
    };
  },

  willLeave(key, value, endValue, currentValue, currentSpeed) {
    if (currentValue[key].opacity.val === 0 && currentSpeed[key].opacity.val === 0) {
      return null; // kill component when opacity reaches 0
    }

    return {
      translateY: { val: -100 },
      opacity: { val: 0 },
      data: currentValue[key].data
    };
  },

});

// ==== Module Export ====
export default CurrentCardContainer;

import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

import SiteCard from '../site-card';

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

const CurrentCardContainer = React.createClass({

  render() {
    return (
      <div style={ styles.base }>
        <TransitionMotion
          defaultStyles={ this.getDefaultStyles() }
          styles={ this.getStyles() }
          willLeave={ this.willLeave }
          willEnter={ this.willEnter }>
          { configs =>
            <div>
              { configs.map( ( { key, style, data } ) => {
                const cardStyle = {
                  transform: `translate3d(0, ${ style.translateY }%, 0)`,
                  opacity: style.opacity
                };

                return (
                  <div key={ `current-${ key }` } style={ Object.assign(cardStyle, styles.card) }>
                    <SiteCard title={ data.title } url={ data.url } blavatar={ data.blavatar } />
                  </div>
                );
              }) }
            </div>
          }
        </TransitionMotion>
      </div>
    )
  },

  getDefaultStyles() {
    const { sites, springConfig } = this.props;
    let styles = [];

    Object
      .keys(sites)
      .forEach(key => {
        styles.push( {
          key: key,
          data: sites[key],
          style: {
            translateY: 0,
            opacity: 1
          }
        } );
      });

    return styles;
  },

  getStyles() {
    const { sites, springConfig } = this.props;
    let styles = [];

    Object
      .keys(sites)
      .filter(key => {
        return sites[key].selected
      })
      .forEach(key => {
        styles.push( {
          key: key,
          data: sites[key],
          style: {
            translateY: spring( 0, springConfig ),
            opacity: spring( 1, springConfig )
          }
        } );
      });

    return styles;
  },

  willEnter() {
    const { springConfig } = this.props;

    return {
      translateY: 100,
      opacity: 0
    };
  },

  willLeave(styleThatLeft) {
    const { springConfig } = this.props;

    if (styleThatLeft.opacity === 0) {
      return null; // kill component when opacity reaches 0
    }

    return {
      translateY: spring( -100, springConfig ),
      opacity: spring( 0, springConfig )
    };
  },

});

export default CurrentCardContainer;

// =========================================
// Sites-List
// ----
// Container for list of sites
// =========================================

// ---- External Dependencies ----
require('babel-core/polyfill'); // needed for Object.assign
import React from 'react';
import { Spring, TransitionSpring } from 'react-motion';

// ---- Internal Dependencies ----
import CurrentSite from '../current-site/index.jsx';
import SiteCard from '../site-card.jsx';
import Search from './search.jsx';

// ---- Internal Variables ----

// ---- Styles ----
const styles = {
  base: {
    position: 'absolute',
    left: 0,
    top: 100,
    // top: 0,
    width: '100%',
    // transform: 'translateX(calc(-100% - 32px))',
    zIndex: 2,
    perspective: 400
  },
  list: {
    border: 'solid 1px rgba(200, 215, 225, 0.5)',
    borderTop: 'none',
    backgroundColor: '#fff',
  },
  card: {
    borderTop: 'solid 1px rgba(200, 215, 225, 0.5)',
  }
};

// ---- React Class ----
// class SitesList extends React.Component {
const SitesList = React.createClass({

  getDefaultProps() {
    return {
      listVisible: false
    };
  },

  getInitialState() {
    return {
      sites: {
        'imf': {
          title: 'I.M.F.',
          url: 'nothingsimpossible.wordpress.com',
          visible: true
        },
        'isb': {
          title: 'I.S.B.',
          url: 'galaticempirepolice.wordpress.com',
          visible: false
        },
        'mib': {
          title: 'M.i.B.',
          url: 'lookrighhere.wordpress.com',
          visible: true
        },
        'shield': {
          title: 'S.H.I.E.L.D.',
          url: 'longlifefury.wordpress.com',
          visible: true
        },
        'uncle': {
          title: 'U.N.C.L.E.',
          url: 'flemingsolo.wordpress.com',
          visible: true
        },
        'unsc': {
          title: 'U.N.S.C.',
          url: 'john117.wordpress.com',
          visible: true
        }
      },
      selectedKey: 'isb',
      searchValue: ''
      // listVisible: false
    }
  },

  render() {
    const { sites, selectedKey } = this.state;
    let currentSiteList = Object.assign({}, sites);

    Object
      .keys(currentSiteList)
      .forEach(key => {
        const isSelected = (selectedKey === key) ? true : false;

        currentSiteList[key].selected = isSelected;
      });

    return (
      <div>
        <CurrentSite sites={ currentSiteList } active={ this.props.listVisible } onClick={ this.props.handleSwitchClick } />
        <div style={ styles.base }>
          <Spring defaultValue={ { val: 0 } } endValue={ this.searchGetEndValue() }>
            { interpolated =>
              <div key="searchCon" style={ {
                height: interpolated.height.val,
                backgroundColor: '#fff',
                border: 'solid 1px rgba(200, 215, 225, 0.5)',
                borderBottom: 'none',
                overflow: 'hidden'
              } }>
                <Search
                  value={ this.state.searchValue }
                  onChange={ this._handleSearchChange }
                  style={ {
                    transform: `translate3d(0, 0, ${ interpolated.z.val }px)`,
                    transformOrigin: 'top',
                  } } />
              </div>
            }
          </Spring>
          <TransitionSpring
            endValue={ this.sitesGetEndValue() }
            willLeave={ this.sitesWillLeave }
            willEnter={ this.sitesWillEnter }>
            { currentValue =>
              <ul style={ styles.list }>
                { Object.keys(currentValue).map(key => {
                  const config = currentValue[key];
                  const { data, height, opacity, rotate, z } = config;
                  const { card: { borderTop } } = styles;
                  const style = {
                    transform: `translate3d(0, 0, ${ z.val }px)`,
                    transformOrigin: 'top',
                    height: height.val,
                    opacity: opacity.val,
                    overflow: 'hidden',
                    cursor: 'pointer'
                  };

                  return (
                    <li key={ `list-${ key }` } style={ style } onClick={ this._handleSiteClick(key) }>
                      <SiteCard title={ data.title } url={ data.url } style={ { borderTop: borderTop } } />
                    </li>
                  );
                }) }
              </ul>
            }
          </TransitionSpring>
        </div>
      </div>
    );
  },

  // Animation - search
  // ---------------------
  searchGetEndValue(prevValue) {
    const { listVisible } = this.props;
    let endValue;

    if (listVisible) {
      endValue = {
        height: { val: 43 },
        z: { val: 0 }
      }
    } else {
      endValue = {
        height: { val: 0 },
        z: { val: -100 }
      }
    }

    return endValue;
  },

  // Animation - sites list
  // ----------------------
  sitesGetEndValue() {
    const { listVisible } = this.props;
    const { sites, selectedKey } = this.state;
    let configs = {};

    Object
      .keys(sites)
      .filter(key => {
        return sites[key].visible;
      })
      .forEach(key => {
        let keyConfig;

        if (listVisible) {
          keyConfig = {
            height: { val: 67 },
            opacity: { val: 1 },
            rotate: { val: 0 },
            z: { val: 0 },
            data: sites[key]
          };
        } else {
          keyConfig = {
            height: { val: 0 },
            opacity: { val: 0 },
            rotate: { val: 0 },
            z: { val: -100 },
            data: sites[key]
          };
        }

        configs[key] = keyConfig;
      });

    return configs;
  },

  sitesWillEnter(key) {
    return {
      height: { val: 67 },
      opacity: { val: 1 },
      rotate: { val: 0 },
      z: { val: 0 },
      data: this.state.sites[key]
    };
  },

  sitesWillLeave(key, valueThatJustLeft) {
    return {
      height: { val: 0 },
      opacity: { val: 0 },
      rotate: { val: 90 },
      z: { val: -100 },
      data: valueThatJustLeft.data,
    };
  },

  // Handlers
  // ------------
  // _handleSwitchClick() {
  //   this.setState({
  //     listVisible: ! this.state.listVisible
  //   });
  // },

  _handleSearchChange(event) {
    const searchValue = event.target.value;
    let filteredSites = Object.assign({}, this.state.sites);

    Object
      .keys(filteredSites)
      .forEach(key => {
        const { title, url } = filteredSites[key];
        const strippedTitile = title.replace(/\./g, '');
        const lowerStrippedTitle = strippedTitile.toLowerCase();
        const searchableString = `${ title }${ strippedTitile }${ lowerStrippedTitle }${ url }`;
        let isVisible = true;

        if (searchableString.indexOf(searchValue) === -1) {
          isVisible = false;
        }

        filteredSites[key].visible = isVisible;
      });

    this.setState({
      sites: filteredSites,
      searchValue: searchValue
    });
  },

  _handleSearchFocus() {
    let filteredSites = Object.assign({}, this.state.sites);

    Object
      .keys(filteredSites)
      .forEach(key => {
        filteredSites[key].visible = false;
      });

    this.setState({
      sites: filteredSites
    });
  },

  _handleSearchBlur() {
    this.setState({
      sites: this.getInitialState().sites
    });
  },

  _handleSiteClick(clickedKey) {
    return () => {
      let filteredSites = Object.assign({}, this.state.sites);

      Object
        .keys(filteredSites)
        .forEach(key => {
          let isVisible = true;

          if (key === clickedKey) {
            isVisible = false;
          }

          filteredSites[key].visible = isVisible;
        });

      this.setState({
        sites: filteredSites,
        selectedKey: clickedKey
      }, () => {
        this.props.handleSwitchClick();
      });
    };
  }

});

// ==== Module Export ====
export default SitesList;

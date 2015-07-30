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
import CurrentSite from './current-site/index.jsx';
import SiteCard from './site-card.jsx';
import SiteListSearch from './site-list-search.jsx';
import SidebarHeader from './header.jsx';
import SidebarLinkGroup from './link-group.jsx';
import SidebarLink from './link.jsx';

// ---- Internal Variables ----
const iconPaths = {
  posts: 'M16 19H3v-2h13v2zm5-10H3v2h18V9zM3 5v2h11V5H3zm14 0v2h4V5h-4zm-6 8v2h10v-2H11zm-8 0v2h5v-2H3z',
  pages: 'M16 8H8V6h8v2zm0 2H8v2h8v-2zm4-6v12l-6 6H6c-1.105 0-2-.895-2-2V4c0-1.105.895-2 2-2h12c1.105 0 2 .895 2 2zm-2 10V4H6v16h6v-4c0-1.105.895-2 2-2h4z',
  media: 'M13 9.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5zM22 6v12c0 1.105-.895 2-2 2H4c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2h16c1.105 0 2 .895 2 2zm-2 0H4v7.444L8 9l5.895 6.55 1.587-1.85c.798-.932 2.24-.932 3.037 0L20 15.426V6z',
  themes: 'M19 3H5c-1.105 0-2 .895-2 2v14c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zM6 6h5v5H6V6zm4.5 13C9.12 19 8 17.88 8 16.5S9.12 14 10.5 14s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm3-6l3-5 3 5h-6z',
  customize: 'M2 6c0-1.505.78-3.08 2-4 0 .845.69 2 2 2 1.657 0 3 1.343 3 3 0 .386-.08.752-.212 1.09.74.594 1.476 1.19 2.19 1.81L8.9 11.98c-.62-.716-1.214-1.454-1.807-2.192C6.753 9.92 6.387 10 6 10c-2.21 0-4-1.79-4-4zm12.152 6.848l1.34-1.34c.607.304 1.283.492 2.008.492 2.485 0 4.5-2.015 4.5-4.5 0-.725-.188-1.4-.493-2.007L18 9l-2-2 3.507-3.507C18.9 3.188 18.225 3 17.5 3 15.015 3 13 5.015 13 7.5c0 .725.188 1.4.493 2.007L3 20l2 2 6.848-6.848c1.885 1.928 3.874 3.753 5.977 5.45l1.425 1.148 1.5-1.5-1.15-1.425c-1.695-2.103-3.52-4.092-5.448-5.977z',
  menus: 'M9 19h10v-2H9v2zm0-6h6v-2H9v2zm0-8v2h12V5H9zm-4-.5c-.828 0-1.5.672-1.5 1.5S4.172 7.5 5 7.5 6.5 6.828 6.5 6 5.828 4.5 5 4.5zm0 6c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm0 6c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z',
  globe: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z',
  wpadmin: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM3.5 12c0-1.232.264-2.402.736-3.46L8.29 19.65C5.456 18.272 3.5 15.365 3.5 12zm8.5 8.5c-.834 0-1.64-.12-2.4-.345l2.55-7.41 2.613 7.157c.017.042.038.08.06.117-.884.31-1.833.48-2.823.48zm1.172-12.485c.512-.027.973-.08.973-.08.458-.055.404-.728-.054-.702 0 0-1.376.108-2.265.108-.835 0-2.24-.107-2.24-.107-.458-.026-.51.674-.053.7 0 0 .434.055.892.082l1.324 3.63-1.86 5.578-3.096-9.208c.512-.027.973-.08.973-.08.458-.055.403-.728-.055-.702 0 0-1.376.108-2.265.108-.16 0-.347-.003-.547-.01C6.418 5.025 9.03 3.5 12 3.5c2.213 0 4.228.846 5.74 2.232-.037-.002-.072-.007-.11-.007-.835 0-1.427.727-1.427 1.51 0 .7.404 1.292.835 1.993.323.566.7 1.293.7 2.344 0 .727-.28 1.572-.646 2.748l-.848 2.833-3.072-9.138zm3.1 11.332l2.597-7.506c.484-1.212.645-2.18.645-3.044 0-.313-.02-.603-.057-.874.664 1.21 1.042 2.6 1.042 4.078 0 3.136-1.7 5.874-4.227 7.347z',
  stats: 'M21 21H3v-2h18v2zM8 10H4v7h4v-7zm6-7h-4v14h4V3zm6 3h-4v11h4V6z'
};

// ---- Styles ----
const styles = {
  base: {
    position: 'relative'
  },
  sites: {
    base: {
      position: 'absolute',
      left: 0,
      top: 100,
      width: '100%',
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
  }
};

// ---- React Class ----
// class SitesList extends React.Component {
const SidebarDemo = React.createClass({

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
      searchValue: '',
      sitesListVisible: false
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
      <div style={ styles.base }>
        <CurrentSite sites={ currentSiteList } active={ this.state.sitesListVisible } onClick={ this._handleSwitchClick } />
        <div style={ styles.sites.base }>
          <Spring defaultValue={ { val: 0 } } endValue={ this.searchGetEndValue() }>
            { interpolated =>
              <div key="searchCon" style={ {
                height: interpolated.height.val,
                backgroundColor: '#fff',
                border: 'solid 1px rgba(200, 215, 225, 0.5)',
                borderBottom: 'none',
                overflow: 'hidden'
              } }>
                <SiteListSearch
                  ref={ component => {
                    if (this.state.sitesListVisible && component) {
                      React.findDOMNode(component.refs.input).focus();
                    }
                  } }
                  value={ this.state.searchValue }
                  onChange={ this._handleSearchChange }
                  onKeyUp={ this._handleSearchKeyUp }
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
              <ul style={ styles.sites.list }>
                { Object.keys(currentValue).map(key => {
                  const config = currentValue[key];
                  const { data, height, opacity, rotate, z } = config;
                  const { sites: { card: { borderTop } } } = styles;
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
        <Spring defaultValue={ { val: 0 } } endValue={ { val: this.state.sitesListVisible ? 0 : 1 } }>
          { interpolated =>
            <div style={ {
              opacity: interpolated.val
            } }>
              <SidebarLinkGroup>
                <SidebarLink iconPath={ iconPaths.globe } external={ true }>View Site</SidebarLink>
                <SidebarLink iconPath={ iconPaths.wpadmin } external={ true }>WP Admin</SidebarLink>
                <SidebarLink iconPath={ iconPaths.stats }>Stats</SidebarLink>
              </SidebarLinkGroup>
              <SidebarHeader>Publish</SidebarHeader>
              <SidebarLinkGroup>
                <SidebarLink iconPath={ iconPaths.posts } button={ true }>Blog Posts</SidebarLink>
                <SidebarLink iconPath={ iconPaths.pages } button={ true }>Pages</SidebarLink>
                <SidebarLink iconPath={ iconPaths.media } external={ true }>Media</SidebarLink>
              </SidebarLinkGroup>
              <SidebarHeader>Look and Feel</SidebarHeader>
              <SidebarLinkGroup>
                <SidebarLink iconPath={ iconPaths.themes } external={ true }>Themes</SidebarLink>
                <SidebarLink iconPath={ iconPaths.customize }>Customize</SidebarLink>
                <SidebarLink iconPath={ iconPaths.menus }>Menus</SidebarLink>
              </SidebarLinkGroup>
            </div>
          }
        </Spring>
      </div>
    );
  },

  // Animation - search
  // ---------------------
  searchGetEndValue(prevValue) {
    const { sitesListVisible } = this.state;
    let endValue;

    if (sitesListVisible) {
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
    const { sites, sitesListVisible, selectedKey } = this.state;
    let configs = {};

    Object
      .keys(sites)
      .filter(key => {
        return sites[key].visible;
      })
      .forEach(key => {
        let keyConfig;

        if (sitesListVisible) {
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
  _handleSwitchClick() {
    const { sites, selectedKey, sitesListVisible, searchValue } = this.state;
    let filteredSites = Object.assign({}, sites);

    if (sitesListVisible && searchValue !== '') {
      Object
        .keys(filteredSites)
        .forEach(key => {
          let isVisible = true;

          if (key === selectedKey) {
            isVisible = false;
          }

          filteredSites[key].visible = isVisible;
        });
    }

    this.setState({
      sites: filteredSites,
      sitesListVisible: ! sitesListVisible,
      searchValue: ''
    });
  },

  _handleSearchChange(event) {
    const { selectedKey } = this.state;
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

        if (searchableString.indexOf(searchValue) === -1 || key === selectedKey) {
          isVisible = false;
        }

        filteredSites[key].visible = isVisible;
      });

    this.setState({
      sites: filteredSites,
      searchValue: searchValue
    });
  },

  _handleSearchKeyUp(event) {
    const { sites, selectedKey, searchValue } = this.state;
    const { keyCode } = event;

    if (keyCode === 13) { // enter
      let filteredSiteKeys = [];

      Object
        .keys(sites)
        .filter(key => {
          return sites[key].visible;
        })
        .forEach(key => {
          filteredSiteKeys.push(key);
        });

      if (filteredSiteKeys.length === 1) {
        this._handleSiteClick(filteredSiteKeys[0])();
      } else if (filteredSiteKeys.length === 0) {
        this._handleSwitchClick();
      }
    } else if (keyCode === 27) { // esc
      let filteredSites = Object.assign({}, this.state.sites);

      Object
        .keys(filteredSites)
        .forEach(key => {
          let isVisible = true;

          if (key === selectedKey) {
            isVisible = false;
          }

          filteredSites[key].visible = isVisible;
        });

      this.setState({
        sites: filteredSites,
        searchValue: '',
        sitesListVisible: (searchValue === '') ? false : this.state.sitesListVisible
      });
    }
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
        selectedKey: clickedKey,
        sitesListVisible: false,
        searchValue: ''
      });
    };
  }

});

// ==== Module Export ====
export default SidebarDemo;

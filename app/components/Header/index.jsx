/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import styled from 'styled-components';
import SearchBox from 'components/SearchBox';
import SearchIcon from 'react-icons/lib/io/search';
import SearchCloseIcon from 'react-icons/lib/io/close-circled';
import { ECOSYSTEM_PROD_NAME, ECOSYSTEM_TEST_NAME } from 'containers/App/constants';

import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap';

const IMG = styled.img`
  // padding-bottom: 3px;
  // padding-right: 9px;
`;

const StyledNavItem = styled(NavItem)`
  font-size: 16px;
`;

const StyledCollapse = styled(Collapse)`
  font-size: 16px;
`;

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isSearch: false
    };
  }

  toggleSearch(e) {
    this.setState({
      isSearch: !this.state.isSearch
    });
  }

  toggle(e) {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="lg" className="d-block">
          <div className="d-flex justify-content-between">
            <NavbarBrand href="/">
              <div className="long"><IMG src="/logo-long.svg" alt="OMNIEXPLORER.INFO" /></div>
              <div className="short"><IMG src="/logo.svg" alt="OMNIEXPLORER.INFO" /></div>
            </NavbarBrand>
            <div className="ml-auto d-flex">
              <div className="d-none d-lg-block">
                <StyledCollapse navbar>
                  <Nav navbar className="ml-auto">
                    <StyledNavItem>
                      <NavLink href="/">Home</NavLink>
                    </StyledNavItem>
                    <StyledNavItem>
                      <NavLink href="http://hcomni-wallet.h.cash/">Omni Wallet</NavLink>
                    </StyledNavItem>
                    <StyledNavItem>
                      <NavLink href="https://github.com/HcashOrg/hcOmniExplorer">Github</NavLink>
                    </StyledNavItem>
                    {/*<StyledNavItem>
                      <NavLink href="#" id="cs1">Exchange</NavLink>
                      <UncontrolledTooltip placement="top" target="cs1">
                        Coming Soon.
                      </UncontrolledTooltip>
                    </StyledNavItem>*/}
                    {/*<UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        API
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <NavLink href="https://api.omniexplorer.info">Documentation</NavLink>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>*/}
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Property List
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <NavLink href={`/properties/${ECOSYSTEM_PROD_NAME.toLowerCase()}`} >Production</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink href={`/properties/${ECOSYSTEM_TEST_NAME.toLowerCase()}`} >Test</NavLink>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    {/*<UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Crowdsales
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <NavLink href={`/crowdsales/${ECOSYSTEM_PROD_NAME.toLowerCase()}`}>Production</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink href={`/crowdsales/${ECOSYSTEM_TEST_NAME.toLowerCase()}`}>Test</NavLink>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>*/}
                    {/*<StyledNavItem>
                      <NavLink href="#" id="cs2">Usage Graphs</NavLink>
                      <UncontrolledTooltip placement="top" target="cs2">
                        Coming Soon.
                      </UncontrolledTooltip>
                    </StyledNavItem>*/}
                    {/*<UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Misc
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem header>
                          <NavLink href="/">Feature Activations (Coming Soon)</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink href="http://www.omnilayer.org/#GetStarted" target="_blank">Wallets</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink href="https://github.com/OmniLayer/omniexplorer/wiki/OmniExplorer-FAQ" target="_blank">Help/FAQ</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink href="https://github.com/OmniLayer/omniexplorer/issues" target="_blank">Report Bug</NavLink>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>*/}
                  </Nav>
                </StyledCollapse>
              </div>
              <div className="d-flex showSearch" onClick={this.toggleSearch}>
                {
                  this.state.isSearch
                  ?<SearchCloseIcon className="searchclose-icon" size={24} />
                  :<SearchIcon className="searchbox-icon" size={24} />
                }
              </div>
              <NavbarToggler onClick={this.toggle} />
            </div>
          </div>
          {
            this.state.isSearch
              ?
              <div className="w-100 ml-auto">
                <SearchBox />
              </div>
              : ''
          }
          <div className="d-lg-none">
            <div className="d-flex d-block-down">
              <StyledCollapse isOpen={this.state.isOpen} navbar>
                <Nav navbar className="ml-auto">
                  <StyledNavItem>
                    <NavLink href="/">Home</NavLink>
                  </StyledNavItem>
                  <StyledNavItem>
                    <NavLink href="http://hcomni-wallet.h.cash/">Omni Wallet</NavLink>
                  </StyledNavItem>
                  <StyledNavItem>
                    <NavLink href="https://github.com/HcashOrg/hcOmniExplorer">Github</NavLink>
                  </StyledNavItem>
                  {/*<StyledNavItem>
                    <NavLink href="#" id="cs1">Exchange</NavLink>
                    <UncontrolledTooltip placement="top" target="cs1">
                      Coming Soon.
                    </UncontrolledTooltip>
                  </StyledNavItem>*/}
                  {/*<UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      API
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink href="https://api.omniexplorer.info">Documentation</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>*/}
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Property ListMisc
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink href={`/properties/${ECOSYSTEM_PROD_NAME.toLowerCase()}`} >Production</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href={`/properties/${ECOSYSTEM_TEST_NAME.toLowerCase()}`} >Test</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/*<UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Crowdsales
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink href={`/crowdsales/${ECOSYSTEM_PROD_NAME.toLowerCase()}`}>Production</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href={`/crowdsales/${ECOSYSTEM_TEST_NAME.toLowerCase()}`}>Test</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>*/}
                  {/*<StyledNavItem>
                    <NavLink href="#" id="cs2">Usage Graphs</NavLink>
                    <UncontrolledTooltip placement="top" target="cs2">
                      Coming Soon.
                    </UncontrolledTooltip>
                  </StyledNavItem>*/}
                  {/*<UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Misc
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem header>
                        <NavLink href="/">Feature Activations (Coming Soon)</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="http://www.omnilayer.org/#GetStarted" target="_blank">Wallets</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="https://github.com/OmniLayer/omniexplorer/wiki/OmniExplorer-FAQ" target="_blank">Help/FAQ</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="https://github.com/OmniLayer/omniexplorer/issues" target="_blank">Report Bug</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>*/}
                </Nav>
              </StyledCollapse>
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

NavbarToggler.propTypes = {
  type: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};


function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, )(Header);

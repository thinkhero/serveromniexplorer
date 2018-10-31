/**
 *
 * Wallet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { routeActions } from 'redux-simple-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import {
  Col,
  Container,
  Row,
  Table,
  Collapse,
  UncontrolledTooltip,
  Button,
} from 'reactstrap';
import QRCode from 'qrcode.react';
import sortBy from 'lodash/sortBy';
import Token from 'components/Token';
import { FormattedMessage } from 'react-intl';
import walletMessages from './messages';
import InformationIcon from 'react-icons/lib/io/informatcircled';

const StyledInformationIcon = styled(InformationIcon)`
  color: cadetblue !important;
  font-size: 1.5rem;
`;

const DetailRow = styled(Row)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})`
  border-top: none;
`;

const StyledTH = styled.th`
  border: none !important;
`;

class Wallet extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      flaggedMessage: `Show flagged tokens`,
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
    this.setState({
      flaggedMessage: `${this.state.collapse ? 'Show' : 'Hide'} flagged tokens`,
    });
  }

  render() {
    if (!this.props.address) return null;

    const isFlagged = (propertyinfo) => (propertyinfo.flags && (propertyinfo.flags.duplicate || propertyinfo.flags.scam || propertyinfo.flags.replaced));
    
    const flaggedProps = sortBy(
      (this.props.address.balance || [])
        .filter(balance => isFlagged(balance.propertyinfo))
      , 'id');

    const nonFlaggedProps = sortBy(
      (this.props.address.balance || [])
        .filter(balance => !isFlagged(balance.propertyinfo))
      , 'id');

    const hasFlagged = !!flaggedProps.length;

    return (
      <Container fluid className="pt-5 pb-5">
        <div className="new-bg p-4">
          <Table responsive className="table-profile">
            <thead>
            <tr>
              <th>
                <QRCode
                  value={this.props.addr}
                  size="60"
                />
              </th>
              <th>
                <h4>
                  <p>
                    {this.props.addr}
                    <small className="d-block" id="laddress">
                      {this.props.extra}
                    </small>
                  </p>
                </h4>
              </th>
            </tr>
            </thead>
          </Table>
          <Table responsive className="table-profile">
            <thead>
            <tr>
              <StyledTH />
              <StyledTH>ID</StyledTH>
              <StyledTH>Name</StyledTH>
              <StyledTH className="text-right">
                Reserved Balance
              </StyledTH>
              <StyledTH className="text-right">
                Available Balance
              </StyledTH>
            </tr>
            </thead>
            <tbody>
            {nonFlaggedProps.map(balance => (
              <Token {...balance} key={balance.id} />
            ))}
            </tbody>
          </Table>
          <div className="text-center">
            {hasFlagged && (
              <div>
                <Button
                  color="link"
                  className="text-info small"
                  id="togglerFlagged"
                  style={{ marginBottom: '1rem', textDecoration: "none" }}
                  onClick={this.toggle}
                >
                  {this.state.flaggedMessage}
                  <StyledInformationIcon
                    color="gray"
                    className="ml-1"
                    id="flaggedToolip"
                  />
                </Button>
                <UncontrolledTooltip
                  placement="right-end"
                  target="flaggedToolip"
                >
                  <FormattedMessage
                    {...walletMessages.flagged}
                  />
                </UncontrolledTooltip>
              </div>
            )}
          </div>
          {hasFlagged && (
            <Collapse
              toggler="#togglerFlagged"
              isOpen={this.state.collapse}
            >
              <Table
                className="table bg-light responsive"
                style={{ marginBottom: '5px' }}
              >
                <tbody>
                {flaggedProps.map(balance => (
                  <Token {...balance} key={balance.id} />
                ))}
                </tbody>
              </Table>
            </Collapse>
          )}
        </div>
      </Container>
    );
  }
}

Wallet.propTypes = {
  address: PropTypes.object.isRequired,
  addr: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Wallet);

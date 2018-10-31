/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';

import {
  Row,
  Col,
} from 'reactstrap';

import ServiceBlock from 'components/ServiceBlock';
import HeaderMessage from 'components/HeaderMessage';
import TransactionHistory from 'components/TransactionHistory';
import Transactions from 'containers/Transactions';

import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import sagaTransactions from 'containers/Transactions/saga';

const Layout = styled.div`
`;

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Layout className="container-fluid">
          {/*<Row noGutters>
            <Col sm className="mt-3">
              <HeaderMessage />
            </Col>
          </Row>*/}
          <div className="quick-info mb-5 mt-3">
            <Row>
              <Col sm="12" lg="5" className="text-center-down-md">
                <ServiceBlock />
              </Col>
              <Col sm="12" lg="7" className="">
                <TransactionHistory />
              </Col>
            </Row>
          </div>
        </Layout>
        <Transactions />
      </div>
    );
  }
}

const withSagaTransaction = injectSaga({ key: 'transactions', saga: sagaTransactions });

export default compose(
  withSagaTransaction,
  // withConnect,
  // withRouter,
)(HomePage);

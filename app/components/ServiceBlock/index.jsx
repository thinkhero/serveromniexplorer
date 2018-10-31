/**
 *
 * ServiceBlock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
// import featureLogoPNG from 'images/token1.png';
import logo2 from 'hope_assets/images/logo2.png';
import { makeSelectStatus } from './selectors';

const IMG = styled.img`
  margin-right: 10px;
  width: 44px;
  height: 44px;
`;

const Container = styled.div`
  padding: 30px 15px;
`;

const ContainerLogo = styled.div`
`;

const NameLogo = () => (
  <ContainerLogo className="px-3 py-2 d-flex">
    <div className="d-inline-block">
      <IMG src={logo2} alt="feature logo" className="card-img-top" />
    </div>
    <div className="d-inline-block bg-inverse text-white text-nowrap">
      <h5>Omni</h5>
      <span>Featured Property</span>
    </div>
  </ContainerLogo>
);

const BlockInfo = (props) => (
  <div className="pt-3 pl-3">
    <div className="text-white">
      <span>LAST UPDATE</span>
      <span>
        { `As of Block ${props.last_block}` }
      </span>
    </div>
    <div className="text-white">
      <span>
        <small>
          { `${props.last_parsed} UTC` }
        </small>
      </span>
    </div>
  </div>
);

const StyledContainerSummary = styled.div`
  padding: 6px 10px;
  margin: 0 6px;
  font-size: 0.9rem;
  border-radius: 1000px;
  background-color: rgba(255,255,255,0.1);
`;

const StyledContainerSummary1 = styled(StyledContainerSummary)`
`;
const StyledContainerSummary2 = styled(StyledContainerSummary)`
`;
const StyledContainerSummary3 = styled(StyledContainerSummary)`
`;

const SummaryItem = (props) => {
  const StyledContainer = props.container;

  return (
    <StyledContainer className="text-white d-flex justify-content-between align-items-center mt-3">
      <span className="lead" style={{ fontSize: '0.9rem' }}>{props.options.title}</span>
      <span className="lead">{props.options.value}</span>
    </StyledContainer>
  );
};

class ServiceBlock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    // wait status props loading
    if (isEmpty(this.props) || isEmpty(this.props.status)) {
      return null;
    }

    const propertiesCountValue = (props) => (
      <span>
        { props.properties_count }
        <small>
          { ` (+${props.test_properties_count} test)` }
        </small>
      </span>
    );

    const omniPriceValue = (props) => (
      <span>
        { Math.round((props.omni_btc + 0.0000001) * 1000000) / 1000000 } BTC /
        ${ (Math.round((props.omni_usd + 0.00001) * 100) / 100).toFixed(2) }
      </span>
    );
  
    return (
      <Container className="">
        <div className="d-inline-block d-sm-flex mb-4">
          <NameLogo />
          <BlockInfo {...this.props.status} />
        </div>
        <div className="d-md-inline-block d-sm-block w-100">
          <SummaryItem
            container={StyledContainerSummary1}
            options={{ title: 'LATEST OMNI PRICE', value: omniPriceValue(this.props.status) }}
          />
          <SummaryItem
            container={StyledContainerSummary2}
            options={{ title: 'TOTAL TRANSACTIONS (24 hrs)', value: this.props.status.txcount_24hr }}
          />
          <SummaryItem
            container={StyledContainerSummary3}
            options={{ title: 'OMNI PROPERTIES', value: propertiesCountValue(this.props.status) }}
          />
        </div>
      </Container>
    );
  }
}

ServiceBlock.propTypes = {
  getStatus: PropTypes.func,
  status: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const withConnect = connect(mapStateToProps, {});

export default compose(
  withConnect,
)(ServiceBlock);

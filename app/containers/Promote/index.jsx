/**
 *
 * Promote
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import styled from 'styled-components';
import {Container} from 'reactstrap';
import messages from './messages';

const StyledContainer = styled(Container)``;

function Promote() {
  return (
    <div className="new-container">
      <StyledContainer fluid className="new-title">
        <h3>Register Your Property</h3>
      </StyledContainer>
      <StyledContainer fluid className="pt-5 pb-5">
        <div className="new-bg p-4">
          <div className="panel-body">
            <p>OmniExplorer.info is the de-facto block explorer for the Omni Layer and our visitors are already familiar with and/or already using the Omni Protocol, providing a unique stage from which to showcase your property to thousands of Omni users.</p>
            <p>Please note:</p><ul>
            <li>Since we do not track visiting browsers we thus cannot provide demographics or unique visitor percentages etc to sponsors.</li>
            <li>Issuers must be able to sign a message from the issuing address to prove property ownership before registration will be permitted.</li>
            <li>OmniExplorer.info reserves the right to decline any registration/sponsorship containing inappropriate content (for example images depicting child abuse) at our sole discretion.</li>
          </ul><p></p>
            <p>Registering a property allows an issuer to customize certain display attributes of their property on OmniExplorer.info to make the presentation of their property more aesthetic and informative. These attributes have no bearing on the functionality of the property and currently apply only to the OmniExplorer.info block explorer.</p>
            <p>When you register a property, you will be asked to submit up to 5,000 characters of additional content describing your token and/or project to be displayed in addition to the property metadata when a visitor is looking at the information page for your property.  This can be an opportunity to deliver information and attract more interest to your property.</p>
            <p>Please note:</p><ul><li>Registering a property with OmniExplorer.info costs a flat fee of 0.5 BTC.</li><li>There is no registration expiry.</li></ul><p></p>
            <p>In addition to registering a property, issuers can also sponsor to have their property featured in prominent positions on the OmniExplorer.info website to increase visibility and promote awareness of your project.  OmniExplorer.info allows only one featured token at a time to really highlight participating projects.</p>
            <p></p><ul><li>Featuring a property with OmniExplorer.info costs a flat fee of 0.2 BTC per month.</li><li>Properties must be registered to be eligible for inclusion in featured properties.</li></ul><p></p>
            <p>Please <a href="/submitfeedback"> submit feedback</a> with a contact email address to process your registration or for further information.
            </p>
          </div>
        </div>
      </StyledContainer>
    </div>
  );
}

Promote.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Promote);

/**
 *
 * TransactionHistory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectStatus } from 'components/ServiceBlock/selectors';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment/src/moment';
import {
  Crosshair,
  HorizontalGridLines,
  LineSeries,
  makeWidthFlexible,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';

// https://github.com/uber/react-vis/blob/master/docs/flexible-plots.md#/examples/charts/responsive-vis
// https://uber.github.io/react-vis/documentation/api-reference/crosshair
// https://github.com/uber/react-vis/issues/834 //Axis Values are Slightly Off #834
// https://github.com/uber/react-vis/issues/288
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

class TransactionHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      crosshairValues: [],
    };
  }

  // eslint-disable-line react/prefer-stateless-function
  render() {
    // wait status props loading
    if (
      isEmpty(this.props) ||
      isEmpty(this.props.status) ||
      isEmpty(this.props.status.txdaily)
    ) {
      return null;
    }

    const { txdaily } = this.props.status;
    this.data = sortBy(
      txdaily.map(day => ({
        y: parseFloat(day.count),
        x: moment.utc(day.date).valueOf(),
      })),
      'date',
    );

    const tickFormat = d => {
      const dt = moment.utc(d);
      return dt.format('M/D');
    };

    const { crosshairValues } = this.state;

    return (
      <FlexibleXYPlot
        animation
        height={this.props.height || 280}
        margin={{ left: 40, top: 35, bottom:45,right:20 }}
        onMouseLeave={() => this.setState({ crosshairValues: null })}
        hideLine
      >
        <VerticalGridLines
          left={40}
          top={35}
          style={{
            line: {stroke: 'rgba(255,255,255,0.7)'}
          }}
        />
        <HorizontalGridLines
          left={40}
          top={35}
          style={{
            line: {stroke: 'rgba(255,255,255,0.7)'}
          }}
        />
        <LineSeries
          data={this.data}
          style={{
            stroke: '#66CCCC',
            strokeWidth: 2,
          }}
          onNearestX={(value, { index }) =>
            this.setState({ crosshairValues: [value] })
          }
        />
        <XAxis
          attr="x"
          attrAxis="y"
          title="By Days"
          orientation='bottom'
          tickSize={0}
          tickFormat={tickFormat}
          tickLabelAngle={0}
          tickValues={this.data.slice(1, -1).map(record => record.x)}
          style={{
            line: {stroke: '#fff'},
            ticks: {stroke: '#fff'},
            text: {stroke: 'none', fill: '#fff', fontWeight: 500},
            title: {fill:'#fff',fontSize: 10}
          }}
        />
        <YAxis
          attr="y"
          attrAxis="x"
          orientation="left"
          position="end"
          tickSize={0}
          title="Number of transactions"
          style={{
            line: {stroke: '#fff'},
            ticks: {stroke: '#fff'},
            text: {stroke: 'none', fill: '#fff', fontWeight: 500},
            title: {fill:'#fff',fontSize: 10}
          }}
        />
        {crosshairValues && (
          <Crosshair
            values={crosshairValues}
            titleFormat={d => ({
              title: 'Date',
              value: moment.utc(d[0].x).format('M/D/Y'),
            })}
            itemsFormat={d => [
              {
                title: 'Transactions',
                value: d[0].y,
              },
            ]}
          />
        )}
      </FlexibleXYPlot>
    );
  }
}

TransactionHistory.propTypes = {
  status: PropTypes.object,
  height: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const withConnect = connect(
  mapStateToProps,
  {},
);

export default compose(withConnect)(TransactionHistory);

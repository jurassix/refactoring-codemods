import React, {PropTypes} from 'react';
import {ERROR, AWESOME as ME} from '../../constants';
const INFO = require('../../constants');

class FeedBack extends React.Component {

  static propTypes = {
    message: PropTypes.string,
    statusCode: PropTypes.oneOf([INFO, ME, ERROR]),
  }

  render() {
    const {statusCode, message} = this.props;
    let classes = '';

    if (statusCode === INFO) {
      classes = 'alert alert-info alert-dismissable';
    } else if (statusCode === ME) {
      classes = 'alert alert-success alert-dismissable';
    } else if (statusCode === ERROR) {
      classes = 'alert alert-danger alert-dismissable';
    }

    return (
      <div className={classes}>
        {message}
      </div>
    );
  }
}

export default FeedBack;

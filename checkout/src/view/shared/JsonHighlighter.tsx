import PropTypes from 'prop-types';
import React from 'react';

const JsonHighlighter = (props) => {
  return (
    <div >
      {props.code}
    </div>
  );
};

JsonHighlighter.propTypes = {
  code: PropTypes.string.isRequired,
};

export default JsonHighlighter;

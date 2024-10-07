import PropTypes from 'prop-types';
import React from 'react';
import ReactJson from 'react-json-view'

const JsonHighlighter = (props) => {
  return (
    <div >
      <ReactJson src={props.code} />
    </div>
  );
};

JsonHighlighter.propTypes = {
  code: PropTypes.string.isRequired,
};

export default JsonHighlighter;

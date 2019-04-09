import React from 'react';
import PropTypes from 'prop-types';
const SvgIcon = ({ type, size, color, ...rest}) => {
    return (
        <svg className="icon" style={{color:color,fontSize:size}} {...rest}>
            <use xlinkHref={`#${type}`} href={`#${type}`} />
        </svg>
    );
};
SvgIcon.defaultProps = {
    size: null,
    color: null,
};
SvgIcon.propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
};
export default SvgIcon;
import PropTypes from 'prop-types';

export const Button = ({ onClick, children }) => (
    <button onClick={onClick} className="button" type="button">
        {children}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}
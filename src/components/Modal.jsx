import { Component } from "react";
import PropTypes from 'prop-types';

export class Modal extends Component {
    static propTypes = {
        imageUrl: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onClose);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onClose);
    }

    onClose = (e) => {  
        if (e.key === "Escape") {
            this.props.onClose();
        }
    }

    render() {
        const { imageUrl, onClose } = this.props;

        return (
            <div className="overlay" onClick={onClose}>
                <div className="modal" onClick={(e) => { e.stopPropagation() }}>
                    <img src={imageUrl} alt="" />
                </div>
            </div>
        )
    }
}
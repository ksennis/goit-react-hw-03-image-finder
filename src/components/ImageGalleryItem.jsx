import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ data, onClick }) => {
    return (
        <li className="imageGalleryItem">
            <img
                className="imageGalleryItem-image"
                src={data.webformatURL}
                alt=""
                onClick={() => onClick(data)}
            />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
}
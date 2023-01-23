import PropTypes from 'prop-types';
import { ImageGalleryItem } from "./ImageGalleryItem";

export const ImageGallery = ({ items, onSelectPost }) => {
    return (
        <ul className="imageGallery">
            {items.map((item) => (
                <ImageGalleryItem data={item} onClick={onSelectPost} key={item.id} />
            ))}
        </ul>
    )
}

ImageGallery.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired
    })).isRequired,
    onSelectPost: PropTypes.func.isRequired
}
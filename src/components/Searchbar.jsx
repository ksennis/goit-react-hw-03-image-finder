import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
    return (
        <div>
            <header className="searchbar">
                <form className="form" onSubmit={onSubmit}>
                    <button type="submit" className="searchButton">
                        <span className="button-label">Search</span>
                    </button>

                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        name="images-description"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        </div>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
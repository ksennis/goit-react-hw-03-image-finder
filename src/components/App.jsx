import { Component } from "react";
import axios from 'axios';

import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Loader } from "./Loader";

export class App extends Component {
  state = {
    posts: [],
    page: 0,
    imageDescription: '',
    isLoading: false,
    selectedPost: null
  }

  fetchImages(imageDescription, page) {
    this.setState({ isLoading: true });

    axios.get(`https://pixabay.com/api/?q=${imageDescription}&page=${page}&key=31628127-262f2d43a2a151032d1eaa569&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        const updatedPosts = this.state.posts.concat(response.data.hits);

        this.setState({ posts: updatedPosts });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  
  onSubmit = evt => {
    evt.preventDefault();

    const page = 1;
    const imageDescription = evt.target.elements['images-description'].value;

    this.setState({
      page,
      imageDescription,
      posts: []
    });

    this.fetchImages(imageDescription, page);
  }

  onClickLoadMore = () => {
    const nextPage = this.state.page + 1;

    this.setState({ page: nextPage });

    this.fetchImages(this.state.imageDescription, nextPage);
  }

  onSelectPost = (postData) => {
    this.setState({
      selectedPost: postData
    });
  }

  onModalClose = () => {
    this.setState({
      selectedPost: null
    });
  }

  render() {
    const { isLoading, posts, page, selectedPost } = this.state;
    
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        
        <ImageGallery items={posts} onSelectPost={this.onSelectPost} />
        { isLoading && <Loader /> }

        {(!!page && !isLoading) && (
          <div className="loadMoreButton">
            <Button onClick={this.onClickLoadMore}>Load More</Button>
          </div>
        )}

        {selectedPost && (
          <Modal imageUrl={selectedPost.largeImageURL} onClose={this.onModalClose} />
        )}
      </div>
    );
  }
};

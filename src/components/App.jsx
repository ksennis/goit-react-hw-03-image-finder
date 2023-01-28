import { Component } from "react";

import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Loader } from "./Loader";
import {fetchImages} from "services/eventsApp.services"

export class App extends Component {
  state = {
    posts: [],
    page: 0,
    imageDescription: '',
    isLoading: false,
    selectedPost: null
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
  }

  onClickLoadMore = () => {
    const nextPage = this.state.page + 1;

    this.setState({ page: nextPage });
  }

  filterPostsData = (originalPosts) => {
    return originalPosts.map((post) => ({
      id: post.id,
      webformatURL: post.webformatURL,
      largeImageURL: post.largeImageURL
    }))
  }

  componentDidUpdate (_, prevState) {
    const { imageDescription, page, posts } = this.state;

    if (imageDescription !== prevState.imageDescription || page !== prevState.page) {
      this.setState({ isLoading: true });

      fetchImages(imageDescription, page)
      .then(response => {
        const updatedPosts = posts.concat(this.filterPostsData(response.data.hits));
  
        this.setState({ posts: updatedPosts });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
    }
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
        
        {!!posts.length && <ImageGallery items={posts} onSelectPost={this.onSelectPost} />}
        { isLoading && <Loader /> }

        {(!!page && !isLoading) && (
          <div className="loadMoreButton">
            <Button onClick={this.onClickLoadMore}>
              Load More
            </Button>
          </div>
        )}

        {selectedPost && (
          <Modal imageUrl={selectedPost.largeImageURL} onClose={this.onModalClose} />
        )}
      </div>
    );
  }
};

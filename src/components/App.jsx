import React, { Component } from 'react';
import Notiflix from 'notiflix';

import { fetchImages } from './fetchImg';
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    total: 0,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages(this.state.query, this.state.page);
    }
  }

  getImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const data = await fetchImages(query, page);

      if (data.hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images for your search query. Please try again.'
        );
      }
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images, isLoading, total, error } = this.state;
    const totalPage = total / images.length;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {images.length !== 0 && <ImageGallery images={images} />}
        {totalPage > 1 && !isLoading && images.length !== 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
        {error && <p>Sorry, something went wrong. Please try again.</p>}
      </Container>
    );
  }
}

export default App;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

import Modal from 'components/Modal/Modal';
import { Controls } from 'components/Controls/Controls';

class ImageGalleryItem extends Component {
  state = {
    shownModal: false,
    index: this.props.index,
  };

  onModal = () => {
    this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
  };

  changeIndex = value => {
    this.setState(state => ({ index: state.index + value }));
  };

  render() {
    const { image, images } = this.props;
    const { index, shownModal } = this.state;
    const totalItems = images.length;
    const currentItem = images[index];

    return (
      <li onClick={this.onModal} className={css.gallery_item}>
        <img
          className={css.gallery_item_img}
          src={image.webformatURL}
          alt={image.tags}
        />
        {shownModal && (
          <Modal onClose={this.onModal}>
            <img src={currentItem.largeImageURL} alt={currentItem.tags} />
            <Controls
              current={index + 1}
              total={totalItems}
              onChange={this.changeIndex}
            />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  image: PropTypes.object,
  index: PropTypes.number,
};

export default ImageGalleryItem;

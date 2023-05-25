import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modalRoot');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClose = e => {
    if (e.currentTarget !== e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div onClick={this.onBackdropClose} className={css.modal__backdrop}>
        <div className={css.modal__content}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};



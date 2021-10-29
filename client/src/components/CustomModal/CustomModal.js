import React, { Fragment, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CustomModal = ({ modal, toggleModal, textHeader = '', modalHandler, textSubmit = 'Ok', textCancel = 'Cancel', isLoading, children }) => {
  const [modifyChildren, setModifyChildren] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = (args) => {
    setIsSubmit(false);
    if (args) {
      modalHandler(args);
    }
  }

  useEffect(() => {
    setModifyChildren(React.cloneElement(children, { isSubmit, onSubmit }));
  }, [children, isSubmit]);

  return (
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>{textHeader}</ModalHeader>
      <ModalBody>
        {modifyChildren}
      </ModalBody>
      <ModalFooter>
        {
          isLoading ?
            <div>Loading...</div>
          :
          <Fragment>
            <Button color='primary' onClick={() => setIsSubmit(true)}>{textSubmit}</Button>{' '}
            <Button color='secondary' onClick={toggleModal}>{textCancel}</Button>
          </Fragment>
        }
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
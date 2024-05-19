import { useState } from 'react';

const useModal = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => setModalVisible(!isModalVisible);
    return {
        isModalVisible,
        openModal: () => setModalVisible(true),
        closeModal: () => setModalVisible(false),
        toggleModal,
    };
};

export default useModal;
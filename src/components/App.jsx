import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { getSearch } from 'services/getSearch';
import { ErrorMessage, Photo, Wrapper } from './App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (search !== '' && (page === 1 || page > 1)) {
      getImages(search, page);
    }
  }, [search, page]);

  const getImages = (search, page) => {
    setLoading(true);

    getSearch(search, page)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        const { hits, total } = data;

        if (hits.length === 0) {
          setImages([]);
          setTotal(total);
          Notify.failure('No images found.');
        } else {
          setImages(prevImages => [...prevImages, ...hits]);
          setTotal(total);
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (largeImageURL, alt) => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  const handleSearchSubmit = value => {
    if (value !== search) {
      setSearch(value);
      setImages([]);
      setPage(1);
      setTotal(1);
      setLoading(false);
      setError(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage>Something went wrong: ({error})!</ErrorMessage>}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && total / 12 > page && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {showModal && (
        <Modal onCloseModal={handleCloseModal}>
          <Photo src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </Wrapper>
  );
};

export default App;

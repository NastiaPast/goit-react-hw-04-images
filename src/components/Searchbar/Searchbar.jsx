import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { Form, Header, Input, SearchButton } from './Searchbar.styled';
import { ReactComponent as SearchIcon } from 'icon/magnifying-glass-svgrepo-com.svg';
const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      Notify.failure(
        'The search string cannot be empty. Please specify your search query.'
      );
      return;
    }
    onSubmit(searchQuery);
    event.target.reset();
  };
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchIcon width="35" height="35" />
        </SearchButton>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;

import { Search } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';

const UserSearch = ({
  value: [value, setValue],
  user: [user, setUser],
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const resetSearchState = () => {
    setIsLoading(false);
    setValue('');
    setSearchResults([]);
  };
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/users/')).then((res) => {
      const { results } = res.data.response;
      setUserData(results.map(row => ({
        id: row.idusers,
        title: row.name,
        description: row.pronoun,
        image: row.path,
      })));
    });
  }, []);

  useEffect(resetSearchState, [user]);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (value.length < 1) return resetSearchState();
    const re = new RegExp(_.escapeRegExp(value), 'i');
    const isMatch = r => re.test(r.title);
    setSearchResults(_.filter(userData, isMatch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Search
      loading={isLoading}
      onResultSelect={(e, obj) => setUser((userData.filter(s => s.id === obj.result.id))[0])}
      onSearchChange={_.debounce((e, obj) => setValue(obj.value), 500, { leading: true })}
      results={searchResults}
      value={value}
    />
  );
};

UserSearch.propTypes = {
  value: PropTypes.arrayOf(PropTypes.any),
  user: PropTypes.arrayOf(PropTypes.any),
};

UserSearch.defaultProps = {
  value: [null, () => {}],
  user: [null, () => {}],
};

export default UserSearch;

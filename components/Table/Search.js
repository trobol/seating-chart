import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SearchAction = ({ data, updateSearchData }) => {
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const resetState = () => {
    setValue('');
    setSearchResults([]);
    setFilterData(data);
  };
  const handleResultSelect = () => resetState();
  const handleSearchChange = (_e, obj) => {
    setValue(obj.value);
  };
  useEffect(() => {
    setSearchData(updateSearchData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  // Display correct information on search
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (value.length < 1) return resetState();
    const re = new RegExp(_.escapeRegExp(value), 'i');
    const isSearchMatch = r => re.test(r.title);
    const isTableData = r => re.test(r.name);
    setSearchResults(_.filter(searchData, isSearchMatch));
    setFilterData(_.filter(filterData, isTableData));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Search
      loading={false}
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
      results={searchResults}
      value={value}
    />
  );
};

SearchAction.propTypes = {
  // data: PropTypes.arrayOf(PropTypes.shape()),
  updateSearchData: PropTypes.func.isRequired,
};

/* SearchAction.defaultProps = {
  data: [],
}; */

export default SearchAction;

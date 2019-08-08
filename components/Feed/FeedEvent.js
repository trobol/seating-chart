import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';


const FeedEvent = ({ image, content, date }) => (
  <Feed.Event>
    <Feed.Label image={image} />
    <Feed.Content>
      <Feed.Date>{moment(date).fromNow()}</Feed.Date>
      <Feed.Summary>{content}</Feed.Summary>
    </Feed.Content>
  </Feed.Event>
);

FeedEvent.propTypes = {
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default FeedEvent;

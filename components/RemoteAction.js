import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';



const RemoteAction = ({ title, icon, url, method = 'get', data = {}, callback, pre, fail }) => {
	const [loading, setLoading] = useState(false);

	function handleClick(e) {
		if (pre && pre(e) === true) {
			setLoading(true);
			axios({ url, method, data })
				.then((response) => {
					setLoading(false);
					if (callback) callback(response)
				}).catch(() => {
					setLoading(false);
					if (fail) callback(fail)
				});
		}
	}
	return (

		<Button onClick={handleClick} fluid disabled={loading} loading={loading}>
			<Icon name={icon} />
			{title}
		</Button>

	);
};

RemoteAction.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	callback: PropTypes.func.isRequired,
	url: PropTypes.string.isRequired
};

export default RemoteAction;

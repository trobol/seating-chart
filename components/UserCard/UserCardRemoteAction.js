import PropTypes from 'prop-types';
import { Button, List, Loader } from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';
import RemoteAction from '../RemoteAction';



const UserCardRemoteAction = ({ title, icon, url, method = 'get', data = {}, callback }) => {
	const [loading, setLoading] = useState(false);

	function handleClick(e) {
		setLoading(true);
		axios({ url, method, data })
			.then((response) => {
				setLoading(false);
				if (callback) callback(response)
			});

	}
	return (
		<List.Item key={title}>
			<List.Content>
				<RemoteAction title={title} icon={icon} url={url} method={method} data={data} callback={callback} />
			</List.Content>
		</List.Item>
	);
};

UserCardRemoteAction.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	callback: PropTypes.func.isRequired,
	url: PropTypes.string.isRequired
};

export default UserCardRemoteAction;

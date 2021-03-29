import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import MissionTitle from '../MissionTitle';
import { Link } from 'react-router-dom';

const LaunchItem = ({
  launch: { flight_number, mission_name, launch_date_local, launch_success },
}) => (
  <div className="card card-body mb-4">
    <div className="row">
      <div className="col-md-9">
        <MissionTitle success={launch_success} name={mission_name} />
        <p className="text-info">
          Date: {dayjs(launch_date_local).format('DD MMMM YYYY hh:mm:ss A')}
        </p>
      </div>
      <div className="col-md-3">
        <Link to={`/launch/${flight_number}`} className="btn btn-secondary">
          Launch Details
        </Link>
      </div>
    </div>
  </div>
);

LaunchItem.propTypes = {
  launch: PropTypes.object,
};
export default LaunchItem;

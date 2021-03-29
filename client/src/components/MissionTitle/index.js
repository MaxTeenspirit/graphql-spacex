import PropTypes from 'prop-types';

const MissionTitle = ({ success, name }) => (
  <div className="d-flex">
    <h4 className="mr-1">Mission: </h4>
    <h4 className={success ? 'text-success' : 'text-danger'}>{name}</h4>
  </div>
);

export default MissionTitle;

MissionTitle.propTypes = {
  success: PropTypes.bool,
  name: PropTypes.string,
};

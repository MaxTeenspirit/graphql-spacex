import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
      links {
        mission_patch_small
      }
      details
    }
  }
`;

const Launch = () => {
  const { number } = useParams();
  const [isImgLoaded, setImgLoaded] = useState(false);
  const history = useHistory();

  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number: +number },
  });

  const imageLoaded = () => {
    setImgLoaded(true);
  };

  return (
    <div className="container pt-5">
      {loading ||
        (!isImgLoaded && <h3 className="text-center pt-5 mt-5">Loading</h3>)}
      {error && <h3 className="text-center">Something went wrong...</h3>}
      {data && (
        <div
          className="card card-body"
          style={{ transition: '.6s', opacity: `${isImgLoaded ? 1 : 0}` }}
        >
          <h2 className="text-center">{data.launch.mission_name}</h2>
          <div className="row">
            <div className="col-md-3 px-4">
              <img
                onLoad={imageLoaded}
                src={data.launch.links.mission_patch_small}
                alt="mission patch image"
                style={{ width: '100%' }}
              />
            </div>

            <div className="col-md-6 px-4 border-right border-left d-flex flex-column">
              <h4 className="text-info text-center mt-3 mb-4">Info</h4>
              <div className="mb-2">
                <h5 className="d-inline mb-4">Mission: </h5>
                <span>
                  {data.launch.launch_success ? 'Successful' : 'Failed'}
                </span>
              </div>
              <div>
                <h5 className="d-inline mb-4">Date: </h5>
                <span>
                  {dayjs(data.launch.launch_date_local).format('DD MMMM YYYY')}
                </span>
              </div>
              {data.launch.details && (
                <>
                  <h4 className="text-info text-center mt-3 mb-4">Details</h4>
                  <p
                    style={{
                      lineHeight: '28px',
                      fontSize: '18px',
                      fontWeight: 'normal',
                    }}
                  >
                    {data.launch.details}
                  </p>
                </>
              )}
              <button
                className="btn btn-info d-block mt-4"
                style={{
                  margin: '0 auto',
                  fontSize: '18px',
                  alignSelf: 'flex-end',
                }}
                onClick={() => history.goBack()}
              >
                Back
              </button>
            </div>

            <div className="col-md-3 px-4">
              <h4 className="text-info text-center mt-3 mb-4">Rocket</h4>

              <div className="mb-2">
                <h5 className="d-inline mb-4">Name: </h5>
                <span>{data.launch.rocket.rocket_name}</span>
              </div>
              <div>
                <h5 className="d-inline mb-4">Type: </h5>
                <span>{data.launch.rocket.rocket_type}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Launch;

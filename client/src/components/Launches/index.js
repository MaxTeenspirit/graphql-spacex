import { gql, useQuery } from '@apollo/client';
import LaunchItem from '../LaunchItem';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  return (
    <>
      <h2 className="display4 mt-5">Launches</h2>
      <div className="my-3 d-flex align-items-center">
        <div
          className="d-inline-block bg-success mr-2"
          style={{ width: 40, height: 20 }}
        />
        <span>- Successful</span>
        <div
          className="d-inline-block bg-danger mx-2"
          style={{ width: 40, height: 20 }}
        />
        <span>- Failed</span>
      </div>
      {loading && <h3 className="text-center pt-5 mt-5">Loading</h3>}
      {error && <h3 className="text-center">Something went wrong...</h3>}
      {data &&
        data.launches.map((launch) => {
          return (
            <LaunchItem
              key={launch.flight_number + launch.mission_name}
              launch={launch}
            />
          );
        })}
    </>
  );
};

export default Launches;

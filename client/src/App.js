import { Route, Switch } from 'react-router-dom';
import logo from './assets/logo.png';
import Launches from './components/Launches';
import Launch from './components/Launch';

const App = () => (
  <div className="container">
    <div className="mt-3 d-flex justify-content-center">
      <img
        src={logo}
        alt="SpaceX logo"
        style={{ width: '300px', display: 'block', margin: 'auto' }}
      />
    </div>
    <Switch>
      <Route path="/" exact component={Launches} />
      <Route path="/launch/:number" exact component={Launch} />
      <Route
        render={() => (
          <h1 className="text-danger text-center mt-5">
            404 - route not found
          </h1>
        )}
      />
    </Switch>
  </div>
);

export default App;

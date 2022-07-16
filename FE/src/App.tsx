import { useRoutes } from 'react-router-dom';

import Header from '@components/Header';
import { routes } from '@router';

const App = () => {
  const element = useRoutes(routes);
  return (
    <div>
      <Header />
      {element}
    </div>
  );
};

export default App;

import { Routes, Route } from 'react-router-dom';
import { CreatePage, ProfilePage } from './pages';
import { routes } from './routes';

function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <Routes>
          <Route path={routes.home} element={<ProfilePage />} />
          <Route path={routes.create} element={<CreatePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

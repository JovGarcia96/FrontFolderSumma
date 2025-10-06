import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<item.Component />}
          />
        ))}
        {/* Redirección a la primera ruta si no se encuentra la URL */}
        <Route path="/*" element={<Navigate to={routes[0].path} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
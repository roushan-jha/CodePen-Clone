import { Routes, Route, Navigate } from 'react-router-dom';
import {Home} from './components'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home/*" element={<Home />} />
        {/* If the route is not matching */}
        <Route path="*" element={<Navigate to={"/home"} /> } />
      </Routes>
    </div>
  );
}

export default App;

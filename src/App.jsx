import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './Game';
import MainPage from './MainPage';
import Rankings from './Rankings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/game"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Game maxSec={30} maxPhase={3} />
          </Suspense>
        }
      />
      <Route
        path="/rankings"
        element={
          <Suspense fallback={<div>랭킹을 불러오는 중...</div>}>
            <Rankings />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;

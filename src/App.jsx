import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { userCashState, userNameState } from './atoms/user';
import Error from './Error';
import ErrorBoundary from './ErrorBoundary';
import Game from './Game';
import Loading from './Loading';
import MainPage from './MainPage';
import Rankings from './Rankings';

const useCleanUp = () => {
  const resetUserCash = useResetRecoilState(userCashState);
  const resetUserName = useResetRecoilState(userNameState);
  const cleanUp = () => {
    resetUserCash();
    resetUserName();
  };
  return cleanUp;
};

function App() {
  const cleanUp = useCleanUp();

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/game"
        element={
          <ErrorBoundary
            fallback={<Error msg={`에러가 발생했습니다. 잠시 후 메인 페이지로 이동합니다.`} />}
            cleanUp={cleanUp}
          >
            <Suspense fallback={<Loading msg="주식 정보를 가져오는 중..." />}>
              <Game maxSec={3} maxPhase={3} />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/rankings"
        element={
          <ErrorBoundary
            fallback={<Error msg={`에러가 발생했습니다. 잠시 후 메인 페이지로 이동합니다.`} />}
            cleanUp={cleanUp}
          >
            <Suspense fallback={<Loading msg="랭킹에 등록 중..." />}>
              <Rankings />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="dev"
        element={<Error msg={`에러가 발생했습니다. 잠시 후 메인 페이지로 이동합니다.`} />}
      />
    </Routes>
  );
}

export default App;

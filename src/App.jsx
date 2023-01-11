import { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userCashState, userNameState } from './atoms/user';
import { MAX_PHASE, MAX_SEC } from './config';
import Error from './Error';
import ErrorBoundary from './ErrorBoundary';
import Game from './Game';
import Loading from './Loading';
import MainPage from './MainPage';
import NotFound from './NotFound';
import Protect from './Protect';
import Rankings from './Rankings';
import Result from './Result';
import Share from './SharePage';

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
  const userName = useRecoilValue(userNameState);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading msg="로딩중..." />}>
            <MainPage />
          </Suspense>
        }
      />
      <Route
        path="/game"
        element={
          <ErrorBoundary
            fallback={<Error msg={`에러가 발생했습니다. 잠시 후 메인 페이지로 이동합니다.`} />}
            cleanUp={() => cleanUp()}
          >
            <Suspense fallback={<Loading msg="주식 정보를 가져오는 중..." />}>
              <Protect when={userName === ''}>
                <Game maxSec={MAX_SEC} maxPhase={MAX_PHASE} />
              </Protect>
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/rankings"
        element={
          <ErrorBoundary
            fallback={<Error msg={`에러가 발생했습니다. 잠시 후 메인 페이지로 이동합니다.`} />}
            cleanUp={() => cleanUp()}
          >
            <Suspense fallback={<Loading msg="랭킹을 불러오는 중..." />}>
              <Protect when={userName === ''} to="/">
                <Rankings />
              </Protect>
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/result"
        element={
          <ErrorBoundary
            fallback={<Error msg={`에러가 발생했습니다. 잠시 후 메인 페이지로 이동합니다.`} />}
            cleanUp={() => cleanUp()}
          >
            <Suspense fallback={<Loading msg="랭킹을 서버에 등록하는 중..." />}>
              <Protect when={userName === ''} to="/">
                <Result />
              </Protect>
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/share/:username"
        element={
          <ErrorBoundary
            fallback={<Error msg={`에러가 발생했습니다. 잠시 후 메인 페이지로 이동합니다.`} />}
            cleanUp={() => cleanUp()}
          >
            <Suspense fallback={<Loading msg="접속중..." />}>
              <Share />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route path="*" element={<NotFound msg="잘못된 주소입니다." />} />
    </Routes>
  );
}

export default App;

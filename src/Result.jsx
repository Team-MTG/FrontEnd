import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userCashState, userRateState } from './atoms/user';
import { SEED_MONEY } from './config';
import prettyKorNum from './utils/prettyKorNum';

const Result = () => {
  const navigate = useNavigate();
  const userCash = useRecoilValue(userCashState);
  const userRate = useRecoilValue(userRateState);

  return (
    <div className="bg-slate-50 h-screen max-w-sm mx-auto flex flex-col justify-center items-center">
      <div className="text-center h-80 w-10/12">
        <div className="text-3xl">
          <span className="text-sm">시드머니</span>
          <p>{prettyKorNum(SEED_MONEY)}</p>
        </div>
        <div className="text-3xl">
          <span className="text-sm">평가손익</span>
          <p>{prettyKorNum(userCash - SEED_MONEY)}</p>
        </div>
        <div className="text-3xl">
          <span className="text-sm">잔고평가</span>
          <p>{prettyKorNum(userCash)}</p>
        </div>
        <div className="text-3xl">
          <span className="text-sm">총수익률</span>
          <p>{`${(userRate * 100).toFixed(2)}%`}</p>
        </div>
      </div>
      <button
        className="w-10/12 text-2xl my-10 bg-orange-400 border-2 rounded-2xl border-gray-800 border-solid"
        onClick={() => navigate('/rankings', { replace: true })}
      >
        <span>랭킹확인!</span>
      </button>
    </div>
  );
};

export default Result;

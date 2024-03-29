import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import prettyKorNum from './utils/prettyKorNum';
import rankBtn from './assets/rankBtn.svg';
import { SEED_MONEY } from './config';
import { userBalanceState, userNameState, userRankState, userRateState } from './atoms/user';

export default function Result() {
  const navigate = useNavigate();

  /*데이터*/
  const userName = useRecoilValue(userNameState);
  const totalProfit = useRecoilValue(userRateState) * 100;
  const totalBalance = useRecoilValue(userBalanceState);
  const userRankPost = useRecoilValue(userRankState);
  const totalYield = totalBalance - SEED_MONEY;

  /*상세 결과 컴포넌트화*/
  function DetailResult({ title, data, unit, decoration = false, fontSize = 'xs' }) {
    return (
      <div className="flex flex-col items-center">
        <p className={`text-${fontSize} my-1`}>{title}</p>
        <div
          className={`font-tn text-[22px] my-1 ${
            decoration ? `underline decoration-4 decoration-solid decoration-[#63C9EF]` : ``
          }`}
        >
          {prettyKorNum(data)}
          {unit}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[url('../src/assets/bg-resultpage.svg')] bg-no-repeat bg-center h-[38rem] max-w-xs mx-auto flex flex-col justify-between items-center mt-[8vh]">
      <span
        className={
          userName.length > 8
            ? 'relative font-sc text-base leading-none font-bold text-center top-24'
            : 'relative font-sc text-base leading-none font-bold text-center top-28'
        }
      >
        <span className="font-tn text-3xl">{userName}</span>
        {userName.length > 8 ? <br /> : <></>}
        님의 투자 결과
      </span>
      <div className="h-[21rem] py-[20px] relative top-12 font-sc font-bold flex flex-col justify-between items-center">
        <DetailResult title="시드머니" data={SEED_MONEY} unit="원" fontSize="base" />
        <DetailResult title="평가손익" data={totalYield} unit="원" />
        <DetailResult title="잔고평가" data={totalBalance} unit="원" />
        <DetailResult title="총 수익률" data={totalProfit} unit="%" decoration={true} />
      </div>
      <button
        className="bg-[url('../src/assets/rankBtn.svg')] -translate-y-5"
        onClick={() => {
          navigate('/rankings', {
            replace: true,
            state: {
              userRank: userRankPost,
            },
          });
        }}
      >
        <img src={rankBtn} />
      </button>
    </div>
  );
}

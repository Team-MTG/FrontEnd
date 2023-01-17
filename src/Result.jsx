import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import prettyKorNum from './utils/prettyKorNum';
import rankBtn from './assets/rankBtn.svg';
import { SEED_MONEY } from './config';
import { userCashState, userNameState, userRateState } from './atoms/user';

export default function Result() {
  const navigate = useNavigate();

  /*데이터*/
  const userName = useRecoilValue(userNameState);
  const totalProfit = useRecoilValue(userRateState) * 100;
  const totalBalance = useRecoilValue(userCashState);
  const totalYield = totalBalance - SEED_MONEY;

  /*상세 결과 컴포넌트화*/
  function detailResult(title, data, unit, decoration = false, fontSize = 'xs') {
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
    <div className="bg-[url('../src/assets/bg-resultpage.svg')] bg-contain bg-no-repeat bg-center h-[38rem] w-96 mx-auto flex flex-col justify-between items-center mt-[8vh]">
      <span
        className={`relative top-${
          userName.length > 8 ? 24 : 28
        } font-sc text-base leading-none font-bold text-center`}
      >
        <span className="font-tn text-3xl">{userName}</span>
        {userName.length > 8 ? <br /> : <></>}
        님의 투자 결과
      </span>

      <div className="h-[21rem] py-[20px] relative top-12 font-sc font-bold flex flex-col justify-between items-center">
        {detailResult('시드머니', SEED_MONEY, '원', false, 'base')}
        {detailResult('평가손익', totalYield, '원')}
        {detailResult('잔고평가', totalBalance, '원')}
        {detailResult('총 수익률', totalProfit, '%', true)}
      </div>

      <button
        className="mb-1 bg-[url('../src/assets/rankBtn.svg')]"
        onClick={() => {
          navigate('/rankings');
        }}
      >
        <img src={rankBtn} />
      </button>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { gameRoundState, roundLogState, tradeLogState } from './atoms/game';
import { stockState } from './atoms/stocks';
import { userBalanceState } from './atoms/user';
import useTimer from './hooks/useTimer';
import prettyKorNum from './utils/prettyKorNum';

const background = {
  0: "font-tn bg-[#7A8799] bg-[url('../src/assets/morning.png')] bg-no-repeat bg-center h-[38rem] max-w-xs mt-[8vh] mx-auto flex flex-col items-center",
  1: "font-tn bg-[#A58484] bg-[url('../src/assets/sunset.png')] bg-no-repeat bg-center h-[38rem] max-w-xs mt-[8vh] mx-auto flex flex-col items-center",
  2: "font-tn bg-[#A58484] bg-[url('../src/assets/sunset.png')] bg-no-repeat bg-center h-[38rem] max-w-xs mt-[8vh] mx-auto flex flex-col items-center",
  3: "font-tn bg-[#545454] bg-[url('../src/assets/midnight.png')] bg-no-repeat bg-center h-[38rem] max-w-xs mt-[8vh] mx-auto flex flex-col items-center",
  4: "font-tn bg-[#545454] bg-[url('../src/assets/midnight.png')] bg-no-repeat bg-center h-[38rem] max-w-xs mt-[8vh] mx-auto flex flex-col items-center",
};

const GameRoundBar = ({ className, round, roundLog }) => {
  return (
    <svg
      className={className}
      width="322"
      height="103"
      viewBox="0 0 322 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path opacity="0.2" d="M4.82001 9V102.02V103H292.24L320.82 74.41V9H4.82001Z" fill="black" />
      <path
        d="M0.820007 94.02V95H288.24L320.82 62.41V54.77V1H0.820007V94.02Z"
        fill="white"
        stroke="black"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.2"
        d="M113.68 33.85C113.68 33.36 113.42 32.88 112.89 32.65L91.74 23.55C90.82 23.16 89.79 23.16 88.87 23.55L67.72 32.65C67.19 32.88 66.93 33.36 66.93 33.85V45.79H66.94C66.96 46.13 67.11 46.47 67.39 46.71C67.48 46.79 67.59 46.86 67.72 46.91L88.87 56.01C89.33 56.21 89.81 56.3 90.3 56.3C90.54 56.3 90.79 56.28 91.03 56.23C91.27 56.18 91.51 56.11 91.73 56.01L112.88 46.91C113 46.86 113.11 46.79 113.21 46.71C113.49 46.47 113.64 46.14 113.66 45.79H113.67V33.85H113.68Z"
        fill="black"
      />
      <path
        opacity="0.2"
        d="M210.5 33.85C210.5 33.36 210.24 32.88 209.71 32.65L188.56 23.55C187.64 23.16 186.61 23.16 185.69 23.55L164.54 32.65C164.01 32.88 163.75 33.36 163.75 33.85V45.79H163.76C163.78 46.13 163.93 46.47 164.21 46.71C164.3 46.79 164.41 46.86 164.54 46.91L185.69 56.01C186.15 56.21 186.63 56.3 187.12 56.3C187.36 56.3 187.61 56.28 187.85 56.23C188.09 56.18 188.33 56.11 188.55 56.01L209.7 46.91C209.82 46.86 209.93 46.79 210.03 46.71C210.31 46.47 210.46 46.14 210.48 45.79H210.49V33.85H210.5Z"
        fill="black"
      />
      <path
        opacity="0.2"
        d="M307.32 33.85C307.32 33.36 307.06 32.88 306.53 32.65L285.38 23.55C284.46 23.16 283.43 23.16 282.51 23.55L261.36 32.65C260.83 32.88 260.57 33.36 260.57 33.85V45.79H260.58C260.6 46.13 260.75 46.47 261.03 46.71C261.12 46.79 261.23 46.86 261.36 46.91L282.51 56.01C282.97 56.21 283.45 56.3 283.94 56.3C284.18 56.3 284.43 56.28 284.67 56.23C284.91 56.18 285.15 56.11 285.37 56.01L306.52 46.91C306.64 46.86 306.75 46.79 306.85 46.71C307.13 46.47 307.28 46.14 307.3 45.79H307.31V33.85H307.32Z"
        fill="black"
      />
      <path
        d="M76.3 47.46L48.32 61.53"
        stroke={round >= 0 ? '#63C9EF' : '#919191'}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M101.08 47.46L129.06 61.53"
        stroke={round >= 1 ? '#63C9EF' : '#919191'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M173.06 47.63L145.08 61.7"
        stroke={round >= 2 ? '#63C9EF' : '#919191'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M197.08 47.46L225.06 61.53"
        stroke={round >= 3 ? '#63C9EF' : '#919191'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M273.06 47.63L245.08 61.7"
        stroke={round >= 4 ? '#63C9EF' : '#919191'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.93 29.85V41.79H64.94C64.97 42.25 65.22 42.69 65.72 42.91L86.87 52.01C87.78 52.4 88.82 52.4 89.73 52.01L110.88 42.91C111.38 42.7 111.63 42.25 111.66 41.79H111.67V29.85H64.92H64.93Z"
        fill="#AD7B32"
      />
      <path
        d="M110.29 28.39L90.74 19.98C89.19 19.31 87.43 19.31 85.87 19.98L66.32 28.39C65.04 28.94 65.04 30.76 66.32 31.31L85.86 39.71C87.42 40.38 89.2 40.38 90.76 39.71L110.3 31.31C111.58 30.76 111.58 28.94 110.3 28.39H110.29Z"
        fill="#66B755"
      />
      <path
        d="M88.31 41.56V51.49"
        stroke="#7C541E"
        strokeWidth="0.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M74.38 22.76H70.88V30.64H74.38V22.76Z" fill="#7C541E" />
      <path
        d="M75.71 18.38H78.88L72.56 10.5L66.24 18.38H69.39L66.23 22.32H69.39L66.23 26.26H78.87L75.71 22.32H78.87L75.71 18.38Z"
        fill="#367C25"
      />
      <path
        d="M110.89 28.65L89.74 19.55C88.82 19.16 87.79 19.16 86.87 19.55L76.91 23.83L75.7 22.32H78.86L75.7 18.38H78.87L72.55 10.5L66.23 18.38H69.38L66.22 22.32H69.38L66.22 26.26H71.26L65.72 28.64C65.19 28.87 64.93 29.35 64.93 29.84V41.78H64.94C64.97 42.24 65.22 42.68 65.72 42.9L86.87 52C87.78 52.39 88.82 52.39 89.73 52L110.88 42.9C111.38 42.69 111.63 42.24 111.66 41.78H111.67V29.84C111.67 29.35 111.41 28.87 110.88 28.64L110.89 28.65Z"
        stroke="black"
        strokeWidth="0.51"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M81.19 31.52L80.15 33.33L79.1 31.52L78.06 33.33L77.01 31.52L75.49 34.15H77.59H78.53H79.68H80.62H82.71L81.19 31.52Z"
        fill="#367C25"
      />
      <path
        d="M104.64 28.89L103.6 30.7L102.55 28.89L101.5 30.7L100.46 28.89L98.94 31.52H101.03H101.97H103.13H104.07H106.16L104.64 28.89Z"
        fill="#367C25"
      />
      <path
        d="M208.37 29.85C208.37 29.33 208.09 28.81 207.53 28.57L187.25 19.85C185.89 19.26 184.35 19.26 182.99 19.85L162.71 28.57C162.15 28.81 161.87 29.33 161.87 29.85H161.74V41.79H161.75C161.78 42.25 162.03 42.69 162.53 42.91L183.68 52.01C184.59 52.4 185.63 52.4 186.54 52.01L207.69 42.91C208.19 42.7 208.44 42.25 208.47 41.79H208.48V29.85H208.35H208.37Z"
        fill="#50A8D8"
      />
      <path
        d="M207.11 40.15L187.56 31.74C186.01 31.07 184.25 31.07 182.69 31.74L163.14 40.15C161.86 40.7 161.86 42.52 163.14 43.07L182.68 51.47C184.24 52.14 186.02 52.14 187.58 51.47L207.12 43.07C208.4 42.52 208.4 40.7 207.12 40.15H207.11Z"
        fill="#558EB5"
      />
      <path
        opacity="0.7"
        d="M207.11 28.39L187.56 19.98C186.01 19.31 184.25 19.31 182.69 19.98L163.14 28.39C161.86 28.94 161.86 30.76 163.14 31.31L182.68 39.71C184.24 40.38 186.02 40.38 187.58 39.71L207.12 31.31C208.4 30.76 208.4 28.94 207.12 28.39H207.11Z"
        fill="#87DDDA"
      />
      <path
        d="M185.12 41.56V51.49"
        stroke="#D2F1FF"
        strokeWidth="0.44"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M207.71 28.65L186.56 19.55C185.64 19.16 184.61 19.16 183.69 19.55L162.54 28.65C162.01 28.88 161.75 29.36 161.75 29.85V41.79H161.76C161.79 42.25 162.04 42.69 162.54 42.91L183.69 52.01C184.6 52.4 185.64 52.4 186.55 52.01L207.7 42.91C208.2 42.7 208.45 42.25 208.48 41.79H208.49V29.85C208.49 29.36 208.23 28.88 207.7 28.65H207.71Z"
        stroke="black"
        strokeWidth="0.51"
        strokeMiterlimit="10"
      />
      <path
        d="M305.19 29.85C305.19 29.33 304.91 28.81 304.35 28.57L284.07 19.85C282.71 19.26 281.17 19.26 279.81 19.85L259.53 28.57C258.97 28.81 258.69 29.33 258.69 29.85H258.56V41.79H258.57C258.6 42.25 258.85 42.69 259.35 42.91L280.5 52.01C281.41 52.4 282.45 52.4 283.36 52.01L304.51 42.91C305.01 42.7 305.26 42.25 305.29 41.79H305.3V29.85H305.17H305.19Z"
        fill="#D6B074"
      />
      <path
        d="M303.93 28.39L284.38 19.98C282.83 19.31 281.07 19.31 279.51 19.98L259.96 28.39C258.68 28.94 258.68 30.76 259.96 31.31L279.5 39.71C281.06 40.38 282.84 40.38 284.4 39.71L303.94 31.31C305.22 30.76 305.22 28.94 303.94 28.39H303.93Z"
        fill="#EDD988"
      />
      <path
        d="M281.94 41.56V51.49"
        stroke="#AF8B56"
        strokeWidth="0.44"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M286.53 27.49C287.06 27.13 287.57 26.67 287.73 26.04C287.86 25.54 287.74 25 287.89 24.5C288.14 23.68 289.03 23.25 289.61 22.61C290.7 21.41 290.63 19.6 290.52 17.99C290.49 17.51 290.46 17.02 290.59 16.56C290.69 16.21 290.88 15.89 291.03 15.55L290.97 15.48L278.27 29.49H284.16C284.41 29.17 284.65 28.83 284.94 28.55C285.4 28.11 285.99 27.82 286.52 27.47L286.53 27.49Z"
        fill="#EDD988"
      />
      <path
        d="M291.03 15.56C290.88 15.9 290.69 16.22 290.59 16.57C290.46 17.03 290.49 17.52 290.52 18C290.63 19.61 290.7 21.42 289.61 22.62C289.03 23.26 288.14 23.69 287.89 24.51C287.74 25 287.85 25.55 287.73 26.05C287.57 26.67 287.06 27.14 286.53 27.5C286 27.86 285.41 28.14 284.95 28.58C284.66 28.86 284.42 29.19 284.17 29.52H303.68L291.04 15.57L291.03 15.56Z"
        fill="#D6B074"
      />
      <path
        d="M268.61 20.47C268.11 20.47 267.71 20.87 267.71 21.37V23.48H266.51V18.66C266.51 17.66 265.7 16.85 264.7 16.85C263.7 16.85 262.89 17.66 262.89 18.66V21.07H261.69V18.96C261.69 18.46 261.29 18.06 260.79 18.06C260.29 18.06 259.89 18.46 259.89 18.96V21.97C259.89 22.47 260.29 22.87 260.79 22.87H262.9V29.49H266.51V25.28H268.62C269.12 25.28 269.52 24.88 269.52 24.38V21.37C269.52 20.87 269.12 20.47 268.62 20.47H268.61Z"
        fill="#367C25"
      />
      <path
        d="M304.52 28.65L301.85 27.5L291.03 15.56L290.97 15.49L286.19 20.76L283.37 19.55C282.45 19.16 281.42 19.16 280.5 19.55L269.51 24.28V21.38C269.51 20.88 269.11 20.48 268.61 20.48C268.11 20.48 267.71 20.88 267.71 21.38V23.49H266.51V18.67C266.51 17.67 265.7 16.86 264.7 16.86C263.7 16.86 262.89 17.67 262.89 18.67V21.08H261.69V18.97C261.69 18.47 261.29 18.07 260.79 18.07C260.29 18.07 259.89 18.47 259.89 18.97V21.98C259.89 22.48 260.29 22.88 260.79 22.88H262.9V27.12L259.36 28.64C258.83 28.87 258.57 29.35 258.57 29.84V41.78H258.58C258.61 42.24 258.86 42.68 259.36 42.9L280.51 52C281.42 52.39 282.46 52.39 283.37 52L304.52 42.9C305.02 42.69 305.27 42.24 305.3 41.78H305.31V29.84C305.31 29.35 305.05 28.87 304.52 28.64V28.65ZM266.5 25.29H267.16L266.5 25.57V25.29Z"
        stroke="black"
        strokeWidth="0.51"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.2"
        d="M65.28 62.55C65.28 62.06 65.02 61.58 64.49 61.35L43.34 52.25C42.42 51.86 41.39 51.86 40.47 52.25L19.32 61.35C18.79 61.58 18.53 62.06 18.53 62.55V74.49H18.54C18.56 74.83 18.71 75.17 18.99 75.41C19.08 75.49 19.19 75.56 19.32 75.61L40.47 84.71C40.93 84.91 41.41 85 41.9 85C42.14 85 42.39 84.98 42.63 84.93C42.87 84.88 43.11 84.81 43.33 84.71L64.48 75.61C64.6 75.56 64.71 75.49 64.81 75.41C65.09 75.17 65.24 74.84 65.26 74.49H65.27V62.55H65.28Z"
        fill="black"
      />
      <path
        opacity="0.2"
        d="M162.09 62.55C162.09 62.06 161.83 61.58 161.3 61.35L140.15 52.25C139.23 51.86 138.2 51.86 137.28 52.25L116.13 61.35C115.6 61.58 115.34 62.06 115.34 62.55V74.49H115.35C115.37 74.83 115.52 75.17 115.8 75.41C115.89 75.49 116 75.56 116.13 75.61L137.28 84.71C137.74 84.91 138.22 85 138.71 85C138.95 85 139.2 84.98 139.44 84.93C139.68 84.88 139.92 84.81 140.14 84.71L161.29 75.61C161.41 75.56 161.52 75.49 161.62 75.41C161.9 75.17 162.05 74.84 162.07 74.49H162.08V62.55H162.09Z"
        fill="black"
      />
      <path
        opacity="0.2"
        d="M258.91 62.55C258.91 62.06 258.65 61.58 258.12 61.35L236.97 52.25C236.05 51.86 235.02 51.86 234.1 52.25L212.95 61.35C212.42 61.58 212.16 62.06 212.16 62.55V74.49H212.17C212.19 74.83 212.34 75.17 212.62 75.41C212.71 75.49 212.82 75.56 212.95 75.61L234.1 84.71C234.56 84.91 235.04 85 235.53 85C235.77 85 236.02 84.98 236.26 84.93C236.5 84.88 236.74 84.81 236.96 84.71L258.11 75.61C258.23 75.56 258.34 75.49 258.44 75.41C258.72 75.17 258.87 74.84 258.89 74.49H258.9V62.55H258.91Z"
        fill="black"
      />
      <path
        d="M63.18 58.55C63.18 58.03 62.9 57.51 62.34 57.27L42.06 48.55C40.7 47.96 39.16 47.96 37.8 48.55L17.52 57.27C16.96 57.51 16.68 58.03 16.68 58.55H16.55V70.49H16.56C16.59 70.95 16.84 71.39 17.34 71.61L38.49 80.71C39.4 81.1 40.44 81.1 41.35 80.71L62.5 71.61C63 71.4 63.25 70.95 63.28 70.49H63.29V58.55H63.16H63.18Z"
        fill="#878787"
      />
      <path
        d="M61.92 57.09L42.37 48.68C40.82 48.01 39.06 48.01 37.5 48.68L17.95 57.09C16.67 57.64 16.67 59.46 17.95 60.01L37.49 68.41C39.05 69.08 40.83 69.08 42.39 68.41L61.93 60.01C63.21 59.46 63.21 57.64 61.93 57.09H61.92Z"
        fill="#EAEAEA"
      />
      <path
        d="M39.93 70.25V80.18"
        stroke="#EAEAEA"
        strokeWidth="0.44"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M62.52 57.34L41.37 48.24C40.45 47.85 39.42 47.85 38.5 48.24L17.35 57.34C16.82 57.57 16.56 58.05 16.56 58.54V70.48H16.57C16.6 70.94 16.85 71.38 17.35 71.6L38.5 80.7C39.41 81.09 40.45 81.09 41.36 80.7L62.51 71.6C63.01 71.39 63.26 70.94 63.29 70.48H63.3V58.54C63.3 58.05 63.04 57.57 62.51 57.34H62.52Z"
        stroke="black"
        strokeWidth="0.51"
        strokeMiterlimit="10"
      />
      <path
        d="M210.16 58.55V70.49H210.17C210.2 70.95 210.45 71.39 210.95 71.61L232.1 80.71C233.01 81.1 234.05 81.1 234.96 80.71L256.11 71.61C256.61 71.4 256.86 70.95 256.89 70.49H256.9V58.55H210.15H210.16Z"
        fill="#AD7B32"
      />
      <path
        d="M255.52 57.09L235.97 48.68C234.42 48.01 232.66 48.01 231.1 48.68L211.55 57.09C210.27 57.64 210.27 59.46 211.55 60.01L231.09 68.41C232.65 69.08 234.43 69.08 235.99 68.41L255.53 60.01C256.81 59.46 256.81 57.64 255.53 57.09H255.52Z"
        fill="#66B755"
      />
      <path
        d="M233.53 70.25V80.18"
        stroke="#7C541E"
        strokeWidth="0.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M219.6 51.46H216.1V59.34H219.6V51.46Z" fill="#7C541E" />
      <path
        d="M220.93 47.08H224.1L217.78 39.2L211.46 47.08H214.61L211.45 51.02H214.61L211.45 54.96H224.09L220.93 51.02H224.09L220.93 47.08Z"
        fill="#367C25"
      />
      <path
        d="M256.12 57.34L234.97 48.24C234.05 47.85 233.02 47.85 232.1 48.24L222.14 52.52L220.93 51.01H224.09L220.93 47.07H224.1L217.78 39.19L211.46 47.07H214.61L211.45 51.01H214.61L211.45 54.95H216.49L210.95 57.33C210.42 57.56 210.16 58.04 210.16 58.53V70.47H210.17C210.2 70.93 210.45 71.37 210.95 71.59L232.1 80.69C233.01 81.08 234.05 81.08 234.96 80.69L256.11 71.59C256.61 71.38 256.86 70.93 256.89 70.47H256.9V58.53C256.9 58.04 256.64 57.56 256.11 57.33L256.12 57.34Z"
        stroke="black"
        strokeWidth="0.51"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M226.42 60.21L225.37 62.03L224.33 60.21L223.28 62.03L222.23 60.21L220.72 62.84H222.81H223.75H224.9H225.84H227.94L226.42 60.21Z"
        fill="#367C25"
      />
      <path
        d="M249.87 57.59L248.82 59.4L247.77 57.59L246.73 59.4L245.68 57.59L244.16 60.21H246.26H247.2H248.35H249.29H251.38L249.87 57.59Z"
        fill="#367C25"
      />
      <path
        d="M159.96 58.55C159.96 58.03 159.68 57.51 159.12 57.27L138.84 48.55C137.48 47.96 135.94 47.96 134.58 48.55L114.3 57.27C113.74 57.51 113.46 58.03 113.46 58.55H113.33V70.49H113.34C113.37 70.95 113.62 71.39 114.12 71.61L135.27 80.71C136.18 81.1 137.22 81.1 138.13 80.71L159.28 71.61C159.78 71.4 160.03 70.95 160.06 70.49H160.07V58.55H159.94H159.96Z"
        fill="#50A8D8"
      />
      <path
        d="M158.7 68.84L139.15 60.43C137.6 59.76 135.84 59.76 134.28 60.43L114.73 68.84C113.45 69.39 113.45 71.21 114.73 71.76L134.27 80.16C135.83 80.83 137.61 80.83 139.17 80.16L158.71 71.76C159.99 71.21 159.99 69.39 158.71 68.84H158.7Z"
        fill="#558EB5"
      />
      <path
        opacity="0.7"
        d="M158.7 57.09L139.15 48.68C137.6 48.01 135.84 48.01 134.28 48.68L114.73 57.09C113.45 57.64 113.45 59.46 114.73 60.01L134.27 68.41C135.83 69.08 137.61 69.08 139.17 68.41L158.71 60.01C159.99 59.46 159.99 57.64 158.71 57.09H158.7Z"
        fill="#87DDDA"
      />
      <path
        d="M136.72 70.25V80.18"
        stroke="#D2F1FF"
        strokeWidth="0.44"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M159.3 57.34L138.15 48.24C137.23 47.85 136.2 47.85 135.28 48.24L114.13 57.34C113.6 57.57 113.34 58.05 113.34 58.54V70.48H113.35C113.38 70.94 113.63 71.38 114.13 71.6L135.28 80.7C136.19 81.09 137.23 81.09 138.14 80.7L159.29 71.6C159.79 71.39 160.04 70.94 160.07 70.48H160.08V58.54C160.08 58.05 159.82 57.57 159.29 57.34H159.3Z"
        stroke="black"
        strokeWidth="0.51"
        strokeMiterlimit="10"
      />
      <g id="flag-1" visibility={round >= 1 ? 'visible' : 'hidden'}>
        <path
          d="M84.03 2C77.94 2 73 6.94 73 13.03C73 21.31 84.03 33.52 84.03 33.52C84.03 33.52 95.06 21.3 95.06 13.03C95.06 6.94 90.12 2 84.03 2ZM84.03 16.98C81.85 16.98 80.09 15.22 80.09 13.04C80.09 10.86 81.85 9.1 84.03 9.1C86.21 9.1 87.97 10.86 87.97 13.04C87.97 15.22 86.21 16.98 84.03 16.98Z"
          fill={roundLog?.[0]?.profit < 0 ? '#5A75E5' : '#EF3C3C'}
          stroke="black"
          strokeWidth="0.51"
          strokeMiterlimit="10"
        />
        <path
          d="M105.88 35.3C105.47 34.03 104 29.76 103.39 27.99C102.09 28.81 100.72 29.5 99.29 30.06C98.82 31.51 97.89 34.27 97.48 34.63C96.77 35.24 96.51 35.15 96.43 34.27C96.35 33.39 96 30.54 96 30.54C96 30.54 93.57 29.06 92.81 28.63C92.05 28.2 92.07 27.93 92.91 27.52C93.4 27.28 96.27 27.54 97.77 27.69C98.85 26.6 100.04 25.61 101.3 24.74C99.95 23.46 96.69 20.37 95.7 19.47C94.84 18.69 95.82 18.56 95.82 18.56C96.44 18.47 97.07 18.48 97.69 18.61C100.55 19.58 104.99 21.23 106.04 21.62C106.45 21.35 106.9 21.05 107.4 20.72C112.92 17.09 114.25 17.98 114.49 18.36C114.73 18.74 115 20.33 109.48 23.97L108.12 24.87C108.05 25.99 107.74 30.77 107.46 33.81C107.33 34.43 107.09 35.02 106.76 35.56C106.76 35.56 106.25 36.42 105.89 35.3H105.88Z"
          fill="#63C9EF"
          stroke="black"
          strokeWidth="0.58"
          strokeMiterlimit="10"
        />
      </g>
      <g id="flag-2" visibility={round >= 2 ? 'visible' : 'hidden'}>
        <path
          d="M132.03 30C125.94 30 121 34.94 121 41.03C121 49.31 132.03 61.52 132.03 61.52C132.03 61.52 143.06 49.3 143.06 41.03C143.06 34.94 138.12 30 132.03 30V30ZM132.03 44.98C129.85 44.98 128.09 43.22 128.09 41.04C128.09 38.86 129.85 37.1 132.03 37.1C134.21 37.1 135.97 38.86 135.97 41.04C135.97 43.22 134.21 44.98 132.03 44.98Z"
          fill={roundLog?.[1]?.profit < 0 ? '#5A75E5' : '#EF3C3C'}
          stroke="black"
          strokeWidth="0.51"
          strokeMiterlimit="10"
        />
        <path
          d="M153.88 63.3C153.47 62.03 152 57.76 151.39 55.99C150.09 56.81 148.72 57.5 147.29 58.06C146.82 59.51 145.89 62.27 145.48 62.63C144.77 63.24 144.51 63.15 144.43 62.27C144.35 61.39 144 58.54 144 58.54C144 58.54 141.57 57.06 140.81 56.63C140.05 56.2 140.07 55.93 140.91 55.52C141.4 55.28 144.27 55.54 145.77 55.69C146.85 54.6 148.04 53.61 149.3 52.74C147.95 51.46 144.69 48.37 143.7 47.47C142.84 46.69 143.82 46.56 143.82 46.56C144.44 46.47 145.07 46.48 145.69 46.61C148.55 47.58 152.99 49.23 154.04 49.62C154.45 49.35 154.9 49.05 155.4 48.72C160.92 45.09 162.25 45.98 162.49 46.36C162.73 46.74 163 48.33 157.48 51.97L156.12 52.87C156.05 53.99 155.74 58.77 155.46 61.81C155.33 62.43 155.09 63.02 154.76 63.56C154.76 63.56 154.25 64.42 153.89 63.3H153.88Z"
          fill="#63C9EF"
          stroke="black"
          strokeWidth="0.58"
          strokeMiterlimit="10"
        />
      </g>
      <g id="flag-3" visibility={round >= 3 ? 'visible' : 'hidden'}>
        <path
          d="M180.03 2C173.94 2 169 6.94 169 13.03C169 21.31 180.03 33.52 180.03 33.52C180.03 33.52 191.06 21.3 191.06 13.03C191.06 6.94 186.12 2 180.03 2V2ZM180.03 16.98C177.85 16.98 176.09 15.22 176.09 13.04C176.09 10.86 177.85 9.1 180.03 9.1C182.21 9.1 183.97 10.86 183.97 13.04C183.97 15.22 182.21 16.98 180.03 16.98Z"
          fill={roundLog?.[2]?.profit < 0 ? '#5A75E5' : '#EF3C3C'}
          stroke="black"
          strokeWidth="0.51"
          strokeMiterlimit="10"
        />
        <path
          d="M201.88 35.3C201.47 34.03 200 29.76 199.39 27.99C198.09 28.81 196.72 29.5 195.29 30.06C194.82 31.51 193.89 34.27 193.48 34.63C192.77 35.24 192.51 35.15 192.43 34.27C192.35 33.39 192 30.54 192 30.54C192 30.54 189.57 29.06 188.81 28.63C188.05 28.2 188.07 27.93 188.91 27.52C189.4 27.28 192.27 27.54 193.77 27.69C194.85 26.6 196.04 25.61 197.3 24.74C195.95 23.46 192.69 20.37 191.7 19.47C190.84 18.69 191.82 18.56 191.82 18.56C192.44 18.47 193.07 18.48 193.69 18.61C196.55 19.58 200.99 21.23 202.04 21.62C202.45 21.35 202.9 21.05 203.4 20.72C208.92 17.09 210.25 17.98 210.49 18.36C210.73 18.74 211 20.33 205.48 23.97L204.12 24.87C204.05 25.99 203.74 30.77 203.46 33.81C203.33 34.43 203.09 35.02 202.76 35.56C202.76 35.56 202.25 36.42 201.89 35.3H201.88Z"
          fill="#63C9EF"
          stroke="black"
          strokeWidth="0.58"
          strokeMiterlimit="10"
        />
      </g>
      <g id="flag-4" visibility={round >= 4 ? 'visible' : 'hidden'}>
        <path
          d="M228.03 30C221.94 30 217 34.94 217 41.03C217 49.31 228.03 61.52 228.03 61.52C228.03 61.52 239.06 49.3 239.06 41.03C239.06 34.94 234.12 30 228.03 30V30ZM228.03 44.98C225.85 44.98 224.09 43.22 224.09 41.04C224.09 38.86 225.85 37.1 228.03 37.1C230.21 37.1 231.97 38.86 231.97 41.04C231.97 43.22 230.21 44.98 228.03 44.98Z"
          fill={roundLog?.[3]?.profit < 0 ? '#5A75E5' : '#EF3C3C'}
          stroke="black"
          strokeWidth="0.51"
          strokeMiterlimit="10"
        />
        <path
          d="M249.88 63.3C249.47 62.03 248 57.76 247.39 55.99C246.09 56.81 244.72 57.5 243.29 58.06C242.82 59.51 241.89 62.27 241.48 62.63C240.77 63.24 240.51 63.15 240.43 62.27C240.35 61.39 240 58.54 240 58.54C240 58.54 237.57 57.06 236.81 56.63C236.05 56.2 236.07 55.93 236.91 55.52C237.4 55.28 240.27 55.54 241.77 55.69C242.85 54.6 244.04 53.61 245.3 52.74C243.95 51.46 240.69 48.37 239.7 47.47C238.84 46.69 239.82 46.56 239.82 46.56C240.44 46.47 241.07 46.48 241.69 46.61C244.55 47.58 248.99 49.23 250.04 49.62C250.45 49.35 250.9 49.05 251.4 48.72C256.92 45.09 258.25 45.98 258.49 46.36C258.73 46.74 259 48.33 253.48 51.97L252.12 52.87C252.05 53.99 251.74 58.77 251.46 61.81C251.33 62.43 251.09 63.02 250.76 63.56C250.76 63.56 250.25 64.42 249.89 63.3H249.88Z"
          fill="#63C9EF"
          stroke="black"
          strokeWidth="0.58"
          strokeMiterlimit="10"
        />
      </g>
      <g id="flag-5" visibility={round >= 5 ? 'visible' : 'hidden'}>
        <path
          d="M276.03 2C269.94 2 265 6.94 265 13.03C265 21.31 276.03 33.52 276.03 33.52C276.03 33.52 287.06 21.3 287.06 13.03C287.06 6.94 282.12 2 276.03 2V2ZM276.03 16.98C273.85 16.98 272.09 15.22 272.09 13.04C272.09 10.86 273.85 9.1 276.03 9.1C278.21 9.1 279.97 10.86 279.97 13.04C279.97 15.22 278.21 16.98 276.03 16.98Z"
          fill={roundLog?.[4]?.profit < 0 ? '#5A75E5' : '#EF3C3C'}
          stroke="black"
          strokeWidth="0.51"
          strokeMiterlimit="10"
        />
        <path
          d="M297.88 35.3C297.47 34.03 296 29.76 295.39 27.99C294.09 28.81 292.72 29.5 291.29 30.06C290.82 31.51 289.89 34.27 289.48 34.63C288.77 35.24 288.51 35.15 288.43 34.27C288.35 33.39 288 30.54 288 30.54C288 30.54 285.57 29.06 284.81 28.63C284.05 28.2 284.07 27.93 284.91 27.52C285.4 27.28 288.27 27.54 289.77 27.69C290.85 26.6 292.04 25.61 293.3 24.74C291.95 23.46 288.69 20.37 287.7 19.47C286.84 18.69 287.82 18.56 287.82 18.56C288.44 18.47 289.07 18.48 289.69 18.61C292.55 19.58 296.99 21.23 298.04 21.62C298.45 21.35 298.9 21.05 299.4 20.72C304.92 17.09 306.25 17.98 306.49 18.36C306.73 18.74 307 20.33 301.48 23.97L300.12 24.87C300.05 25.99 299.74 30.77 299.46 33.81C299.33 34.43 299.09 35.02 298.76 35.56C298.76 35.56 298.25 36.42 297.89 35.3H297.88Z"
          fill="#63C9EF"
          stroke="black"
          strokeWidth="0.58"
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  );
};

const TradingBtn = ({ mode }) => {
  const color = mode === 'sell' ? '#5A75E5' : '#EA4B4B';

  return (
    <svg
      width="297"
      height="83"
      viewBox="0 0 297 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M297 73.23V5H239.77L239.79 5.03L229.9 14.92L220 5.03L220.02 5H5V83H220.02L229.9 73.13L239.77 83H287.02L296.9 73.13L297 73.23Z"
        fill="black"
      />
      <path
        d="M293 69.23V1H235.77L235.79 1.03L225.9 10.92L216 1.03L216.02 1H1V79H216.02L225.9 69.13L235.77 79H283.02L292.9 69.13L293 69.23Z"
        fill="white"
      />
      <path d="M226 12V67.28" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M237.52 40.45L205.99 71.99H1"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path d="M235.77 1L235.79 1.03L228.24 8.57999H293V1H235.77Z" fill={color} />
      <path d="M216 1.03L216.02 1H1V8.57999H223.55L216 1.03Z" fill={color} />
      <path
        d="M293 69.23V1H235.77L235.79 1.03L225.9 10.92L216 1.03L216.02 1H1V79H216.02L225.9 69.13L235.77 79H283.02L292.9 69.13L293 69.23Z"
        stroke="black"
        strokeLinejoin="round"
      />
      {mode === 'sell' ? (
        <path
          d="M254.291 48.5635C254.861 46.6235 256.641 40.0435 257.371 37.3135C255.051 37.2335 252.751 36.9334 250.491 36.4234C248.671 37.8434 245.181 40.4934 244.351 40.5934C242.941 40.7534 242.691 40.4234 243.341 39.2634C243.991 38.1034 245.961 34.2434 245.961 34.2434C245.961 34.2434 244.181 30.3334 243.591 29.1534C243.001 27.9734 243.261 27.6434 244.661 27.8534C245.481 27.9734 248.841 30.7234 250.591 32.1834C252.871 31.7334 255.181 31.5034 257.511 31.4834C256.911 28.7434 255.451 22.1134 254.981 20.1634C254.571 18.4534 255.911 19.1335 255.911 19.1335C256.761 19.5435 257.541 20.1034 258.201 20.7834C260.951 24.4234 265.101 30.2535 266.071 31.6235C266.821 31.6335 267.631 31.6434 268.531 31.6634C278.501 31.8034 279.411 34.0434 279.401 34.7234C279.391 35.4034 278.361 37.6134 268.391 37.4834L265.931 37.4534C264.891 38.7934 260.461 44.5035 257.521 48.0635C256.831 48.7235 256.031 49.2634 255.161 49.6534C255.161 49.6534 253.791 50.2934 254.291 48.5934V48.5635Z"
          fill={color}
        />
      ) : (
        <path
          d="M268.11 20.208C267.54 22.148 265.76 28.728 265.03 31.458C267.35 31.538 269.65 31.838 271.91 32.348C273.73 30.928 277.22 28.2781 278.05 28.1781C279.46 28.0181 279.71 28.3481 279.06 29.5081C278.41 30.6681 276.44 34.528 276.44 34.528C276.44 34.528 278.22 38.4381 278.81 39.6181C279.4 40.7981 279.14 41.1281 277.74 40.9181C276.92 40.7981 273.56 38.048 271.81 36.588C269.53 37.038 267.22 37.268 264.89 37.288C265.49 40.028 266.95 46.6581 267.42 48.6081C267.83 50.3181 266.49 49.638 266.49 49.638C265.64 49.228 264.86 48.6681 264.2 47.9881C261.45 44.3481 257.3 38.518 256.33 37.148C255.58 37.138 254.77 37.1281 253.87 37.1081C243.9 36.9681 242.99 34.7281 243 34.0481C243.01 33.3681 244.04 31.158 254.01 31.288L256.47 31.3181C257.51 29.9781 261.94 24.268 264.88 20.708C265.57 20.048 266.37 19.5081 267.24 19.1181C267.24 19.1181 268.61 18.4781 268.11 20.1781V20.208Z"
          fill={color}
        />
      )}
    </svg>
  );
};

export default function Game({ maxSec, maxPhase }) {
  // game info
  const round = useRecoilValue(gameRoundState);
  const timer = useTimer(maxSec, 1000);
  const currStock = useRecoilValue(stockState)[round];
  const tick = useTimer(currStock.datas.length - 1, (maxSec * 1000) / currStock.datas.length);
  const currData = currStock.datas[currStock.datas.length - 1 - tick.time];
  const roundLog = useRecoilValue(roundLogState);
  const [tradeLog, setTradeLog] = useState({ sell: [], buy: [] });

  // user info
  const [balance, setBalance] = useRecoilState(userBalanceState); // 현금
  const roundStartBalance = useRef(balance);
  const [avgPrice, setAvgPrice] = useState(0); // 매수가
  const [holdings, setHoldings] = useState(0); // 보유수량

  useEffect(() => {
    if (timer.time === 0 && holdings !== 0) {
      setAvgPrice(0);
      setBalance((prevBalance) => prevBalance + currData.price * holdings);
      setHoldings(0);
      setTradeLog(({ sell, buy }) => ({ sell: [...sell, currData.date.substring(2)], buy }));
    }
  }, [
    timer.time,
    holdings,
    currData.price,
    currData.date,
    setAvgPrice,
    setBalance,
    setHoldings,
    setTradeLog,
  ]);

  return timer.time !== 0 ? (
    <div className={background[round]}>
      <header className="relative">
        <p className="absolute z-20 top-10 left-6 text-lg">
          {round + 1}/{maxPhase}
        </p>
        {round <= 0 && <p className="absolute z-20 top-3 left-[5.2rem] text-lg">?</p>}
        {round <= 1 && <p className="absolute z-20 top-10 left-[8.2rem] text-lg">?</p>}
        {round <= 2 && <p className="absolute z-20 top-3 left-[11.2rem] text-lg">?</p>}
        {round <= 3 && <p className="absolute z-20 top-10 left-[14.2rem] text-lg">?</p>}
        {round <= 4 && <p className="absolute z-20 top-3 left-[17.2rem] text-lg">?</p>}
        <GameRoundBar className="relative z-10" round={round} roundLog={roundLog} />
        <div className="bg-[url('../src/assets/timerCurtain.svg')] h-[60px] w-[43px] absolute top-[94px] text-center">
          <p className="mt-3 text-lg text-white">{timer.time}</p>
        </div>
      </header>
      <div className="text-center h-80 mt-4">
        <div className="my-6  text-white">
          <span className="text-base">주가</span>
          <p className="text-3xl">{prettyKorNum(currData.price)}원</p>
        </div>
        <div className="my-6">
          <span className="text-base">매입단가</span>
          <p className="text-3xl">{prettyKorNum(avgPrice) || '0'}원</p>
        </div>
        <div className="my-6">
          <span className="text-base">평가손익</span>
          <p
            className={
              (currData.price - avgPrice) * holdings == 0
                ? 'text-3xl'
                : (currData.price - avgPrice) * holdings < 0
                ? 'text-3xl text-[#5A75E5]'
                : 'text-3xl text-[#EA4B4B]'
            }
          >
            {prettyKorNum((currData.price - avgPrice) * holdings) || '0'}원
          </p>
        </div>
        <div className="my-6">
          <span className="text-base">총자산</span>
          <p
            className={
              (currData.price - avgPrice) * holdings == 0
                ? 'text-3xl'
                : (currData.price - avgPrice) * holdings < 0
                ? 'text-3xl text-[#5A75E5]'
                : 'text-3xl text-[#EA4B4B]'
            }
          >
            {prettyKorNum(balance + currData.price * holdings)}원
          </p>
        </div>
      </div>
      {holdings === 0 ? (
        <button
          className="relative text-[#EA4B4B] h-[82px] w-[296px] mt-16"
          onClick={() => {
            const newHoldings = Math.floor(balance / currData.price);
            setAvgPrice(currData.price);
            setBalance((prevBalance) => prevBalance - currData.price * newHoldings);
            setHoldings(newHoldings);
            setTradeLog(({ sell, buy }) => ({ sell, buy: [...buy, currData.date.substring(2)] }));
          }}
        >
          <p className="absolute text-2xl top-[1.8rem] left-[4rem]">주식 매수</p>
          <p className="absolute top-[3.2rem] left-[15.3rem]">BUY</p>
          <TradingBtn mode="buy" />
        </button>
      ) : (
        <button
          className="relative text-[#5A75E5] h-[82px] w-[296px] mt-16"
          onClick={() => {
            setAvgPrice(0);
            setBalance((prevBalance) => prevBalance + currData.price * holdings);
            setHoldings(0);
            setTradeLog(({ sell, buy }) => ({ sell: [...sell, currData.date.substring(2)], buy }));
          }}
        >
          <p className="absolute text-2xl top-[1.8rem] left-[4rem]">주식 매도</p>
          <p className="absolute top-[3.2rem] left-[15.2rem]">SELL</p>
          <TradingBtn mode="sell" />
        </button>
      )}
    </div>
  ) : (
    <Navigate
      to="/game/result"
      state={{
        stockName: currStock.stockName,
        avgProfit: currStock.avgProfit,
        profit: balance / roundStartBalance.current - 1,
        yield: balance - roundStartBalance.current,
        tradeLog,
      }}
    />
  );
}

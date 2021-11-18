import { foxGameData, foxGameDataNearWin } from './foxData';

export const getGameData = (level) => {
  switch (level) {
    case 1:
      return foxGameData;
    case 11:
      return foxGameDataNearWin;
  }
};

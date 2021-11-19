import { foxGameData, foxGameDataNearWin } from './foxData';
import { dearGameData } from './dearData';
import { elephantGameData } from './elephantData';

export const getGameData = (level) => {
  switch (level) {
    case 1:
      return foxGameData;
    case 11:
      return foxGameDataNearWin;

    case 2:
      return elephantGameData;
    case 3:
      return dearGameData;
  }
};

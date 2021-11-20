import { foxGameData } from './foxData';
import { dearGameData } from './dearData';
import { elephantGameData, elephantGameDataNearWin } from './elephantData';

export const getGameData = (level) => {
  switch (level) {
    case 1:
      return foxGameData;
    case 222:
      return elephantGameDataNearWin;

    case 2:
      return elephantGameData;
    case 3:
      return dearGameData;
  }
};

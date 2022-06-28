import 'styled-components';

import { ColorsType, FontSizesType, FontWeightsType } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsType;
    fontSizes: FontSizesType;
    fontWeights: FontWeightsType;
  }
}

import { CoinFlipCommand } from './coin-flip.command';
import { BivotFeature } from '../../shared/feature';

export * from './coin-flip.command';

export class CoinFlipFeature extends BivotFeature {
  constructor() {
    super([new CoinFlipCommand()]);
  }
}

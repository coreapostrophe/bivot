import { BivotCommand } from './command';

export abstract class BivotFeature {
  constructor(protected commands: BivotCommand[]) {}

  getCommands(): BivotCommand[] {
    return this.commands;
  }
}

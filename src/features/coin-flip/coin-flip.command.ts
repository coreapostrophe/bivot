import { SlashCommandBuilder } from '@discordjs/builders';
import {
  BivotCommand,
  BivotCommandInteraction,
  BivotCommandResponse,
} from '../../shared/command';

export class CoinFlipCommand extends BivotCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin!'),
    );
  }

  async respond(
    interaction: BivotCommandInteraction,
  ): Promise<BivotCommandResponse> {
    const result = Math.round(Math.random()) ? 'heads' : 'tails';

    return interaction.respondMessage(`You flipped ${result}! <:deal:1265805883426734192>`);
  }
}

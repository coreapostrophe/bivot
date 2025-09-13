import { SlashCommandBuilder } from '@discordjs/builders';
import {
  BivotCommand,
  BivotCommandInteraction,
  BivotCommandResponse,
} from './command';

/**
 * Dummy command for now to demonstrate how we can create commands...!
 */
export class ThinkCommand extends BivotCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName('think')
        .setDescription('Tell what Bivot thinks about a user.')
        .addUserOption((option) =>
          option.setRequired(true).setName('user').setDescription('The user'),
        ),
    );
  }

  async respond(
    interaction: BivotCommandInteraction,
  ): Promise<BivotCommandResponse> {
    const user = await interaction.getUserOption('user');

    if (user && user.username.includes('j')) {
      return interaction.respondMessage(`${user.username} is pretty cool ngl`);
    } else {
      return interaction.respondMessage(`${user?.username} is meh`);
    }
  }
}

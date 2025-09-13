import {
  APIChatInputApplicationCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { ThinkCommand } from './think-command';
import {
  BivotCommand,
  BivotCommandInteraction,
  BivotCommandResponse,
} from './command';
import { REST } from '@discordjs/rest';

export class CommandRegistry {
  private commands: Map<string, BivotCommand>;

  constructor() {
    this.commands = new Map();

    this.register(new ThinkCommand());
  }

  register(command: BivotCommand): void {
    this.commands.set(command.getName(), command);
  }

  toJSONString(): string {
    const jsonBodies: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
      Array.from(this.commands.entries()).map(([, command]) =>
        command.toJSONBody(),
      );

    return JSON.stringify(jsonBodies);
  }

  async handle(
    name: string,
    interaction: APIChatInputApplicationCommandInteraction,
    discordRESTClient: REST,
  ): Promise<BivotCommandResponse | null> {
    const command = this.commands.get(name);

    if (!command) {
      return null;
    }

    return command.respond(
      new BivotCommandInteraction(discordRESTClient, interaction),
    );
  }
}

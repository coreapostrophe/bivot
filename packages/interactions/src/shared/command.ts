import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import {
  APIApplicationCommandInteractionDataOption,
  APIApplicationCommandInteractionDataUserOption,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponseChannelMessageWithSource,
  APIUser,
  InteractionResponseType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord-api-types/v10';

export type BivotCommandBuilder =
  | SlashCommandBuilder
  | SlashCommandOptionsOnlyBuilder;
export type BivotCommandResponse =
  APIInteractionResponseChannelMessageWithSource;

export class BivotCommandInteraction {
  constructor(
    protected discordRESTClient: REST,
    protected body: APIChatInputApplicationCommandInteraction
  ) {}

  respondMessage(content: string): BivotCommandResponse {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content,
      },
    };
  }

  getBody(): APIChatInputApplicationCommandInteraction {
    return this.body;
  }

  getOption(
    name: string
  ): APIApplicationCommandInteractionDataOption | undefined {
    return this.body.data.options?.find(o => o.name === name);
  }

  async getUserOption(name: string): Promise<APIUser | undefined> {
    const userOption = this.getOption(
      name
    ) as APIApplicationCommandInteractionDataUserOption;

    const userId = userOption.value;

    return this.discordRESTClient.get(Routes.user(userId)) as Promise<APIUser>;
  }
}

export abstract class BivotCommand {
  constructor(protected builder: BivotCommandBuilder) {}

  getName(): string {
    return this.builder.name;
  }

  toJSONBody(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    return this.builder.toJSON();
  }

  abstract respond(
    interaction: BivotCommandInteraction
  ): Promise<BivotCommandResponse>;
}

export interface DiscordCommand {
  name: string;
  description: string;
}

export const AWW_COMMAND: DiscordCommand = {
  name: 'awwww',
  description: 'Drop some cuteness on this channel.',
};

export const INVITE_COMMAND: DiscordCommand = {
  name: 'invite',
  description: 'Get an invite link to add the bot to your server',
};

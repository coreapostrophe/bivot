import { AutoRouter, IRequest } from 'itty-router';
import { verifyKey } from 'discord-interactions';
import {
  APIChatInputApplicationCommandInteraction,
  APIInteraction,
  InteractionResponseType,
  InteractionType,
} from 'discord-api-types/v10';
import { CommandRegistry } from './shared/command-registry';
import { REST } from '@discordjs/rest';

class JsonResponse extends Response {
  constructor(body: unknown, init?: ResponseInit) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    super(jsonBody, init);
  }
}

const router = AutoRouter();

const commandRegistry = new CommandRegistry();

router.get('/', (request: IRequest, env: Env) => {
  return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

router.post('/', async (request: IRequest, env: Env) => {
  const { isValid, interaction } = await server.verifyDiscordRequest(
    request,
    env
  );
  if (!isValid || !interaction) {
    return new Response('Bad request signature.', { status: 401 });
  }

  if (interaction.type === InteractionType.Ping) {
    return new JsonResponse({
      type: InteractionResponseType.Pong,
    });
  }

  if (interaction.type !== InteractionType.ApplicationCommand) {
    return;
  }

  const name = interaction.data?.name.toLowerCase();

  if (!name) {
    return;
  }

  const discordRESTClient = new REST({ version: '10' }).setToken(
    env.DISCORD_TOKEN
  );

  const response = await commandRegistry.handle(
    name,
    interaction as APIChatInputApplicationCommandInteraction,
    discordRESTClient
  );

  if (!response) {
    return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
  }

  return new JsonResponse({
    type: response.type,
    data: response.data,
  });
});

router.all('*', () => new Response('Not Found.', { status: 404 }));

async function verifyDiscordRequest(
  request: IRequest,
  env: Env
): Promise<{ isValid: boolean; interaction?: APIInteraction }> {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  const body = await request.text();
  const isValidRequest =
    signature &&
    timestamp &&
    (await verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY));
  if (!isValidRequest) {
    return { isValid: false };
  }

  return { interaction: JSON.parse(body), isValid: true };
}

const server = {
  verifyDiscordRequest,
  fetch: router.fetch,
};

export default server;

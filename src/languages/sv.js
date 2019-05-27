const { Language, util } = require('klasa');
const moment = require('moment');

moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('ss', 0);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 31);
moment.relativeTimeThreshold('M', 12);

module.exports = class extends Language {

	constructor(...args) {
		super(...args);
		this.presenceTypes = {
			PLAYING: 'Spelar',
			LISTENING: 'Lyssnar på',
			WATCHING: 'Tittar på'
		};
		this.language = {

			// Default langs
			DEFAULT: (key) => `${key} har inte översatts för \`sv\` än.`,
			DEFAULT_LANGUAGE: 'Standardspråk',
			PREFIX_REMINDER: (prefix = `@${this.client.user.tag}`) => `Prefixe${Array.isArray(prefix) ?
				`n för denna guild är: ${prefix.map(pre => `\`${pre}\``).join(', ')}` :
				`t för denna guild är: \`${prefix}\``
			}`,


			// General langs
			DISPLAY_NAME: 'Visningsnamn',
			ID: 'ID',
			NAME: 'Namn',
			OWNER: 'Ägare',
			MEMBERS: 'Medlemmar',
			CHANNELS: 'Kanaler',
			EMOJIS: 'Emojis',
			ROLES: 'Roller',
			REGISTERED: 'Registrerades',
			JOINED: 'Gick med',
			REASON: 'Anledning',
			PREVNAME: 'Tidigare namn',
			NAME_CHANGED: 'Namn ändrat',
			WARNING_ISSUED: 'Varning utfärdad',
			CLICK_TO_VIEW: 'Klicka för att se',


			// Setting gateway langs
			SETTING_GATEWAY_EXPECTS_GUILD: 'Parametern <Guild> förväntar antingen en Guild eller ett Guildobjekt.',
			SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `Värdet ${data} för fältet ${key} finns inte.`,
			SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `Värdet ${data} för fältet ${key} finns redan.`,
			SETTING_GATEWAY_SPECIFY_VALUE: 'Du måste specifiera värdet att lägga till eller filtrera.',
			SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `Fältet ${key} är inte en array.`,
			SETTING_GATEWAY_KEY_NOEXT: (key) => `Fältet ${key} finns inte i denna datamall.`,
			SETTING_GATEWAY_INVALID_TYPE: 'Typen parameter måste antingen vara add eller remove.',
			SETTING_GATEWAY_INVALID_FILTERED_VALUE: (piece, value) => `${piece.key} tillåter inte värdet: ${value}`,


			// Resolver langs
			RESOLVER_MULTI_TOO_FEW: (name, min = 1) => `Försedde för få ${name}. Minst ${min} krävs.`,
			RESOLVER_INVALID_BOOL: (name) => `${name} måste vara sant eller falskt.`,
			RESOLVER_INVALID_CHANNEL: (name) => `${name} måste vara en kanaltagg eller ett giltigt kanal-ID.`,
			RESOLVER_INVALID_CUSTOM: (name, type) => `${name} måste vara en giltig ${type}.`,
			RESOLVER_INVALID_DATE: (name) => `${name} måste vara ett giltigt datum.`,
			RESOLVER_INVALID_DURATION: (name) => `${name} måste vara en giltig tidsmängd.`,
			RESOLVER_INVALID_EMOJI: (name) => `${name} måste vara en anpassad emoji-tagg eller ett giltigt emoji-ID.`,
			RESOLVER_INVALID_FLOAT: (name) => `${name} måste vara ett giltigt nummer.`,
			RESOLVER_INVALID_GUILD: (name) => `${name} måste vara ett giltigt guild-ID.`,
			RESOLVER_INVALID_INT: (name) => `${name} måste vara ett heltal.`,
			RESOLVER_INVALID_LITERAL: (name) => `Ditt val matchade inte den enda möjligheten: ${name}`,
			RESOLVER_INVALID_MEMBER: (name) => `${name} måste vara ett omnämnande eller giltigt användar-ID.`,
			RESOLVER_INVALID_MESSAGE: (name) => `${name} måste vara ett giltigt meddelande-ID.`,
			RESOLVER_INVALID_PIECE: (name, piece) => `${name} måste vara ett giltigt ${piece} namn.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} måste följa detta reguljära uttrycksmönster \`${pattern}\`.`,
			RESOLVER_INVALID_ROLE: (name) => `${name} måste vara ett rollomnämnande eller roll-ID.`,
			RESOLVER_INVALID_STRING: (name) => `${name} måste vara en giltig  string.`,
			RESOLVER_INVALID_TIME: (name) => `${name} måste vara en giltig tidsmängd eller ett giltigt datum.`,
			RESOLVER_INVALID_URL: (name) => `${name} måste vara en giltig URL.`,
			RESOLVER_INVALID_USER: (name) => `${name} måste vara ett omnämnande eller ett giltigt användar-ID.`,
			RESOLVER_STRING_SUFFIX: ' tecken',
			RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `${name} måste vara exakt ${min}${suffix}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `${name} måste vara mellan ${min} och ${max}${suffix}.`,
			RESOLVER_MINMAX_MIN: (name, min, suffix) => `${name} måste vara större än ${min}${suffix}.`,
			RESOLVER_MINMAX_MAX: (name, max, suffix) => `${name} måste vara mindre än ${max}${suffix}.`,


			// Reaction handler langs
			REACTIONHANDLER_PROMPT: 'Vilken sida vill du bläddra till?',


			// Command message langs
			COMMANDMESSAGE_MISSING: 'Saknar ett eller flera nödvändiga resonemang efter inmatningens slut.',
			COMMANDMESSAGE_MISSING_REQUIRED: (name) => `${name} är ett nödvändigt resonemang.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `Saknar ett nödvändigt val: (${possibles})`,
			COMMANDMESSAGE_NOMATCH: (possibles) => `Ditt val matchade ingen av möjligheterna: (${possibles}).`,


			// Monitor langs
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time, abortOptions) => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **${abortOptions.join('**, **')}** to abort this prompt.`,
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time, cancelOptions) => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **${cancelOptions.join('**, **')}** to cancel this prompt.`,
			MONITOR_COMMAND_HANDLER_ABORTED: 'Aborted',
			MONITOR_COMMAND_HANDLER_POSSIBILITIES: ['abort', 'stop'],
			MONITOR_COMMAND_HANDLER_REPEATING_POSSIBLITIES: ['cancel'],
			// eslint-disable-next-line max-len
			MONITOR_MENTIONSPAM_APOLOGY: (guild) => `Hi!\n\nSomeone just executed a mention spam selfbot command or manually mentioned too many people in this channel. The user has been banned. The ${guild} mod team apologizes for the inconvenience.`,


			// Inhibitor langs
			INHIBITOR_COOLDOWN: (remaining) => `You have just used this command. You can use this command again in ${remaining} second${remaining === 1 ? '' : 's'}.`,
			INHIBITOR_DISABLED_GUILD: 'This command has been disabled by an administrator in this guild.',
			INHIBITOR_DISABLED_GLOBAL: 'This command has been globally disabled by a bot owner.',
			INHIBITOR_MISSING_BOT_PERMS: (missing) => `Insufficient permissions, missing: **${missing}**`,
			INHIBITOR_NSFW: 'You can only use NSFW commands in NSFW channels.',
			INHIBITOR_PERMISSIONS: 'You do not have permission to use this command.',
			INHIBITOR_REQUIRED_SETTINGS: (settings) => `The guild is missing the **${settings.join(', ')}** guild setting${settings.length !== 1 ? 's' : ''} and thus the command cannot run.`,
			INHIBITOR_RUNIN: (types) => `This command is only available in ${types} channels.`,
			INHIBITOR_RUNIN_NONE: (name) => `The ${name} command is not configured to run in any channel.`,


			// Command langs
			COMMAND_REQUESTED_BY: (msg) => `Requested by ${msg.author.tag}`,
			COMMAND_BLACKLIST_DESCRIPTION: 'Blacklists or un-blacklists users and guilds from the bot.',
			COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
				usersAdded.length ? `**Users Added**\n${util.codeBlock('', usersAdded.join(', '))}` : '',
				usersRemoved.length ? `**Users Removed**\n${util.codeBlock('', usersRemoved.join(', '))}` : '',
				guildsAdded.length ? `**Guilds Added**\n${util.codeBlock('', guildsAdded.join(', '))}` : '',
				guildsRemoved.length ? `**Guilds Removed**\n${util.codeBlock('', guildsRemoved.join(', '))}` : ''
			].filter(val => val !== '').join('\n'),
			COMMAND_EVAL_DESCRIPTION: 'Evaluates arbitrary JS. Reserved for bot owners.',
			COMMAND_EVAL_EXTENDEDHELP: [
				'The eval command evaluates code as-in, any error thrown from it will be handled.',
				'It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.',
				'The --silent flag will make it output nothing.',
				"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
				'The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword.',
				'The --showHidden flag will enable the showHidden option in util.inspect.',
				'If the output is too large, it\'ll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.'
			].join('\n'),
			COMMAND_EVAL_ERROR: (time, output, type) => `**Error**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDFILE: (time, type) => `Output was too long... sent the result as a file.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDCONSOLE: (time, type) => `Output was too long... sent the result to console.\n**Type**:${type}\n${time}`,
			COMMAND_UNLOAD: (type, name) => `Unloaded the ${name} ${type}.`,
			COMMAND_UNLOAD_DESCRIPTION: 'Unloads the klasa piece.',
			COMMAND_UNLOAD_WARN: 'You probably don\'t want to unload that, since you wouldn\'t be able to run any command to enable it again.',
			COMMAND_TRANSFER_ERROR: 'That file has been transfered already or never existed.',
			COMMAND_TRANSFER_SUCCESS: (type, name) => `Successfully transferred the ${name} ${type}.`,
			COMMAND_TRANSFER_FAILED: (type, name) => `Transfer of the ${name} ${type} to the client has failed. Please check your console.`,
			COMMAND_TRANSFER_DESCRIPTION: 'Transfers a core piece to its respective folder.',
			COMMAND_RELOAD: (type, name, time) => `Reloaded the ${name} ${type}. \`${time}\``,
			COMMAND_RELOAD_FAILED: (type, name) => `Failed to reload the ${name} ${type}. Please check your console.`,
			COMMAND_RELOAD_ALL: (type, time) => `Reloaded all ${type}. \`${time}\``,
			COMMAND_RELOAD_EVERYTHING: (time) => `Reloaded everything. \`${time}\``,
			COMMAND_RELOAD_DESCRIPTION: 'Reloads a klasa piece, or all pieces of a klasa store.',
			COMMAND_REBOOT: 'Rebooting...',
			COMMAND_REBOOT_DESCRIPTION: 'Reboots the bot.',
			COMMAND_LOAD: (time, type, name) => `Successfully loaded the ${name} ${type}. \`${time}\``,
			COMMAND_LOAD_FAIL: 'The file does not exist, or an error occurred while loading your file. Please check your console.',
			COMMAND_LOAD_ERROR: (type, name, error) => `Failed to load the ${name} ${type}. Reason:${util.codeBlock('js', error)}`,
			COMMAND_LOAD_DESCRIPTION: 'Load a piece from your bot.',
			COMMAND_PING: 'Ping?',
			COMMAND_PING_DESCRIPTION: 'Runs a connection test to Discord.',
			COMMAND_PINGPONG: (diff, ping) => `Pong! \`${ping}ms\``,
			COMMAND_INVITE: () => [
				`To add ${this.client.user.username} to your discord guild:`,
				`<${this.client.invite}>`,
				util.codeBlock('', [
					'The above link is generated requesting the minimum permissions required to use every command currently.',
					'We know not all permissions are right for every guild, so don\'t be afraid to uncheck any of the boxes.',
					'If you try to use a command that requires more permissions than the bot is granted, it will let you know.'
				].join(' ')),
				'The RTByte Support server can be found using the link below.',
				'https://discord.gg/eRauWP4/'
			],
			COMMAND_INVITE_DESCRIPTION: 'Displays the link to invite RTByte to your guild.',
			COMMAND_INFO_EMBEDTITLE: 'RTByte Information',
			// eslint-disable-next-line max-len
			COMMAND_INFO_EMBEDDESC: 'RTByte is an open-source modular multipurpose Discord bot built on the incredible [Klasa](https://klasa.js.org/) framework for [discord.js](https://discord.js.org/).\n\nWe aim to provide the most consistent and easy-to-use Discord mod bot solution available, with our key focus areas being modularity, performance, consistency, and choice.',
			COMMAND_INFO_OURTEAM: 'Our team',
			// eslint-disable-next-line max-len
			COMMAND_INFO_TEAMLIST: '• [Rasmus Gerdin](https://github.com/rasmusgerdin/)\n• [Michael Cumbers](https://github.com/mcumbers/)\n• [Justin Shull](https://github.com/JShull97/)\n• [Killian Higgins](https://github.com/Uzui2012/)',
			COMMAND_INFO_LINKS: 'Links',
			COMMAND_INFO_LINKLIST: '• [GitHub](https://github.com/RTByte/RTByte)\n• [Discord](https://discord.gg/eRauWP4/)',
			COMMAND_INFO_DESCRIPTION: 'Provides some information about this bot.',
			COMMAND_HELP_DESCRIPTION: 'Display help for a command.',
			COMMAND_HELP_EMBEDTITLE: 'RTByte Help',
			COMMAND_HELP_NO_EXTENDED: 'No extended help available.',
			COMMAND_HELP_DM: 'The list of commands you have access to has been sent to your DMs.',
			COMMAND_HELP_NODM: 'You have DMs disabled, I couldn\'t send you the commands in DMs.',
			COMMAND_HELP_USAGE: 'Usage',
			COMMAND_HELP_EXTENDED: 'Extended help',
			COMMAND_ENABLE: (type, name) => `Successfully enabled the ${name} ${type}.`,
			COMMAND_ENABLE_DESCRIPTION: 'Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.',
			COMMAND_DISABLE: (type, name) => `Successfully disabled the ${name} ${type}.`,
			COMMAND_DISABLE_DESCRIPTION: 'Re-disables or temporarily disables a command/inhibitor/monitor/finalizer/event. Default state restored on reboot.',
			COMMAND_DISABLE_WARN: 'You probably don\'t want to disable that, since you wouldn\'t be able to run any command to enable it again.',
			COMMAND_CONF_NOKEY: 'You must provide a key.',
			COMMAND_CONF_NOVALUE: 'You must provide a value.',
			COMMAND_CONF_GUARDED: (name) => `${util.toTitleCase(name)} may not be disabled.`,
			COMMAND_CONF_UPDATED: (key, response) => `Successfully updated the key **${key}**: \`${response}\``,
			COMMAND_CONF_KEY_NOT_ARRAY: 'This key is not array type. Use the action \'reset\' instead.',
			COMMAND_CONF_GET_NOEXT: (key) => `The key **${key}** does not seem to exist.`,
			COMMAND_CONF_GET: (key, value) => `The value for the key **${key}** is: \`${value}\``,
			COMMAND_CONF_RESET: (key, response) => `The key **${key}** has been reset to: \`${response}\``,
			COMMAND_CONF_NOCHANGE: (key) => `The value for **${key}** was already that value.`,
			COMMAND_CONF_SERVER_DESCRIPTION: 'Define per-guild settings.',
			COMMAND_CONF_SERVER: (key, list) => `**Guild Settings${key}**\n${list}`,
			COMMAND_CONF_USER_DESCRIPTION: 'Define per-user settings.',
			COMMAND_CONF_USER: (key, list) => `**User Settings${key}**\n${list}`,
			COMMAND_STATS_DESCRIPTION: 'Provides bot owners with statistics.',
			COMMAND_STATS_EMBEDTITLE: 'RTByte Stats',
			COMMAND_STATS_MEMUSAGE: 'Memory usage',
			COMMAND_STATS_UPTIME: 'Uptime',
			COMMAND_STATS_CONNECTIONS: 'Connections',
			// eslint-disable-next-line max-len
			COMMAND_STATS_CONNECTIONINFO: `Operating on **${this.client.guilds.size.toLocaleString()}** servers,\nWatching **${this.client.channels.size.toLocaleString()}** channels,\nServing **${this.client.users.size.toLocaleString()}** users`,
			COMMAND_STATS_LIBRARIES: 'Libraries',
			COMMAND_STATS_HOSTINFO: 'Host information',
			COMMAND_STATS_HOSTUPTIME: 'Host uptime',
			COMMAND_MODERATION_SILENT: 'Silent action',
			COMMAND_MODERATION_NOREASON: 'Please provide a reason.',
			COMMAND_BAN_DESCRIPTION: 'Bans a mentioned user and logs the reason.',
			COMMAND_BAN_NOPARAM_MEMBER: 'Please mention the user you would like to ban.',
			COMMAND_BAN_NO_BAN_SELF: 'You cannot ban yourself.',
			COMMAND_BAN_NO_BAN_CLIENT: 'I cannot ban myself.',
			COMMAND_BAN_NO_PERMS: (user) => `You don't have permission to ban ${user}.`,
			COMMAND_KICK_DESCRIPTION: 'Kicks a mentioned user and logs the reason.',
			COMMAND_KICK_NOPARAM_MEMBER: 'Please mention the user you would like to kick.',
			COMMAND_KICK_NO_KICK_SELF: 'You cannot kick yourself.',
			COMMAND_KICK_NO_KICK_CLIENT: 'I cannot kick myself.',
			COMMAND_KICK_NO_PERMS: (user) => `You don't have permission to kick ${user}.`,
			COMMAND_MODHISTORY_DESCRIPTION: 'Lists moderation actions taken against a user in the past. Refers to a specific case if a case ID is provided.',
			COMMAND_MODHISTORY_INVALID_CASEID: (caseID) => `\`${caseID}\` is not a valid case ID.`,
			COMMAND_MODHISTORY_NOMODHISTORY: (target) => `${target} has no recorded moderation history.`,
			COMMAND_MODHISTORY_LOADING: 'Loading moderation history...',
			COMMAND_MUTE_DESCRIPTION: 'Mutes a mentioned user and logs the reason.',
			COMMAND_MUTE_NOPARAM_MEMBER: 'Please mention the user you would like to mute.',
			COMMAND_MUTE_NO_MUTE_SELF: 'You cannot mute yourself.',
			COMMAND_MUTE_NO_MUTE_CLIENT: 'I cannot mute myself.',
			COMMAND_MUTE_NO_PERMS: (user) => `You don't have permission to mute ${user}.`,
			COMMAND_PURGE_DESCRIPTION: 'Removes X amount of messages, optionally sent by Y user. Append the word \'all\' to ignore the role hierarchy.',
			COMMAND_PURGE_NOPARAM: 'Please provide the amount of messages to delete.',
			COMMAND_PURGE_NO_PERMS: (member) => `You don't have permission to purge messages from ${member}.`,
			COMMAND_SENDMSG_DESCRIPTION: 'Sends a message to the specified channel or user as the bot.',
			COMMAND_SENDMSG_NOPARAM: 'Please provide a message to send to your mentioned channel or user.',
			COMMAND_SERVERINFO_DESCRIPTION: 'Displays server information.',
			COMMAND_SERVERINFO_REGION: 'Region',
			COMMAND_SERVERINFO_VLEVEL: 'Verification level',
			COMMAND_SERVERINFO_ECFILTER: 'Explicit content filter',
			COMMAND_SERVERINFO_CREATED: 'Created',
			COMMAND_SOFTBAN_DESCRIPTION: 'Bans a mentioned user and logs the reason.',
			COMMAND_SOFTBAN_NOPARAM_MEMBER: 'Please mention the user you would like to softban.',
			COMMAND_SOFTBAN_NO_SOFTBAN_SELF: 'You cannot softban yourself.',
			COMMAND_SOFTBAN_NO_SOFTBAN_CLIENT: 'I cannot softban myself.',
			COMMAND_SOFTBAN_SOFTBAN_RELEASED: 'Softban released.',
			COMMAND_SOFTBAN_NO_PERMS: (user) => `You don't have permission to softban ${user}.`,
			COMMAND_UNMUTE_DESCRIPTION: 'Unmutes a mentioned user.',
			COMMAND_UNMUTE_NOPARAM: 'Please mention the user you would like to unmute.',
			COMMAND_UNMUTE_NO_UNMUTE_SELF: 'You cannot unmute yourself.',
			COMMAND_UNMUTE_NO_UNMUTE_CLIENT: 'I cannot unmute myself.',
			COMMAND_UNMUTE_NO_PERMS: (user) => `You don't have permission to unmute ${user}.`,
			COMMAND_USERINFO_DESCRIPTION: 'Get information on a mentioned user.',
			COMMAND_USERINFO_STATUS: 'Status',
			COMMAND_USERINFO_ACTIVITY: (user) => `${this.presenceTypes[user.presence.activity.type]}`,
			COMMAND_VCBAN_DESCRIPTION: 'Bans a mentioned user from voice chat and logs the reason.',
			COMMAND_VCBAN_NOPARAM_MEMBER: 'Please mention the user you would like to ban from voice chat.',
			COMMAND_VCBAN_NO_VCBAN_SELF: 'You cannot ban yourself from voice chat.',
			COMMAND_VCBAN_NO_VCBAN_CLIENT: 'I cannot ban myself from voice chat.',
			COMMAND_VCBAN_NO_PERMS: (user) => `You don't have permission to ban ${user} from voice chat.`,
			COMMAND_VCKICK_DESCRIPTION: 'Kicks a mentioned user from voice chat and logs the reason.',
			COMMAND_VCKICK_NOPARAM_MEMBER: 'Please mention the user you would like to kick from voice chat.',
			COMMAND_VCKICK_NO_VCKICK_SELF: 'You cannot kick yourself from voice chat.',
			COMMAND_VCKICK_NO_VCKICK_CLIENT: 'I cannot kick myself from voice chat.',
			COMMAND_VCKICK_NO_PERMS: (user) => `You don't have permission to kick ${user} from voice chat.`,
			COMMAND_VCUNBAN_DESCRIPTION: 'Unbans a mentioned user from voice chat.',
			COMMAND_VCUNBAN_NOPARAM: 'Please mention the user you would like to unban from voice chat.',
			COMMAND_VCUNBAN_NO_VCUNBAN_SELF: 'You cannot unban yourself from voice chat.',
			COMMAND_VCUNBAN_NO_VCUNBAN_CLIENT: 'I cannot unban myself from voice chat.',
			COMMAND_VCUNBAN_NO_PERMS: (user) => `You don't have permission to unban ${user} from voice chat.`,
			COMMAND_WARN_DESCRIPTION: 'Warns a mentioned user and logs the reason.',
			COMMAND_WARN_NOPARAM_MEMBER: 'Please mention the user you would like to warn.',
			COMMAND_WARN_NO_WARN_SELF: 'You cannot warn yourself.',
			COMMAND_WARN_NO_WARN_CLIENT: 'I cannot warn myself.',
			COMMAND_WARN_NO_PERMS: (user) => `You don't have permission to warn ${user}.`,
			COMMAND_8BALL_DESCRIPTION: 'Magic 8-ball, does exactly what the toy does, memes included.',
			COMMAND_8BALL_NOPARAM: '🎱 You didn\'t ask me anything.',
			COMMAND_CHOICE_DESCRIPTION: 'Makes a decision based off of the choices given, no matter how many you include.',
			COMMAND_CHOICE_NOPARAM: '🤔 I can\'t choose for you unless you provide me with at least 2 choices.',
			COMMAND_CHOICE_NOTENOUGH: '\n🤔 You only provided me with one choice.',
			COMMAND_COINFLIP_DESCRIPTION: 'Flips a coin. 🙂 for heads, 🙃 for tails.',
			COMMAND_JOINDATE_DESCRIPTION: 'Displays your account creation date along with the date you joined the current server you\'re on. Other users can be specified to fetch their account creation and server join dates.', // eslint-disable-line max-len
			COMMAND_QUOTE_DESCRIPTION: 'Quotes a message by ID.',
			// eslint-disable-next-line max-len
			COMMAND_QUOTE_NOPARAM: 'Please specify a message ID for the message you would like to quote.\nMessage IDs can be found by right clicking a message after having turned *Developer Mode* on under **Appearance** in your settings.',
			COMMAND_QUOTE_NO_MESSAGE_FOUND: (messageID, origin) => `Could not find a message with ID of \`${messageID}\` in ${origin}`,
			COMMAND_ROLES_DESCRIPTION: 'Series of commands to allow you to join roles by yourself.',
			COMMAND_ROLES_EXTENDED: 'list - Lists joinable roles and ther member counts. :: add - Adds a role by its name. :: remove - Removes a role by its name.',
			COMMAND_ROLES_NONE_JOINABLE: 'There are no joinable roles on this server.',
			COMMAND_ROLES_NO_ROLE_NAME: 'Please specify a role by its name.',
			COMMAND_ROLES_NO_MODERATE: 'You don\'t have permission to change the roles of other users.',
			COMMAND_ROLES_NO_PERMS: (target) => `You are not allowed to moderate ${target}.`,
			COMMAND_ROLES_DOES_NOT_EXIST: (roleName) => `Sorry, the role \`${roleName}\` does not exist in this server. Please check to make sure you spelled it correctly.`,
			COMMAND_ROLES_NOT_JOINABLE: (roleName) => `The role \`${roleName}\` is not joinable in this server.`,
			COMMAND_ROLES_ALREADY_HAVE: (roleName, target) => `${target} already has the role \`${roleName}\`.`,
			COMMAND_ROLES_NOT_LEAVABLE: (roleName) => `You're not allowed to remove the role \`${roleName}\`.`,
			COMMAND_ROLES_DOES_NOT_HAVE: (roleName, target) => `${target} does not have the role \`${roleName}\`.`,
			COMMAND_SUPPORT_DESCRIPTION: 'Contacts the bot developers in case of an issue with the bot.',
			COMMAND_SUPPORT_REQUESTED: 'Support requested',
			COMMAND_SUPPORT_CONTACTED: 'The bot developers have been notified.',


			// Message prompt langs
			MESSAGE_PROMPT_TIMEOUT: 'The prompt has timed out.',


			// Guild log langs
			GUILD_LOG_MESSAGE: 'Message',
			GUILD_LOG_BEFORE: 'Before',
			GUILD_LOG_AFTER: 'After',
			GUILD_LOG_EMOJI: 'Emoji',
			GUILD_LOG_MESSAGEDELETE: 'Message deleted',
			GUILD_LOG_MESSAGEUPDATE: 'Message edited',
			GUILD_LOG_MESSAGEPURGE: 'Messages purged',
			GUILD_LOG_MESSAGEPURGE_AMOUNT: 'Amount of messages removed:',
			GUILD_LOG_MESSAGEPURGE_TARGET: 'Purged messages from:',
			GUILD_LOG_ROLECREATE: 'Role created',
			GUILD_LOG_ROLECREATE_V_TAG: 'Tag',
			GUILD_LOG_ROLEDELETE: 'Role deleted',
			GUILD_LOG_ROLEUPDATE: 'Role updated',
			GUILD_LOG_ROLEUPDATE_COLOR: 'Color changed',
			GUILD_LOG_ROLEUPDATE_HOIST: 'Hoist toggled',
			GUILD_LOG_ROLEUPDATE_MENTIONABLE: 'Mentionable toggled',
			GUILD_LOG_ROLEUPDATE_PERMISSIONS: 'Permissions changed',
			GUILD_LOG_CHANNELCREATE: 'Channel created',
			GUILD_LOG_CHANNELCREATE_VOICE: 'Voice channel created',
			GUILD_LOG_CHANNELCREATE_V_PARENT: 'Category',
			GUILD_LOG_CHANNELDELETE: 'Channel deleted',
			GUILD_LOG_CHANNELDELETE_VOICE: 'Voice channel deleted',
			GUILD_LOG_CHANNELUPDATE: 'Channel updated',
			GUILD_LOG_CHANNELUPDATE_VOICE: 'Voice channel updated',
			GUILD_LOG_CHANNELUPDATE_NSFW: 'NSFW toggled',
			GUILD_LOG_CHANNELUPDATE_TOPIC: 'Topic changed',
			GUILD_LOG_CHANNELUPDATE_CATEGORY: 'Category changed',
			GUILD_LOG_CHANNELUPDATE_POSITIION: 'Position changed',
			GUILD_LOG_CHANNELUPDATE_PERMISSIONOVERWRITECREATE: 'Permissions created for',
			GUILD_LOG_CHANNELUPDATE_PERMISSIONOVERWRITEREMOVE: 'Permissions defaulted for',
			GUILD_LOG_CHANNELUPDATE_PERMISSIONOVERWRITEUPDATE: 'Permissions changed for',
			GUILD_LOG_EMOJICREATE: 'Emoji created',
			GUILD_LOG_EMOJIDELETE: 'Emoji deleted',
			GUILD_LOG_EMOJIUPDATE: 'Emoji updated',
			GUILD_LOG_GUILDUPDATE: 'Guild updated',
			GUILD_LOG_GUILDUPDATE_AFKCHANNEL: 'AFK channel changed',
			GUILD_LOG_GUILDUPDATE_AFKTIMEOUT: 'AFK timeout changed',
			GUILD_LOG_GUILDUPDATE_DEFAULTMSGNOTIF: 'Default notification settings changed',
			GUILD_LOG_GUILDUPDATE_CONTENTFILTER: 'Explicit content filter level changed',
			GUILD_LOG_GUILDUPDATE_ICON: 'Server icon changed',
			GUILD_LOG_GUILDUPDATE_MFALEVEL: 'Server 2FA requirement toggled',
			GUILD_LOG_GUILDUPDATE_OWNER: 'Ownership transferred',
			GUILD_LOG_GUILDUPDATE_REGION: 'Region changed',
			GUILD_LOG_GUILDUPDATE_SPLASH: 'Server invite background changed',
			GUILD_LOG_GUILDUPDATE_VLEVEL: 'Verification level changed',
			GUILD_LOG_GUILDBANADD: 'User banned',
			GUILD_LOG_GUILDBANADD_TIMED: (when) => `User banned for ${moment.duration(moment().diff(when)).humanize()}`,
			GUILD_LOG_GUILDBANREMOVE: 'User unbanned',
			GUILD_LOG_GUILDMEMBERADD: 'User joined',
			GUILD_LOG_GUILDMEMBERREMOVE: 'User left',
			GUILD_LOG_GUILDMEMBERKICK: 'User kicked',
			GUILD_LOG_GUILDMEMBERMUTE: 'User muted',
			GUILD_LOG_GUILDMEMBERMUTE_TIMED: (when) => `User muted for ${moment.duration(moment().diff(when)).humanize()}`,
			GUILD_LOG_GUILDSOFTBANADD: 'User softbanned',
			GUILD_LOG_GUILDMEMBERUNMUTE: 'User unmuted',
			GUILD_LOG_GUILDMEMBERVCKICK: 'User kicked from voice chat',
			GUILD_LOG_GUILDMEMBERVCBAN: 'User banned from voice chat',
			GUILD_LOG_GUILDMEMBERVCBAN_TIMED: (when) => `User banned from voice chat for ${moment.duration(moment().diff(when)).humanize()}`,
			GUILD_LOG_GUILDMEMBERVCUNBAN: 'User unbanned from voice chat',
			GUILD_LOG_GUILDMEMBERWARN: 'Warning issued',
			GUILD_LOG_MEMBERUPDATE: 'User updated',
			GUILD_LOG_MEMBERUPDATE_DISPLAYNAME: 'Display name changed',
			GUILD_LOG_AUTOSELENER: 'Changed name with blacklisted word',
			GUILD_LOG_BLACKLISTEDWORD: (channel) => `Blacklisted word detected in ${channel}.`,
			GUILD_LOG_ANTIINVITE: (channel) => `Guild invite detected in ${channel}.`,
			GUILD_LOG_MENTIONSPAM: 'Mention spam filter triggered',


			// Global log langs
			GLOBAL_LOG_GUILDCREATE: 'Bot added to guild',
			GLOBAL_LOG_GUILDDELETE: 'Bot removed from guild',
			GLOBAL_LOG_GUILDUPDATE_NAME: 'Guild name changed',
			GLOBAL_LOG_GUILDUPDATE_ICON: 'Guild icon changed',
			GLOBAL_LOG_GUILDUNAVAILABLE: 'Guild unavailable, likely due to a server outage',
			GLOBAL_LOG_COMMANDRUN: 'Command ran',


			// Moderation action langs
			// eslint-disable-next-line max-len
			MODERATION_LOG_BOILERPLATE: (guild) => `This action was performed by a moderator of the ${guild.name} Discord. If you have any questions about this action, please contact the owner, listed below.\n\n${guild.owner}`,
			MODERATION_LOG_BOILERPLATE_AUTO: (guild) => `This action was automatically performed. If you have any questions regarding this, please contact a moderator of the ${guild.name} Discord.`,
			MODERATION_LOG_BAN: 'User banned',
			MODERATION_LOG_UNBAN: 'User unbanned',
			MODERATION_LOG_KICK: 'User kicked',
			MODERATION_LOG_MUTE: 'User muted',
			MODERATION_LOG_UNMUTE: 'User unmuted',
			MODERATION_LOG_PURGE: 'Messages purged',
			MODERATION_LOG_SOFTBAN: 'User softbanned',
			MODERATION_LOG_VCBAN: 'User banned from voice chat',
			MODERATION_LOG_VCUNBAN: 'Usr unbanned from voice chat',
			MODERATION_LOG_VCKICK: 'User kicked from voice chat',
			MODERATION_LOG_ANTIINVITE: 'Invite deleted',
			MODERATION_LOG_MENTIONSPAM: 'User banned for mention spam',
			MODERATION_LOG_BLACKLISTEDWORD: 'Blacklisted word detected',
			MODERATION_LOG_BLACKLISTEDNICKNAME: 'Blacklisted nickname detected',
			MODERATION_LOG_CASEID: (caseID) => `**Case ID:** ${caseID}`,
			MODERATION_LOG_EVENTLOGGED: 'Event logged',
			MODERATION_LOG_MODERATOR: 'Moderator',
			MODERATION_LOG_UNSPECIFIED: 'Unspecified',
			MODERATION_LOG_DURATION: 'Duration',
			MODERATION_LOG_DURATIONEND: (end) => `For ${moment.duration(moment().diff(end)).humanize()}`,
			MODERATION_LOG_DELETEDMESSAGECOUNT: 'Messages deleted',
			MODERATION_LOG_DELETEDMESSAGECONTENT: 'Deleted message',
			MODERATION_LOG_BADNICKNAME: 'Blacklisted nickname',
			MODERATION_LOG_LINK: (link) => `[Click Here to View](${link})`,
			MODERATION_LOG_SILENT: 'Command executed silently',
			MODERATION_LOG_CHANNEL: 'Channel'
		};
	}

	async init() {
		await super.init();
	}

};
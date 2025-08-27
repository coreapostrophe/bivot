import logging
import sys

import colorama
from colorama import Back, Fore, Style

colorama.init(autoreset=True)


class ColoredFormatter(logging.Formatter):

    COLORS = {
        'DEBUG': Fore.CYAN,
        'INFO': Fore.GREEN,
        'WARNING': Fore.YELLOW,
        'ERROR': Fore.RED,
        'CRITICAL': Fore.RED + Back.WHITE + Style.BRIGHT,
    }

    def format(self, record):
        timestamp = self.formatTime(record, self.datefmt)
        logger_name = record.name
        level_name = record.levelname
        message = record.getMessage()

        color = self.COLORS.get(level_name, '')

        colored_timestamp = Fore.BLUE + timestamp + Style.RESET_ALL
        colored_logger_name = Fore.MAGENTA + logger_name + Style.RESET_ALL
        colored_level_name = color + level_name + Style.RESET_ALL

        return f"{colored_timestamp} - {colored_logger_name} [{colored_level_name}] - {message}"


class DiscordLogHandler(logging.Handler):
    def __init__(self):
        super().__init__()
        self.logger = self._setup_logging()

    def _create_console_handler(self, level=logging.INFO):
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(level)
        console_handler.setFormatter(ColoredFormatter(datefmt='%Y-%m-%d %H:%M:%S'))
        return console_handler

    def _setup_logging(self):
        logger = logging.getLogger('bivot')
        logger.setLevel(logging.INFO)

        console_handler = self._create_console_handler(logging.INFO)
        logger.addHandler(console_handler)

        discord_loggers = [
            'discord',
            'discord.client',
            'discord.gateway',
            'discord.http',
            'discord.voice',
            'discord.state'
        ]

        for logger_name in discord_loggers:
            discord_logger = logging.getLogger(logger_name)
            discord_logger.handlers.clear()
            discord_logger.addHandler(self)
            discord_logger.setLevel(logging.INFO)
            discord_logger.propagate = False

        return logger

    def emit(self, record):
        try:
            log_entry = self.format(record)
            if record.levelno >= logging.WARNING:
                self.logger.warning(log_entry)
            elif record.levelno >= logging.INFO:
                self.logger.info(log_entry)
            else:
                self.logger.debug(log_entry)
        except Exception:
            self.handleError(record)

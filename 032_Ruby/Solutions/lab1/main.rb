require_relative 'lib/events/event_router'
require_relative 'lib/handlers/console_handler'
require_relative 'lib/handlers/file_handler'
require_relative 'lib/handlers/html_handler'
require_relative 'lib/menu'

router = EventRouter.new

router.register(ConsoleHandler.new)
router.register(FileHandler.new('lifetrack.log'))
router.register(HtmlHandler.new('dashboard.html'))

menu = Menu.new(router)
menu.start

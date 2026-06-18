require_relative '../handlers/handler'

class EventRouter
  def initialize
    @handlers = []
  end

  def register(handler)
    unless handler.is_a?(Handler)
      raise ArgumentError, "Handler must inherit from Handler interface"
    end
    @handlers << handler
  end

  def dispatch(event)
    @handlers.each do |handler|
      handler.handle(event)
    end
  end
end

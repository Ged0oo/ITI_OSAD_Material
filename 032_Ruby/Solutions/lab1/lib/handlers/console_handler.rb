require_relative 'handler'

class ConsoleHandler < Handler
  def handle(event)
    puts "\n[#{event.formatted_time}] #{event.type.upcase} — #{event.description} (#{event.duration} min)"
    puts "✓ Event logged."
  end
end

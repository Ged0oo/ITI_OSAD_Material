require_relative 'handler'

class FileHandler < Handler
  def initialize(filepath)
    @filepath = filepath
  end

  def handle(event)
    log_entry = "[#{event.formatted_time}] #{event.type.upcase} — #{event.description} (#{event.duration} min)\n"
    File.open(@filepath, 'a') do |file|
      file.write(log_entry)
    end
  end
end

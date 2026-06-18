class Event
  attr_reader :type, :description, :duration, :timestamp

  def initialize(type:, description:, duration:, timestamp: Time.now)
    @type = type
    @description = description
    @duration = duration
    @timestamp = timestamp
  end

  def formatted_time
    @timestamp.strftime("%Y-%m-%d %H:%M")
  end
end

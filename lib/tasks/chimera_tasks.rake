# frozen_string_literal: true

require "chimera/version"

namespace :chimera do
  task server: :environment do
    require "chimera/game/server"
    puts "=> Booting Chimera MUD TCP Server #{Chimera::VERSION}"
    puts "=> Rails #{Rails::VERSION::STRING} starting in #{Rails.env}"
    host = ENV["CHIMERA_SERVER_HOST"] || "127.0.0.1"
    port = ENV["CHIMERA_SERVER_PORT"] || 2323

    puts "*  Environment: #{Rails.env}"
    puts "*          PID: #{Process.pid}"
    puts "* Listening on tcp://#{host}:#{port}"

    Rails.logger = Logger.new(STDOUT)

    Chimera::Game::Server.start(
      host: host,
      port: port
    )
  end
end

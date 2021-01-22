# frozen_string_literal: true

require "rails_helper"

require "chimera/game/server"

RSpec.describe Chimera::Game::Server::Instance do
  subject { described_class.new(port: "3232") }

  before :each do
    allow(Chimera::Nats).to receive(:ensure_connection).and_return(true)
  end

  describe "#start" do
    it "starts the nats connection" do
      expect(Chimera::Nats).to receive(:ensure_connection).and_return(true)
      Thread.new { subject.start }
      sleep 0.1 until subject.started
      subject.stop
    end
  end
end
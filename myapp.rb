# myapp.rb
require 'sinatra'

require "sinatra/activerecord"
require "mysql2"
require "json"
require "./models/models"

configure do
  set :root, File.dirname(__FILE__)
  set :public_folder, "public/app"
end

get "/" do
  #File.read("public/app/index.html")
  erb :index
end

post '/submit' do
    @customer = Customer.new(params[:customer])
	if @customer.save
		redirect '/customers'
	else
		"Sorry, there was an error!"
	end
end

get '/customers' do
  content_type :json
  Customer.all.to_json
end

get '/customers/:id' do
  id = params[:id]
  content_type :json
  Customer.find(id).to_json
end

get '/spectacles' do
  content_type :json
  Spectacle.all.to_json
end

get '/spectacles/:id' do
  id = params[:id]
  content_type :json
  Spectacle.find(id).to_json
end

get '/TicketsPriceGroup' do
  content_type :json
  TicketPriceGroup.all.to_json
end


get '/TicketsPriceGroup/:id' do
  id = params[:id]
  content_type :json
  @jsonToBeSend = TicketPriceGroup.find(id).to_json
  @jsonToBeSend = JSON.parse(@jsonToBeSend)
  @jsonToBeSend[:price] = Ticket.where(id: id).pluck(:price)[0] 
  @jsonToBeSend.to_json
end


get '/SpectaclePerformeds' do
  content_type :json
  SpectaclePerformed.all.to_json
end

get '/SpectaclePerformeds/:id' do
  id = params[:id]
  content_type :json
  SpectaclePerformed.find(id).to_json
end
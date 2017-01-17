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
  File.read("public/app/index.html")
  #erb :index
end

#1
get '/spectacles' do
  content_type :json
  Spectacle.all.to_json
end

#2
get '/spectacles/:id' do
  id = params[:id]
  content_type :json
  Spectacle.find(id).to_json
end

#3
get '/TicketsPriceGroup/:id' do
  id = params[:id]
  content_type :json
  @jsonToBeSend = TicketPriceGroup.find(id).to_json
  @jsonToBeSend = JSON.parse(@jsonToBeSend)
  @jsonToBeSend[:price] = Ticket.where(id: id).pluck(:price)[0] 
  @jsonToBeSend.to_json
end

#4
get '/SpectaclePerformeds/:id' do
  id = params[:id]
  content_type :json
  @jsonToBeSend = SpectaclePerformed.find(id).to_json
  @jsonToBeSend = JSON.parse(@jsonToBeSend)
  @jsonToBeSend[:name] = Stage.where(id: @jsonToBeSend["stages_id"]).pluck(:name)[0]
  @jsonToBeSend.to_json
end

#5 rozkład miejsc w wybranej sali i dla danego terminu lista zajętych miejsc
get '/numberFive/:id' do
  id = params[:id] # spectacle_performeds_id
  content_type :json
  @stages_id = SpectaclePerformed.where(id: id).pluck(:stages_id)[0]
  @seatRowNumber = Seat.where(stages_id: @stages_id).pluck(:row, :number, :id)
  seats = Array.new
  @seatRowNumber.each do |seat|
  	seatHash = Hash.new
  	seatHash["row"] = seat[0]
  	seatHash["number"] = seat[1]
    seatHash["status"] = SeatReserved.where(spectacle_performeds_id: id, seats_id: seat[2]).exists? # is seat reserved?
  	seats.push(seatHash)
  end
  seats.to_json
end

######### below addresses are just for test / debug purposes

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

get '/stages' do
  content_type :json
  Stage.all.to_json
end

get '/seats' do
  content_type :json
  Seat.all.to_json
end

get '/seatReserveds' do
  content_type :json
  SeatReserved.all.to_json
end

get '/TicketsPriceGroup' do
  content_type :json
  TicketPriceGroup.all.to_json
end

get '/SpectaclePerformeds' do
  content_type :json
  SpectaclePerformed.all.to_json
end

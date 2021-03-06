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
get '/tickets/:id' do
  id = params[:id]
  content_type :json
  @jsonToBeSend = Ticket.where(spectacles_id: id).to_json
  @jsonToBeSend = JSON.parse(@jsonToBeSend)
  @jsonToBeSend.each do |ticket|
  	ticket["name"] = TicketPriceGroup.where(id: ticket["ticket_price_groups_id"]).pluck(:name)[0]
  end
  @jsonToBeSend.to_json
end

# 4.1
get '/ScenesForSpectacle/:id' do
  id = params[:id] #spectacle_id
  content_type :json
  @stages_id = SpectaclePerformed.where(spectacles_id: id).pluck(:stages_id)
  stages = Array.new
  @stages_id.each do |stage|
  	stagesHash = Hash.new
  	stagesHash["id"] = stage
    stagesHash["name"] = Stage.where(id: stage).pluck(:name)[0]
    stages.push(stagesHash)
  end
  stages.uniq!.to_json
end

#4.2
get '/spectacle/:spectacleId/scene/:sceneId/schedule' do
  spectacleId = params[:spectacleId]
  sceneId = params[:sceneId]
  jsonToBeSend = SpectaclePerformed.where(spectacles_id: spectacleId, stages_id: sceneId).to_json
  jsonToBeSend = JSON.parse(jsonToBeSend)
  jsonToBeSend.each do |spectacle|
  	spectacle[:name] = Stage.where(id: spectacle["stages_id"]).pluck(:name)[0]
  end
  jsonToBeSend.to_json
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
  	seatHash["id"] = seat[2]
    seatHash["status"] = SeatReserved.where(spectacle_performeds_id: id, seats_id: seat[2]).exists? # is seat reserved?
  	seats.push(seatHash)
  end
  seats.to_json
end

#6
get '/customer' do
  email = params[:email]
  content_type :json
  Customer.where(email: email)[0].to_json
end

#7
post '/reservation' do
   payload = JSON.parse(request.body.read)
 #   puts("payload: ")
	# puts(payload)
   selectedSeats = payload["selectedSeats"]
   spectaclePerformed = payload["spectaclePerformed"]
   client = payload["client"]
   totalPrice = payload["totalPrice"]
   # puts("selectedSeats:")
   # puts(selectedSeats)
   # puts("selectedSeats[0][id]:")
   # puts(selectedSeats[0]["id"])
   # puts("selectedSeats[0][ticket]:")
   # puts(selectedSeats[0]["ticket"])
   # puts("selectedSeats[0][ticket][id]:")
   # puts(selectedSeats[0]["ticket"]["id"])
   # puts("spectaclePerformed:")
   # puts(spectaclePerformed)
   # puts("spectaclePerformed[id]:")
   # puts(spectaclePerformed["id"])
   # puts("client:")
   # puts(client)
   # puts("totalPrice:")
   # puts(totalPrice)
   if Customer.where(id: client["id"]).exists?
   	 # puts("jestem w ifie")
     reservation = Reservation.create(customers_id: client["id"], price: totalPrice)
   else
   	 # puts("jestem w elsie")
     client.delete("id")
     begin
     client2 = Customer.create(client)
     # puts("client2: ")
     # puts(client2)
     rescue
     end
     reservation = Reservation.create(customers_id: client2["id"], price: totalPrice)
   end   
   SeatReserved.create(spectacle_performeds_id: spectaclePerformed["id"],
   	seats_id: selectedSeats[0]["id"],
   	tickets_id: selectedSeats[0]["ticket"]["id"],
   	reservations_id: reservation["id"])
end

#8
get '/reservations' do
  content_type :json
  reservations = Reservation.all.to_json
  reservations = JSON.parse(reservations)
  reservations.each do |reservation|
  	spectaclePerformedsId = SeatReserved.where(reservations_id: reservation["id"]).pluck(:spectacle_performeds_id)
  	spectacleId = SpectaclePerformed.where(id: spectaclePerformedsId).pluck(:spectacles_id)
  	customerId = reservation["customers_id"]
  	reservation["spectaclePerformeds"] = SpectaclePerformed.find(spectaclePerformedsId)
    reservation["spectacle_title"] = Spectacle.where(id: spectacleId).pluck(:title)[0]
    reservation["client"] = Customer.find(customerId)
  end
  reservations.to_json
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

get '/tickets' do
  content_type :json
  Ticket.all.to_json
end

get '/reservationss' do
  content_type :json
  Reservation.all.to_json
end

get '/SpectaclePerformeds' do
  content_type :json
  SpectaclePerformed.all.to_json
end

#4
get '/SpectaclePerformedsOLD/:id' do
  id = params[:id]
  content_type :json
  @jsonToBeSend = SpectaclePerformed.find(id).to_json
  @jsonToBeSend = JSON.parse(@jsonToBeSend)
  @jsonToBeSend[:name] = Stage.where(id: @jsonToBeSend["stages_id"]).pluck(:name)[0]
  @jsonToBeSend.to_json
end

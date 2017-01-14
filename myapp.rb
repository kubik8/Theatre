# myapp.rb
require 'sinatra'

require "sinatra/activerecord"
require "mysql2"
require "./models/customer"

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
  @customers = Customer.all
  erb :customers
end
# myapp.rb
require 'sinatra'

require "sinatra/activerecord"
require "mysql2"

require_relative "database_info"

def read
	  client_read = Mysql2::Client.new(:host => $host, :username => $username, 
	:port => $port_read, :database => $database, :password => $password)



  @results = client_read.query("SELECT * FROM zones")
end


get '/' do
  'Hello world!'
read
  name = params[:name]

@a = 5
@b = "dua"
  erb :index
end

post '/add/' do
	read
	place = params[:place] || "Nobody"
	  client_write = Mysql2::Client.new(:host => $host, :username => $username, 
	:port => $port_write, :database => $database, :password => $password)
	  erb :index, :locals => {'place' => place}

  @results2 = client_write.query("INSERT INTO zones (name) VALUES ('" + place + "')")

end
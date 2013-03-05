get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/tweets' do
  begin
    Twitter.update(params[:tweet])
  rescue Twitter::Error::Forbidden
    "error"
  end
end

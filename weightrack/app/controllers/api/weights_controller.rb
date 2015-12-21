class Api::WeightsController < ApplicationController
  def index
    render json: Weight.all
  end

  def show
    render json: Weight.find(params[:id])
  end
end
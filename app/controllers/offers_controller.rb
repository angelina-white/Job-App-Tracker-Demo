class OffersController < ApplicationController
    def create
        offer = Offer.create!(offer_params)
        render json: offer, status: :created
    end

    private
    def offer_params
        params.permit(:salary, :medical, :pto, :sickLeave, :bonus, :positionType, :job_id)
    end
end

class InterviewsController < ApplicationController
    def create
        interview = Interview.create(interview_params)
        render json: interview, status: :created
    end

    private

    def interview_params
        params.permit(:month, :day, :year, :hour, :minute, :job_id)
    end
end

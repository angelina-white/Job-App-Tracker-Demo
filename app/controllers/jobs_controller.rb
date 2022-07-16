class JobsController < ApplicationController
    def index
        jobs = Job.all
        render json: jobs, status: :ok
    end

    def show
        job = Job.find(params[:id])
        render json: job, status: :ok
    end

    def create
        job = Job.create!(job_params)
        render json: job, status: :created
    end

    def update
        job = Job.find(params[:id])
        job.update!(job_params)
        render json: job, status: :ok
    end

    def destroy
        job = Job.find(params[:id])
        job.destroy
        # head :no_content
        render json: params[:id]
    end

    private

    def job_params
        params.permit(:dateApplied, :description, :applicationLink, :status, :user_id, :company)
    end
end

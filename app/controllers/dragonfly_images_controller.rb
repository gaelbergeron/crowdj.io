class DragonflyImagesController < ApplicationController
  before_action :set_dragonfly_image, only: [:show, :edit, :update, :destroy]

  # GET /dragonfly_images
  # GET /dragonfly_images.json
  def index
    @dragonfly_images = DragonflyImage.all
  end

  # GET /dragonfly_images/1
  # GET /dragonfly_images/1.json
  def show
  end

  # GET /dragonfly_images/new
  def new
    @dragonfly_image = DragonflyImage.new
  end

  # GET /dragonfly_images/1/edit
  def edit
  end

  # POST /dragonfly_images
  # POST /dragonfly_images.json
  def create
    @dragonfly_image = DragonflyImage.new(dragonfly_image_params)

    respond_to do |format|
      if @dragonfly_image.save
        format.html { redirect_to @dragonfly_image, notice: 'Dragonfly image was successfully created.' }
        format.json { render :show, status: :created, location: @dragonfly_image }
      else
        format.html { render :new }
        format.json { render json: @dragonfly_image.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /dragonfly_images/1
  # PATCH/PUT /dragonfly_images/1.json
  def update
    respond_to do |format|
      if @dragonfly_image.update(dragonfly_image_params)
        format.html { redirect_to @dragonfly_image, notice: 'Dragonfly image was successfully updated.' }
        format.json { render :show, status: :ok, location: @dragonfly_image }
      else
        format.html { render :edit }
        format.json { render json: @dragonfly_image.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dragonfly_images/1
  # DELETE /dragonfly_images/1.json
  def destroy
    @dragonfly_image.destroy
    respond_to do |format|
      format.html { redirect_to dragonfly_images_url, notice: 'Dragonfly image was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dragonfly_image
      @dragonfly_image = DragonflyImage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dragonfly_image_params
      params.require(:dragonfly_image).permit(:asset)
    end
end

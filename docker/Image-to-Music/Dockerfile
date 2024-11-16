# Use an official PyTorch runtime as a parent image
FROM pytorch/pytorch:1.12.1-cuda11.3-cudnn8-runtime

# Set the working directory in the container
WORKDIR /usr/src/app

# Install necessary system dependencies
RUN apt-get update && apt-get install -y \
    git \
    ffmpeg \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

# Install any needed packages specified in requirements.txt
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Install any additional packages from Git repositories
RUN pip install -U git+https://github.com/facebookresearch/audiocraft#egg=audiocraft

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Run any necessary commands to start your application
CMD ["python", "app.py"]
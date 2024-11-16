# The base image includes the necessary Python and CUDA libraries
FROM nvidia/cuda:11.2.2-cudnn8-devel-ubuntu20.04

# Install Python and other dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set up a virtual environment
RUN python3 -m pip install virtualenv
RUN virtualenv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install the required Python packages
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the training script and any other necessary files
COPY train.py .
COPY config.json .

# Set the entrypoint to the training script
ENTRYPOINT ["python", "train.py"]

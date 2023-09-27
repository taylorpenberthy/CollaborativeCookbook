# Use an official Python runtime as base image
FROM python:3.8

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Run server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


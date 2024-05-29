#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies using pip
pip install -r requirements.txt

# Navigate to the backend directory
cd backend

# Collect static files
python manage.py collectstatic --no-input

# Apply database migrations
python manage.py migrate
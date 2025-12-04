#!/bin/bash

# FastAPI RAG Server Startup Script
# This starts the backend server for the Physical AI textbook chatbot

echo "Starting Physical AI RAG Backend Server..."
echo "=========================================="

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
source .venv/bin/activate

# Install dependencies if needed
echo "Installing dependencies..."
pip install -q -r backend/requirements.txt

# Start server
echo ""
echo "Starting FastAPI server on http://localhost:8000"
echo "API Documentation available at: http://localhost:8000/docs"
echo "Press Ctrl+C to stop"
echo ""

cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

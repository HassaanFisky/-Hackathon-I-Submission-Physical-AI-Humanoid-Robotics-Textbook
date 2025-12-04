#!/bin/bash

# Demo RAG Query Script
# Tests the selection-based RAG functionality

echo "Physical AI RAG Chatbot Demo"
echo "============================"
echo ""

# Test 1: Query with selection
echo "Test 1: Query with selected text"
echo "---------------------------------"
curl -X POST "http://localhost:8000/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is Physical AI?",
    "selected_text": "Physical AI represents a paradigm shift in artificial intelligence—moving from purely digital, cloud-based systems to embodied intelligence that interacts directly with the physical world"
  }'

echo -e "\n\n"

# Test 2: Query without selection
echo "Test 2: Query without selected text"
echo "------------------------------------"
curl -X POST "http://localhost:8000/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Tell me about humanoid robots"
  }'

echo -e "\n\n"

# Test 3: Health check
echo "Test 3: Health Check"
echo "--------------------"
curl "http://localhost:8000/health"

echo -e "\n"

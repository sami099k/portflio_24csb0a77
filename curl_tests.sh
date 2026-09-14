#!/bin/bash

# Curl test suite for Portfolio Express Backend API (Endpoints B1-B7)
BASE_URL="http://localhost:5000"

echo "========================================================"
echo "Portfolio Backend API Test Suite (B1-B7)"
echo "========================================================"

echo -e "\n1. [B1] GET / (Health Check)"
curl -s -i "$BASE_URL/"

echo -e "\n\n2. [B2] GET /api/projects (Project List)"
curl -s -i "$BASE_URL/api/projects"

echo -e "\n\n3. [B3] GET /api/projects/1 (Single Project - Valid ID)"
curl -s -i "$BASE_URL/api/projects/1"

echo -e "\n\n4. [B3] GET /api/projects/999 (Single Project - Invalid ID 404)"
curl -s -i "$BASE_URL/api/projects/999"

echo -e "\n\n5. [B4] POST /api/contact (Valid Submission 201)"
curl -s -i -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","subject":"Hiring","message":"Great portfolio!"}' \
  "$BASE_URL/api/contact"

echo -e "\n\n6. [B4] POST /api/contact (Missing Fields 400)"
curl -s -i -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}' \
  "$BASE_URL/api/contact"

echo -e "\n\n7. [B4] POST /api/contact (Invalid Email 400)"
curl -s -i -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"invalidemail","message":"Hello"}' \
  "$BASE_URL/api/contact"

echo -e "\n\n8. [B5] GET /api/contact (List Submissions)"
curl -s -i "$BASE_URL/api/contact"

echo -e "\n\n9. [B6] GET /api/doesnotexist (Catch-all 404 Route)"
curl -s -i "$BASE_URL/api/doesnotexist"

echo -e "\n\n========================================================"
echo "All tests complete!"
echo "========================================================"

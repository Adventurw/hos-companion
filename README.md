# HOS Companion

A full-stack web application that assists commercial drivers in planning trips while monitoring **Hours of Service (HOS)** cycle usage.

The application generates multi-stop routes using the **Geoapify Routing API**, visualises them on an interactive map, provides turn-by-turn navigation, analyses remaining driving hours, and exports trip reports as PDF documents.

---

## 📸 Demo

### Live Application
https://hos-companion.vercel.app/

### Backend API
https://aymenshakil.pythonanywhere.com

---

# Features

- Route generation between multiple locations
- Interactive route visualisation using Leaflet
- Turn-by-turn driving instructions
- Trip summary
  - Distance (km & miles)
  - Estimated driving duration
- Hours of Service (70-hour cycle) analysis
- Remaining driving hours calculation
- Visual HOS progress bar
- Risk level indicator
  - Safe
  - Approaching Limit
  - Critical
- Export complete trip report as PDF
- Responsive user interface

---

# Tech Stack

## Frontend

- React
- Vite
- Axios
- Tailwind CSS
- React Leaflet
- Leaflet
- html2pdf.js

---

## Backend

- Django
- Django REST Framework
- django-cors-headers
- Python

---

## APIs

- Geoapify Geocoding API
- Geoapify Routing API

---

# Project Structure

```
hos-companion/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── api/
│   │   ├── services/
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

# Application Workflow

1. User enters:

   - Current Location
   - Pickup Location
   - Drop-off Location
   - Current HOS Cycle Used

2. Frontend sends a POST request to the Django REST API.

3. Backend:

   - Geocodes each location
   - Requests the optimal route from Geoapify
   - Simplifies the routing response
   - Returns:
     - route geometry
     - instructions
     - summary
     - location coordinates

4. Frontend:

   - Displays trip statistics
   - Draws the route on the map
   - Shows markers
   - Calculates remaining HOS
   - Generates a downloadable PDF report

---

# Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/hos-companion.git

cd hos-companion
```

---

# Backend Setup

Navigate into the backend.

```bash
cd backend
```

Create a virtual environment.

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Create a `.env` file.

```
GEOAPIFY_API_KEY=YOUR_API_KEY
```

Apply migrations.

```bash
python manage.py migrate
```

Run the development server.

```bash
python manage.py runserver
```

Backend will run on

```
http://127.0.0.1:8000
```

---

# Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install packages.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# API Endpoint

## Generate Route

**POST**

```
/api/route/
```

### Request

```json
{
    "current_location": "Dallas, TX",
    "pickup_location": "Houston, TX",
    "dropoff_location": "Austin, TX",
    "cycle_used": 25
}
```

---

### Response

```json
{
  "trip": {},
  "locations": {},
  "route": {
      "summary": {},
      "geometry": [],
      "instructions": []
  }
}
```

---

# Hours of Service Logic

The application currently models the **70-hour / 8-day HOS cycle**.

The remaining available driving hours are calculated as:

```
Remaining Hours = 70 − Cycle Used
```

Risk levels are determined as:

| Remaining Hours | Status |
|-----------------|--------|
| > 20 hrs | Safe |
| 10–20 hrs | Approaching Limit |
| ≤ 10 hrs | Critical |

---

# Deployment

## Frontend

Vercel

## Backend

PythonAnywhere

---

# Future Improvements

- Driver authentication
- Trip history
- Database integration
- Real-time GPS tracking
- Fuel optimisation
- Multiple vehicle support
- FMCSA compliance enhancements
- Mobile application
- Driver dashboard
- HOS log persistence
- User accounts
- Email trip reports

---

# Acknowledgements

- Geoapify
- React
- Django REST Framework
- Leaflet
- Tailwind CSS
- Vercel
- PythonAnywhere

---

# License

This project is intended for educational and demonstration purposes.

MIT License.

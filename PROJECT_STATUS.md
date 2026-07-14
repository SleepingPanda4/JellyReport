# JellyReport Project Status & Development Handoff

## Project Overview

JellyReport is a self-hosted reporting system for Jellyfin servers.

The goal:

Allow Jellyfin users (family/friends) to report broken media directly from their devices while automatically collecting useful information:

* User
* Show/movie
* Season/episode
* Playback position
* Device
* Issue category
* Comments

The administrator receives notifications and can manage reports from a dashboard.

---

# Current Version

## Target Release

v0.1.0 — Foundation

Current status:

Approximately 60-70% complete.

---

# Environment

## Host

Linux LXC container

Project location:

```
/opt/JellyReport
```

---

# Docker Architecture

Current containers:

```
jellyreport_nginx
jellyreport_frontend
jellyreport_backend
```

Access:

```
http://YOUR-LXC-IP:10910
```

---

# Docker Compose

Current architecture:

```
frontend
    |
    |
nginx
    |
    |
backend
```

Nginx exposes:

```
10910:80
```

Frontend is internal only.

Backend is internal only.

---

# Frontend

Technology:

* React
* TypeScript
* Vite
* Tailwind foundation
* Nginx production container

Location:

```
frontend/
```

Current functionality:

✅ React loads
✅ Frontend container builds
✅ Frontend served through nginx
✅ Backend status check works

Current UI:

```
JellyReport

System Status

Backend: ONLINE
```

---

# Backend

Technology:

* FastAPI
* SQLAlchemy
* SQLite
* Uvicorn

Location:

```
backend/app
```

Current structure:

```
backend/

├── Dockerfile
├── requirements.txt

└── app

    ├── main.py
    ├── database.py
    ├── dependencies.py
    ├── config.py
    ├── logging.py
    ├── models.py
    ├── schemas.py

    ├── routers
    │
    └── services
```

---

# Database

Working:

SQLite database created successfully.

Database location:

```
config/jellyreport.db
```

---

# Current Backend Status

Working:

✅ FastAPI startup
✅ Health checks
✅ Database creation
✅ API docs

Swagger:

```
http://YOUR-LXC-IP:10910/api/docs
```

---

# Important Docker Import Lesson

Backend Dockerfile copies:

```
COPY app .
```

Meaning inside container:

```
/app
├── main.py
├── routers
└── services
```

NOT:

```
/app/app
```

Therefore imports must use:

Correct:

```python
from routers import jellyfin
```

Incorrect:

```python
from app.routers import jellyfin
```

---

# Jellyfin Integration (Current Feature)

We are currently building:

## Jellyfin Connection Testing

Goal:

```
React
 |
 |
FastAPI
 |
 |
Jellyfin API
```

---

# Files Added

## backend/app/services/jellyfin.py

Purpose:

Handles Jellyfin communication.

Current code:

```python
import requests


class JellyfinClient:

    def __init__(self, url: str, api_key: str):
        self.url = url.rstrip("/")
        self.api_key = api_key


    def get_server_info(self):

        response = requests.get(
            f"{self.url}/System/Info",
            headers={
                "X-Emby-Token": self.api_key
            },
            timeout=10
        )

        response.raise_for_status()

        return response.json()
```

---

## backend/app/routers/jellyfin.py

Purpose:

API endpoint.

Planned endpoint:

```
POST /api/jellyfin/test
```

Function:

* Receive Jellyfin URL
* Receive API key
* Contact Jellyfin
* Return server information

---

# Current Issue Resolution

We fixed:

```
ModuleNotFoundError: No module named 'app'
```

Cause:

Docker changed the filesystem layout.

Fixed by changing imports:

main.py:

```python
from routers import jellyfin
```

router:

```python
from services.jellyfin import JellyfinClient
```

Added:

```
backend/app/routers/__init__.py
backend/app/services/__init__.py
```

---

# GitHub Status

Repository:

Public GitHub repository.

Completed:

✅ Git initialized
✅ Initial commits pushed
✅ README started
✅ .gitignore created

Planned:

* Issue templates
* Contribution guide
* Security policy
* Changelog
* CI workflow

---

# Development Roadmap

## v0.1.0 Foundation

Completed:

✅ Docker setup
✅ React frontend
✅ FastAPI backend
✅ SQLite database
✅ Setup foundation
✅ API documentation

Remaining:

⬜ Jellyfin connection test
⬜ Save verified Jellyfin configuration
⬜ Dashboard
⬜ Settings page

---

# v0.2.0 Reporting

Planned:

* Report database model

* Report submission API

* Categories:

  * Playback issue
  * Audio problem
  * Subtitle issue
  * Wrong episode
  * Other

* Report history

* Resolve reports

---

# v0.3.0 Notifications

Planned:

* Discord webhook
* ntfy
* Email
* Notification templates

---

# v0.4.0 Polish

Planned:

* Modern dashboard
* Statistics
* Mobile UI
* Dark Jellyfin-inspired theme

---

# Future Ideas

Possible features:

* Automatic media lookup
* Playback metadata capture
* Screenshots
* Activity feed
* Diagnostics page
* Multiple Jellyfin servers
* Analytics
* Jellyfin plugin integration

---

# Development Style

Continue using:

* Small milestones
* Frequent testing
* Git commits after working features

Commit style:

```
feat: add Jellyfin connection test

fix: repair backend import path

docs: update README
```

---

# Immediate Next Task

Continue from:

"JellyReport backend is running again."

Next steps:

1. Verify:

```
/api/docs
```

shows:

```
POST /api/jellyfin/test
```

2. Test endpoint manually.

3. Build React setup screen:

* Jellyfin URL field
* API key field
* Test Connection button
* Success/error display

4. Save verified configuration.

---

# Project Vision

JellyReport should become a polished open-source Jellyfin companion app.

The core experience:

User watching media:

↓

Something is wrong

↓

Press Report Problem

↓

JellyReport automatically knows:

* What they watched
* Who reported it
* Where it happened
* When it happened

↓

Administrator receives a complete issue report.

This is the heart of JellyReport.

# 🎵 Music Streaming Database System

A fully normalized relational database design for a **Music Streaming Platform**, implemented using **Django ORM** with a **PostgreSQL** backend.  
This project models real-world systems like Spotify, focusing on **data integrity, scalability, and analytical capability**.

---

## 📌 Project Overview

This project demonstrates the complete lifecycle of database system design:

- Conceptual modeling (ER Design)
- Relational schema design
- Normalization up to **Third Normal Form (3NF)**
- Implementation using Django + PostgreSQL
- Complex SQL query execution

---

## 🏫 Institution

**Tribhuvan University**  
Institute of Engineering, Pulchowk Campus  

**Department:** Electronics and Computer Engineering  

---

## 👨‍💻 Authors

- **Subesh Yadav** (080BCT084)
- **Prabesh BC** (080BCT054)

---

## 🎯 Objectives

- Design a complete **ER model** for a music streaming system
- Convert ER model into a **relational schema**
- Normalize database to **3NF**
- Implement schema using **Django ORM**
- Perform **advanced SQL queries** (joins, CTEs, aggregations)
- Ensure **data integrity and performance optimization**

---

## 🚀 Features

### 👤 User System
- User registration & authentication
- Artist profiles (linked to users)
- Social follow system

### 🎶 Music Management
- Artists, Albums, Tracks
- Genre classification (M:N relationship)
- Track metadata and streaming support

### 📂 Playlists
- Create and manage playlists
- Ordered track storage

### ❤️ Engagement
- Likes & Favorites (Track, Playlist, Artist)
- Play history tracking

### 📊 Analytics
- Track statistics (plays, likes)
- Trending tracks (daily, weekly, monthly)

### 🔔 Notifications
- Event-based user notifications

---

## 🧱 Database Design

### Key Entities

- User
- Artist
- Album
- Track
- Playlist
- Genre
- PlayHistory
- TrackStat
- TrendingTrack
- Notification

### Relationship Highlights

| Relationship | Type |
|-------------|------|
| Artist → Track | 1:N |
| Album → Track | 1:N |
| Playlist ↔ Track | M:N |
| Track ↔ Genre | M:N |
| User ↔ User (Follow) | M:N |

---

## 🧪 Normalization

The database is normalized to:

- ✅ **1NF** – Atomic attributes
- ✅ **2NF** – No partial dependencies
- ✅ **3NF** – No transitive dependencies

### Key Design Decisions

- Separate `TrackStat` for performance optimization
- Junction tables for all M:N relationships
- `Artist` as extension of `User` (1:1)
- No redundant attribute storage

---

## 🛠️ Tech Stack

### Backend
- Python
- Django
- Django REST Framework

### Database
- PostgreSQL

### Frontend
- React (Vite)
- Axios

### Tools
- JWT Authentication (SimpleJWT)
- django-cors-headers

---

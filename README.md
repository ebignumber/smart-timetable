# Smart Timetable Generator

A web-based timetable management system that allows schools/colleges to easily create, manage, and view timetables for teachers, classes, subjects, and rooms.

## 🚀 Features
- 🔐 User Authentication (Register/Login)
- 📅 Create & Save Timetables
- 👨‍🏫 Teacher-wise, Day-wise, Subject-wise, and Room-wise Views
- ⚠️ Conflict Detection (detects teacher/room clashes)
- 💾 Auto-save & Load Last Saved Timetable
- 🖨️ Print-friendly Layout (for PDF export)
- 🌐 Built with **React, Node.js, Express, MongoDB**

## 🛠️ Tech Stack
**Frontend:** React, TailwindCSS, Axios  
**Backend:** Node.js, Express  
**Database:** MongoDB (Mongoose)  

## 📂 Project Structure
smart-timetable/
│── backend/ # Node.js + Express server
│── frontend/ # React application
│── README.md
│── CONTRIBUTING.md
│── CODE_OF_CONDUCT.md
│── LICENSE

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/smart-timetable.git
cd smart-timetable
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Setup Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend will run at http://localhost:5173
Backend will run at http://localhost:5000

💡 Usage

Register/Login as a user.

Create a timetable by assigning teachers, subjects, and rooms.

Save timetable → Data is stored in MongoDB.

Reload → Last saved timetable is auto-loaded.

Switch to Teacher/Day/Subject/Room views for quick access.


## 📸 Screenshots

### Homepage
![Homepage](./assets/app-homepage.jpeg)

### Timetable View
![Timetable](./assets/timetable-view.jpeg)


🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

📜 Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md).

📄 License

This project is licensed under the [MIT License](LICENSE).





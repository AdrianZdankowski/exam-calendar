# exam-calendar

## How to run 🚀

### Prerequisites 📖
Generate a 512 bit JWT Secret. You can do it on [jwtsecrets.com](https://jwtsecrets.com/)

---

### 1. Clone the repository

```bash
git clone https://github.com/AdrianZdankowski/exam-calendar.git
cd exam-calendar
```

---

### 2. Run the gateway microservice
```bash
cd backend/exam-calendar/ApiGateway
dotnet restore
dotnet run
```

Service will be running on [http://localhost:5282](http://localhost:5282)

---

### 3. Run the authorization microservice
```bash
cd backend/exam-calendar/authService
dotnet restore
dotnet user-secrets init
dotnet user-secrets set "JwtToken:Token" "YOUR GENERATED 512 BIT JWT SECRET"
dotnet run
```

Service will be running on [http://localhost:5280](http://localhost:5280)
Application can be tested on [http://localhost:5280/scalar](http://localhost:5280/scalar)

---

### 4. Run the task microservice
```bash
cd backend/exam-calendar/authService
dotnet restore
dotnet user-secrets init
dotnet user-secrets set "JwtToken:Token" "YOUR GENERATED 512 BIT JWT SECRET"
dotnet run
```

Service will be running on [http://localhost:5281](http://localhost:5280)
Application can be tested on [http://localhost:5281/scalar](http://localhost:5280/scalar)

---

### 5. Run the frontend application
```bash
cd frontend/exam-calendar
npm install
npm run dev
```

Application will be available on [http://localhost:5173](http://localhost:5173)

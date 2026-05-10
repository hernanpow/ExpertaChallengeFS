# Invoice Management System

Full Stack application for invoice management, built with Spring Boot and React.

---

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.5.14
- Spring Data JPA / Hibernate
- H2 Database (in-memory)
- Maven
- Swagger / OpenAPI 3

### Frontend
- React 18 + Vite
- Tailwind CSS
- shadcn/ui
- Axios

---

## Project Structure

```
invoice-api/
├── backend/    ← Spring Boot REST API
└── frontend/   ← React application
```

---

## Getting Started

### Prerequisites
- Java 21
- Node.js 18+
- Maven

---

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Run the application:

```bash
./mvnw spring-boot:run
```

The API will be available at:

```
http://localhost:8080
```

#### Useful URLs

| URL | Description |
|-----|-------------|
| `http://localhost:8080/swagger-ui.html` | Swagger UI |
| `http://localhost:8080/h2-console` | H2 Database Console |

#### H2 Console Configuration

```
JDBC URL:  jdbc:h2:mem:invoicedb
Username:  sa
Password:  (empty)
```

---

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

> Make sure the backend is running before starting the frontend.

---

## API Endpoints

### Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/customers` | Create a new customer |
| `GET` | `/api/customers` | Get all customers |

#### POST /api/customers — Request body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main Street"
}
```

---

### Invoices

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/invoices` | Create a new invoice with items |

#### POST /api/invoices — Request body

```json
{
  "customerId": 1,
  "items": [
    {
      "productName": "Product A",
      "quantity": 2,
      "unitPrice": 100.00
    },
    {
      "productName": "Product B",
      "quantity": 1,
      "unitPrice": 50.00
    }
  ]
}
```

---

## Features

- Customer management (create and list)
- Invoice creation with multiple items
- Duplicate product validation (frontend and backend)
- Automatic subtotal and total calculation
- Global error handling
- Input validations
- REST API documentation with Swagger
- Confirmation dialog before invoice submission

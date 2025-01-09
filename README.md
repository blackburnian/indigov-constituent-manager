# **Constituent Manager App**

A Next.js application for managing constituent contact information for elected officials.

---

## **Table of Contents**

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Getting Started](#getting-started)
- [Database Details](#database-details)
- [Learn More](#learn-more)
- [Decisions I Made](#decisions-i-made)
- [What’s Next](#whats-next)

---

## **Prerequisites**

Before setting up and running the project, ensure you have the following installed:

1. **Docker**

   - Install Docker: [Get Started with Docker](https://www.docker.com/get-started)
   - Confirm installation by running:
     ```bash
     docker --version
     ```

2. **Node.js**

   - Install [Node.js](https://nodejs.org/) or [NVM](https://github.com/nvm-sh/nvm)
   - Confirm installation by running:
     ```bash
     node --version
     ```

3. **MySQL Client (Optional)**
   - Install a MySQL client for database interaction:
     - GUI tools like [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).
     - Or use the command-line MySQL client.

---

## **Setup Instructions**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/constituent-manager.git
cd constituent-manager
```

### 2. Set Up the Docker Container for the Database

```bash
docker run --name constituent-manager \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=constituents_db \
  -p 3306:3306 \
  -d mysql:latest
```

### 3. Create the `.env.local` File

Add the following environment variables in a `.env.local` file at the root of the project:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=constituents_db
```

### 4. Create the `constituents` Table

Connect to the MySQL Docker container and create the table.

#### **Step 1: Connect to the Database**

```bash
docker exec -it constituent-manager mysql -u root -p
```

#### **Step 2: Select the Database**

```sql
USE constituents_db;
```

#### **Step 3: Create the Table**

```sql
CREATE TABLE constituents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## **Getting Started**

Install dependencies and run the development server:

```bash
npm i
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

You can start editing the app by modifying files in the `app/` directory. The page auto-updates as you edit.

---

## **Database Details**

### **Sample Data**

Here’s an example query to populate the database with sample data:

```sql
INSERT INTO constituents (first_name, last_name, email, street_address, city, state, zip_code, created_at)
VALUES
('John', 'Doe', 'john.doe@example.com', '123 Main St', 'Springfield', 'IL', '62704', '2022-03-15 10:30:00'),
('Jane', 'Smith', 'jane.smith@example.com', '456 Elm St', 'Madison', 'WI', '53703', '2023-05-20 15:45:00');
```

### **Endpoints**

- **`GET /api/constituents`**: Gets a list of constituent data sorted by most recently added.
- **`POST /api/constituents/add`**: Adds or updates constituent data.
- **`GET /api/constituents/export?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`**: Exports constituent data as a CSV file, filtered by date.

---

## **Learn More**

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – Explore features and APIs.
- [Learn Next.js](https://nextjs.org/learn) – Interactive Next.js tutorial.

---

## **Decisions I Made**

Here are some of the key decisions I made while developing this project:

1. **Next.js as the Framework**:

   - I chose Next.js because it comes out of the box with server-side rendering (SSR) and API routes, and because I'm familiar with it.

2. **Database Choice: MySQL**:

   - MySQL was selected for its familiarity, performance, and compatibility with Docker.

3. **Dockerized Database**:

   - Running the database in a Docker container ensures consistency across development environments.

4. **Tailwind**:

   - I chose this for it's quick and easy styling.

## **What’s Next**

If I had more time, I would focus on the following improvements:

1. **Testing**:

   - Add unit and integration tests to ensure stability and prevent regressions.

2. **Styling and Responsiveness**:

   - Clean up the styles and make the application fully responsive.
   - Fix issues with the export modal and datepickers. I attempted to use a Tailwind plugin called Flowbite but struggled with some of its implementation. Further time spent on this would improve the UI.

3. **Pagination**:

   - Implement pagination for the constituent list to handle larger datasets more efficiently.

4. **CSV Date Formatting**:

   - Enhance the exported CSV by formatting dates for better readability.

5. **Split Frontend and Backend**:

   - While I used Next.js API routes for simplicity, splitting the frontend and backend could help with scaling. For the backend, I would consider using NestJS, which pairs well with a Next.js frontend.

6. **Improved Success/Error Handling**:

   - Enhance the user interface to provide better feedback for success and error states.

7. **Validation**:

   - Add thorough frontend and backend validation for all input fields to ensure data integrity and improve user experience.

8. **Extra credit**
   - I'd add more of the extra credit capabilities - search, sort, filter, upload CSV, auth, etc.

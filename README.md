<!-- # **Assignment: Full-Stack CRUD Application Development with DevOps Practices**

## **Objective**

You have been provided with a starter project that includes user authentication using  **Node.js, React.js, and MongoDB**. Your task is to extend this application by implementing **CRUD (Create, Read, Update, Delete) operations** for a real-world application of your choice, while following industry best practices such as:

* **Project Management with JIRA**
* **Requirement Diagram using SysML**
* **Version Control using GitHub**
* **CI/CD Integration for Automated Deployment**

## **Requirements**

### **1. Choose a Real-World Application**

Select a meaningful use case for your CRUD operations. We will provide the list, you have to select it.

### **2. Project Management with JIRA and SysML**

* Create a **JIRA project** and define:
  * **Epic**
  * **User Stories** (features required in your app)
  * **Child issues & Subtasks** (breaking down development work)
  * **Sprint Planning** (organizing work into milestones)
* Document your JIRA **board URL** in the project README.
* Draw a requirements diagram

### **3. Backend Development (Node.js + Express + MongoDB)**

* Create a user-friendly interface to interact with your API (Some portion developed, follow task manager app)).
* Implement **forms** for adding and updating records.
* Display data using  **tables, cards, or lists (Follow how we showed data in task manager app)**

### **4. Frontend Development (React.js)**

* Create a user-friendly interface to interact with your API (**Some portion developed, follow task manager app)**.
* Implement **forms** for adding, showing, deleting and updating records (CRUD).
* Display data using  **tables, cards, or lists (Follow how we showed data in task manager app)**

### **5. Authentication & Authorization**

* Ensure **only authenticated users** can access and perform CRUD operations. (Already developed in your project)
* Use **JWT (JSON Web Tokens)** for user authentication (Use the task manager one from .env file).

### **6. GitHub Version Control & Branching Strategy**

* Use **GitHub for version control** and maintain:
  * `main` branch (stable production-ready code)
  * Feature branches (`feature/xyz`) for each new functionality
* Follow proper **commit messages** and  **pull request (PR) reviews** .

### **7. CI/CD Pipeline Setup**

* Implement a **CI/CD pipeline using GitHub Actions** to:
  * Automatically **run tests** on every commit/pull request (Optional).
  * Deploy the **backend** to **AWS** .
  * Deploy the **frontend** to **AWS**.
* Document your  **CI/CD workflow in the README** .

## **Submission Requirements**

* **JIRA Project Board URL** (user stories ).
* **Requirment diagram** (Using project features)
* **GitHub Repository** (`backend/` and `frontend/`).
* **README.md** with:-->



  * JIRA Project Board URL:
      https://qutchrislee.atlassian.net/jira/software/projects/TASK/boards/4?atlOrigin=eyJpIjoiYzhiMjI2MTk1NTVlNGVjODk4ZDdiN2MyM2FiYjQ0MzgiLCJwIjoiaiJ9

  * Project setup instructions. 

Prerequisite:
Please install the following software:
  • Nodejs [https://nodejs.org/en] - Version should be 22.
  • Git [https://git-scm.com/]
  • VS code editor [https://code.visualstudio.com/]
Create account in following web tools:
  • MongoDB Account [https://account.mongodb.com/account/login]
  • GitHub Account [https://github.com/signup?source=login]

Clone the Task Manager Application
    Open your terminal and run the following command to clone the existing repository:
      git clone https://github.com/chrislee3405/Assignment.git

    Go to the project directory
      cd Assignment

Connect github repository
    Remove the original remote link:
      git remote remove origin

    Add your own github repository as the remote
      git remote add origin https://github.com/chrislee3405/Assignment.git

    Verify the new remote
      git remote -v

Push the Cloned Code to Your Repository
    Rename the default branch
      git branch -M main

    Push the code to your new GitHub repository
      git push -u origin main

Open Project in Visual Studio
    Open the Assignment project in Visual Studio

Connect Cloud MongoDB
    Create a New Cluster
    
    Add a new database user 
      set privilege as read and write
      jot down the password

    Add a whitelist IP address
      add a new IP address 0.0.0.0/0

    Connect to the Cluster
      Click connect and then copy the Connection string

Set the Connection String in Assignment Application
    update MONGO_URI from the .env file with the Connection string
      MONGO_URI=< Put the Connection string Here >

    replace the <db_password> to password in the Connection string

Install Project Dependencies
    Open terminal, go to the project folder and run the following command 
      npm run install-all 

Run the Project
    Execute the following command to start the webpage
      npm start





  * CI/CD pipeline details.

Source Code Management
    Version Control: Use Github repository to manage version
    Branching Strategy: set up a main branch for completed version code

CI workflow
    CI start: setting up the CI workflow to trigger pushing code to github
    Workflow: CI process process can be found in .github/workflows/ci.yml
    Build and Test: Use Node.js to run the application
                    use Yarn to nnstall dependencies
                    Run backend tests with npm test
    Test Cases: Ensure tests check for successful task creation and error handling

CD workflow
    Deployment Pipeline: Deploy CI workflow to AWS
    Environment Setup: Create an EC2 instance to host the application.
                       Use Nginx as a reverse proxy to handle incoming requests.
    Service Management: Use pm2 to manage Node.js application processes
    Environment Variables: Create environment secret MONGO_URI, JWT_SECRET and PORT in github

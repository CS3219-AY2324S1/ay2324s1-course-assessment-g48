[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

<h1 >CS3219-AY23-24-Project-Group-48 <img src="https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g48/assets/96603198/8581c2f3-7694-4339-8cd8-6d55e71fa659" height=auto width="50" style="vertical-align: middle;"> </h1>

## LeetPal - Elevate Your Interview Preparation 🚀

Access LeetPal [here](http://www.leetpal.com/).

LeetPal is your go-to online platform for interview preparation, offering a comprehensive suite of features designed to enhance your skills and boost your confidence.


## Key Features:
- **Practice Questions:** Sharpen your coding and problem-solving skills with a diverse range of practice questions.
  
- **Collaborative Environment:** Engage in collaborative mock interviews with peers to simulate real-time interview scenarios.

- **Progress Tracking:** Track your coding progress and performance with LeetPal's convenient history feature.
  
- **Skill Enhancement:** Improve your communication skills and problem-solving abilities in a supportive and interactive environment.

---

## Guide to test on local environment

#### Prerequisites: 
- Git
- Docker and Docker Compose
- Web Browser
- .env & .env.dev files placed into each microservice folders and frontend folder. Please refer to the `.env.example` files for the required environment variables.


#### Available users for testing:

| Username | Password | Role     |
|----------|----------|----------|
| admin@gmail.com      | Password123     | admin      |
| tester1@gmail.com      | Password123      |normal user |

#### Setting up for success:
1. Clone the repository
```bash
git clone git@github.com:CS3219-AY2324S1/ay2324s1-course-assessment-g48.git
```
2. Navigate to the root folder and enter the following command to install all the dependencies.
```bash
yarn install-all
```
3. Navigate to the /apps/backend/user directory. Run this command to set up database.
```bash
npx prisma migrate dev
```
---
### Local Native Environment:

####  **Steps:**
1. At the root directory, run the following:
```bash
yarn dev
```
2. Open the browser and go to http://localhost:3000.

<br></br>

### Local Docker environment:

####  **Steps:**

1. At the root directory, to build and run all microservices on Docker:
```bash
chmod +x dev.sh
# For macOS and Windows
dev.sh

# For Linux
./dev.sh
```
2. To stop the services, tear down the containers using:
```bash
chmod +x ./dev_down.sh

# For macOS and Windows
dev.sh

# For Linux
./dev_down.sh
```

### 📚 Documentation
For detailed information and usage guidelines, refer to our Documentation.

### 🤝 Contributing
We welcome contributions! If you'd like to enhance LeetPal or fix any issues, don't hesitate to reach out.

### 📬 Contact
Have questions or suggestions? Feel free to reach out to us at deployment87@gmail.com.

### 📝 License
This project is licensed under the MIT License.

Thank you for choosing LeetPal! Happy coding! 🚀

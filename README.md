# CS3219-AY22-23-Project-Group-58
---

![LeetPal Logo](image.png)

LeetPal at http://www.leetpal.com/

An online platform for interview preparation that offers practice questions and mock interviews with peers. Users can improve their coding, problem-solving, and communication skills in real-time and collaborative setting.

---

### Start all services locally for manual testing

#### Prerequisites : 
- Git
- Docker and Docker Compose
- Web Browser
- .env files placed into each microservice folders and frontend folder. Please refer to the `.env.example` files for the required environment variables.


Available users for testing:

| Username | Password | Role     |
|----------|----------|----------|
| {}      | {}      | admin      |
| {}      | {}      |normal user |

---
#### Steps:

##### Local environment setup:
1. Clone the repository
```bash
git clone git@github.com:CS3219-AY2324S1/ay2324s1-course-assessment-g48.git
```
2. Change directory to the repository, to apps. Do the following under frontend and each backend **microservices** folders:
```bash
yarn install
```
3. Change directory back to the root of the repository. Do the following under the root folder:
```bash
yarn dev
```
4. Open the browser and go to http://localhost:3000.

<br></br>

##### Docker environment setup:



# CS3219 G48

- [CS3219 G48](#cs3219-g48)
- [1. Project Introduction](#1-project-introduction)
  - [1.1 Background and Purpose of the Project](#11-background-and-purpose-of-the-project)
  - [1.2 Intended Audience and Reading Suggestions](#12-intended-audience-and-reading-suggestions)
  - [1.3 Project Scope](#13-project-scope)
  - [1.4 User stories](#14-user-stories)
  - [1.5 Generic User Flow](#15-generic-user-flow)
- [2. Software Specification](#2-software-specification)
  - [2.1 Functional Requirements](#21-functional-requirements)
  - [2.2 Non-Functional Requirements](#22-non-functional-requirements)
  - [2.3 Tech Stacks](#23-tech-stacks)
- [3. Developer Documentation](#3-developer-documentation)
  - [3.1 General Overview](#31-general-overview)
  - [3.2 Frontend](#32-frontend)
    - [3.2.1 Architecture](#321-architecture)
    - [→ Web Frameworks](#-web-frameworks)
    - [→ Components](#-components)
    - [3.2.2 Authentication](#322-authentication)
  - [3.3 Backend](#33-backend)
    - [3.3.1 Architecture Overview](#331-architecture-overview)
    - [3.3.2 Databases](#332-databases)
    - [→ MongoDB Entity-Relationship Model](#-mongodb-entity-relationship-model)
    - [→ PostgreSQL with Prisma Integration Model](#-postgresql-with-prisma-integration-model)
    - [3.3.4 Chat Microservice](#334-chat-microservice)
    - [→ High-level Overview](#-high-level-overview)
    - [→Design Considerations](#design-considerations)
    - [→Creation of Chatrooms](#creation-of-chatrooms)
    - [→Database Choice](#database-choice)
    - [3.3.5 Code Execution Microservice](#335-code-execution-microservice)
    - [→High-level Overview](#high-level-overview)
    - [3.3.6 Question Microservice](#336-question-microservice)
    - [→High-level Overview](#high-level-overview-1)
    - [3.3.7 History Microservice](#337-history-microservice)
    - [→High-level Overview](#high-level-overview-2)
    - [3.3.8 Queue Microservice](#338-queue-microservice)
    - [→High-level Overview](#high-level-overview-3)
    - [→Design Considerations](#design-considerations-1)
    - [→RabbitMQ](#rabbitmq)
    - [3.3.9 Session Microservice](#339-session-microservice)
    - [→High-level Overview](#high-level-overview-4)
    - [3.3.10 User Microservice](#3310-user-microservice)
    - [→High-level Overview](#high-level-overview-5)
  - [3.4 DevOps](#34-devops)
    - [3.4.1 Local Environment](#341-local-environment)
    - [3.4.2 Production Environment](#342-production-environment)
    - [3.4.5 Load Balancer](#345-load-balancer)
    - [3.4.4 Ingress Controller](#344-ingress-controller)
    - [3.4.5 Service Discovery](#345-service-discovery)
    - [3.4.6 Horizontal Pod Autoscaler](#346-horizontal-pod-autoscaler)
- [4. Future Work and Conclusion](#4-future-work-and-conclusion)
  - [4.1 Individual Contributions](#41-individual-contributions)
  - [4.2 Suggestions for Improvements and Enhancements](#42-suggestions-for-improvements-and-enhancements)
    - [4.2.1 Storing refresh token in a database](#421-storing-refresh-token-in-a-database)
    - [4.2.2 Microservice Testing](#422-microservice-testing)
    - [4.2.3 User Management System](#423-user-management-system)
    - [4.2.4 HTTP vs HTTPS](#424-http-vs-https)
    - [4.2.5 Scaling Chat Microservice](#425-scaling-chat-microservice)
    - [4.2.6 Self Hosted Judge 0](#426-self-hosted-judge-0)
    - [4.2.7 Queue auto-relaxation](#427-queue-auto-relaxation)
- [5. Reflections and Learning Points](#5-reflections-and-learning-points)
  - [5.1 What went well](#51-what-went-well)
  - [5.2 What did not went well](#52-what-did-not-went-well)
  - [5.3 Learning Points](#53-learning-points)
    - [5.3.1 Importance of Timing Updates and Clear Communication](#531-importance-of-timing-updates-and-clear-communication)
    - [5.3.2 Addressing Deployment Challenges](#532-addressing-deployment-challenges)


# 1. Project Introduction

## 1.1 Background and Purpose of the Project

Technical interviews are a pivotal component in the recruitment process within the software industry. They serve as a practical assessment of a candidate’s problem-solving abilities, coding proficiency, and communication skills. However, candidates often grapple with challenges such as articulating their thought process clearly, managing interview anxiety, effectively utilizing the allotted time, and demonstrating their problem-solving prowess under the watchful eyes of the interviewer.

Recognizing these hurdles, our team has meticulously designed an innovative online platform dedicated to interview preparation. This platform provides an interactive environment where users can practice and hone their skills on a wide array of technical interview questions. But what sets this platform apart is its unique feature that allows users to engage in mock interviews with peers online. This peer-to-peer interaction not only simulates a real interview scenario but also fosters a collaborative learning space.

By providing immediate feedback and fostering a supportive community, our platform empowers users to learn from each other’s strengths and weaknesses. It encourages users to think out loud, articulate their problem-solving approach, and handle the pressure of solving complex problems within a limited time frame. This comprehensive preparation strategy equips aspiring software developers with the confidence and skills needed to excel in their technical interviews and secure their dream job in the software industry.

## 1.2 Intended Audience and Reading Suggestions

This project is intended for anyone who is interested in improving their technical interview skills and landing a job in the software industry. Whether you are a beginner or an expert, you will find this platform useful and engaging. You will be able to practice on various topics such as data structures, algorithms, system design, and more. You will also be able to connect with other users who share your passion and goals.

- **[Project Scope](#13-project-scope)**: This section will give you an overview of the features and functionalities of our platform, as well as the limitations and assumptions we made during the development process.
- **[Software Specification](#2-software-specification)**: This section will describe the needs and expectations of our target users, as well as the user personas we created to represent them.
- **[Development Documentation](#3-developer-documentation)**: This section will explain the design and implementation of our platform, including the technologies, frameworks, and tools we used.
- **[Future Work and Conclusion](#4-future-work-and-conclusion)**: This section will summarize the main contributions and achievements of our project, as well as the challenges and difficulties we faced. It will also suggest some possible improvements and extensions for future work.

## 1.3 Project Scope

- **Objective**: The main objective of this project is to develop an online platform that helps users prepare for technical interviews in the software industry by providing them with practice questions and mock interviews with peers.
- **Features**: The platform will have the following features:
    - A database of technical interview questions covering various topics and difficulty levels.
    - An interactive coding environment where users can write, run, and test their code.
    - A peer-to-peer matching system that connects users with similar skill levels and interests for mock interviews.

## 1.4 User stories

| Index | As a … | I want to … | So that … |
| --- | --- | --- | --- |
| 1 | Student | Access a library of technical interview questions | Practice and improve my problem-solving skills |
| 2 | Job Seeker | Create a personalized profile on the platform | Showcase my technical skills and experiences |
| 3 | User | Have the platform offer a variety of programming languages for technical interview questions | Improve my versatility in different languages |
| 4 | User | Have the platform provide real-time code evaluation and feedback on my solutions | Improve my coding skills |
| 5 | Job Applicant | Simulate a timed technical interview | Better prepare for real interviews |
| 6 | Student | Collaborate with others in a virtual whiteboard environment to solve complex problems | Enhance my problem-solving skills through collaboration |
| 7 | User | Have access to a database of common data structures and algorithms | Improve my understanding of data structures and algorithms |
| 8 | Student | Have the platform provide description and explanations for challenging problems | Learn and understand better |
| 9 | User | Have the platform offer a mobile-accessible app | Practice conveniently on-the-go |
| 10 | Student | Be able to see my attempted interview questions | Refer to them in the future |
| 11 | Student | Conduct one-on-one mock interviews with mentors | Get personalized feedback and improve |
| 12 | Job Applicant | Have the platform offer a job matching feature | Connect with potential employers |

## 1.5 Generic User Flow

1. A student who is keen to prepare for his technical interviews visits the site.
2. He creates an account and then logs in and sets his username for the first time.
3. After logging in, the student selects the question difficulty level he wants to
attempt (Easy, Medium, or Hard). He can also select the question category
(such as questions about Array, Dynamic Programming, String, etc.)
4. The student then waits until he is matched with another online user who has
selected the same difficulty level and/or question category as him.
4.1 If he is not successfully matched after 30 seconds, he is prompted to try again
or adjust his criteria.
4.2 If he is successfully matched, the student and his peer are provided with the
question and a code editor and execution environment in which they can type their solution.
5. The code editor execution environment is updated in near-real time, allowing both the
student and his matched peer to collaborate on the provided question.
6. They can also choose to use chat features for communication.
6.1. After the students finish working on the question, either student can click on a
“Submit” button to save the question and their solution to the history for future reference.
7. To review the questions he has practiced so far, he visits his submissions history
page.
8. To view all the questions available, he visits the question bank page.
9. To view all the collaborative sessions he has been a part of, he visits the collaboration page. 
10. Once done, the student logs out.

# 2. Software Specification

## 2.1 Functional Requirements

| Functional Requirements | Sub-Requirements | Description |
| --- | --- | --- |
| F1: User Service | F1.1 Authorization | System provides a normal user role that is only able to view and solve questions (Mx) |
|  | F1.1.2  | System provides an admin role that is able to create and edit questions (Mx) |
|  | F1.1.3  | System includes session management for authentication (Mx) |
|  | F1.2 Authentication |  |
|  | F1.2.1 | Users must log in to access LeetPal’s features. (Mx) |
|  | F1.2.2 | Authentication should include secure password hashing (Mx) |
| F2: Matching Service | F2.1 Matching Preferences |  |
|  | F2.1.1 | System provides matching services based on the difficulty and language the user chooses (Mx) |
| F3: Question service | F3.1 Question Repository |  |
|  | F3.1.1 | System maintains a repository of coding questions categorized by difficulty levels and topics (Mx) |
|  | F3.1.2  | System provides CRUD operations for questions, which include creating, viewing, editing, and deleting (Mx) |
|  | F3.1.3  | System maintains a record of questions attempted by the user (Nx) |
|  | F3.2 Question Search |  |
|  |  F3.2.1  | System provides a searching function for questions based on specific criteria requested by the user. (Nx) |
| F4: Collaboration service | F4.1 Real-time collaboration |  |
|  | F4.1.1 | System uses WebSockets to ensure that users can edit code concurrently (Mx) |
|  | F4.1.2  | System provides a communication channel through text chat and/or voice/video call (Nx) |
|  | F4.1.3 | System provides a sandboxed environment to execute attempted solution/code (Nx) |
|  | F4.1.4 | System can handle concurrent modifications. |
|  | F4.1.5 | System can guarantee eventual consistency in the data across all users. |
| F5: Basic UI for user interaction | F5.1 Home Page |  |
|  | F5.1.1  | System provides a home page to explain what LeetPal is about. |
|  | F5.2 User Profile Page |  |
|  | F5.2.1  | System provides a profile page that allows the user to display and edit user details. |
|  | F5.3 Navigation Bar |  |
|  | F5.3.1  | System provides a panel for quick navigation around the application |
| F6: Deploying the application | F6.1 Deployment Process |  |
|  | F6.1.1 | Server should be deployed to a production environment. |
|  | F6.1.2 | Deployment should be automated to minimize human error. |
|  | F6.1.3  | Deployment of microservices should be done separately. |
|  | F6.2 Zero-Downtime Deployment |  |
|  | F6.2.1 | The deployment process should aim for zero-downtime deployments, minimizing disruption to end users |
|  | F6.3 Scalability |  |
|  | F6.3.1 | System should be designed to handle growth in terms of data volume, user load, and concurrent transactions. |
|  | F6.3 Security |  |
|  | F6.4.1 | Users should not have direct access to backend micro-services. All access should be mediated through well-defined APIs or service endpoints. |

## 2.2 Non-Functional Requirements

| Non-Functional Requirement | Sub-Requirement | Description |
| --- | --- | --- |
| NF1: Communication | NF1.1 Seamless communication service | The real-time collaborative space (e.g. text-based chat) should not have delays in responses of more than 10 seconds. (Nx) |
|  | NF1.2 Valid response display | The system must ensure that the responses received in the real-time collaborative space reflects what is sent by the sender (e.g. text displayed is correct) (Nx) |
| NF2: History | NF2.1 Personal | User can check on a record of questions they have attempted/solved |
|  | NF2.2 Other users | User can check on other users’ record of questions they have attempted/solved |
| NF3: Web Browser Compatibility | NF3.1 Browser Compatibility | The application should have browser compatibility with all major web browsers such as Google Chrome, Mozilla Firefox, and Safari. |
|  | NF3.2 | The application should work with the latest browser versions |
| NF4: Data Security | NF4.1 Data Encryption Protocols |  |
|  | NF4.2 | All sensitive user data must be encrypted at REST using industry-standard encryption algorithms |
| NF5: Scalability | NF5.1 | Application must be able to handle a minimum of 100 concurrent users without significant performance degradation. |
|  | NF5.2 | Application should be designed to scale horizontally to accommodate increased loads, potentially up to 1000 concurrent users. |

## 2.3 Tech Stacks

**Client:** React, React Router, Axios, NextJS, Tailwind CSS

**Server:** NodeJS, Express

**Containerization:** Docker, Docker Compose

**Cloud:** Google Cloud Platform (GCP)

**Authentication:** NextAuth.js

**Databases:** MongoDB, PostgreSQL

**Message Broker:** RabbitMQ

**DNS Server:** NameCheap

# 3. Developer Documentation

## 3.1 General Overview

![Diagram 1 Architecture Overview](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/HighLevelArchitectureDiagram.drawio.png)

Diagram 1 Architecture Overview

In our technological framework, we've embraced the **Microservices** architecture, leveraging the principles of **Domain Driven Design** to meticulously deconstruct the application into a suite of supportive microservices. The identification of these services is achieved through resource-based decomposition, with each microservice assuming comprehensive responsibility for all operations pertaining to a specific entity within our application. For instance, the `User Service` is entrusted with the comprehensive management of the user and their account, while the `Question Service` oversees the question bank and individual questions.

In an effort to maintain simplicity and manageability of dependencies, thereby facilitating development and debugging, we've endeavored to ensure that the services are independent of each other, fostering a unidirectional relationship. Consequently, all services are equipped to interface with the frontend and possess their own dedicated database to cater to their storage requirements. Interactions between the services are kept to a minimum as we've opted for **orchestration** over **choreography**.

The frontend, serving as the gateway for our user interaction, also functions as the conduit that communicates with the rest of the services for information exchange. For example, the frontend liaises with the user service to procure user information, which it subsequently relays to the other services when necessary, such as when the `Queue Service` necessitates user information to execute matching.

## 3.2 Frontend

### 3.2.1 Architecture

### → Web Frameworks

**Next.js**

**Client-Side Routing**

Next.js simplifies client-side routing by providing an intuitive routing system. We can simply add a new file to the `pages` directory to create a specific route in our application. For example, `matching.ts` in the `pages` directory will correspond to `/matching` route.

Next.js supports nested and dynamic routes as well. We can create nested directories within the `pages` directory to represent nested routes and we can use file names with square brackets to represent dynamic routes. For example, `/session/[sessionid].ts` can be mapped to routes like `/session/abc`, `/session/bcd`, etc.

Next.js also provides the `Link` component which allows us to navigate to different pages without triggering a full page reload, providing a smoother and faster navigation experience.

**API Routes for Server-Side Functionality**

In the context of our project, which leverages NextAuth.js for authentication, Next.js' API routes prove to be a strategic asset. These routes, established within the designated pages/api directory, facilitate the creation of serverless functions seamlessly integrated with our application.

This approach not only ensures efficiency but also maintains a well-organized codebase within the Next.js structure. By utilising these API routes, we can not only manage user authentication but also extend functionality in the future to fetch data, interact with databases, or execute any server-side computations.

**Tailwind CSS**

Compared to libraries such as MaterialUI or Bootstrap, Tailwind provides us with a more functional approach to styling by using utility classes that can be composed together to build components. This allows for flexibility and adaptability for different design requirements.

Additionally, Tailwind also provides conditional styles like `sm`, `md`, `lg` for small, medium and large respectively to cater for devices with different resolutions. It also has pseudo selectors such as `hover:` and `focus:` to handle state changes or `dark:` to render different colours when dark mode is enabled. In fact, LeetPal supports both dark mode and light mode, catering to different user preferences. We can toggle the current theme by pressing the sun icon beside the user image.

![Diagram 2 Dark mode for questions](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/DarkMode.png)

Diagram 2 Dark mode for questions

![Diagram 3 Light mode for questions](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/LightMode.png)

Diagram 3 Light mode for questions

Tailwind will also purge any unused utility classes from the final bundle in production, resulting in minimal dead code and faster page loads.

### → Components

The frontend consists of the following components at the high-level:

- Questions
- Chat
- Forms
- History
- Session

**Questions**

The `questions` folder is split up into two main parts:

- `questionTable`
- `questionPage`

**Question Table**

![Diagram 4 Class diagram of `QuestionTable`](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/QuestionTableClassDiagram.png)

Diagram 4 Class diagram of `QuestionTable`

When the user enters the `questions` page, they will first view the `questionTable` components which will display the current questions in our database. Related components such as `QuestionPagination.tsx` , `QuestionSearchBar.tsx` and different modals will also found in `questionTable` folder.

**Filtering and searching of questions**

At the top left of the question table, a user is able to filter by the category and difficulty of the questions they would like to view.

![Diagram 5 Questions filtered by the category ***Algorithms*** and the difficulty ***Medium.***](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/FilterQuestions.png)

Diagram 5 Questions filtered by the category ***Algorithms*** and the difficulty ***Medium.***

Users can directly search by the title of the question as well, by typing their search query in the top right corner of the question table.

![Diagram 6 Questions which titles contain the keyword “Ro”](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/SearchQuestions.png)

Diagram 6 Questions which titles contain the keyword “Ro”

**Add/Edit/Delete Question**

If a user has an admin role, they are able to add/edit/delete questions. The respective buttons normally hidden to a normal user will be shown to an admin user as seen below:

![Diagram 7 Add/Edit/Delete buttons shown for admin user](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/AddEditDeleteQuestion.png)

Diagram 7 Add/Edit/Delete buttons shown for admin user

Pressing the add button will bring up `AddQuestionModal` where the admin is able to insert details about the new question:

![Diagram 8 UI of `AddQuestionModal`](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/AddQuestionModal.png)

Diagram 8 UI of `AddQuestionModal`

Similarly, clicking edit on an existing question will bring up `EditQuestionModal` where the admin can edit the details of an existing question.

![Diagram 9 UI of `EditQuestionModal`](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/EditQuestionModal.png)

Diagram 9 UI of `EditQuestionModal`

> ℹ️ Note that Markdown is supported for text inputs.
> 

Lastly, when the admin clicks on the delete button, `DeleteCfmModal` will be shown to ensure that the admin indeed wants to delete this question:

![Diagram 10 UI of `DeleteCfmModal`](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/DeleteCfmModal.png)

Diagram 10 UI of `DeleteCfmModal`

**Question Workspace**

![Diagram 11 Class diagram of `QuestionWorkspace`](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/QuestionWorkspaceClassDiagram.png)

Diagram 11 Class diagram of `QuestionWorkspace`

Once a user clicks on a specific question, the user will be routed based on the corresponding question `[id]` and `QuestionWorkspace.tsx` in the `questionPage` folder will be rendered. It will consist of `QuestionDescriptionPanel.tsx` which contains the question description and `CodeEditor.tsx` which includes the code editor and other components. We have used `@monaco-editor/react` to provide an improved code editor with syntax highlight for multiple languages. 

The code editor will be initialized to Python by default, and mainly supports the following 5 languages:

1) Python 3.8.1

2) Java OpenJDK 13.0.1

3) C++ GCC 7.4.0

4) JavaScript Node.js 12.14.0

5) Typescript 3.7.4

Note that a user can change the language by clicking on the language button. The user can then select their preferred language in the dropdown below:

![Diagram 12 Language selection in action](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/LanguageSelection.png)

Diagram 12 Language selection in action

> ℹ️ Note that language selection will be disabled if the user is currently in a collab session with another user:
> 
> 
> ![Diagram 13 Language selection disabled in collab](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/LanguageSelectionNotAllowed.png)
> 
> Diagram 13 Language selection disabled in collab
> 

**Code Execution**

> ⚠️ To ensure that your code is compiled by Judge0, you are required to print your statements in the language that you’re using to submit your code. This is so that Judge0 can compare between the user’s output and the expected output.
Moreover, you should have a function that prompts for input such as [scanf()](https://cplusplus.com/reference/cstdio/scanf/) (C++) or [input()](https://cs.stanford.edu/people/nick/py/python-input.html) (Python) so that you can print your output dynamically to satisfy each testcase.
> 

Here is an example code in Python with testcase input: `Input 1 for test case 1` and expected output `Expected output 1 for test case 1`.

```python
def replace_string(x):
    num = 0
    for i in range(len(x)):
        if x[i].isdigit():
            num = int(x[i])
    return f"Expected output {num} for test case {num}"

# Prompt for testcase input!
x = input()

# Print out to allow compiler to compare your input with expected output
print(replace_string(x))
```

When your test case passes after clicking on the submit button, you should see the following:

![Diagram 14 Successful compilation of all test cases](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled.png)

Diagram 14 Successful compilation of all test cases

> ℹ️ Do note that the submit button will run all testcases at once.
> 

On the contrary, if one of the test case fails, an error message will be shown:

![Diagram 15 A case where a test case fails](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%201.png)

Diagram 15 A case where a test case fails

> ⚠️ Refreshing the page will reset the code editor and result screen.
> 

**Chat**

`ChatWidget.tsx` becomes accessible once two users have successfully matched and entered the question page. A chat button, positioned at the bottom right corner, allows users to open up `ChatWindow.tsx` , where users can review their ongoing chat history. Real-time message delivery ensures that users can instantly view each other's messages.

![Diagram 16 How 2 users can communicate with each other](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/ChatWindow.png)

Diagram 16 How 2 users can communicate with each other

We have used  `@chatscope/chat-ui-kit-react` to design our chat UI. We have decided to use `@chatscope/chat-ui-kit-react` because it has many reusable React components and is css framework independent, making it easy to design to match our website design. In the future, we can also use `@chatscope/use-chat` which is a React hook for state management in chat applications and is compatible with `@chatscope/chat-ui-kit-react` and socket.io.

**Forms**

![Diagram 17 Class diagram for `UserForm`](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/UserFormClassDiagram.png)

Diagram 17 Class diagram for `UserForm`

`UserForm.tsx` is the main component used for sign in, sign up and updating user profile details. The `forms` folder will contain all components related to `UserForm.tsx` in one way or another.

![Diagram 18 `UserForm` in sign in page](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/SignInPage.png)

Diagram 18 `UserForm` in sign in page

![Diagram 19 `UserForm` in sign up page](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/SignUpPage.png)

Diagram 19 `UserForm` in sign up page

![Diagram 20 `UserForm` in profile page](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/ProfilePage.png)

Diagram 20 `UserForm` in profile page

**History**

The `history` folder is split up into two main parts:

- `historyPage`
- `historyTable`

When the user enters the `history` page, they will route to their own history page based on their user id. A loading screen will be displayed when the data has not fetched completely. After all data are fetched, they will first view the `historyTable` components which will display the current history in our database. `DeleteCfmModal` will also found in `historyTable` folder.

![Diagram 21 History Table](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%202.png)

Diagram 21 History Table

Once a user clicks on a specific history, they will route to detail page based on the corresponding history `[id]`.  In the detail page, it display all the information of each attempt by the user such as question information, correctness of their code including the each test case information, source code they wrote, language they used, timestamp of the submission and the participants involved. A link is provided to access the question if the user wants to reattempt the question again.

Components involved for information display are `CodeViewer.tsx`, `ParticipantsIcon.tsx` and `TestcaseIndicator.tsx` that can be found in `historyPage` folder. 

**Session**

The `session` folder mainly revolves around the `SessionTable.tsx` component, which will be rendered when the user clicks on `Collaboration` on the Navbar. Initially the session table will be empty as the user has not matched with another user before.  

![Diagram 22 Initial session table](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/InitialSessionTable.png)

Diagram 22 Initial session table

The user can then click on the Match button at the top right of the session table. This will bring up the `MatchingModal.tsx` will they user can select their preferred language and difficulty.

![Diagram 23 UI of `MatchingModal.tsx`](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/MatchingModal.png)

Diagram 23 UI of `MatchingModal.tsx`

Once the user clicked on the Start Match button, the `Countdown.tsx` component will appear as the system will try to find another user in the queue with the same language and difficulty.

![Diagram 24 UI of `Countdown.tsx`](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/CountdownModal.png)

Diagram 24 UI of `Countdown.tsx`

If there is no user could be found in 30s, the timer will just time out and an error message will be shown to the user. Otherwise, the two users will be matched and a random question with the specified difficulty and language will be selected. The question is also guaranteed to contain starter code for the selected language. The two users will be routed to `session/[sessionId]` on a separate tab.

![Diagram 25 Both users are routed `[sessionId]`, note that other user’s image will also appear on the navbar](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/sessionid.png)

Diagram 25 Both users are routed `[sessionId]`, note that other user’s image will also appear on the navbar

Once the user exits the session, a new session entry will be added to session table. Users can rejoin the respective session based on the sessionId by clicking on the green **Join** button.

![Diagram 26 Users can click on Join to rejoin the original session](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/AfterSessionTable.png)

Diagram 26 Users can click on Join to rejoin the original session

*Other components located in the root of the `components` folder, either do not fall under any of the categories above such as `Layout.tsx` or are used by multiple routes such as `Navbar.tsx`.*

### 3.2.2 Authentication

NextAuth.js is an open source authentication solution for Next.js applications and supports many OAuth services which are built-in to NextAuth itself (e.g. Github, Google, etc…). This allows users to have multiple ways to authenticate, making it flexible and easy to use.

In order to persist user details, a JWT is created (e.g. at sign in/register) or updated (e.g. whenever a session is accessed by the client). The return value is encrypted with A256GCM and stored in a cookie. This is not to be confused with access and refresh tokens generated by the user microservice. 

Upon sign in, the `signin` callback in `authOptions.ts` is invoked. If the user was signing in with an email and password, we will just return `true` to proceed to the jwt callback. Otherwise, if is a user is signing with an OAuth provider, we need to check if the user previously exists and is signing it with a new OAuth provider, so that we will can update the OAuth linked to the user in the database. 

```tsx
async signIn({ user, account }) {
  try {
    // normal email and password sign in
    if (
      !account?.provider ||
      !Object.values(OAuthType).includes(account.provider as OAuthType)
    ) {
      return true;
    }

    const findOAuthUser = await login({
      email: user.email,
      oauth: account.provider as OAuthType,
    });

    if (findOAuthUser) {
      // if existing user is signing in with a new oauth
      if (!findOAuthUser.oauth?.includes(account.provider as OAuthType)) {
        // initialise empty oauth if existing user has no oauth previously
        findOAuthUser.oauth = findOAuthUser.oauth ?? [];
        findOAuthUser.oauth.push(account.provider as OAuthType);
        const response = await updateUserById(findOAuthUser.id, {
          oauth: findOAuthUser.oauth,
        });
        if (response.error) {
          return `/error?message=${response.error}&errorKey=${ErrorKey.OAuthSigninError}`;
        }
      }
      return true;
    }

    return `/oauthsignup?email=${user.email}&oauth=${
      account.provider as OAuthType
    }&image=${user.image}`;
  } catch (error) {
    console.error(error);
    return true;
  }
}
```

If the user doesn’t previously exist, it will be treated like the user is signing up for a new account. They will then be redirected to a page to enter their new username.

![Diagram 27 Set username page on OAuth signup](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/OAuthSignup.png)

Diagram 27 Set username page on OAuth signup

Whenever `useSession()` is used, the jwt callback in `authOptions.ts` is invoked. If the user from the `signin` callback is defined, we can save the user details in the token within the jwt callback itself, which will also include the access token and its expiry time as well.  We can then check if the expiry time is past the current time, refreshing the access token if it has expired.

```tsx
async jwt({ token, trigger, session, user, account }) {
	/** other details hidden */
	const expiry = (token.user as User).accessTokenExpiry;
  if (expiry !== undefined && Date.now() < expiry) {
     return token;
  }
  console.log(`Access token past expiry time, attempting to refresh...`);
  console.log(`Date.now(): ${Date.now()} > Expiry: ${expiry}`);
  const response = await refreshJwt((token.user as User).refreshToken!);
  if (token.user) {
     (token.user as User).accessToken = response.accessToken;
     (token.user as User).accessTokenExpiry = response.accessTokenExpiry;
     console.log("New access token expiry:", response.accessTokenExpiry);
  }
  return token;
}
```

To expose details of the user details in the token to the client, we can explictly forward the user details to the session callback in `authOptions.ts` and `useSession()` will return a session object which we can use in our frontend components.

```tsx
async session({ session, token }) {
   if (token) {
     session.id = token.id as number;
     session.user = token.user as User;
   }
   return session;
}
```

> ℹ️ Please refer to NextAuth’s official documentation for more information.
[https://next-auth.js.org/getting-started/introduction](https://next-auth.js.org/getting-started/introduction)
> 

When an API is called from other microservices, the client will set the access token from `useSession()` in the HTTP Authorization header. If the access token is expired, we use Axios interceptors to check if the initial error response status is 401. The client will then request for a new access token from the user microservice if the session contains a refresh token. We will then use the new access token and make a new call to the API. The end user will not see any noticeable differences.

```tsx
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 401 && !prevRequest.sent) {
			prevRequest.sent = true;
      try {
        const response = await axios.get(REFRESH_URL, {
          headers: {
            'refresh-token': error.config.headers['refresh-token'],
          },
        });
        const newAccessToken = response.data.accessToken;
        const newAccessTokenExpiry = response.data.accessTokenExpiry;
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        const newResponse = await axios.request(error.config);
        newResponse.data.accessToken = newAccessToken;
        newResponse.data.accessTokenExpiry = newAccessTokenExpiry;
        return newResponse;
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
)
```

## 3.3 Backend

### 3.3.1 Architecture Overview

The backend consists of the following microservices at the high-level:

- Chat
- Code Execution
- History
- Question
- Queue
- Session
- User

As a rule of thumb, we opted to construct the backend microservices utilizing a Node.js Express server, adhering to a consistent **Model-View-Controller (MVC)** architecture. The design of the microservices are represented using UML diagrams. The services are divided into three main components following the MVC pattern: the Model (data), the View (user interface), and the Controller (processes that handle input). We have also included a `Utils` folder for each microservice which includes a `Logger` for testing, `Middleware` for error messages and `Config` file to adjust the environment accordingly when testing. This choice was driven by the objective of streamlining development and facilitating cross-review of code implementation within our team.

Upon arrival at the servers, a request is first processed by the `Router` and calls the relevant **RESTful APIs** in the `Controller`. The controller, if required, executes application logic and subsequently access the database. The repository’s interaction with the database is mediated through `Services` which in turn use ODM/ORM (specifically **Mongoose** for **MongoDB** and **Prisma** for **PostgreSQL**). This approach effectively segregates domain objects from data objects, aligning with the principles of **domain-driven design**.

### 3.3.2 Databases

### → MongoDB Entity-Relationship Model

![Diagram 28 Mongo DB ERD ](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/MongoERDiagram.png)

Diagram 28 Mongo DB ERD 

### → PostgreSQL with Prisma Integration Model

![Diagram 29 PostgreSQL DB ERD](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/PostgresERDiagram.png)

Diagram 29 PostgreSQL DB ERD

### 3.3.4 Chat Microservice

### → High-level Overview

![Diagram 30 High level overview of Chat Microservice ](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/ChatComponentDiagram.png)

Diagram 30 High level overview of Chat Microservice 

Just for clarity, the words mentioned in the SocketIO entity box are event names. When an arrow is coming into the event from an entity A, it means that event was emitted from that entity A. If an arrow is coming out of the event into a separate entity, it means that SocketIO calls the method attached to that entity as a result of the event being listened to.

The Chat microservice is responsible for creating and fetching chatrooms that are created for Sessions. More information of when a new chatroom is created is mentioned [here](#339-session-microservice).

The Chat service allows users to communicate with one another in a session to further enhance their collaborative experience. This is done using WebSockets that allow for bi-directional communication between the server and the client. The frontend connects to the SocketIO server using events whereby callbacks are fired upon an event being emitted.

Chatrooms function as rooms where messages that are sent by users are pushed in a one-to-many fashion to the rest of the users in the chatroom. (However, since there are only ever 2 users in a single collaboration session, it is a one-to-one.)

When a user first connects to the WebSocket server, the `connect` event is fired and the server registers a few event listeners for that specific websocket

- connectToChatroom - Fetches and returns messages for the chatroom
- sendMessage - Event that is fired when a message is meant to be send

These events will fire the various methods in MessageController which in turn fire the various methods in MessageService which interfaces with MongoDB.

![Diagram 31 Sequence Diagram of how a user connects to the chatroom and sends messages to other users ](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/ChatSequenceDiagrampng.png)

Diagram 31 Sequence Diagram of how a user connects to the chatroom and sends messages to other users 

This is a sequence diagram of how one user will connect to the chatroom and then send a message to the other users.

Note that arrows going in and out of the SocketIO entity represent the different events.

i.e. An arrow with sendMessage going from User to SocketIO means that the User emitted a “sendMessage” event to SocketIO.

  

### →Design Considerations

The general industry best practice is to use websockets to create a push-push system.

Clients send messages to a [socket.io](http://socket.io) room in a one-to-one relationship. i.e. A client will push messages to one unique socket.io room which the chat microservice sets up. The server then pushes that same message to every client connected to the same socket.io room over websockets.

To ensure that the chat is not too intrusive to users, we placed it in a chat widget rather than a full blown window. This way users can focus on their code easily.

The Chat service is built atop a WebSocket server and has various events that chain in execution. Each event is necessary to ensure the general consistency between users. 

We used pure WebSocket because the likelihood of users happening to overlap in timing of message sending was minuscule. Hence, it is rather unlikely for the chat to be out of sync for two users. Regardless, in the case where this does happen, the single source of truth for the ordering of messages is in MongoDB. When a user reloads, that user will be synced to the ordering present in the database.

### →Creation of Chatrooms

The creation of chatrooms simply takes in an array of users and creates a chatroom with an empty array of messages. When a user sends a message, then a message is then appended to the array of messages before it is pushed to all the users in the chatroom.

We take advantage of Socket.IO’s room feature in order to bypass the need for keeping track of which socket belongs to which user.

### →Database Choice

We went with MongoDB for a few reasons

1. **Schema-less Structure**: MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. This means the data structure can be modified without affecting existing data. Chat applications often need to evolve rapidly with new features (like reactions, message editing, etc.), and MongoDB's dynamic schema can accommodate these changes easily.
2. **Real-time Performance**: Chat applications require real-time data retrieval to ensure a smooth user experience. MongoDB provides powerful querying capabilities and indexing that can support the quick retrieval of messages and chat histories.
3. **Horizontal Scalability**: MongoDB supports horizontal scaling through sharding, which distributes data across multiple machines. As the chat grows in number of users and messages sent, MongoDB can scale out to accommodate the increased load without significant changes to the backend.
4. **Strong Consistency**: MongoDB offers strong consistency, which is important in a chat application where users expect to send and receive messages without delays or inconsistencies.
5. **Built-in Aggregation Framework**: Analyzing large volumes of chat data for insights, such as user engagement or message patterns, can be accomplished using MongoDB's aggregation framework, which provides a powerful way to process and aggregate data.
6. **Document Storage**: Each message in a chat app can be stored as a document that includes metadata such as timestamps, sender information, read receipts, etc., which aligns well with how MongoDB stores and manages data.

### 3.3.5 Code Execution Microservice

### →High-level Overview

![Diagram 32 High-level overview of Code Execution Microservice](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/CodeExecutionComponentDiagram.drawio.png)

Diagram 32 High-level overview of Code Execution Microservice

Leveraging on the aforementioned utilisation of RESTful API, we achieved a modular and decoupled backend architecture. We integrated RapidAPI’s **Judge0** as our code execution engine, and learned to manipulate the API and handle asynchronous responses. We encountered the constraints of the free plan, such as the 50 limited requests allocated per day, and decided to install a local version of Judge0 into our machines to experiment with the library, then employ the cloud version of Judge0 on our deployed app.

We have 2 key functionalities in our `Code Execution Service`:

1. Compiling multiple submissions received from the frontend (from running multiple testcases at once)
2. Retrieving the output details with our token 

The service mainly communicates with `CodeEditor.tsx`, especially with its `handleCompile()` and `checkStatus(msg: string)` in the frontend.

A batch of submission is first created in the frontend, where each testcase details (testcase input, expected output, language id) is mapped to the relevant submissions with the same user source code.

The frontend will send the array containing the batch of submissions to the `Code Execution Service`, whereby a single submission will be in the following format:

```
language_id: language.id,
source_code: btoa(displayCode),
stdin: btoa(testCase.input),
expected_output: btoa(testCase.output),
```

```
language_id: the ID of the programming language used
source_code: the encoded version of the user's code to be executed
stdin: the encoded version of the input from the testcase for the code
expected_output: the encoded version of the expected output of the code
```

> ℹ️ Note that we use base64 encoding for all the attributes except for the `language_id`. This is to protect our users’ data from being stolen if someone intercepts the request.
> 

The controller will process the batch, and send a **HTTP POST request to [judge0-ce.p.rapidapi.com](http://judge0-ce.p.rapidapi.com/)** with the following headers via [Axios](https://axios-http.com/docs/intro):

```
const options = {
        method: "POST",
        url: RAPID_API_SUBMISSIONS_URL + "/batch",
        params: { base64_encoded: "true", fields: "*" },
        headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": RAPID_API_HOST,
        "X-RapidAPI-Key": RAPID_API_KEY,
        },
        data: {
            submissions
        },
    };
```

Depending on the result of the submission, a token will be returned to the HTTP POST request which will send an array of tokens back to the frontend `handleCompile()` function in `CodeEditor.tsx` 

With the array of tokens, FE will process the token sequentially with `checkStatus()`, which will call the controller to make a HTTP GET request with the respective token to **Judge0** to check the output details of each submission. 

A submission result can look like the following:

```json
{
  "additional_files": null,
  "callback_url": null,
  "command_line_arguments": null,
  "compile_output": null,
  "compiler_options": null,
  "cpu_extra_time": "1.0",
  "cpu_time_limit": "5.0",
  "created_at": "2023-11-13T08:30:27.026Z",
  "enable_network": false,
  "enable_per_process_and_thread_memory_limit": false,
  "enable_per_process_and_thread_time_limit": false,
  "exit_code": null,
  "exit_signal": null,
  "expected_output": "RXhwZWN0ZWQgb3V0cHV0IDEgZm9yIHRlc3QgY2FzZSAx\n",
  "finished_at": null,
  "language": {
    "id": 71,
    "name": "Python (3.8.1)"
  },
  "language_id": 71,
  "max_file_size": 1024,
  "max_processes_and_or_threads": 60,
  "memory": null,
  "memory_limit": 128000,
  "message": null,
  "number_of_runs": 1,
  "redirect_stderr_to_stdout": false,
  "source_code": "ZGVmIHJlcGxhY2Vfc3RyaW5nKHgpOg0KICAgIG51bSA9IDANCiAgICBmb3Ig\naSBpbiByYW5nZShsZW4oeCkpOg0KICAgICAgICBpZiB4W2ldLmlzZGlnaXQo\nKToNCiAgICAgICAgICAgIG51bSA9IGludCh4W2ldKQ0KICAgIHJldHVybiBm\nIkV4cGVjdGVkIG91dHB1dCB7bnVtfSBmb3IgdGVzdCBjYXNlIHtudW19Ig0K\nDQp4ID0gaW5wdXQoKQ0KcHJpbnQocmVwbGFjZV9zdHJpbmcoeCkp\n",
  "stack_limit": 64000,
  "status": {
    "description": "Processing",
    "id": 2
  },
  "status_id": 2,
  "stderr": null,
  "stdin": "SW5wdXQgMSBmb3IgdGVzdCBjYXNlIDE=\n",
  "stdout": null,
  "time": null,
  "token": "528525f6-c7fd-4a67-ac31-5e822d3a90da",
  "wall_time": null,
  "wall_time_limit": "10.0"
}
```

This submission will then be returned back to the function that called it, namely `checkStatus()`.

As seen above, the current time limit is 5 seconds, and memory limit 128Mb.

As for the status IDs, each number from 1 - 14 represents a unique status:

```
export enum Status {
  InQueue = 1,
  Processing = 2,
  Accepted = 3,
  WrongAnswer = 4,
  TimeLimitExceeded = 5,
  CompilationError = 6,
  RuntimeErrorSIGSEGV = 7,
  RuntimeErrorSIGXFSZ = 8,
  RuntimeErrorSIGFPE = 9,
  RuntimeErrorSIGABRT = 10,
  RuntimeErrorNZEC = 11,
  RuntimeErrorOther = 12,
  InternalError = 13,
  ExecFormatError = 14,
}
```

> ℹ️ More information about Judge0’s submission result attributes can be found here: [https://ce.judge0.com/#submissions-submission](https://ce.judge0.com/#submissions-submission)
> 

### 3.3.6 Question Microservice

### →High-level Overview

![Diagram 33 High-level overview of Question Microservice](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/QuestionComponentDiagram.drawio.png)

Diagram 33 High-level overview of Question Microservice

Our `Question Service` follows a modular design, separating concerns between the database, business logic, and API layers. The use of MongoDB and Mongoose facilitates a flexible schema, enabling rapid changes without compromising data integrity. 

Our **Question API`** provides a RESTful interface for clients to interact with the **Question Service`**. I supports the following operations:

- **GET /questions**: Retrieve a list of qestions based on query parameters, such as category, complexity, or keyword.
- **GET /questions/:id**: Retrieve a single question by its id.
- **POST /questions**: Create a new question with the given data in the request body.
- **PUT /questions/:id**: Update an existing question by its id with the given data in the request body.
- **DELETE /questions/:id**: Delete an existing question by its id.

**Design Considerations**

- **Database Choice**: We chose MongoDB for its schema-less nature, enabling us to adapt to evolving question structures.
- **Mongoose Schema**: We employed Mongoose to provide a structured way to interact with MongoDB, enforcing data validation and ensuring consistency.
- **Authentication**: We use JSON Web Tokens (JWT) to authenticate users and authorize their access to the API endpoints. Users need to provide a valid token in the **Authorization`** header of their requests.
- **Validation**: We use Joi to validate the request arameters and body against predefined schemas, ensuring the data integrity and consistency.
- **Error Handling**: We use a custom error middleware to catch and handle any errors that occur during the request processing, and send appropriate responses with status codes and messages.

A Question document contains the following attributes:

- **id**: A unique identifier for the question.
- **title**: A concise and descriptive title for the question.
- **description**: A detailed explanation of the problem statement, including the input and output formats, and any assumptions or constraints.
- **categories**: An array of strings representing the topics or domains that the question belongs to, such as “arrays”, “strings”, or “algorithms”.
- **complexity**: A string indicating the difficulty level of the question, such as “easy”, “medium”, or “hard”.
- **examples**: An array of strings providing sample input and output pairs for the question, along with optional explanations.
- **constraints**: A string specifying any limitations or conditions that the input or output must satisfy, such as the range of values, the length of strings, or the time or space complexity.
- **followUp**: A string suggesting any further questions or extensions that can be explored based on the current question, such as variations, optimizations, or trade-offs.
- **starterCode**: An array of objects containing the languageId and code fields, representing the initial code snippets for different programming languages that the user can use as a starting point to solve the question.
- **testcases**: An array of objects containing the input and output fields, representing the test cases that the user’s code will be evaluated against to check its correctness and efficiency.
- **dateCreated**: A Date object indicating the date and time when the question was created.

```tsx
interface Question extends Document {
  id: string;
  // left side of question page
  title: string;
  description: string;
  categories: string[];
  complexity: string;
  examples: string[];
  constraints: string;
  followUp: string;
  // right side of question page
  starterCode: [{
    languageId: number,
    code: string
  }],
  testcases: [{
    input: string;
    output: string;
  }]
  dateCreated: Date;
}
```

### 3.3.7 History Microservice

### →High-level Overview

![Diagram 34 High-level overview of History Microservice](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%203.png)

Diagram 34 High-level overview of History Microservice

The history microservice is responsible for storing a record of attempts which a user has made. It is built using a HTTP express server for managing operation on history records. These operations includes fetching and storing history records from and to frontend using HTTP request. However all the request needs to undergo `JwtGuard` verification by the user microservice before history microservice sent response back to the frontend and to the user.

**Design Considerations**

As illustrated in the [MongoERDiagram](#-mongodb-entity-relationship-model) above, we had defined the History document in such a manner due to a myriad of reasons:

1. To maintain a clean record of history.
2. To enhance the adaptability of the system.

Each history is responsible for storing every completed questions attempted by the specific group of session. For instance, a history document is made exclusively for **user 1** if **user 1** attempted the question individually, and another history document is generated if **user 1** has a collaboration session with **user 2** with a specific session id. Subsequently, recent questions completed will be stored respectively into the history document. As a result, it is easy to manage all the histories corresponding to the user and the session. The model could also fit in even if there is an improvement on the other microservices.

```tsx
interface History extends Document {
  id: string;
  userIds: number[];
  sessionId: string;
  completed: CompletedQuestion[];
  date: Date;
}
```

A `History` document consists of the following attribute:

1. **id:**  An id which uniquely identifies the history document, this helps us to identify which history document to fetch, delete or update for data management.
2. **userIds:** An array of user ids that contribute to the source code of the questions attempted, this could help to filter the histories to the corresponding users.
3. **sessionId:** A session id that is created by session microservice, this is to identify which session is involved. Otherwise, if it is attempted by an individual user, it would store their user id instead.
4. **completed:** An array of attempts the session/user had made.
5. **date:** The last updated timestamp.

```tsx
interface HistoryQuestionTestcase extends Document {
  runTime: number;
  outcome: string;
  id:string
}
```

As mentioned in the question microservice above, we consider test cases as an important attribute for a question instance. Therefore, we decided to include the outcome in our history document from execution of users’ source code based on the test cases attached to each question instance. The information includes run time of the code and results based on the [statuses](#335-code-execution-microservice) from code execution microservice.

```tsx
interface CompletedQuestion extends Document {
  questionId: string;
  questionTitle: string;
  language: string
  answer: string;
  result: string;
  testcases: HistoryQuestionTestcase[];
  completedAt: Date;
  id: string;
}
```

A CompletedQuestion document can be viewed as an attempt by the users. It stores all the information related to the question attempted such as question id and its title, language used for the answer the user written, the result of the test cases and the time the user submits the answer.

### 3.3.8 Queue Microservice

### →High-level Overview

![Diagram 35 High-level overview of Queue Microservice](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/QueueComponentDiagram.png)

Diagram 35 High-level overview of Queue Microservice

Just for clarity, the words mentioned in the SocketIO entity box are event names. When an arrow is coming into the event from an entity A, it means that event was emitted from that entity A. If an arrow is coming out of the event into a separate entity, it means that SocketIO calls the method attached to that entity as a result of the event being listened to.

Once again, our service is separated based on the MVC framework. We split code into controllers and services. However, since there is no need for a http server, there are no routers in the service.

The QueueService serves as an interface to interact with the `Queue` object. The `Queue` object is a queuing data structure we have created for the use of this project. When a user enters the queue, their user id as well as their websocket connection is stored in the `Queue` object. If there is already a waiting user in the queue, the `Queue` simply pairs up the incoming user with that waiting user through the following steps

1. Generating a session for the two users (For more information, check [this section](#339-session-microservice) on sessions)
2. Emitting the event “matched” to both users

Otherwise, the user will be placed in the waiting queue.

### →Design Considerations

There were a few questions to be answered when designing our queue service. Our first question was how to appropriately match users based on what they were searching for.

For this, we first created the `Queue` data structure.

The `Queue` takes in a `nameSpace` on instantiation which is then used as:

- An identifier in the `queues` Map for `QueueService` (i.e. If a queue had a nameSpace of “Easy/Java”, the queues Map would have a key-value pair where the key was “Easy/Java” and the value was the `Queue` object corresponding to that `nameSpace`)
- For routing for RabbitMQ.

There are 2 criterias that the user can select from to match to other users accordingly:

- Difficulty (Easy, Medium, Hard)
- Programming Language
    - Python 3.8.1
    - Java OpenJDK 13.0.1
    - C++ GCC 7.4.0
    - JavaScript Node.js 12.14.0
    - Typescript 3.7.4

The `nameSpace` is then created based on the different combinations.

i.e. For the `Queue` corresponding to Easy difficulty questions in Python 3.8.1, the `nameSpace` of the `Queue` would be “Easy/Python 3.8.1”. This allowed for a far more tighter matching between users, ensuring users would only make with other users on the same difficulty and programming language.

When the user first sends a “matching” event, a payload is also sent, containing the difficulty and programming language specified. This difficulty and programming language is then combined in the QueueService to find the appropriate queue based on the nameSpace.

The next question that needed to be answered was how should we ensure that users will be matched accurately based on who was in the queue first and also ensure no data races would occur. For that, we used RabbitMQ to enqueue the users to the correct queue accordingly.

### →RabbitMQ

We used RabbitMQ as our message queue to ensure that the users would be enqueued and that each user would not be lost.

There were a few reasons why we picked RabbitMQ over message queues like Kafka and Redis

1. **Lightweight and Flexible**: RabbitMQ is relatively lightweight and is a more flexible choice since we don't need the high-throughput distributed streaming platform capabilities of Kafka. It's easier to set up and manage for smaller to medium workloads that are common in matchmaking systems.
2. **Flexible Routing**: RabbitMQ’s exchange and binding system allows for more complex routing scenarios. You can route messages based on multiple criteria without consuming extra resources, which can be highly advantageous for directing match-making requests to appropriate queues.
3. **Transactional Support**: RabbitMQ supports transactions which can be a useful feature to ensure that operations like enqueue and dequeue happen atomically and are completed successfully without losing messages. Which is extremely important because we want our messages to not be lost in transition to ensure our users are not just waiting for nothing.
4. **Synchronous Messaging**: RabbitMQ is better suited for scenarios where synchronous messaging is required. We want to ensure that only one user is being passed into the queue at any one time so that multiple users do not accidentally get matched with the same user.
5. **Easy to Use with Existing Infrastructure**: Our Nodejs server is written in Typescript that has better support for AMQP (Advanced Message Queing Protocol, which RabbitMQ implements) than Kafka’s or Redis’s protocols, leading to simpler and straightforward integration with RabbitMQ.

When a user is passed into the queue and is attempted to be matched with other users, they have to first pass through our RabbitMQ server to be queued before making it back to the `Queue` object. We take advantage of RabbitMQ’s synchronous messaging to wait for user to be processed before moving on to the next user. This way only one user enters our queue for processing at any one time.

The `Queue` uses an instance of the `Producer` and `Consumer` objects to interact with RabbitMQ.

The `Producer` and `Consumer` both take in the nameSpace that the `Queue` has and uses it as its route for RabbitMQ.

The `Consumer` instantiation method also takes in one more argument, which is the `onMessage` argument. This `onMessage` is essentially just called whenever a message is sent to the `nameSpace` that the `Consumer` is instantiated with. i.e.

1. `Producer` sends out a message to the `nameSpace` it was instantiated with as its route to RabbitMQ e.g. “Easy/Python 3.8.1”
2. `Consumer` receives that message to the `nameSpace` e.g. “Easy/Python 3.8.1” if it was instantiated with the same `nameSpace` and then calls the `onMessage` callback using whatever payload was sent over the message.

### 3.3.9 Session Microservice

### →High-level Overview

![Diagram 36 High-level overview of Session Microservice](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/SessionComponentDiagram.png)

Diagram 36 High-level overview of Session Microservice

The session microservice is responsible for managing (collaboration) sessions for users. It is built using a HTTP express server for general session management (i.e. Creating Sessions, retrieving sessions) and a WebSocket server that is coupled to AutoMerge. The microservice is the backbone of the collaboration feature between users, facilitating real-time updates to the document based on AutoMerge’s CRDT (conflict-free replicated data type) data structures, as well as persisting and fetching sessions from any time in the past and last but not least creating the sessions.

It keeps track of each session that is currently active and is also responsible to loading old sessions from the database on request. 

```tsx
export interface SessionEntity extends Document {
  users: number[];
  chatroomId: string;
  code: string;
  question: string;
  language: string;
}
```

When creating a session, 3 separate things are created/fetched

1. A new Chatroom
2. A random question of the selected difficulty and language
3. A document handle id created by AutoMerge

The chatroom and random questions are persisted in their respective databases and fetched using API calls to their respective microservices. The document handle created by AutoMerge is not persisted for security purposes which will be talked about in the next section.

The Session object contains the questionId for the session, as well as the chatroomId for the chatrooms and the programming languages as well as the users that are part of the session. 

**Design Considerations**

The microservice follows a generic MVC (Model, View, Controller) to adhere to proper separation of concerns and follows a similar file structure as mentioned in [an earlier section](#331-architecture-overview). 

A HTTP request-response server was used to handle creating and fetching sessions which fits to the idea of the client sending a **request for a resource** to the server and the server sending back a **response with the resource.**

For the use of synchronization and real-time collaboration, WebSockets and CRDTs were used. Websockets were used to take advantage of the bidirectional communication between client and server and CRDTs were used to ensure that the collaboration experience was accurate and as expected for the users.

**CRDTs (Conflict-free Replicated Data Types)**

To support real-time collaboration, we had initially considered using only WebSockets to fire events and sync up the data in this manner.

However, upon research, we realized that relying solely on WebSockets would lead to inconsistencies between users and cause delay between users and the server.

Due to the nature of the app, there are a few functional requirements required of the Session microservice:

| F4.1.4 | System can handle concurrent modifications. |
| --- | --- |
| F4.1.5 | System can guarantee eventual consistency in the data across all users. |

Upon further research, we found out that the industry best practice was to use CRDTs (Conflict-free Replicated Data Types) to abstract out the synchronization required for the session microservice.

CRDTs guarantee a few things

1. **Eventual Consistency**: CRDTs guarantee that, eventually, all replicas will converge to the same state if they have received the same set of updates, regardless of the order in which those updates were applied.
2. **Concurrency Control**: CRDTs excel in handling concurrent updates. If two users modify the data at the same time, CRDTs ensure that these changes do not conflict and that a consistent state is achieved across all nodes.
3. **Real-time Collaboration**: In real-time collaborative applications, like collaborative document editing, maintaining a user-friendly and sensible ordering of changes can be crucial.
4. **Reduced Complexity in Conflict Resolution**: Traditional conflict resolution mechanisms can be complex and error-prone. CRDTs simplify this process by ensuring that all replicas can independently arrive at the same state, without the need for complex conflict resolution logic.

There were a few CRDT solutions out there. Since we were using NodeJS for our backend, we opted for Javascript-based solutions like Yjs and AutoMerge.

There were a few reasons why we chose AutoMerge over Yjs

1. **Simpler Conflict Resolution**: AutoMerge is designed around a principle of automatic conflict resolution, which can simplify the development of our application. It uses a data structure called a Conflict-Free Replicated Data Type (CRDT) that ensures changes are automatically compatible with each other, avoiding conflicts without manual intervention.
2. **Immutable Data Structures**: AutoMerge uses immutable data structures, which can make state management more predictable and debugging easier. This immutability can integrate well with functional programming paradigms and React's state management.
3. **Ease of Use**: Developers find AutoMerge's API simpler and more intuitive compared to Yjs, especially for basic collaborative features. This can lead to faster development cycles and easier maintenance.
4. **Framework Agnostic**: AutoMerge is not tied to any particular framework and can be used with a variety of front-end frameworks or even in backend services, making it versatile for different tech stacks. AutoMerge is also network-agnostic and storage-agnostic, which would allow for future development if we were to use different network adapters other than websockets.
5. **Typescript Support:** While yjs has a very extensive ecosystem and is a very robust CRDT, it also had a few known issues with Typescript which made it difficult to use in our Typescript environment. AutoMerge was created with Typescript and typing in mind, presenting its Typescript solutions out of the box.

Automerge works by first initializing a AutoMerge `Repository` on the server side. The `Repository` then gives out `DocHandle`s. These `DocHandle`s have their own `Document URLs` which we will refer to as `DocId`s for short. These `DocId`s are generated when a user loads in a session and are used on the client-side for Automerge to sync changes to the document. The user can then make changes on the frontend which will make changes to the `DocHandle` that the `DocId` responds to. In other words, it will be a one-to-one relationship between each session and each `DocHandle`.  

Currently AutoMerge has no authorization implementation when it comes to modifying the document. In other words, as long as a user has the `DocId` to a specific document, they can make any changes they want.

To combat this issue, we ensure that users can only obtain the relevant `DocId` for that session once they have been authorized to do so by our backend server.

```tsx
const verifyUserInSession = async (sessionId: string, userId: number) => {
  const session = await SessionModel.findById(sessionId);
  if (!session) {
    console.log("No session of this sessionId has been found");
    return { isUserInSession: undefined, session: undefined };
  }
  const isUserInSession: boolean = session.users.includes(userId);
  return { isUserInSession, session };
};
```

This is done in the SessionGuard where the session object is fetched from MongoDB and the user is then checked if they are indeed a part of the session. Each Session object stored in MongoDB has a users array which contains the userId of the users allowed into the session. If the user is not a part of this session, then a reply of status 401 (Unauthorized) is thrown and the user is not given the `DocId` and redirected to the 401 page. Otherwise, the user will be authorized and will be given the `DocId`.

To make sure that the user is indeed who he/she says they are, we first have to authenticate the user as well. This is done in the JwtGuard where their access token is checked against the User service and their User object is then checked against the session object.

Thus, through the use of authentication and authorization, session access is kept secure.

 

However, in the unlikely case that another user is able to somehow find the `DocId` of a session they are not a part of and are able to access the `Document`, the `DocId`s are not persisted outside of the life-time of the server. This makes it so that after every server restart, a different unique `DocId` will be assigned to each Session.

****Data Contingencies****

Due to the transient nature of AutoMerge, it is important that we have some sort of contingency plan when the session microservice ends up going offline.

We could write the document text to the database each time a user makes a change. However, that would require immense amount of resources if many users were making changes at the same time and would cause many time-costly database operations. Hence, we opted to batch up the database writes instead. Every one hour, a function is fired to save all the documents held in the AutoMerge `Repository` in MongoDB. This allows for intermitent saves to the documents while also not overloading the database with millions of operations every hour. 

Moreover, in the case that the server runs into a crash or has to be restarted, the server listens to such events and persists all the documents before cleaning up. 

Through the use of scheduling and listening to events, we ensure that no data is lost between users while also making sure that we do not overload MongoDB with too many database operations.

### 3.3.10 User Microservice

### →High-level Overview

![Diagram 37 High-level overview of User Microservice](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/UserComponentDiagramV2.png)

Diagram 37 High-level overview of User Microservice

The diagram above illustrates the high-level architecture of our user microservice, and how it interacts with other components of our application, such as the client and the database. The core functionality of our User microservice lies in the CRUD and authentication operations.

To adhere to the **dependency inversion principle**, which advocates for high-level modules to depend on abstractions rather than low-level modules, we employed **dependency injection** as a technique to pass dependencies to objects instead of creating them internally. By injecting our services and repositories through routes into our controllers, and our models into our repositories, we achieved a low coupling and high cohesion among our classes and modules, enhancing the modularity and extensibility of our code.

Following the **REST** (Representational State Transfer) principle, and designing our User microservice as a collection of resources where each call is identified by a unique URI, we are able to achieve a simple, stateless and scalable web service.

Prisma

In our user microservice, we have decided to use **Prisma** as our ORM, instead of other alternatives, such as Sequelize, TypeORM. We chose Prisma because it supports **TypeScript** and **NodeJS** natively and facilitates communication between our application and the **PostgreSQL** database. Prisma also has a declarative and intuitive syntax, which makes it easy to define and manipulate our user schema. Through Prisma, we were able to define a user schema with relative ease, being able to specify fields such as username and email without direct contact with PostgreSQL as it generates and replaces code in an SQL file in line with our requirements.

```jsx
model User {
  id Int @id @default(autoincrement())
  email String @unique
  username String @unique
  password String?
  oauth OAuth[]
  role Role
  image String?
}

enum OAuth {
  google
  github
}

enum Role {
  admin
  normal
}
```

A `User` table contains the following fields:

- **id:** A unique identifier for the user.
- **email:** The email address the user used to register with LeetPal.
- username: A unique username created by the user.
- ****password:**** An optional password field. The password need not be provided if the user is linked to a OAuth provider.
- **oauth:** An array of OAuth providers that are linked to a single user, currently we support Google and Github. It can be an empty array if the user is not linked to any OAuth provider.
- **role:** The role of the user, currently we only have two roles, “admin” and “normal”.
- **image:** An optional ****url string containing the user profile image.

A Prisma client will be automatically generated and this will act as a bridge to implement functions for CRUD operations. For instance, the `createUser` function utilises the Prisma client to add a new user, which is then called by `UserRouter` in our Node application. 

```tsx
export async function createUser(data: User) {
  return prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: data.password ?? undefined,
      oauth: data.oauth,
      role: data.role,
      image: data.image,
    },
  });
}
```

```tsx
userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
	/** create user implementation here */

	const cleanedUserData = {
	  id: -1, // not used, placeholder id
	  email: cleanedEmail,
	  username: cleanedUsername,
	  password: hashedPassword,
	  oauth: cleanedOauth,
		role: cleanedRole as Role,
		image: cleanedImage,
	};

	const newUser = await createUser(cleanedUserData);
	res.status(201).json(newUser);
}
```

This not only simplifies database interactions but also ensures type safety and security, making it easier for our application to manage user-related tasks with clarity and reliability.

**Authentication**

We use `jsonwebtoken` library to help generate and verify JWT tokens for user authentication, it uses HMAC SHA256 to protect the JWT tokens against manipulation.

![Diagram 38 JWT interactions wth microservices](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/UserMicroserviceJWTDiagram.png)

Diagram 38 JWT interactions wth microservices

**Registration**

Users can register for an account by providing an unique email and username, as well as a password. The system will then hash the password using `bcrypt` and stores the user details in the PostgreSQL database. `bcrypt` is intentionally slow, computationally intensive and includes automatic salting for each password, making brute-force attacks and rainbow table attacks significantly more difficult.

```tsx
let hashedPassword = null;
if (cleanedPassword !== undefined) {
   const saltRounds = 10;
   hashedPassword = await bcrypt.hash(cleanedPassword, saltRounds);
}
```

Alternatively, users can also choose to register for an account using OAuth providers such as Google or GitHub. Users will first insert their credentials in the OAuth provider of their choice. Once the OAuth provider server has validated the inserted credentials, the system will then store the returned user details in the PostgreSQL database.

**Users with multiple OAuths**

Since we have already enforced emails to be unique to each user, we have decided to link multiple OAuth services by email to that respective user. For example, let us consider the case where a user has a Google account and a Github account linked to the same email address. Let’s just assume the user has already created an account with Google. When the user tries to create another account with Github, it will be merged with the existing account with Google as they will have the same email address.

**Login**

Once the user has successfully logged in using username/password or OAuth, an access token and refresh token will be returned by the user microservice. The access token is a short-lived token that is used to authenticate the user for a limited period, we have set the expiry to 15mins. The refresh token, on the other hand, has a longer lifespan of 7 days and is used to obtain a new access token when the current access token expires. After 7 days, the user will need to login to access LeetPal’s features again.

The access token will be passed on to the frontend, which will then attach the access token in the HTTP authorization header when another microservice like the Question microservice for example, makes an call to retrieve all the questions in the database. The Question microservice will then call the `verifyJwt` endpoint in the User microservice, which will return the user payload if the access token is valid. The Question microservice will then verify the user role before finally returning the questions to the frontend.

![Diagram 39 Sequence Diagram of authentication procedure after successful login and retrieval of questions.](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/AuthenticationSequenceDiagram.png)

Diagram 39 Sequence Diagram of authentication procedure after successful login and retrieval of questions.

If `verifyJwt` returns `401 Unauthorized` and the error is a `TokenExpiredError` for example , the frontend will call `refreshJwt` to try and refresh the access token. If successful, this would return a newly generated access token to the frontend. The frontend will then attach the new access token in the Authorization header and the following sequence will be the same as above.

![Diagram 40 Sequence Diagram of refreshing access token](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/FailedAuthenticationSequenceDiagram.png)

Diagram 40 Sequence Diagram of refreshing access token

**Design Decisions**

****PostgreSQL****

Postgres is an ACID-compliant RDBMS which ensures that data is being processed reliably. This is especially pertinent in maintaining the integrity of sensitive user account data, especially when multiple operations will need to be performed atomically.

Furthermore, Postgres follows a relational data model, allowing us to define tables with relationships between them. This is beneficial when dealing with user account information which often includes related data like roles and permissions. While we haven't currently implemented foreign keys to formalise these relationships, the flexibility of PostgreSQL allows us to seamlessly scale and enhance our user service by incorporating such associations in the future.

Lastly, Postgres provides robust security features including role-based access control, SSL support, and encryption. This helps us implement a secure authentication and authorisation system by specifying roles and permissions for accessing and modifying user account information.

**Sending JWT to client**

Both access and refresh tokens are sent using httpOnly cookies by specifying `‘set-cookie’` in `exposedHeaders` . Additionally, the user microservice uses the `helmet` library, which applies CSP headers to the `login` endpoint which generates JWT tokens. All these will help to prevent XSS and CSRF attacks by preventing others from reading and writing to our tokens, maintaining the integrity of both token which will improve the security of our application.

**User Validation**

We have decided to use **Joi** for password and email validation. Joi’s declarative syntax allows us to define validation rules in a clear and expressive manner. This makes it easy to read and understand the validation logic. We are also able to customise error messages, improving the user experience by tailoring the error feedback more appropiately to the end user.

```tsx
export const emailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .message("Invalid email address.")
    .required(),
}).messages({
  "object.unknown": "Invalid input. Please provide a valid email address.",
});

export const passwordSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .message("Password must be at least 6 characters long.")
    .regex(/^(?=.*[a-z])/, "lowercase")
    .message("Password must contain at least one lowercase letter.")
    .regex(/^(?=.*[A-Z])/, "uppercase")
    .message("Password must contain at least one uppercase letter.")
    .regex(/^(?=.*\d)/, "digit")
    .message("Password must contain at least one digit.")
    .required(),
}).messages({
  "object.unknown": "Invalid input. Please provide a valid password.",
});
```

For email validation, we only allow emails that match the Internet Assigned Numbers Authority (IANA) list of registered top-level domains (TLDs). This gives us a wide range of valid email addresses, allowing us to cater to users with newer or less common TLDs.

For password validation, users must key in at least 6 characters, consisting of at least one lowercase, uppercase and digit character. We use regex to help enforce these constraints.

## 3.4 DevOps

### 3.4.1 Local Environment

For running the application locally and testing its various services, you have several options:

**3.4.1.1 Native Development Stack**

You can run the services directly on your Windows or macOS machine using the native technology stack. 

Begin by installing the necessary dependencies specified in the **package.json`** file. Execute the following command in the project directory to install the dependenies:

```jsx
yarn install-all
```

Once the dependencies are installed, start the application by running the following command:

```jsx
yarn dev
```

**3.4.1.2 Docker Compose** 

Each service is self-contained with its own Dockerfile, streamlining cross-platform development. Additionally, we've consolidated the build process into a Docker Compose file for further simplicity. To start the local Docker containers, execute the following command:

```bash
# Ensure that you are in the root folder
dev.sh
```

This command runs a bash script to set up the necessary configurations as well as a docker-compose command that will run the **docker-compose.local.yml`** file.

### 3.4.2 Production Environment

The team hasdecided to use Google Cloud Platform (GCP), which is the suite of cloud computing services provided by Google. The application runs on an autopilot cluster in Google Kubernetes Engine (GKE). 

The reason why GKE was chosen over Amazon Web Services (AWS) for several compelling reasons. 

Firstly, GKE is renowned for its deep integration with Kubernetes, offering a more streamlined and efficient management experience. Google, being the original creator of Kubernetes, ensures that GKE provides cutting-edge features and optimizations directly from the source. This often translates into better cluster management, easier deployment processes, and more robust scalability options. 

Additionally, GKE's global network and load balancing capabilities are highly regarded, offering superior performance and reliability for applications that demand high availability and low latency across different geographical regions.

![Diagram 41 High Level Overview of Deployment Architecture](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/HighLevelK8ArchitectureDiagram.drawio.png)

Diagram 41 High Level Overview of Deployment Architecture

The GKE autopilot cluster was chosen as it is optimized to run our production workload. The main benefit of the autopilot cluster is that it has automatic node scaling. If there is a high incoming traffic, the cluster would automatically adjust the number of nodes in the cluster to meet the workload requirement while scaling down when underutilised to save resources and cost.

![Diagram 42 Autopilot cluster](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%204.png)

Diagram 42 Autopilot cluster

![Diagram 43 Google Kubernetes Engine Workload Dashboard](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%205.png)

Diagram 43 Google Kubernetes Engine Workload Dashboard

The team opted for a microservice architecture to divide the web application into discrete components, each deployed across multiple pods, except for the databases, which utilized a single pod. 

Following industrial best practices, ClusterIP was selected for secure and efficient internal communication among microservices within the Kubernetes cluster, while external access was handled through an Ingress controller to align with project-specific needs.

### 3.4.5 Load Balancer

![Diagram 44 External Load Balancer displaying average throughput](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%206.png)

Diagram 44 External Load Balancer displaying average throughput

The load balancer is the external-facing component that acts as the entry point for external traffic into our Kubernetes cluster. It distributes incoming requests to the nodes within the cluster and ensures that traffic reaches the ingress controller. 

### 3.4.4 Ingress Controller

![Diagram 45 GKE Ingress Controller](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%207.png)

Diagram 45 GKE Ingress Controller

The GKE Ingress controller is responsible for managing the rules and configurations that define how external traffic should be routed to services within your Kubernetes cluster. It acts as the entry point for incoming traffic and handles tasks such as SSL termination and path-based routing, allowing us to efficiently expose our application to the outside world without exposing any of our microservices and databases.

### 3.4.5 Service Discovery

![Diagram 46 Information about the deployed services](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%208.png)

Diagram 46 Information about the deployed services

For this project, the team relied on GKE’s DNS-based service discovery, which is a form of client side service discovery. Each Kubernetes service is assigned a DNS name in the cluster’s internal DNS namespace. Pods within the same cluster can use this DNS name to resolve the IP addresses of the service endpoints.

To see the service discovery in action, we first run the following command inside the gcloud console:

```jsx
kubectl run tmp-shell --rm -i --tty --image nicolaka/netshoot -- /bin/bash
```

The command stars a Bash shell session within a temporary shell, allowing us to inspect network configurations, debug DNS issues and even check connectivity to other services.

![Diagram 47 Nslookup to test service discovery within the Kubernetes Cluster](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%209.png)

Diagram 47 Nslookup to test service discovery within the Kubernetes Cluster

From the above image we could see that the temporary shell could accurately return return the name and address of the queried service.

### 3.4.6 Horizontal Pod Autoscaler

![Diagram 48 List of Horizontal Pod Autoscaler](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%2010.png)

Diagram 48 List of Horizontal Pod Autoscaler

Except for the databases, all other microservices are equipped with Horizontal Pod Autoscalers (HPA). The HPA configuration aims to keep the average CPU utilization at 50%, ensuring a minimum of 1 pod and a maximum of 3 pods in the replica set for each microservice.

![Diagram 49 Horizontal Pod Autoscaler](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%2011.png)

Diagram 49 Horizontal Pod Autoscaler

To assess the HPA's performance under stress, we will execute the following command to conduct a benchmark and load test on the HTTP servers. This test involves sending a total of 50,000 requests to a specified URL ([http://www.leetpal.com/](http://www.leetpal.com/) in this case) with a concurrency level of 10. Each request establishes a new connection, allowing us to collect diverse performance metrics.

```jsx
ab -n 50000 -c 10 http://www.leetpal.com/
```

![Diagram 50 Underloading: Optimizing Resource Utilization](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%2012.png)

Diagram 50 Underloading: Optimizing Resource Utilization

![Diagram 51 Overloading: Scaling to Meet Demand](CS3219%20G48%2023297f62c6a642e68dcaf5cfe376cb01/Untitled%2013.png)

Diagram 51 Overloading: Scaling to Meet Demand

# 4. Future Work and Conclusion

## 4.1 Individual Contributions

(Present the contributions of each team member or sub-group in a tabular form. This should clearly list both technical and non-technical contributions. Remember, sub-groups will be graded separately for the successful implementation of the selected nice-to-have features.)

| Name | Role | Technical Contributions | Non-Technical Contributions |
| --- | --- | --- | --- |
| Douglas Chow (Subgroup 1) | Backend
Developer | Code execution, serverless function, question and user service setup , general refactoring for question page | Setup report and presentation,
DB diagrams, project introduction and software specification table. |
| Guo KeCheng (Subgroup 2) | DevOps | GKE deployment, Ingress Controller, Horizontal Pod Autoscaler, Set up Question service | Wrote report sections on DevOps |
| Huang Hao (Subgroup 1) | Frontend Developer | History, UI/UX, pagination for session and question table, filter and search on question service, fix matching WebSocket bug, | Wrote report sections on history. |
| Jarrett Teo (Subgroup 1) | Frontend Developer | Authentication, improve user service, signin/signup/profile, question workspace and chat UI | Wrote report sections on parts of frontend, authentication, user service |
| Pierce Ng (Subgroup 2) | Backend Developer | Fully developed Session service, Chat service, Queue service.
Developed the frontend’s matching and chat business logic. | Initial setup of repository and services.
Wrote report sections on chat, queue and session services. |

## 4.2 Suggestions for Improvements and Enhancements

### 4.2.1 Storing refresh token in a database

Storing refresh tokens in a database has many benefits. We can implement additional security measures such as hashing and encrypting the tokens, providing an extra layer of protection compared to storing refresh tokens in client-side cookies.

Additionally, we can also implement token revocation and expiration policies with the help of a database. If a user logs out or if the refresh token is compromised for any reason, we can easily just invalidate the refresh token immediately if needed.

### 4.2.2 Microservice Testing

We did not use any test framework for our user microservice, as we relied on **dogfooding**, which is a method of testing our product by using it ourselves as end-users. We believed that this would help us identify and fix any bugs or issues that our users might encounter, and also give us a better understanding of our user needs and expectations. However, we realized that dogfooding alone is not sufficient to ensure the quality and functionality of our microservices, and that we need a more systematic and rigorous way of testing our code.

Therefore, we plan to use **Jest** as our testing framework in our future iterations, as we have evaluated it as the most suitable option among other alternatives, such as Mocha, Chai, or Jasmine. We chose Jest because it is a comprehensive and easy-to-use framework, which provides everything we need for testing, such as mocking, assertions, coverage reports, and snapshots. Moreover, Jest also has a good integration with **TypeScript** and **NodeJS**, which is the language we used for our all our microservices.

### 4.2.3 User Management System

To enhance the functionality and usability of our user management system, we had planned to implement additional features such as:

- Password recovery
- Customizable user profile image upload

These features would have made our user management system more secure and reliable, and given our users more choices and convenience. However due to time constraints, we had to prioritize the core functionalities of our system.

### 4.2.4 HTTP vs HTTPS

The use of HTTP instead of HTTPS in the current deployment iteration indeed raises significant security concerns. HTTP, or Hypertext Transfer Protocol, is not secure because it does not encrypt the data being transmitted between the server and the client. This means that any information sent over an HTTP connection is in plain text and can be intercepted, eavesdropped on, or even manipulated by attackers. 

On the other hand, HTTPS, which stands for Hypertext Transfer Protocol Secure, uses SSL/TLS encryption to secure the data in transit, ensuring that the information remains confidential and integral. Therefore, it is highly recommended to switch to HTTPS to provide a secure and trustworthy online environment.

### 4.2.5 Scaling Chat Microservice

Currently, the chat microservice is being used only by the Session service. However, it is fully scalable and extendable to allow for users to communicate with one another outside of their collaboration session. 

In the future, where the chatrooms are being used by hundreds of users, the use of a message queue to queue messages to be pushed to users will be necessary. However, at the current scale of <10 users at any one time, we have no need to over engineer the chat microservice.

Moreover, the chat service is also set up to add other users to the chatroom as well.

We simply have to add the users to the user array for the Chatroom in MongoDB.

On the frontend side, we can also display the names and profile images of the chat users. Perhaps we can even capture typing events on the client side and send it over to the server side to indicate that a user is typing.

### 4.2.6 Self Hosted Judge 0

As the project enters its initial stages with a modest user base, it is important to consider future scalability, particularly concerning the code execution component. The current implementation relies on Judge0's API, which operates under the constraints of a free tier, thereby establishing an upper limit on the number of code executions. Anticipating the potential surge in demand as the user base grows, a strategic enhancement involves hosting the Judge0 container on our own infrastructure. 

By opting for a self-hosted solution, we gain the flexibility to manage resources according to our specific needs, ensuring a more scalable and efficient environment. This shift not only mitigates the limitations imposed by third-party API usage but also opens up possibilities for a more tailored and responsive code execution platform as the project evolves.

### 4.2.7 Queue auto-relaxation

With our small user base, it is entirely likely that a user is not able to find another user who wants to collaborate on the exact same programming language and difficulty of question. Especially since there are 3 Difficulties and 5 Programming Languages that we currently have available, which leads to 3*5 = 15 possible queues for users to pick from. In fact, in the future, more programming languages may be added and the ability to match based on preferred topics would be desirable.

So it would make sense to add a feature where users would automatically get pushed from one `Queue` object to another `Queue` after a certain duration has passed.

This can simply be done by have each `Queue` have a `next` field that points to the `Queue` that represents a more relaxed constraint.

e.g. The `Queue` representing Easy questions in Python 3.8.1 could have its `next` field pointing to the `Queue` representing Easy questions in any languages.

After a certain duration has passed without any matches, users are then poped from their original queue and pushed/attempt to match with another user in the `next` queue.

Once we reach a `Queue` with no `next` field (i.e. it is the most relaxed version), then users will be timed out like usual.

This way, users will be able to still get matches even when other users are not on the same configuration of matching as them.

As a side note, we would also have to ask the users to what extent would they want their restrictions relaxed. If the restriction that is about to be relaxed is not desired by the user, we can simply have them time out from there.

# 5. Reflections and Learning Points

## 5.1 What went well

- Punctuality has been a notable strength within the team, with everyone consistently attending weekly meetings.
- Active participation characterized our discussions, as every team member shared their ideas during these sessions.
- Everybody was able to play to their strengths while also learning from one another about their weaker topics.

## 5.2 What did not went well

- Coordinating updates to the database schema presented challenges, indicating a need for a more streamlined process.
- Updating individual job status progress faced difficulties, highlighting the importance of refining our communication methods in this aspect.

## 5.3 Learning Points

### 5.3.1 Importance of Timing Updates and Clear Communication

Consistent and transparent communication plays a crucial role in fostering effective teamwork, particularly within a sizable group of five individuals. The absence of regular job status updates within the team can lead to various issues, such as increased merge conflicts, potential oversight of crucial code during the merging phase, and the risk of multiple team members working on the same task simultaneously.

To address these challenges, we have established a weekly meeting to discuss and update individual task progress for the week. However, recognizing the potential for enhanced efficiency in our project workflow, there is an opportunity for us to further improve by providing more timely updates on our individual progress. By doing so, we can streamline the project process and mitigate the occurrence of these challenges. This proactive approach to communication not only benefits our current project but could significantly enhance our overall performance in a real workplace scenario.

### 5.3.2 Addressing Deployment Challenges

The initial hurdle our team faced was in dockerizing the microservices for a local setup, particularly in establishing effective connections between containers. This posed a significant challenge in achieving a seamless interaction across our microservices architecture. After solidifying our deployment strategy, we encountered another critical issue: ensuring the WebSocket functioned correctly, a key component for real-time data exchange and a smooth user experience. 

Additionally, we navigated through minor but tricky obstacles, such as resolving Cross-Origin Resource Sharing (CORS) issues and setting up precise routing rules for the ingress controller. Recognizing the distinct differences between deployment environments, we meticulously segregated environment variables and Dockerfiles, and crafted specific bash scripts for local runs versus cloud deployments. Looking ahead, we see an opportunity to integrate more sophisticated environment management within our codebase. This enhancement could streamline future deployments and significantly bolster our Continuous Integration/Continuous Deployment (CI/CD) pipeline efficiency.
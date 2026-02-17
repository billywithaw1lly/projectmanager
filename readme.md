## Doing Projects there are 2 phases of this project about 8 - 10 hours long but will take me up to 25 - 27 hours of work i hope it goes fine with me, i will add more of my experiences and what i am doing as i go through this basic course.

### it will be a scalable projects lets see what i go though will it give me any kind of confidence maybe / maybe not !!!

WHAT IS A PRD -> project requirement document
for example if i am building an auth ? add features -> create account, login account, .... and much more, i will type in a detailed PRD, most-probably the first project will be a project management system.
ours will be inspired by basecamp

it will be a RESTful API service to support collaborative project management the system enables teams to organice projects manage tasks with subtasks, maintian project notes, handle user auth with role based accesss control (rBAC)

target users -> projects Administrators, project Admin, team members

## Core Features

### User & Authentication

- User Registration
- User Login
- Password Management
- Email Verification
- Token Management
- Role-Based Access Control (RBAC)

### Project Management

- Project Creation
- Project Listing
- Project Details
- Project Updates
- Project Deletion

### Member Management

- Member Addition
- Member Listing
- Role Management
- Member Removal

### Task Management

- Task Creation
- Task Listing
- Task Details
- Task Updates
- Task Deletion
- File Attachments
- Task Assignment
- Status Tracking

### Subtask Management

- Subtask Creation
- Subtask Updates
- Subtask Deletion
- Member Completion

### Note Management

- Note Creation
- Note Listing
- Note Details
- Note Updates
- Note Deletion

### System Monitoring

- Health Check (API endpoint for system status monitoring)

## API Endpoints Structure

### Auth Routes (`/api/v1/auth/`)

| Method   | Endpoint                           |
| :------- | :--------------------------------- |
| **POST** | `/register`                        |
| **POST** | `/login`                           |
| **GET**  | `/current-user`                    |
| **POST** | `/change-password`                 |
| **POST** | `/refresh-token`                   |
| **POST** | `/verify-email/:verificationToken` |
| **POST** | `/forgot-password`                 |
| **POST** | `/reset-password/:resetToken`      |
| **POST** | `/resend-email-verification`       |

### Project Routes (`/api/v1/projects/`)

| Method     | Endpoint                      |
| :--------- | :---------------------------- |
| **GET**    | `/`                           |
| **POST**   | `/`                           |
| **GET**    | `/:projectId`                 |
| **PUT**    | `/:projectId`                 |
| **DELETE** | `/:projectId`                 |
| **GET**    | `/:projectId/members`         |
| **POST**   | `/:projectId/members`         |
| **PUT**    | `/:projectId/members/:userId` |
| **DELETE** | `/:projectId/members/:userId` |

### Task Routes (`/api/v1/tasks/`)

| Method     | Endpoint                                    |
| :--------- | :------------------------------------------ |
| **GET**    | `/:projectId`                               |
| **POST**   | `/:projectId`                               |
| **GET**    | `/:projectId/t/:taskId`                     |
| **PUT**    | `/:projectId/t/:taskId`                     |
| **DELETE** | `/:projectId/t/:taskId`                     |
| **POST**   | `/:projectId/t/:taskId/subtasks`            |
| **PUT**    | `/:projectId/t/:taskId/subtasks/:subtaskId` |
| **DELETE** | `/:projectId/t/:taskId/subtasks/:subtaskId` |

### Note Routes (`/api/v1/notes/`)

| Method     | Endpoint                |
| :--------- | :---------------------- |
| **GET**    | `/:projectId`           |
| **POST**   | `/:projectId`           |
| **GET**    | `/:projectId/n/:noteId` |
| **PUT**    | `/:projectId/n/:noteId` |
| **DELETE** | `/:projectId/n/:noteId` |

### Health Check (`/api/v1/healthcheck/`)

| Method  | Endpoint |
| :------ | :------- |
| **GET** | `/`      |

permission matrix

| Feature                    | Admin | Project Admin | Member |
| :------------------------- | :---: | :-----------: | :----: |
| Create Project             |   ✓   |       ✗       |   ✗    |
| Update/Delete Project      |   ✓   |       ✗       |   ✗    |
| Manage Project Members     |   ✓   |       ✗       |   ✗    |
| Create/Update/Delete Tasks |   ✓   |       ✓       |   ✗    |
| View Tasks                 |   ✓   |       ✓       |   ✓    |
| Update Subtask Status      |   ✓   |       ✓       |   ✓    |
| Create/Delete Subtasks     |   ✓   |       ✓       |   ✗    |
| Create/Update/Delete Notes |   ✓   |       ✗       |   ✗    |
| View Notes                 |   ✓   |       ✓       |   ✓    |

### and there is a lot more, really overwhelming lets do/ make them one at a time so it is going to take some time

- this is not just a PRD doc but also for my better understanding of what i am building so i will scribble this digitally -> so someday i need to run this memory lane i know what mistakes/challanges i have faced and what solutions i have came up to, i.e. this is more for the interview purpose

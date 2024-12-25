# PPMoS (PhD Progress Monitoring System)

PPMoS is a platform designed to streamline the academic and administrative journey of PhD students, ensuring timely completion of milestones through role-specific dashboards, automated notifications, and structured feedback workflows.
  
## System Overview

 PPMoS provides role-specific dashboards for effective progress tracking:
  + **Student Dashboard:** Submit documents, view progress, and receive notifications.
  + **Advisor Dashboard:** Manage assigned students, provide feedback, and approve submissions.
  + **PG Coordinator Dashboard:** Review and approve grades, track student records, and generate reports.
  + **Chair Dashboard:** Approve proposals, schedule examinations, and manage department-level oversight.
  + **Dean Dashboard:** Handle high-level approvals and access summary reports.
  + **PG Director Dashboard:** Oversee system-wide progress and generate strategic reports.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js and Express
- **Database:** MongoDB
- **Other Tools:** Docker* 

## Usage

- **Students:** Log in to submit documents, track progress, and view feedback.
- **Advisors:** Review student submissions, provide feedback, and approve key milestones.
- **Coordinators, Chairs, and Deans:** Manage approvals, generate reports, and oversee the overall progress of PhD students.

## Project Structure

```plaintext
PPMoS/
├── frontend/          # Frontend source code
├── backend/           # Backend source code
├── docs/              # Documentation and design files
└── README.md          # Project README file
```
## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/foziamohammed/phd-progress-monitoring.git
    cd PPMoS
    ```
2. Install dependencies:
    ```bash
    # Example for Node.js backend
    npm install
    ```
3. Configure environment variables:
    - Create a `.env` file in the root directory.
    - Specify the necessary configurations (e.g., database credentials, API keys).

4. Run the application:
    ```bash
    # Example for starting a development server
    npm run dev
    ```


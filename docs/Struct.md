# Project Structure

This document outlines the structure of the Beit Hanina Community Center Volunteer Application project.

```
Beit-Hanina-Community-Center-Vol-App/
├── public/
│   ├── assets/
|   |   ├──logo.png
│   └── service-worker.js
├── src/
│   ├── components/
│   │   └── (your component files)
│   ├── models/
|   |   ├── Users/
│   │   |  ├── Admin.js
│   │   |  ├── Orgnizer.js
│   │   |  ├── Person.js
|   |   |  ├── PersonFactory.js
│   │   |  └── Volunteer.js

│   ├── pages/
│   │   ├── about.js
│   │   └── index.js
│   ├── styles/
│   │   ├── index.css
│   │   └── globals.css
│   └── (other existing files)
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── next.config.js
```

## Directory and File Descriptions

- **public/**: Contains static files like images, fonts, and icons. Files in this directory are served at the root URL.
  - **favicon.ico**: Browser tab icon.
  - **(other static assets)**: Any other static files you want to include.

- **src/**: Contains the source code of the application.
  - **components/**: Contains reusable UI components.
  - **pages/**: Contains the application's pages. Each file in this directory automatically becomes a route.
    - **api/**: Contains API routes. Files in this directory are mapped to `/api/*` and are treated as API endpoints instead of React pages.
      - **hello.ts**: Example API route.
    - **_app.tsx**: Custom App component to initialize pages. This is where you can add global styles and layout components.
    - **_document.tsx**: Custom Document component to augment the application's HTML and `<head>`. This is useful for customizing the server-rendered document markup.
    - **index.tsx**: The main entry point for your application, typically the homepage.
  - **styles/**: Contains CSS files for styling the application.
    - **Home.module.css**: Module CSS file for the Home component.
    - **globals.css**: Global CSS file applied to the entire application.
  - **(other existing files)**: Any other existing files in your project.

- **.gitignore**: Specifies which files and directories to ignore in version control.

- **package.json**: Manages project dependencies and scripts.

- **README.md**: Contains information about the project, how to set it up, and how to use it.

- **tsconfig.json**: TypeScript configuration file.

- **next.config.js**: Custom Next.js configuration file (optional).

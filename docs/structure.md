# Structure of files
```
.
├── client
│   ├── assets
│   │   └── logo.jpg
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── sw.js
│   ├── README.md
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── AppRouter.js
│       ├── components
│       │   ├── ButtonComponent.js
│       │   ├── DropDownMenu.js
│       │   ├── EventItem.js
│       │   ├── imageComponent.js
│       │   ├── InputComponent.js
│       │   ├── ManageAccountBox.js
│       │   └── NavigationBar.js
│       ├── config
│       │   ├── Colors.js
│       │   ├── Language.js
│       │   └── Skills.js
│       ├── global.css
│       ├── i18n.js
│       ├── icons
│       │   ├── about_icon.jpg
│       │   ├── arrow_down.jpg
│       │   ├── dark_mode.svg
│       │   ├── home_icon.jpg
│       │   ├── language_icon.jpg
│       │   ├── light_mode.svg
│       │   ├── logo.jpg
│       │   ├── org_icon.jpg
│       │   ├── profile_icon.jpg
│       │   └── settings_icon.jpg
│       ├── index.js
│       ├── installPrompt.js
│       ├── locales
│       │   ├── ar
│       │   │   ├── about.json
│       │   │   ├── app.json
│       │   │   ├── homeVolunteer.json
│       │   │   ├── personalArea.json
│       │   │   ├── settings.json
│       │   │   ├── signup.json
│       │   │   └── skills.json
│       │   └── en
│       │       ├── about.json
│       │       ├── app.json
│       │       ├── homeVolunteer.json
│       │       ├── personalArea.json
│       │       ├── settings.json
│       │       ├── signup.json
│       │       └── skills.json
│       └── pages
│           ├── AboutPage
│           │   └── About.js
│           ├── CommonPages
│           │   ├── ErrorScreen.js
│           │   ├── Loading.js
│           │   └── NoConnection.js
│           ├── HomePage
│           │   ├── HomeAdmin.js
│           │   ├── HomeOrganizer.js
│           │   └── HomeVolunteer.js
│           ├── PersonalAreaPage
│           │   ├── PersonalAreaAdmin.js
│           │   ├── PersonalAreaOrganizer.js
│           │   └── PersonalAreaVolunteer.js
│           ├── SettingsPage
│           │   └── Settings.js
│           └── SignUpPage
│               └── SignUp.js
├── docs
│   ├── digrams
│   │   ├── image.png
│   │   └── logic.drawio
│   ├── editable
│   │   └── SignUp.drawio.svg
│   ├── first-meeting
│   │   ├── FIRST-MEETING-QUESTIONS.md
│   │   └── FIRST-MEETING-SUMMARY.md
│   ├── help
│   │   ├── git_help.md
│   │   ├── setup.md
│   │   ├── standards.md
│   │   └── usefull_tools.md
│   ├── logic.png
│   └── structure.md
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── README.md
├── scripts
│   ├── before_git.sh
│   ├── generate_file_struct.sh
│   ├── run_frontEnd.sh
│   └── setup_server.sh
├── SECURITY.md
├── src
│   ├── controllers
│   │   ├── index.js
│   │   ├── register.js
│   │   └── validation.js
│   ├── database
│   │   ├── dbbuild.js
│   │   ├── db.js
│   │   ├── schema.sql
│   │   └── validation
│   │       └── users.js
│   ├── deprecated
│   │   └── Users
│   │       ├── Admin.js
│   │       ├── Organizer.js
│   │       ├── PersonFactory.js
│   │       ├── Person.js
│   │       └── Volunteer.js
│   ├── middlewares
│   │   └── verifyToken.js
│   └── server.js
├── tests
│   └── test.txt
└── workbox-config.cjs

31 directories, 99 files
```

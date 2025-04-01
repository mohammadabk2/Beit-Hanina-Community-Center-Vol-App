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
│       │   ├── NavigationBar.js
│       │   └── PersonItem.js
│       ├── config
│       │   ├── i18n.js
│       │   ├── locales
│       │   │   ├── ar
│       │   │   │   ├── about.json
│       │   │   │   ├── app.json
│       │   │   │   ├── HomeAdmin.json
│       │   │   │   ├── HomeOrganizer.json
│       │   │   │   ├── homeVolunteer.json
│       │   │   │   ├── personalArea.json
│       │   │   │   ├── signup.json
│       │   │   │   └── skills.json
│       │   │   └── en
│       │   │       ├── about.json
│       │   │       ├── app.json
│       │   │       ├── events.json
│       │   │       ├── HomeAdmin.json
│       │   │       ├── HomeOrganizer.json
│       │   │       ├── homeVolunteer.json
│       │   │       ├── personalArea.json
│       │   │       ├── signup.json
│       │   │       └── skills.json
│       │   └── options
│       │       ├── Colors.js
│       │       ├── Language.js
│       │       └── Skills.js
│       ├── global.css
│       ├── icons
│       │   ├── about_icon.jpg
│       │   ├── dark
│       │   │   ├── about_icon.svg
│       │   │   ├── home_icon.svg
│       │   │   ├── mode_icon.svg
│       │   │   ├── profile_icon.svg
│       │   │   └── settings_icon.svg
│       │   ├── drop_down_icon.svg
│       │   ├── favorite_icon.svg
│       │   ├── home_icon.jpg
│       │   ├── light
│       │   │   ├── about_icon.svg
│       │   │   ├── home_icon.svg
│       │   │   ├── mode_icon.svg
│       │   │   ├── profile_icon.svg
│       │   │   └── settings_icon.svg
│       │   ├── not_favorite_icon.svg
│       │   ├── org_icon.png
│       │   └── person_icon.svg
│       ├── index.js
│       ├── installPrompt.js
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

34 directories, 110 files
```

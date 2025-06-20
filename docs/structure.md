# Structure of files
```
.
├── client
│   ├── app
│   │   └── apk
│   │       ├── app-debug-2.apk
│   │       ├── app-debug-3.apk
│   │       └── app-debug.apk
│   ├── assets
│   │   └── logo.jpg
│   ├── capacitor.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── service-worker.js
│   ├── README.md
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── AppRouter.js
│       ├── components
│       │   ├── common
│       │   │   ├── ButtonComponent.js
│       │   │   ├── DropDownMenu.js
│       │   │   ├── InputComponent.js
│       │   │   ├── PopupComponent.js
│       │   │   ├── SelectComponent.js
│       │   │   └── UploadComponent.js
│       │   ├── EventItem.js
│       │   ├── layout
│       │   │   ├── CopyRight.js
│       │   │   └── NavigationBar.js
│       │   ├── ManageAccountBox.js
│       │   └── PersonItem
│       │       ├── PeopleDisplaySwitcher.js
│       │       ├── PersonItemCard.js
│       │       ├── PersonItemRow.js
│       │       └── PersonList.js
│       ├── config
│       │   ├── Context
│       │   │   └── auth.js
│       │   ├── hooks
│       │   │   ├── loadEvent.js
│       │   │   └── loadUsers.js
│       │   ├── i18n.js
│       │   ├── locales
│       │   │   ├── ar
│       │   │   │   ├── about.json
│       │   │   │   ├── app.json
│       │   │   │   ├── copyright.json
│       │   │   │   ├── HomeAdmin.json
│       │   │   │   ├── home.json
│       │   │   │   ├── HomeOrganizer.json
│       │   │   │   ├── insurance.json
│       │   │   │   ├── navBar.json
│       │   │   │   ├── occupation.json
│       │   │   │   ├── personalArea.json
│       │   │   │   ├── signup.json
│       │   │   │   └── skills.json
│       │   │   └── en
│       │   │       ├── about.json
│       │   │       ├── app.json
│       │   │       ├── copyright.json
│       │   │       ├── events.json
│       │   │       ├── HomeAdmin.json
│       │   │       ├── home.json
│       │   │       ├── HomeOrganizer.json
│       │   │       ├── insurance.json
│       │   │       ├── navBar.json
│       │   │       ├── occupation.json
│       │   │       ├── personalArea.json
│       │   │       ├── signup.json
│       │   │       └── skills.json
│       │   └── options
│       │       ├── Colors.js
│       │       ├── Insurance.js
│       │       ├── Language.js
│       │       ├── Occupation.js
│       │       ├── Skills.js
│       │       └── Sort.js
│       ├── global.css
│       ├── icons
│       │   ├── about_icon.jpg
│       │   ├── dark
│       │   │   ├── card_view_icon.svg
│       │   │   ├── check-dark.svg
│       │   │   ├── cross-dark.svg
│       │   │   ├── document-filled-dark.svg
│       │   │   ├── document-plus-dark.svg
│       │   │   ├── NavBar
│       │   │   │   ├── about_icon.svg
│       │   │   │   ├── home_icon.svg
│       │   │   │   ├── mode_icon.svg
│       │   │   │   ├── profile_icon.svg
│       │   │   │   └── settings_icon.svg
│       │   │   ├── table_view_icon.svg
│       │   │   └── x_icon.svg
│       │   ├── drop_down_icon.svg
│       │   ├── favorite_icon.svg
│       │   ├── home_icon.jpg
│       │   ├── light
│       │   │   ├── card_view_icon.svg
│       │   │   ├── check-light.svg
│       │   │   ├── cross-light.svg
│       │   │   ├── document-filled-light.svg
│       │   │   ├── document-plus-light.svg
│       │   │   ├── NavBar
│       │   │   │   ├── about_icon.svg
│       │   │   │   ├── home_icon.svg
│       │   │   │   ├── mode_icon.svg
│       │   │   │   ├── profile_icon.svg
│       │   │   │   ├── settings_icon.svg
│       │   │   │   └── view_icon.svg
│       │   │   ├── table_view_icon.svg
│       │   │   └── x_icon.svg
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
│           │   ├── NoConnection.js
│           │   └── ULA.js
│           ├── HomePage
│           │   ├── HomeAdmin.js
│           │   ├── HomeOrganizer.js
│           │   └── HomeVolunteer.js
│           ├── PersonalAreaPage
│           │   ├── PersonalAreaAdmin.js
│           │   ├── PersonalAreaOrganizer.js
│           │   └── PersonalAreaVolunteer.js
│           └── SignUpPage
│               └── SignUp.js
├── docs
│   ├── digrams
│   │   ├── database-digram.png
│   │   ├── dataFlow.png
│   │   ├── h3
│   │   │   └── user_auth_sequence.png
│   │   ├── image.png
│   │   └── logic.drawio
│   ├── editable
│   │   ├── h3
│   │   │   └── user_auth_sequence.drawio
│   │   └── SignUp.drawio.svg
│   ├── first-meeting
│   │   ├── FIRST-MEETING-QUESTIONS.md
│   │   └── FIRST-MEETING-SUMMARY.md
│   ├── help
│   │   ├── git_help.md
│   │   ├── PostGreSql_help.md
│   │   ├── setup.md
│   │   ├── standards.md
│   │   └── usefull_tools.md
│   ├── logic.png
│   └── structure.md
├── eslint.config.mjs
├── keys
│   ├── Key_1.pem
│   └── key_2.pem
├── package.json
├── package-lock.json
├── README.md
├── scripts
│   ├── android_setup.sh
│   ├── before_git.sh
│   ├── buildExe.sh
│   ├── convert_to_apk.sh
│   ├── convert_to_ipa.sh
│   ├── generate_file_struct.sh
│   ├── run_frontEnd.sh
│   └── setup_server.sh
├── SECURITY.md
├── server-logs
│   ├── 16-06-2025.txt
│   └── 17-06-2025.txt
├── src
│   ├── controllers
│   │   ├── auth
│   │   │   ├── changePassword.js
│   │   │   └── login.js
│   │   ├── common
│   │   │   ├── authenticate.js
│   │   │   ├── error.js
│   │   │   ├── ping.js
│   │   │   └── validateToken.js
│   │   ├── Events
│   │   │   ├── actions.js
│   │   │   ├── create.js
│   │   │   └── load.js
│   │   ├── index.js
│   │   ├── Users
│   │   │   ├── actions.js
│   │   │   ├── create.js
│   │   │   ├── Info.js
│   │   │   └── load.js
│   │   └── validation.js
│   ├── database
│   │   ├── dbconnection.js
│   │   ├── db.js
│   │   ├── schema.sql
│   │   └── validation
│   │       └── users.js
│   ├── middlewares
│   │   └── verifyToken.js
│   ├── server.js
│   └── utils
│       └── logger.js
├── tests
│   ├── addAdmin.sql
│   ├── drop_tables.sql
│   ├── events.sql
│   ├── master.sql
│   ├── populate.sql
│   ├── postman
│   │   └── App-test.postman_collection.json
│   └── test_cases.md
└── workbox-config.cjs

50 directories, 176 files
```

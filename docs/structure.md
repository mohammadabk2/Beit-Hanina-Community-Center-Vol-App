# Structure of files
```
.
├── README.md
├── SECURITY.md
├── client
│   ├── README.md
│   ├── app
│   │   └── apk
│   │       ├── app-debug-2.apk
│   │       └── app-debug.apk
│   ├── assets
│   │   └── logo.jpg
│   ├── capacitor.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── service-worker.cjs
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── AppRouter.js
│       ├── components
│       │   ├── EventItem.js
│       │   ├── ManageAccountBox.js
│       │   ├── PersonItem
│       │   │   ├── PeopleDisplaySwitcher.js
│       │   │   ├── PersonItemCard.js
│       │   │   ├── PersonItemRow.js
│       │   │   └── PersonList.js
│       │   ├── common
│       │   │   ├── ButtonComponent.js
│       │   │   ├── DropDownMenu.js
│       │   │   ├── InputComponent.js
│       │   │   ├── SelectComponent.js
│       │   │   └── UploadComponent.js
│       │   └── layout
│       │       ├── CopyRight.js
│       │       └── NavigationBar.js
│       ├── config
│       │   ├── i18n.js
│       │   ├── locales
│       │   │   ├── ar
│       │   │   │   ├── HomeAdmin.json
│       │   │   │   ├── HomeOrganizer.json
│       │   │   │   ├── about.json
│       │   │   │   ├── app.json
│       │   │   │   ├── copyright.json
│       │   │   │   ├── home.json
│       │   │   │   ├── insurance.json
│       │   │   │   ├── navBar.json
│       │   │   │   ├── occupation.json
│       │   │   │   ├── personalArea.json
│       │   │   │   ├── signup.json
│       │   │   │   └── skills.json
│       │   │   └── en
│       │   │       ├── HomeAdmin.json
│       │   │       ├── HomeOrganizer.json
│       │   │       ├── about.json
│       │   │       ├── app.json
│       │   │       ├── copyright.json
│       │   │       ├── events.json
│       │   │       ├── home.json
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
│       │   │   ├── NavBar
│       │   │   │   ├── about_icon.svg
│       │   │   │   ├── home_icon.svg
│       │   │   │   ├── mode_icon.svg
│       │   │   │   ├── profile_icon.svg
│       │   │   │   └── settings_icon.svg
│       │   │   ├── card_view_icon.svg
│       │   │   ├── table_view_icon.svg
│       │   │   └── x_icon.svg
│       │   ├── drop_down_icon.svg
│       │   ├── favorite_icon.svg
│       │   ├── home_icon.jpg
│       │   ├── light
│       │   │   ├── NavBar
│       │   │   │   ├── about_icon.svg
│       │   │   │   ├── home_icon.svg
│       │   │   │   ├── mode_icon.svg
│       │   │   │   ├── profile_icon.svg
│       │   │   │   ├── settings_icon.svg
│       │   │   │   └── view_icon.svg
│       │   │   ├── card_view_icon.svg
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
│           │   └── NoConnection.js
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
│   │   ├── image.png
│   │   └── logic.drawio
│   ├── editable
│   │   └── SignUp.drawio.svg
│   ├── first-meeting
│   │   ├── FIRST-MEETING-QUESTIONS.md
│   │   └── FIRST-MEETING-SUMMARY.md
│   ├── help
│   │   ├── PostGreSql_help.md
│   │   ├── git_help.md
│   │   ├── setup.md
│   │   ├── standards.md
│   │   └── usefull_tools.md
│   ├── logic.png
│   └── structure.md
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── scripts
│   ├── before_git.sh
│   ├── convert_to_apk.sh
│   ├── convert_to_ipa.sh
│   ├── generate_file_struct.sh
│   ├── run_frontEnd.sh
│   ├── setup_for_android.sh
│   └── setup_server.sh
├── src
│   ├── controllers
│   │   ├── index.js
│   │   ├── register.js
│   │   └── validation.js
│   ├── database
│   │   ├── db.js
│   │   ├── dbbuild.js
│   │   ├── schema.sql
│   │   └── validation
│   │       └── users.js
│   ├── deprecated
│   │   └── Users
│   │       ├── Admin.js
│   │       ├── Organizer.js
│   │       ├── Person.js
│   │       ├── PersonFactory.js
│   │       └── Volunteer.js
│   ├── middlewares
│   │   └── verifyToken.js
│   └── server.js
├── tests
│   └── test.txt
└── workbox-config.cjs

41 directories, 139 files
```

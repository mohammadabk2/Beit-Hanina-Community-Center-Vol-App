# Structure of files
```
.
├── client
│   ├── app
│   │   └── apk
│   │       ├── app-debug-2.apk
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
│   │   └── service-worker.cjs
│   ├── README.md
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── AppRouter.js
│       ├── components
│       │   ├── ButtonComponent.js
│       │   ├── CopyRight.js
│       │   ├── DropDownMenu.js
│       │   ├── EventItem.js
│       │   ├── InputComponent.js
│       │   ├── ManageAccountBox.js
│       │   ├── NavigationBar.js
│       │   ├── PersonItem
│       │   │   ├── PeopleDisplaySwitcher.js
│       │   │   ├── PersonItemCard.js
│       │   │   ├── PersonItemRow.js
│       │   │   └── PersonList.js
│       │   ├── SelectComponent.js
│       │   └── UploadComponent.js
│       ├── config
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
│       │   │       ├── personalArea.json
│       │   │       ├── signup.json
│       │   │       └── skills.json
│       │   └── options
│       │       ├── Colors.js
│       │       ├── Insurance.js
│       │       ├── Language.js
│       │       ├── Skills.js
│       │       └── Sort.js
│       ├── global.css
│       ├── icons
│       │   ├── about_icon.jpg
│       │   ├── dark
│       │   │   ├── card_view_icon.svg
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
│   │   ├── image.png
│   │   └── logic.drawio
│   ├── editable
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
├── package.json
├── package-lock.json
├── README.md
├── scripts
│   ├── before_git.sh
│   ├── convert_to_apk.sh
│   ├── convert_to_ipa.sh
│   ├── generate_file_struct.sh
│   ├── run_frontEnd.sh
│   ├── setup_for_android.sh
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

38 directories, 137 files
```

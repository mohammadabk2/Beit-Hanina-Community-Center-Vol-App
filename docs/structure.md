# Structure of files
```
.
├── client
│   ├── android
│   │   ├── app
│   │   │   ├── build.gradle
│   │   │   ├── capacitor.build.gradle
│   │   │   ├── proguard-rules.pro
│   │   │   └── src
│   │   │       ├── androidTest
│   │   │       │   └── java
│   │   │       │       └── com
│   │   │       │           └── getcapacitor
│   │   │       │               └── myapp
│   │   │       │                   └── ExampleInstrumentedTest.java
│   │   │       ├── main
│   │   │       │   ├── AndroidManifest.xml
│   │   │       │   ├── assets
│   │   │       │   │   ├── capacitor.config.json
│   │   │       │   │   ├── capacitor.plugins.json
│   │   │       │   │   └── public
│   │   │       │   │       ├── asset-manifest.json
│   │   │       │   │       ├── cordova.js
│   │   │       │   │       ├── cordova_plugins.js
│   │   │       │   │       ├── favicon.ico
│   │   │       │   │       ├── index.html
│   │   │       │   │       ├── logo192.png
│   │   │       │   │       ├── logo512.png
│   │   │       │   │       ├── manifest.json
│   │   │       │   │       ├── service-worker.cjs
│   │   │       │   │       └── static
│   │   │       │   │           ├── css
│   │   │       │   │           │   ├── main.a400368b.css
│   │   │       │   │           │   └── main.a400368b.css.map
│   │   │       │   │           ├── js
│   │   │       │   │           │   ├── main.8a19e140.js
│   │   │       │   │           │   ├── main.8a19e140.js.LICENSE.txt
│   │   │       │   │           │   └── main.8a19e140.js.map
│   │   │       │   │           └── media
│   │   │       │   │               ├── about_icon.a353bd81add2a16e385e0ae63a2fb21a.svg
│   │   │       │   │               ├── about_icon.b6e60ac9d1a43ee6c0357b53c115d5a2.svg
│   │   │       │   │               ├── drop_down_icon.ed798305cdf00e5b0dfae71eb5ca84bd.svg
│   │   │       │   │               ├── favorite_icon.be8c9e492bafebf45bddde3b5d867428.svg
│   │   │       │   │               ├── home_icon.17525de82e07a149e47c7eee5422254a.svg
│   │   │       │   │               ├── home_icon.9ce89a2a06783dde1a246caa8d7d0fb0.svg
│   │   │       │   │               ├── mode_icon.bbfbf44754947687ed43cb0708402023.svg
│   │   │       │   │               ├── mode_icon.cdf14dcd778d4c5cb04e8dd14581f5e5.svg
│   │   │       │   │               ├── not_favorite_icon.d484f0be3d0a6401d38905660696aa67.svg
│   │   │       │   │               ├── org_icon.bc05e7bc4e0083af4920.png
│   │   │       │   │               ├── person_icon.121a96583cafb4b6022a005510ceed79.svg
│   │   │       │   │               ├── profile_icon.8fac68bff16a0295716f63e496fa0378.svg
│   │   │       │   │               ├── profile_icon.96d7f4cf130b84d3535244f800b8bdaa.svg
│   │   │       │   │               ├── settings_icon.204e7c3b5ae4b1aa273c669f9d3762ab.svg
│   │   │       │   │               ├── settings_icon.ede8bb120acea9585e35e8e1556c2d55.svg
│   │   │       │   │               ├── x_icon.1998245866db06826076a2e321626ce6.svg
│   │   │       │   │               └── x_icon.498067078b885ff962ebfa66e82653ff.svg
│   │   │       │   ├── java
│   │   │       │   │   └── com
│   │   │       │   │       └── eventflow
│   │   │       │   │           └── MainActivity.java
│   │   │       │   └── res
│   │   │       │       ├── drawable
│   │   │       │       │   ├── ic_launcher_background.xml
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-land-hdpi
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-land-mdpi
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-land-xhdpi
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-land-xxhdpi
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-land-xxxhdpi
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-port-hdpi
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-port-mdpi
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-port-xhdpi
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-port-xxhdpi
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-port-xxxhdpi
│   │   │       │       │   └── splash.png
│   │   │       │       ├── drawable-v24
│   │   │       │       │   └── ic_launcher_foreground.xml
│   │   │       │       ├── layout
│   │   │       │       │   └── activity_main.xml
│   │   │       │       ├── mipmap-anydpi-v26
│   │   │       │       │   ├── ic_launcher_round.xml
│   │   │       │       │   └── ic_launcher.xml
│   │   │       │       ├── mipmap-hdpi
│   │   │       │       │   ├── ic_launcher_foreground.png
│   │   │       │       │   ├── ic_launcher.png
│   │   │       │       │   └── ic_launcher_round.png
│   │   │       │       ├── mipmap-mdpi
│   │   │       │       │   ├── ic_launcher_foreground.png
│   │   │       │       │   ├── ic_launcher.png
│   │   │       │       │   └── ic_launcher_round.png
│   │   │       │       ├── mipmap-xhdpi
│   │   │       │       │   ├── ic_launcher_foreground.png
│   │   │       │       │   ├── ic_launcher.png
│   │   │       │       │   └── ic_launcher_round.png
│   │   │       │       ├── mipmap-xxhdpi
│   │   │       │       │   ├── ic_launcher_foreground.png
│   │   │       │       │   ├── ic_launcher.png
│   │   │       │       │   └── ic_launcher_round.png
│   │   │       │       ├── mipmap-xxxhdpi
│   │   │       │       │   ├── ic_launcher_foreground.png
│   │   │       │       │   ├── ic_launcher.png
│   │   │       │       │   └── ic_launcher_round.png
│   │   │       │       ├── values
│   │   │       │       │   ├── ic_launcher_background.xml
│   │   │       │       │   ├── strings.xml
│   │   │       │       │   └── styles.xml
│   │   │       │       └── xml
│   │   │       │           ├── config.xml
│   │   │       │           └── file_paths.xml
│   │   │       └── test
│   │   │           └── java
│   │   │               └── com
│   │   │                   └── getcapacitor
│   │   │                       └── myapp
│   │   │                           └── ExampleUnitTest.java
│   │   ├── build.gradle
│   │   ├── capacitor-cordova-android-plugins
│   │   │   ├── build.gradle
│   │   │   ├── cordova.variables.gradle
│   │   │   └── src
│   │   │       └── main
│   │   │           └── AndroidManifest.xml
│   │   ├── capacitor.settings.gradle
│   │   ├── gradle
│   │   │   └── wrapper
│   │   │       ├── gradle-wrapper.jar
│   │   │       └── gradle-wrapper.properties
│   │   ├── gradle.properties
│   │   ├── gradlew
│   │   ├── gradlew.bat
│   │   ├── local.properties
│   │   ├── settings.gradle
│   │   └── variables.gradle
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
│       │   ├── DropDownMenu.js
│       │   ├── EventItem.js
│       │   ├── imageComponent.js
│       │   ├── InputComponent.js
│       │   ├── ManageAccountBox.js
│       │   ├── NavigationBar.js
│       │   └── PersonItem
│       │       ├── PersonItemCard.js
│       │       ├── PersonItem.js
│       │       └── PersonItemTable.js
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
│       │   │   ├── settings_icon.svg
│       │   │   └── x_icon.svg
│       │   │   ├── settings_icon.svg
│       │   │   └── x_icon.svg
│       │   ├── drop_down_icon.svg
│       │   ├── favorite_icon.svg
│       │   ├── home_icon.jpg
│       │   ├── light
│       │   │   ├── about_icon.svg
│       │   │   ├── home_icon.svg
│       │   │   ├── mode_icon.svg
│       │   │   ├── profile_icon.svg
│       │   │   ├── settings_icon.svg
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
│   ├── convert_to_apk.sh
│   ├── convert_to_ipa.sh
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

85 directories, 203 files
```

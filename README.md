# webprog4-beadando2-NeverMInd
Ez az oldal filmek adatait képes tárolni.
Az oldalra lehet regisztrálni, s kell is. A normál felhasználók és azok akik nincsenek belépve, csak a listázás funkciót érik el.
A felvitel, törlés és módosításhoz adminnak kell lenni. Ez egy úgy lett megoldva, hogy egy user_level szinttel rendelkezik mindenki.
##
Az alkalmazás a Mongo Atlas-t használja, így távolról is elérhető a mindenkori adatbázis. Ez azt jelenti, hogy az alapból létrehozott admin felhasználóval belehet lépni, aminek a jelszava is admin.
##
Az oldal teljes egészében a React-ra épül, bár vannak elemei amelyeket felesleges volt azzal megcsinálni. (pl. a soha nem változó menüsor.)
##
A szerver és kliens közti kapcsolat ajax alapokon működik, az Axios modult használva.
##
A frontend részen látható tartalom attól függ, hogy milyen szintű felhasználók vagyunk, s az adatok ellenőrzése is megtörténik a kliensoldalon is, de mivel a kliensoldal könnyen módosítható, így kétlépcsős vizsgálat van beépítve.
Minden adatfelvitel, módosítás, vagy törlés során a szerver a háttérben is megvizsgálja a felhasználó szintjét, s a módosítandó adatok formáját.
Beépítettem egy elég szigorú regex-et ami itt-ott túl szigorú, de 90%-ban a megfelelő karaktereket engedi.
##
Sessionkezelés: A localstorage-ban elmentésre kerül a session ID, az adatbázisban ehhez pedig tartozik az userID is. Az egyik legbiztonságosabb módszer, egybeépítve a verify-rendszerrel, mely minden egyes alkalommal megvizsgálja a felhasználó jogait.
##
Felhasznált technológiák:
##
- React: Minden komponens egy .jsx fájlban található, ezeket pedig az index.js kezeli.
- Axios: A kommunikációt a szerver és kliens között ez a modul végzi.
- Sass: CSS library, segítségével könnyebb dizájnt készíteni.
- Bcrypt: Egy modul amely a jelszavak titkosításához használható.
- Mongoose: MongoAtlas-hoz való csatlakozás és egyéb műveletek.
- Request: Backend oldalon egyes modulok közötti kommunikációhoz használatos modul.
- Cors: Frontend és Backend közötti kommunikációt engedélyező modul.
##
Telepítés:
##
Backend: Ott ahol a __```server.js```__ és a 
__```package.json```__
fájl található egy parancssort kell nyitni és az 
__```npm install```__
beírni.
##
Frontend: A backend mappában található egy __```client```__ mappa. Azon belül úgyszintén egy parancssort kell indítani és kiadni az __```npm install```__.
##
Futtatás:
##
Backend: Ott ahol a __```server.js```__ és a 
__```package.json```__
fájl található egy parancssort kell nyitni és az 
__```npm start```__ VAGY __```nodemon server```__
beírni.
##
Frontend: A backend mappában található egy __```client```__ mappa. Azon belül úgyszintén egy parancssort kell indítani és kiadni az __```npm start```__.
##

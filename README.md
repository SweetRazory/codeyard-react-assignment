# Codeyard Test Frontend

Üdv, ezt a Projectet a Codeyard cég számára kellett elkészítenem, mint Frontend fejlesztői tesztfeladat.

---

## Tesztkörnyezet futtatása

Első lépésként klónozzuk le a repository-t

```bash
gh repo clone SweetRazory/codeyard-react-assignment
```

Majd, az alábbi parancs segítségével, telepítsük a project számára szükséges package-ket.

```bash
npm install
```

Ez után, indítsuk el a fejlesztői szervert az alábbi parancsokkal.

```bash
npm run dev
```

---

## Alkalmazás leírása

Az oldalon, egy szimpla bejelentkezési felület található, email, jelszó, és egy opcionális, "Emlékezz rám" kapcsolóval.

Az oldal jobb alsó sarkában egy kis menü található, ahol lehet állítani a háttér színét, a bejelentkezési bemenetek ellenörző metódusát, és a loading state-t

---

## Packagek és miért pont ezek

- `vite`: HMR (Hot Module Reload), és egyszerű configuráció.
- `axios`: Kényelmesebb HTTP request/response kezelés
- `antd`: Számomra bevállt libary, szép, letisztult designnal érkezik, egyszerű kezelni
- `sass`: Kényelmi okokból
- `typescript`: Gyorsabb, és biztonságosabb fejlesztési folyamat miatt

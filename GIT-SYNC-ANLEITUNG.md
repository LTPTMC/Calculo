# Git-Sync-Anleitung (mehrere Geräte, immer aktuell)

## 1) Einmalig: Remote-Repo auf GitHub erstellen
1. Öffne GitHub und erstelle ein neues Repository (z. B. `website`).
2. Lass das Repo **leer** (kein README, keine `.gitignore`, keine License).
3. Kopiere die Repository-URL, z. B.:
   - HTTPS: `https://github.com/<dein-user>/website.git`

## 2) Dieses Projekt mit GitHub verbinden (nur auf dem Hauptgerät)
Im Projektordner ausführen:

```bash
git remote add origin <REPO_URL>
git push -u origin main
```

## 3) Auf weiteren Geräten einrichten (nur einmal pro Gerät)

```bash
git clone <REPO_URL>
cd website
```

## 4) Täglicher Workflow (wichtig für „immer aktuell“)
### Vor jeder Arbeit

```bash
git pull --rebase
```

### Nach Änderungen

```bash
git add .
git commit -m "kurze beschreibung"
git push
```

## 5) Wenn es Konflikte gibt
1. Konfliktdateien öffnen und Konflikte auflösen.
2. Danach:

```bash
git add .
git rebase --continue
```

3. Falls nötig danach nochmal pushen:

```bash
git push
```

## 6) Optional: Schneller Status-Check

```bash
git status
git log --oneline --graph --decorate -15
```

## Hinweise
- Immer zuerst `pull --rebase`, dann arbeiten, dann `push`.
- Nicht parallel auf zwei Geräten dieselbe Zeile ändern.
- Kleine, häufige Commits reduzieren Konflikte.

# GO-TO LINKS — 2026-11-04

## Nowe funkcje

1. Menu kafelków: przytrzymanie dotykiem, prawy przycisk lub Shift+F10.
2. Osobny rząd przypiętych linków i folderów na stronie głównej.
3. Kosz obejmujący całą zawartość folderów, przywracanie i Cofnij.
4. Wykrywanie powtórzonych adresów przy zapisie, z wyborem dalszego działania.
5. Podgląd importu HTML/JSON: łączenie bez duplikatów lub zastąpienie. Zastąpiony zbiór trafia do kosza.
6. Zaznaczanie widocznych elementów, zbiorowe przenoszenie, eksport HTML i kosz.
7. Tagi, filtrowanie i notatki, objęte wyszukiwaniem i kopią JSON/ZIP.
8. Instalowalna PWA z obsługą linku z menu Udostępnij, zapisywanego po zatwierdzeniu formularza.
9. Przenośny ZIP: przeglądarka zbioru offline, HTML zakładek, pełny JSON, własne ikony i instrukcja odtworzenia.
10. Skróty /, Ctrl/Cmd+K, Alt+N, Escape i Shift+F10.

## Testy

- `node --check enhancements.js`
- `node --check sw.js`
- `node tests/service-worker.test.cjs`
- `tests/browser-tests.html`: plan łączenia importu, duplikaty, struktura folderów, CRC32, bezpieczny HTML i działający widok offline.
- Kontrola ZIP w Python zipfile: CRC, Unicode i pliki binarne.
- Testy UI w przeglądarce: zapis tagów/notatek, menu prawego przycisku, przypinanie, kosz i Cofnij, ostrzeżenie o duplikacie, import i przenoszenie, przywracanie folderu z zawartością, wyszukiwanie notatki, skróty i odbiór parametrów udostępnienia.
- Kontrola układu przy szerokości 390 px.

## Uwagi

- Instalacja i obecność w natywnym menu Udostępnij zależą od obsługiwanej przeglądarki Androida. Nie zweryfikowano fizycznego urządzenia.
- Linki i ustawienia zachowują dotychczasowe klucze zapisu. Nowe pola są opcjonalne, a elementy otrzymują stabilne identyfikatory.
- Kopia ZIP przechowuje zbiór adresów i metadane, nie zawartość stron internetowych. Pełne odtworzenie wykonuje się przez import wypakowanego JSON z opcją Zastąp.
- Integracja Firebase pozostaje na obecnej konfiguracji. W tej zmianie nie wykonywano logowania na konto użytkownika ani testu synchronizacji między fizycznymi urządzeniami.

# Gällande historik

---------

Allmänt

Tanken är att: 
1. När man laddar appen så loopar den igenom alla räknare
2. Kollar om den ska nollställas varje dag (resetEveryDay)
3. Och isåfall kollar om lastTouched är nåt annat datum än idag och isåfall 
4. Kollar att datumet inte redan är tillagt, borde inte behövas eftersom lastTouched är uppdaterat) och isåfall
5. Lägger in det datumet i historiken och nollställer värdet och viktigt är att den uppdaterar lastTouched till nu



---------

## Scenario 1
-----------
### Datum: 2021-01-10 


LastTouched: 2021-01-09

Och i historik ligger det: 

2021-01-09

2021-01-08

Förväntat resultat i historik:

2021-01-09

2021-01-08

Det ska enbart ligga för det datumet som LastTouched är

---

## Scenario 2
-----------
### Datum: 2021-01-10 


LastTouched: 2021-01-10

I historik ligger: 

2021-01-09

2021-01-08

Förväntat resultat i historik:

2021-01-09

2021-01-09

---


# Documentatie voor het Enterprise project 'Sevyh'

## Inhoudsopgave

1. [Inleiding](#inleiding)
2. [Functionele eisen](#functionele-eisen)
3. [Software kwaliteit](#software-kwaliteit)
4. [Niet functionele eisen](#niet-functionele-eisen)
5. [Tech stack](#tech-stack)
6. [Architectuur](#architectuur)
5. [Bronnen](#bronnen)


## Inleiding

Voor dit project gaan we ervan uit dat iedereen klaar is met Facebook en omdat Hyves zo lekker nostalgisch is, verlangen we terug naar die tijd. Maar in plaats van dat alleen Nederlanders de applicatie weten te vinden, weten onze ze aan de andere kant van de oceaan in de Verenigde Staten ook deze applicatie te vinden! 

## Functionele eisen

**Profiel(pagina)**
-	De gebruiker moet een account kunnen aanmaken.
-	De gebruiker moet een account kunnen verwijderen.
-	De gebruiker moet persoonlijke gegevens kunnen aanpassen.
-	De gebruiker moet een profielfoto kunnen uploaden.
-	De gebruiker moet een profielfoto kunnen verwijderen.

**Vrienden**
-	De gebruiker moet een vriend kunnen toevoegen.
-	De gebruiker moet een vriend kunnen verwijderen.
-	De gebruiker moet een lijst met vrienden kunnen bekijken.

**Chat**
-	De gebruiker moet een chatgeschiedenis kunnen bekijken.
-	De gebruiker moet een chatgeschiedenis kunnen verwijderen.
-	De gebruiker moet een chatgeschiedenis kunnen downloaden.
-	De gebruiker moet een chatgeschiedenis kunnen zoeken.
-	De gebruiker moet kunnen chatten met andere gebruikers.
-   De gebruiker moet kunnen zien of een andere gebruiker online is.

## Software kwaliteit
Voor dit project zal de ISO 25010 standaard worden gebruikt. ISO 25010 is een internationale standaard voor software kwaliteit, daardoor zou deze standaard voor iedere (goede) developer bekend moeten zijn en is het verstandig om deze standaard aan te houden. De standaard is opgebouwd uit 8 kwaliteitsaspecten. Deze aspecten zijn:

<p align="center">
    <img src="https://iso25000.com/images/figures/en/iso25010.png" alt="ISO 25010" style="margin:auto;">    
</p>

Op basis van deze aspecten, is het mogelijk om goede niet functionele eisen te formuleren. Deze zijn te vinden in de paragraaf [Niet functionele eisen](#niet-functionele-eisen). Niet alle aspecten zijn even belangrijk voor dit project. Daarom is er een keuze gemaakt welke aspecten wel en niet belangrijk zijn voor dit project.

## Niet functionele eisen

**Prestaties**
-	Zodra een gebruiker de chathistorie wil bekijken, moet de chatgeschiedenis voor zover de gebruiker kan zien binnen één seconden geladen zijn. Eventuele oudere historie kan later opgehaald worden
-	Zodra een gebruiker een bericht stuurt, moet deze binnen één seconden aankomen bij de ontvanger.
-	Gebruikers moeten geen verschil in snelheid merken tussen spits- en daluren van de applicatie.

**Schaalbaarheid**
-	De applicatie moet schaalbaar zijn wanneer er meer of minder vraag komt naar de applicatie.
-	De applicatie moet een piekbelasting van minimaal 10.000 live gebruikers aankunnen.

**Beveiliging**
-	Alle chatberichten tussen gebruikers moeten end-to-end versleuteld zijn.
-	Applicatie moet beschermd zijn tegen de top 10 van OWASP.
-   Applicatie hanteert de 'zero trust' filosofie.

**Betrouwbaarheid en beschikbaarheid**
-	De applicatie moet een uptime hebben van 99,9% per jaar. Dit vertaalt in een maximale downtime van 8,77 uur per jaar of 1,44 minuten per dag.
-	Downtime van een crash mag maximaal 5 minuten duren tijdens een probleem.

**Onderhoudbaarheid**
-	Documentatie moet voldoen aan de OpenAI specificatie.
-	Over elk component van de applicatie moet documentatie te vinden zijn met de structuur en de gemaakte keuzes.

**Regelgeving**
-	Applicatie voldoet aan lokale regelgeving in de Europese Unie en de Verenigde Staten

## Tech stack

**Front-end** 
Voor de front-end wil ik React gaan gebruiken, met de voornaamste reden om te leren hoe dit framework echt werkt. In S3 heb ik namelijk naar mijn idee niet genoeg geleerd hierover om goed met React aan de slag te kunnen. Daarnaast is het een framework dat ik graag wil leren kennen, omdat het veel wordt gebruikt in de industrie, dus het is niet verkeerd om hier meer kennis van op te doen.

**Back-end**
Voor de back-end wil ik Java met het framework Spring boot gaan gebruiken. Met zowel Java als Spring Boot heb ik al enige ervaring. Dit is mij vorige keer goed bevallen, dus hier wil ik mee doorgaan. Ook Java met Spring Boot wordt vaak gebruikt, dus het is een goede toevoeging voor mijn portfolio.

**Databases**
Voor nu heb ik de keuze gemaakt om Kassandra, PostgreSQL en mongoDB te gaan gebruiken. Dit is afhankelijk van de microservice. Deze uitleg zal ik later in de documentatie toevoegen.

**Cache**
Voor de cache wil ik Redis gaan gebruiken. Dit is een in-memory database die snel is en veel gebruikt wordt. Daarnaast is het een goede toevoeging voor mijn portfolio.

## Architectuur

### C2 Diagram

Om een snel idee te krijgen van hoe de applicatie eruit ziet, heb ik een C2 diagram gemaakt. Dit diagram laat zien waar de verschillende containers zich bevinden en welke met elkaar communiceren. In deze diagram zijn geolocaties en schaalbaarheid nog niet toegevoegd.

<p align="center">
    <img src="https://user-images.githubusercontent.com/73841047/223100894-253de0d8-5abd-4b76-996d-16253645d5bb.png" alt="C2 diagram">
</p>

### RabbitMQ
`docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management`

### Keycloak
`docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e DB_VENDOR=h2 jboss/keycloak`

## Bronnen

[ISO 25010. (z.d.). https://iso25000.com/index.php/en/iso-25000-standards/iso-25010](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010)

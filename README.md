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
-	De applicatie moet een piekbelasting van minimaal 20.000 live gebruikers aankunnen.

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
-	Applicatie voldoet aan lokale regelgeving in de Europese Unie (GDPR).

## Tech stack

**Front-end** 
Voor de front-end wordt Vue 3 gebruikt. De voornaamste reden is omdat ik zelf vaak Laravel gebruik en deze regelmatig in combinatie met vue wordt gedraaid. Daarnaast is het een framework dat ik graag wil leren kennen, omdat het veel wordt gebruikt in de industrie, dus het is niet verkeerd om hier meer kennis van op te doen. In het groepsproject wordt ook met Vue gewerkt, dus het is handig om hier extra mee te oefenen.

**Back-end**
Voor de back-end is Java met het framework Spring Boot gebruikt. Met zowel Java als Spring Boot heb ik al enige ervaring. Dit is mij vorige keer goed bevallen, dus hier wil ik mee doorgaan. Ook Java met Spring Boot wordt vaak gebruikt, dus het is een goede toevoeging voor mijn portfolio.

**Databases**
Voor de databases heb ik Cassandra gebruikt voor de chatgeschiedenis en mediametadata. Cassandra is een NoSQL database die goed schaalbaar is en snel is.

**Messaging**
Voor messaging heb ik RabbitMQ gebruikt. Dit is een message broker die gebruik maakt van het AMQP protocol. Dit protocol is een open standaard voor messaging. Daarbij is het onafhankelijk van de rest van de techstack omdat het overal mee kan werken. RabbitMQ is een veelgebruikte message broker, dus ook dit is een goede toevoeging voor mijn portfolio.

## Architectuur

### C2 Diagram

Om een snel idee te krijgen van hoe de applicatie eruit ziet, heb ik een C2 diagram gemaakt. Dit diagram laat zien waar de verschillende containers zich bevinden en welke met elkaar communiceren. In deze diagram zijn geolocaties en schaalbaarheid nog niet toegevoegd.

<p align="center">
    <img src="https://user-images.githubusercontent.com/73841047/223100894-253de0d8-5abd-4b76-996d-16253645d5bb.png" alt="C2 diagram">
</p>

## Monitoring

Om er zeker van te zijn dat de applicatie blijft werken zoals verwacht, hoe deze presteert dag in dag uit en veilig is, is het belangrijk om de applicatie te monitoren. Dit kan op verschillende manieren met open-source tools, maar ook met de commandline. Tijdens het zoeken op internet ben ik de open-source tool 'Prometheus' tegengekomen. 

### Prometheus

Prometheus kan inzien hoe de pods in een kubernetes cluster presteren door data te verzamelen van deze componenten.

#### Installatie

Om Prometheus toe te voegen aan dit project, moet deze eerst worden binnengehaald via de package manager van Kubernetes, genaamd helm:

`helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
`helm repo update`

Vervolgens kan Prometheus worden geïnstalleerd met de value.yaml file. Deze yaml file is te vinden in de map prometheus:

`cd prometheus` 
`helm install prometheus-operator prometheus-community/kube-prometheus-stack -f value.yaml`

#### Gebruik

Standaard verzamelt Prometheus data van zichzelf en van de pods in het cluster. Om data te verzamelen van de pods, moet er een service monitor worden aangemaakt. Deze service monitor is te vinden in de map Kubernetes. Om deze service monitor toe te voegen aan het cluster. De service monitor helpt prometheus bij het vinden van de pods die gemonitord moeten worden. Soms is het mogelijk om extra informatie aan te bieden aan Prometheus van de applicatie. 

Een voorbeeld hiervan zijn de metrics van RabbitMQ. Deze data wordt niet standaard geleverd door RabbitMQ, maar hiervoor moet de plugin `rabbitmq_prometheus` geïnstalleerd worden. Om dit proces te vereenvoudigen, heb ik hier een eigen Docker image van gemaakt die standaard deze plugin aanzet voor RabbitMQ, deze is te vinden op [Dockerhub: jjuless/rabbitmq-with-prometheus](https://hub.docker.com/repository/docker/jjuless/rabbitmq-with-prometheus/general). De Dockerfile om deze image te kunnen maken is te vinden in de map [Dockerfiles/RabbitMQ](https://github.com/S5-RB03/Documentation/blob/main/Dockerfiles/RabbitMQ/Dockerfile). Zodra deze image van RabbitMQ is gedeployed, kan de service monitor worden toegevoegd aan het cluster. Deze service monitor is te vinden in de map Kubernetes. De service monitor helpt prometheus bij het vinden van de pods die gemonitord moeten worden, in dit geval de metrics van RabbitMQ op de poort en het pad `rabbitmq:15692/metrics`.

#### Dashboard

Om het dashboard van Prometheus te bekijken, moet er een port-forward worden gemaakt:

`kubectl port-forward svc/prometheus-operator-kube-p-prometheus 9090:9090`

Wanneer prometheus al eens eerder is gedeployed, dan kan het zijn dat de port-forward niet werkt In dat geval kan de volgende regel gebruikt worden:

`helm upgrade -i prometheus-operator prometheus-community/kube-prometheus-stack`

Vervolgens kan het dashboard worden bekeken op `localhost:9090`. Hier is het mogelijk om de metrics van de pods te bekijken en grafieken te maken. Deze zijn vrij simpel, daarom biedt Grafana, een visualisatie tool als uitbreiding op Prometheus, een betere oplossing. Deze kan bekeken worden door de poort van Grafana te forwarden:

`kubectl port-forward svc/prometheus-operator-grafana 3000:80`

### Lens

Lens is een tool die het mogelijk maakt om een Kubernetes cluster te beheren en te monitoren. Het is een GUI voor Kubernetes. Hiermee is het mogelijk om de pods, services, deployments en meer te bekijken. Ook is het mogelijk om de logs van de pods te bekijken. Lens is te downloaden via de website [Lens](https://k8slens.dev/). Voor dit project heb ik de premium trail uitgeprobeerd. Lens maakt gebruik van de Prometheus metrics om de status van de pods te laten zien, maar heeft ook de mogelijkheid om instellingen in het kubernetes cluster aan te passen. Het is dus niet alleen een tool op de data van Prometheus te visualiseren zoals Grafana dat doet.


### RabbitMQ
`docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management`

### Keycloak
`docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e DB_VENDOR=h2 jboss/keycloak`

## GPDR

### Data

#### Data verzameling

De applicatie verzamelt de volgende persoonlijke data:
- Voornaam
- Achternaam
- E-mailadres
- Wachtwoord
- Chatberichten

#### Data gebruik

Momenteel wordt het E-mailadres en het wachtwoord gebruikt in Keycloak om de gebruiker te kunnen identificeren. 

De voor- en achternaam worden gebruikt in de front-end, zodat de gebruiker weet met wie hij/zij chat.

De chatberichten worden gebruikt om de gebruiker te laten zien wat er in de chat is gezegd.

#### Toestemming voor data

Om de data te kunnen gebruiken van de gebruikers, moeten deze hier eerst toestemming voor geven. Dit is gebruikelijk om te vragen bij het aanmaken van een account. De data die verzameld wordt 

## Cloud Services

### Benodigdheden

Om alle services minimaal één keer te laten draaien én 0 tot 20.000 gebruikers in 5 minuten, met 5 minuten lang 20.000 aanhoudende gebruikers te kunnen verwerken, zijn de volgende resources nodig:

| Pod Name        | Limit Memory | Limit CPU | Request Memory | Request CPU |
|-----------------|--------------|-----------|----------------|-------------|
| sevyh-front-end | 256Mi        | 400m      | 128Mi          | 250m        |
| sevyh-chat      | 256Mi        | 500m      | 128Mi          | 250m        |
| sevyh-user      | 300Mi        | 400m      | 128Mi          | 250m        |
| keycloak        | 1000Mi       | 800m      | 500Mi          | 500m        |
| rabbitmq        | 256Mi        | 500m      | 128Mi          | 250m        |
|-----------------|--------------|-----------|----------------|-------------|
| **Totaal**      | **2068Mi**   | **2600m** | **1012Mi**     | **1500m**   |

Dit is getest door middel van load testing met de tool [K6](https://k6.io/). Voor de test bezochten virtuele gebruikers de hoofdpagina van de website en bleven ze deze 10 seconden lang bekijken. Dit is geen realistische load, maar geeft wel een ruwe schatting van de benodigdheden. Een virtuele gebruiker heeft dus ongeveer 10 seconden nodig voordat deze een nieuw verzoek kan doen. Dit houdt dus in dat er 2.000 nieuwe verzoeken plaats vinden in een tijdsbestek van 5 minuten, per seconde vinden er dus ongeveer 6,67 verzoeken plaats. De resultaten van deze load test zijn te zien in de afbeelding hieronder.

![K6 resultaten na een loadtest van in totaal 10m30s.](https://github.com/S5-RB03/Documentation/assets/73841047/cf0917ae-b021-431e-b311-56231382eac9)

De limit is zo ingesteld dat de applicatie net niet hoeft op te schalen bij een plotselinge load van 20.000 gebruikers. Het minimum wat nodig is om deze applicatie deze plotselinge load te laten verwerken is voor het geheugen 2068Mi (ongeveer 2GB) en voor de processor 2600m (ongeveer 2,6 processorkernen). Hierbij is geen rekening gehouden met monitoring, logging en andere services die nodig zijn om de applicatie te laten draaien.

### Kosten

#### AWS

De kosten voor het draaien van deze applicatie op AWS zijn als volgt:

![image](https://github.com/S5-RB03/Documentation/assets/73841047/3b7ead1f-028e-4e0c-a9a4-261df3c80d7c)

Dit is op basis van 6 pods per dag, 4 vCPU en 8Gb aan memory. Op basis hiervan is de prijs per maand $41,45.

#### Digital Ocean

De kosten voor het draaien van deze applicatie op Digital Ocean zijn als volgt:

![image](https://github.com/S5-RB03/Documentation/assets/73841047/263fbf8f-ae9b-4521-aa67-c2d1c5a092bc)

Het is helaas niet mogelijk om één pakket lager te pakken, aangezien deze slechts 2 vCPU's heeft. Dit is niet genoeg om de applicatie te laten draaien en de load te verwerken. De basisprijs voor Digital Ocean is dus voor één node $126 dollar per maand ($0,118 per uur). Het is mogelijk om een extra back-up toe te voegen zodat de applicatie extra beschikbaar is en een uptime van 99,95% biedt. Dit kost $40 per maand ($0,0595 per uur) extra. Er is een load balancer nodig, deze kan per stuk 10.000 verzoeken per seconde aan, dit is ruim boven de 6,67 verzoeken per seconde die de applicatie nodig heeft op de piek. 

Het totaal van Digital Ocean komt dus neer op $183 per maand ($0,2725 per uur) voor High Availability en $143 per maand ($0,213 per uur) voor de basis.

#### Google Cloud

De kosten voor het draaien van deze applicatie op Google Cloud zijn als volgt:

![image](https://github.com/S5-RB03/Documentation/assets/73841047/d5feb9a3-5af4-491e-b11b-3429c89c8711)

Google Cloud biedt de optie om meer vCPU te kunnen gebruiken zonder dat de memory meeschaalt, hierdoor is het mogelijk om 4 vCPU's te gebruiken met 3,6 GB geheugen. Dit is genoeg om de applicatie te laten draaien en de load te verwerken. De basisprijs voor Google Cloud is dus voor één node $81,92 dollar per maand. 

#### Vergelijking

| Cloud Provider | Prijs per maand |
|----------------|-----------------|
| AWS            | $41,45          |
| Digital Ocean  | $143            |
| Google Cloud   | $81,92          | 

Alle cloud providers hebben servers staan in Europa, waardoor er voldaan kan worden aan de GDPR wetgeving en de data voor EU burgers dus niet buiten de EU wordt opgeslagen. De prijs per maand is het laagste bij AWS, maar het is mij echter niet duidelijk of hier ook de load balancer bij inbegrepen zit. Bij Digital Ocean is dit wel het geval, maar is de prijs per maand een stuk hoger. Ook bij Google Cloud is het niet duidelijk of de load balancer bij de prijs inbegrepen zit. Digital Ocean biedt de mogelijkheid om een hoge Availablity te hebben voor de applicatie en het biedt goedkope opslag aan. Ik heb geen rekening gehouden met opslag, omdat dit de berekening een stuk complexer zou maken. 

Het was in sommige gevallen mogelijk om een meerjaren deal te sluiten, waardoor de prijs per maand lager zou worden. Dit is echter niet meegenomen in de berekening, omdat dit niet voor alle cloud providers en/of alle pakketten mogelijk was.

Digital Ocean geeft in dit geval de meeste mogelijkheden om te schalen omdat er nog ruimte over was doordat de pakketten niet nauwkeurig samengesteld kunnen worden

De feature *High Availablity* past goed bij de NFR's 'De applicatie moet een uptime hebben van 99,9% per jaar. Dit vertaalt in een maximale downtime van 8,77 uur per jaar of 1,44 minuten per dag.' en 'Gebruikers moeten geen verschil in snelheid merken tussen spits- en daluren van de applicatie.', maar komt wel met een stevige prijs.

## Bronnen

[ISO 25010. (z.d.). https://iso25000.com/index.php/en/iso-25000-standards/iso-25010](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010)

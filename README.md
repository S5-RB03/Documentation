# Documentatie voor het Enterprise project 'Sevyh'

## Inhoudsopgave

1. [Inleiding](#inleiding)
2. [Functionele eisen](#functionele-eisen)
3. [Software kwaliteit](#software-kwaliteit)
4. [Niet functionele eisen](#niet-functionele-eisen)
5. [Tech stack](#tech-stack)
6. [Architectuur](#architectuur)
7. [Monitoring](#monitoring)
8. [GDPR](#gdpr)
9. [Schaalbaarheid](#schaalbaarheid)
10. [Security](#security)
11. [Testen](#testen)
12. [Cloud Services](#cloud-services)
13. [Bronnen](#bronnen)


## Inleiding

Voor dit project gaan we ervan uit dat iedereen klaar is met Facebook en omdat Hyves zo lekker nostalgisch is, verlangen we terug naar die tijd. Maar in plaats van dat alleen Nederlanders de applicatie weten te vinden, weten onze ze aan de andere kant van de oceaan in de Verenigde Staten ook deze applicatie te vinden! 

[ :rocket: Terug naar de top ](#inhoudsopgave)

## Functionele eisen

| Eisen                                                           | Check | Oplossing |
|-----------------------------------------------------------------|:-----:|-----------|
| De gebruiker moet een account kunnen aanmaken.                  | :white_check_mark:       |     De gebruiker kan door middel van Keycloak een account aanmaken.      |
| De gebruiker moet een account kunnen verwijderen.               |  :x:      |           |
| De gebruiker moet persoonlijke gegevens kunnen aanpassen.       |  :x:      |           |
| De gebruiker moet een profielfoto kunnen uploaden.              |  :x:      |           |
| De gebruiker moet een profielfoto kunnen verwijderen.           |   :x:     |           |
| De gebruiker moet een vriend kunnen toevoegen.                  |   :x:     |           |
| De gebruiker moet een vriend kunnen verwijderen.                |   :x:     |           |
| De gebruiker moet een lijst met vrienden kunnen bekijken.       |  ~     |    De gebruiker kan momenteel alle andere gebruikers zien en hiermee chatten.       |
| De gebruiker moet een chatgeschiedenis kunnen bekijken.         |  :white_check_mark:     |    Als de gebruikers eerder chatberichten met elkaar hebben uitgewisseld, dan zijn deze te zien in de chat.       |
| De gebruiker moet een chatgeschiedenis kunnen verwijderen.      |  :x:     |           |
| De gebruiker moet een chatgeschiedenis kunnen downloaden.       | :x:      |           |
| De gebruiker moet een chatgeschiedenis kunnen zoeken.           |  :x:     |           |
| De gebruiker moet kunnen chatten met andere gebruikers.         |  :white_check_mark:     |   De gebruiker kan berichtjes sturen naar de andere gebruiker        |
| De gebruiker moet kunnen zien of een andere gebruiker online is.|   :x:    |           |

[ :rocket: Terug naar de top ](#inhoudsopgave)

## Software kwaliteit
Voor dit project zal de ISO 25010 standaard worden gebruikt. ISO 25010 is een internationale standaard voor software kwaliteit, daardoor zou deze standaard voor iedere (goede) developer bekend moeten zijn en is het verstandig om deze standaard aan te houden. De standaard is opgebouwd uit 8 kwaliteitsaspecten. Deze aspecten zijn:

<p align="center">
    <img src="https://iso25000.com/images/figures/en/iso25010.png" alt="ISO 25010" style="margin:auto;">    
</p>

Op basis van deze aspecten, is het mogelijk om goede niet functionele eisen te formuleren. Deze zijn te vinden in de paragraaf [Niet functionele eisen](#niet-functionele-eisen). Niet alle aspecten zijn even belangrijk voor dit project. Daarom is er een keuze gemaakt welke aspecten wel en niet belangrijk zijn voor dit project.

[ :rocket: Terug naar de top ](#inhoudsopgave)

## Niet functionele eisen

| Eisen                                                                                      | Check | Oplossing |
|-------------------------------------------------------------------------------------------|:-----:|-----------|
| Zodra een gebruiker de chathistorie wil bekijken, moet de chatgeschiedenis binnen één seconden geladen zijn. |  :white_check_mark:      |    Door ervoor te zorgen dat slechts de laatste 25 berichten opgehaald worden, is het mogelijk om de applicatie de tijd te gunnen om nieuwe GET requests te doen naar de chatservice. Hiermee wordt de load op verschillende services in het project laag gehouden en wordt alleen data opgehaald die nodig is. Zodra de gebruiker oudere berichten wil binnenhalen, zal er dus een nieuwe GET request gedaan moeten worden voor de eerst volgende 25 recente berichten. Dit maakt het mogelijk om, voor zover de gebruiker kan zien, alle chatberichten binnen te halen binnen één seconde.       |
| Zodra een gebruiker een bericht stuurt, moet deze binnen één seconden aankomen bij de ontvanger.              | :white_check_mark:       |    Kubernetes zorgt ervoor dat er altijd genoeg rekenkracht aanwezig is om de berichten te kunnen opslaan en ophalen. Zodra er niet meer genoeg rekenkracht over is, worden er nieuwe pods van de service opgestart om alle vraag tijdig te kunnen verwerken.       |
| Gebruikers moeten geen verschil in snelheid merken tussen spits- en daluren van de applicatie.                 |   :white_check_mark:    |   Zodra er veel vraag is naar de applicatie, is het door Kubernetes mogelijk om op te schalen om zo de vraag aan te kunnen. Er wordt tijdig opgeschaald zodat de gebruiker geen verandering in de werking van de applicatie kan merken op ieder moment van de dag.        |
| De applicatie moet schaalbaar zijn wanneer er meer of minder vraag komt naar de applicatie.                   |  :white_check_mark:     |     Door Kubernetes is het mogelijk om iedere service afzonderlijk van elkaar te kunnen schalen. Dit maakt het mogelijk om bottlenecks in het systeem te verminderen door meerdere instanties van de serices te laten draaien wanneer nodig. Zodra de vraag laag genoeg wordt, is het mogelijk om deze overtollige instanties van de serices af te schalen.      |
| De applicatie moet een piekbelasting van minimaal 20.000 live gebruikers aankunnen.                            |  :white_check_mark:     |     De piekbelasting van gebruikers die de hoofdpagina willen bezoeken is getest met K6. De resources zijn voor iedere service zo afgesteld dat ze nét genoeg hardware ter beschikking hebben zonder te moeten schalen. Dit zorgt ervoor dat er dus plotseling 20.000 gebruikers gebruik kunnen maken van de service, zonder dat deze moeten wachten tot de applicatie is opgeschaald.      |
| Alle chatberichten tussen gebruikers moeten end-to-end versleuteld zijn.                                       |   ~    |     De berichten worden in de front-end versleuteld, maar momenteel gebeurt dit nog met een vaste encryption key. Hierdoor is het dus niet Volledig end-to-end encryptie, maar een soort 'light' variant. Om volledig end-to-end encrypted te kunnen zijn zou de device key van de gebruikers gebruikt moeten worden om te kunnen encrypten. Aangezien deze applicatie web-based is, is dat helaas niet mogelijk.      |
| Applicatie moet beschermd zijn tegen de top 10 van OWASP.                                                       |  :white_check_mark:     |      Door middel van o.a. Keycloak wordt de applicatie beschermd tegen de top 10 van OWASP.     |
| De applicatie moet een uptime hebben van 99,9% per jaar.                                                        |  ~    |  Dit valt momenteel niet te testen, omdat de applicatie niet op een server maar lokaal draait. In theorie zou de applicatie een uptime van 99,9% per jaar moeten kunnen halen, omdat de meeste Cloud Providers een uptime van 99,95% aanbieden. In combinatie met hoe Kubernetes is ingesteld zou deze uptime behaalbaar moeten zijn.          |
| Downtime van een crash mag maximaal 5 minuten duren tijdens een probleem.                                       |  :white_check_mark:      |     Zodra Kubernetes/de horizontal pod autoscaler merkt dat de pod niet meer werkt zoals behoren, zal deze een nieuwe instantie creëeren. Deze instanties zijn vaak binnen 5 minuten opgestart en klaar om gegevens te kunnen verwerken       |
| Documentatie moet voldoen aan de OpenAPI specificatie.                                                           |    :white_check_mark:     |   De API's geschreven voor Sevyh bevatten allemaal een OpenAPI specificatie, waardoor het dus voor iedere developer mogelijk zou moeten zijn om de documentatie te van de API's te kunnen begrijpen.        |
| Over elk component van de applicatie moet documentatie te vinden zijn met de structuur en de gemaakte keuzes.  |    :white_check_mark:    |    De keuzes voor elke component zijn te vinden onder het kopje [Tech stack](#tech-stack) in dit document.       |
| Applicatie voldoet aan lokale regelgeving in de Europese Unie (GDPR).                                           |   ~    |     De applicatie voldoet niet aan alle onderdelen van GDPR, de uitleg hiervoor is te vinden onder het kopje [GDPR](#gdpr)      |

[ :rocket: Terug naar de top ](#inhoudsopgave)

## Tech Stack

**Front-end** 
Voor de front-end wordt Vue 3 gebruikt. De voornaamste reden is omdat ik zelf vaak Laravel gebruik en deze regelmatig in combinatie met vue wordt gedraaid. Daarnaast is het een framework dat ik graag wil leren kennen, omdat het veel wordt gebruikt in de industrie, dus het is niet verkeerd om hier meer kennis van op te doen. In het groepsproject wordt ook met Vue gewerkt, dus het is handig om hier extra mee te oefenen.

**Back-end**
Voor de back-end is Java met het framework Spring Boot gebruikt. Met zowel Java als Spring Boot heb ik al enige ervaring. Dit is mij vorige keer goed bevallen, dus hier wil ik mee doorgaan. Ook Java met Spring Boot wordt vaak gebruikt, dus het is een goede toevoeging voor mijn portfolio.

**Databases**
Voor de databases heb ik Cassandra gebruikt voor de chatgeschiedenis en mediametadata. Dit is een NoSQL-database die bekend staat om zijn goede schaalbaarheid en snelheid, ideaal voor chatgeschiedenis en mediametadata [(DataStax, 2021)](https://www.datastax.com/nosql-databases).

**Messaging**
Voor messaging heb ik RabbitMQ gebruikt. Dit is een message broker die gebruik maakt van het AMQP protocol. Dit protocol is een open standaard voor messaging. Daarbij is het onafhankelijk van de rest van de techstack omdat het overal mee kan werken. RabbitMQ is een veelgebruikte message broker, dus ook dit is een goede toevoeging voor mijn portfolio.

[ :rocket: Terug naar de top ](#inhoudsopgave)

## Architectuur

### C2 Diagram

Om een snel idee te krijgen van hoe de applicatie eruit ziet, heb ik een C2 diagram gemaakt. Dit diagram laat zien waar de verschillende containers zich bevinden en welke met elkaar communiceren. In deze diagram zijn geolocaties en schaalbaarheid nog niet toegevoegd.

<p align="center">
    <img src="https://github.com/S5-RB03/Documentation/assets/73841047/e04e5718-8e2a-498d-ae46-93faee75ebd7" alt="C2 diagram">
</p>

[ :rocket: Terug naar de top ](#inhoudsopgave)

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

[ :rocket: Terug naar de top ](#inhoudsopgave)

## GDPR

Om ervoor te zorgen dat de applicatie voldoet aan de GDRP, is er een GDPR checklist gemaakt. 

| Regel | Oplossing | Controle | Opmerkingen |
| ---- | -------- | :----: | -------- |
| Toestemming | Verkrijg expliciete toestemming van gebruikers voordat hun persoonlijke gegevens verzameld worden. | ❌ | Momenteel wordt er geen expliciete toestemming gevraagd van gebruikers. |
| Toegang tot gegevens, correctie en verwijdering | Implementeer een proces voor gebruikers om hun persoonlijke gegevens in te zien, te corrigeren of te verwijderen. | ❌ | Het is voor nu alleen mogelijk om gegeven in te vullen, maar niet het bekijken, bewerken of verwijderen. |
| Protocol voor gegevensinbreuk | Een protocol om een inbreuk op persoonlijke gegevens te detecteren, te melden en te onderzoeken. | ❌ | Er is momenteel geen protocol voor gegevensinbreuk. |
| Privacybeleid | Een duidelijk en transparant privacybeleid dat uitlegt hoe gebruikersgegevens worden gebruikt en beschermt. | ❌ | Er is momenteel geen privacybeleid. |
| Gegevens van kinderen | Implementeer leeftijdsverificatie en een mechanisme om ouderlijke toestemming te verkrijgen als gegevens van kinderen onder de 16 worden verzameld. | ❌ | Er is momenteel geen leeftijd verificatie van de gebruiker of verkrijgt ouderlijke toestemming voor gebruikers onder de 16. |
| Gegevensbeveiliging | Zorg ervoor dat de gegevens veilig worden opgeslagen. | ✅ | Gegevens worden veilig opgeslagen in Keycloak en berichten versleuteld in een Cassandra-database. |
| Gegevensminimalisatie en beperking van het doel | Verzamel alleen de gegevens die nodig zijn voor de diensten en worden alleen gebruikt voor het doel dat is aangegeven op het moment van verzameling. | ✅ | Momenteel worden alleen noodzakelijke gegevens verzameld en worden ze gebruikt voor het beoogde doel. |
| Gegevensoverdracht | Als persoonlijke gegevens naar andere landen of organisaties overgedragen worden, zorg er dan voor dat ze ook voldoen aan de AVG. | ✅ | Er worden geen gegevens overgedragen. |


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

Om de data te kunnen gebruiken van de gebruikers, moeten deze hier eerst toestemming voor geven. Dit is gebruikelijk om te vragen bij het aanmaken van een account. Dit is momenteel nog niet geïmplementeerd in de applicatie. Wanneer de gebruiker al een account heeft en er data opgeslagen moet worden waarvoor nog geen toestemming is gegeven, dan zal opnieuw toestemming gevraagd moeten worden voor deze data.

#### Data inzien

Gebruikers moeten hun data kunnen opvragen en kunnen ontvangen binnen redelijke tijd. Dit is momenteel nog niet geïmplementeerd in de applicatie. Hiervoor zouden de gegevens in keycloak gexporteerd moeten worden en alle chatgesprekken van de gebruiker uit de database. 

#### Data verwijderen

Momenteel is het niet mogelijk voor de gebruikers om data te verwijderen. Dit is wel een vereiste van de AVG. Om dit te implementeren, moet er een functie komen die de data verwijdert uit de database. Dit kan bijvoorbeeld door een knop te maken in de front-end die de data verwijderd. 

## Schaalbaarheid

Om de applicatie schaalbaar te maken, is gekozen voor het gebruik van Kubernetes. Kubernetes is een open-source platform voor het automatiseren van het beheer van containerized applicaties. Alle onderdelen van dit project zijn gecontainerized en kunnen dus in Kubernetes draaien. De containers kunnen zelfstandig draaien, zonder afhankelijk te zijn van andere containers.

Aangezien de containers onafhankelijk zijn van elkaar is het mogelijk om de applicaties te schalen door het aantal pods (instanties van de container) te verhogen of te verlagen op basis van de vraag. Dit kan automatisch gedaan worden door Kubernetes via de *Horizontal Pod Autoschaler*. Deze schaalt automatisch het aantal pods op basis van de CPU load en memory load zodra een vaste voorafopgestelde waarde wordt overschreden. 

Er wordt horizontaal geschaald omdat:

- **Het een betere kosten-efficiëntie geeft**: Het toevoegen van meer kleinere machines is vaak kostenefficiënter dan het upgraden naar een grotere, krachtigere machine.

- **Het meer veerkracht geeft**: Indien een systeem bestaat uit vele kleinere machines (in het geval van Kubernetes, pods), dan kan het falen van één machine minder impact hebben op het totale systeem dan wanneer het systeem bestaat uit een paar zeer krachtige machines.

- **Het zorgt voor meer Flexibiliteit**: Met horizontaal schalen kan gemakkelijk worden opgeschaald en afgeschaald op basis van de vraag. Dit is vooral nuttig voor workloads die fluctueren in de tijd. In Kubernetes kan de Horizontal Pod Autoscaler worden gebruikt om automatisch het aantal pods aan te passen op basis van de huidige belasting.

- **Het zorgt voor een betere verdeling van het netwerkverkeer**: Horizontaal schalen zorgt voor een betere verdeling van het netwerkverkeer. In plaats van dat alle verzoeken naar één grote server gaan, worden ze verdeeld over meerdere kleinere servers. Hierdoor wordt de gebruikers capaciteit van het project ook groter.

Alle pods krijgen genoeg resources om de applicatie te kunnen draaien. Deze resources zijn vantevoren vastgesteld, dus vindt er geen verticale schaling plaats.

Kubernetes zorgt er verder nog voor dat de applciatie altijd blijft draaien, ook als er updates uitgevoerd worden voor bepaalde services. Dit wordt gedaan door middel van *rolling updates*. Dit houdt in dat er een nieuwe pod wordt aangemaakt met de nieuwe versie van de applicatie. Als deze pod draait, wordt de oude pod verwijderd. Hierdoor is de applicatie altijd beschikbaar.

Ook zorgt Kubernetes ervoor dat wanneer een pod niet meer werkt zoals gehoopt (door bijvoorbeeld een crash), er een nieuwe instantie van de applicatie wordt aangemaakt. Dit wordt gedaan door middel van *liveness probes*. Dit zijn checks die worden uitgevoerd op de pod. Als de pod niet meer voldoet aan de checks, wordt de pod verwijderd en wordt er een nieuwe pod aangemaakt. Kubernetes regelt dit automatisch, dus er hoeft geen menselijke interactie plaats te vinden.

### Messaging bij meerdere pods

Om ervoor te zorgen dat een bericht niet vaker dan één keer verwerkt wordt, is er gebruik gemaakt van een message queue. De message queue die gebruikt wordt is RabbitMQ. Dit is een open source message broker die gebruikt wordt om berichten te verzenden en ontvangen. Door elk bericht  een uniek ID mee te geven, kan de message queue ervoor zorgen dat een bericht niet vaker dan één keer verwerkt wordt. Zodra een bericht er per ongeluk toch twee keer doorheen glipt, wordt het tweede bericht genegeerd aan de hand van het ID.

Bij het opslaan van de berichten in de cassandra database is er nog een tweede check; cassandra kan namelijk door middel van *quorum* ervoor zorgen dat wanneer hetzelfde bericht meerdere keren wordt opgeslagen, maar nét verschillende waardes heeft de meerderheid wint. Dus in een overdreven voorbeeld waarbij er 3 berichten worden opgeslagen met de waardes `{"id": 1, "message": "Hello"}`, `{"id": 1, "message": "Hello"}` en `{"id": 1, "message": "Hello world"}`, dan zal de laatste waarde worden overschreven. Dit is omdat de meerderheid van de berichten dezelfde waarde `"message": "Hello"` heeft. Zo wordt er dus voorkomen dat er meerdere berichten met dezelfde ID worden opgeslagen.

### Schaalbaarheid testen

De schaalbaarheid wordt getest door middel van de tool [K6](https://k6.io/). Deze tool kan gebruikt worden om een bepaalde load te simuleren op de applicatie. Hierdoor kan er getest worden of de applicatie de load aankan. Als de ingestelde load te hoog is voor de pod en de drempelwaarde voor de CPU of geheugen overschreden wordt én er meerdere replica's gemaakt mogen worden van de pod, dan zal Kubernetes automatisch een nieuwe pod aanmaken. De load balancer kan de load dan verdelen over de pods, waardoor de applicatie de load aankan.

De applicatie kan momenteel 20.000 gebruikers aan die de home pagina van de website bezoeken zonder een service te moeten opschalen. Dit is getest door middel van K6. De test is te vinden in de map `k6-tests`, met de bestandsnaam `minimum.js`. Door middel van de file `scalability.js` kan getest worden of de services schaalbaar zijn, omdat deze een load simuleert van 30.000 gebruikers die 5 minuten lang de website bezoeken. De load neemt daarna af naar 2.000 gebruikers, om kubernetes de tijd te geven om de pods weer af te schalen waar nodig.

#### Cassandra

Cassandra wordt buiten het kubernetes cluster gelaten, omdat Cassandra opzichzelf al goed kan schalen. Het is een gedistribueerde database, wat betekent dat het al goed kan schalen over meerdere machines. Het is dus niet nodig om Cassandra in een kubernetes cluster te draaien. Daarbij is het gebruikelijk om kubernetes pods stateless te houden, wat betekent dat er geen data opgeslagen wordt in de pods. Dit is bij Cassandra wel het geval, dus daarom wordt Cassandra buiten het kubernetes cluster gehouden.

[ :rocket: Terug naar de top ](#inhoudsopgave)

## Security

1. **Authenticatie en autorisatie**: Om de autenticatie en authorisatie te regelen in het project, heb ik Keycloak toegevoegd. Keycloak heeft OAuth geïmplementeerd in de applicatie en voorkomt hiermee dus vaak voorkomende veiligheidsrisico's, zoals die benoemd worden in de top 10 van OWASP. Keycloak is open-source en is dus volledig gratis om te kunnen gebruiken.
2. **Opslag van gebruikersdata**: Gebruikersdata worden opgeslagen in Keycloak, dat draait in een Kubernetes-cluster. Chatberichten worden versleuteld opgeslagen in een Cassandra database. Voor uitgebreide uitleg over de opgeslagen data, zie [GDPR](#gdpr). 
3. **Versleuteling van berichten**: Toepassing van semi-end-to-end-encryptie voor chatberichten.
4. **Firewall**: Hoewel er geen specifieke firewall wordt genoemd, biedt Kubernetes een aantal netwerkbeleidsopties die kunnen functioneren als een firewall op een per-plugin- of per-omgevingsbasis.
5. **Monitoring**: Monitoring wordt uitgevoerd met Prometheus en Lens. In Lens is te zien hoe de applicatie presteert en of hier opvallend veel activiteit is. Ook is het mogelijk om hier de logs per pod in te kunnen zien, om zo verdachte activiteit te kunnen waarnemen.

[ :rocket: Terug naar de top ](#inhoudsopgave)

## Testen

Voor dit project heb ik endpoint tests geschreven, met als doel om de input en output van de applicatie te testen. Dit is vergelijkbaar met wat er gevraagd wordt vanuit andere containers, hiermee kan de flow van de data gecontroleerd worden.

[ :rocket: Terug naar de top ](#inhoudsopgave)

## Cloud Services

### Potentiële nadelen van de Cloud

- **Kosten:** Hoewel cloudproviders doorgaans pay-as-you-go prijsmodellen hanteren, kunnen de kosten snel oplopen naarmate het gebruik toeneemt. Dit viel mij vooral op toen ik de calculator van AWS bekeek. Het omhoogschalen van de applicatie leidde al snel in een verdubbeling van de kosten.
- **Afhankelijkheid van de provider (vendor lock-in):** Het kan moeilijk en tijdrovend zijn om van provider te veranderen of om systemen terug te brengen naar een lokale serveromgeving bij het bedrijf zelf.
- **Beveiliging en privacy:** Het delen van persoonlijke/gevoelige informatie met een derde partij brengt altijd een risico met zich mee. Hoewel deze veel beveilingsmaatregelen treffen, is het nooit 100% veilig. Ook moet er rekening gehouden worden met GDPR wetgeving; als er geen servers in Europa aanwezig zijn, maar er wel persoonlijke/gevoelige informatie wordt opgeslagen van Europese burgers, dan is dit in overtreding van de wet.
- **Potentiële downtime:** Bij ernstige storingen kunnen diensten tijdelijk onbeschikbaar zijn, waar je als bedrijf geen controle over hebt. Dit kan leiden tot verlies van inkomsten en reputatieschade..

### Voordelen van de Cloud buiten lokale deployment

- **Schaalbaarheid:** Cloudproviders maken het eenvoudig om resources te schalen om aan de vraag te voldoen.
- **Herstel na noodgevallen:** Veel cloudproviders bieden services voor disaster recovery en gegevensback-up.
- **Innovatie:** Cloudproviders bieden toegang tot de nieuwste technologieën, waardoor en snel gebruik gemaakt kan worden van nieuwe processoren en andere hardware.
- **Beheer:** Cloudproviders nemen veel van de taken van infrastructuurbeheer uit handen.

Het is mogelijk om de server volledig in eigen beheer te hebben en lokaal te draaien, maar de kosten hiervan zijn bij de aanschaf en onderhoud snel hoog. Om te kunnen schalen moet er genoeg rekenkracht aanwezig zijn vóór de piekbelasting plaatsvindt. Als deze er niet is, dan kan de applicatie niet schalen om de piekbelasting volledig aan te kunnen. Dit houdt dus in dat wanneer er niet veel vraag is naar de applicatie er dus veel hardware ongebruikt/idle blijft. Het infrastructuur team moet dan ook de hardware onderhouden en up-to-date houden. Dit is een tijdrovende taak en kan veel geld kosten. Daarom is het senl goedkoper om de applicatie in de cloud te draaien, omdat de cloudprovider de hardware onderhoudt en up-to-date houdt.

Als kosten niet de belangrijkste factor zijn, maar wel bijvoorbeeld veiligheid dan wordt het misschien interessanter om de hardware in-house te hebben.

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

### Function as a Service

Function as a Service (FaaS), of serverless computing. "Serverless betekent niet dat er geen servers meer aan te pas komen. Wel betekent het dat gebruikers van FaaS kunnen programmeren (en andere taken) kunnen volbrengen, zonder zorgen over het inrichten en onderhouden van een server."[Axxius (z.d.)](https://axxius.nl/kennisbank/cloud-begrippen/faas-functions-as-a-service/)

**De voordelen van FaaS**
1. *Kosteneffectief* - Je betaalt alleen voor de tijd dat de functie draait. Als de functie niet draait, betaal je ook niet [(Monocello, 2020)](https://www.devprojournal.com/software-development-trends/pros-and-cons-of-function-as-a-service-faas/). Dit in tegenstelling tot een server waar je altijd voor betaalt, ook als deze niet gebruikt wordt.
2. *Schaalbaar* - De functies kunnen automatisch schalen, waardoor er geen downtime is en de gebruikers geen verschil in snelheid merken tussen spits- en daluren van de applicatie. Hiervoor hoeft niets ingesteld te worden door een developer, dit regelt de cloud provider [(Monocello, 2020)](https://www.devprojournal.com/software-development-trends/pros-and-cons-of-function-as-a-service-faas/).
3. *Geen ingewikkelde deployment* - De functies worden automatisch gedeployed, het is dus niet nodig om een CI/CD pipeline op te zetten. Dit scheelt tijd en geld.
4. *Ingebouwde monitoring* - De cloud provider biedt ingebouwde monitoring aan, waardoor het niet nodig is om zelf een monitoring systeem op te zetten.

**De nadelen van FaaS**

Ondanks de aanzienlijke voordelen, zijn er een paar overwegingen en mogelijke trade-offs bij het gebruik van FaaS:

1. *Vendor lock-in* - Als je eenmaal een FaaS-provider hebt gekozen, is het moeilijk om over te stappen naar een andere provider. Dit komt omdat de code specifiek is voor de provider en niet zomaar overgezet kan worden naar een andere provider. Dit is een belangrijk punt om rekening mee te houden, omdat het een grote impact kan hebben op de toekomst van de applicatie [(Monocello, 2020)](https://www.devprojournal.com/software-development-trends/pros-and-cons-of-function-as-a-service-faas/). 
2. *Testen* - Het is moeilijk om de functies te testen, omdat ze niet lokaal gedraaid kunnen worden. Dit maakt het lastig om de functies te testen en te debuggen. Uit ervaring bleek dat het vinden van een probleem en het oplossen hiervan meer tijd kostte dan bij een applicatie die lokaal gedraaid kon worden.
3. *Cold Starts* - Als een functie een tijdje niet gebruikt is, moet deze opnieuw opgestart worden. Dit kan een paar seconden duren, waardoor de gebruiker een paar seconden moet wachten voordat de functie klaar is. Dit is niet wenselijk voor een applicatie die snel moet zijn. Dit kan opgelost worden door de functies warm te houden, maar dit kost wel geld. [(Monocello, 2020)](https://www.devprojournal.com/software-development-trends/pros-and-cons-of-function-as-a-service-faas/).
4. *Kosten* - De kosten kunnen onverwacht hoog oplopen als de functies niet goed geoptimaliseerd zijn. Dit komt omdat de functies per milliseconde afgerekend worden. Als de functies niet goed geoptimaliseerd zijn, kan dit dus veel geld kosten [(AWS, z.d.)](https://aws.amazon.com/lambda/pricing/).

#### FaaS of Containers?

Een project hoeft niet alleen te bestaan uit een van de twee. Zo kan het interessanter zijn om een container te gebruiken voor een deel van de applicatie wat veel tijd en rekenkracht nodig heeft en FaaS voor een gedeelte wat weinig tijd en rekenkracht nodig heeft. In dit project wordt het weerbericht opgehaald via een FaaS functie, dit is een eenvoudige en snelle handeling waar dus niet veel rekenkracht voor nodig is. Als hiervoor een complete development omgeving voor opgezet moet worden inclusief CI/CD pipeline, is dit veel werk voor een kleine handeling. Het is dus interessanter om hiervoor een FaaS functie te gebruiken.

[ :rocket: Terug naar de top ](#inhoudsopgave)

## Bronnen

[ISO 25010. (z.d.). https://iso25000.com/index.php/en/iso-25000-standards/iso-25010](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010)

[Axxius (z.d.). (https://axxius.nl/kennisbank/cloud-begrippen/faas-functions-as-a-service/](https://axxius.nl/kennisbank/cloud-begrippen/faas-functions-as-a-service/)

[Monocello (2020, maart 3) https://www.devprojournal.com/software-development-trends/pros-and-cons-of-function-as-a-service-faas/](https://www.devprojournal.com/software-development-trends/pros-and-cons-of-function-as-a-service-faas/)

[1AWS (z.d.) https://aws.amazon.com/lambda/pricing/](https://aws.amazon.com/lambda/pricing/)

[DataStax. (2021). What is Apache Cassandra? Opgehaald van https://www.datastax.com/nosql-databases](https://www.datastax.com/nosql-databases)

[Pivotal Software. (2021). Spring Boot. Opgehaald van https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)

[RabbitMQ. (2021). RabbitMQ protocols. Opgehaald van https://www.rabbitmq.com/protocols.html](https://www.rabbitmq.com/protocols.html)

[ :rocket: Terug naar de top ](#inhoudsopgave)

---
author: Dr. Kay Rottmann
title: Gab es im alten Ägypten schon Dronen? 
subtitle: Warum wir Detektive für Künstliche Intelligenz werden sollten.
date: 28. November 2024
published: false
slideNumber: true
theme: dracula
width: 1600
height: 1200
transition: fade


---


# Gab es im alten Ägypten schon Dronen?


## Song zum Einstieg

![](Logik%20und%20Magie.mp4)


::: notes

- schnelle Intro
- seit fast 20 Jahren beschäftige ich mich mit KI
- heute will ich das Thema ein wenig vorstellen und auch zu Vorsicht mahnen

:::


---

## Fantastischer Fund in Ägypten

<style>
.slide img {
    max-height: 65vh !important;
    width: auto;
    object-fit: contain;
    margin: auto;
    display: block;
}
.inline-image-small {
    transition: all 0.3s ease-in-out;
    cursor: zoom-in;
    z-index: 1;
    height: 7.5em !important;
    width: auto !important;
    vertical-align: middle;
    margin: 0 0.5em !important;
    display: inline !important;
}
.inline-image-large {
    max-height: 60vh !important;
    max-width: 40vw !important;
    right: 0;
    vertical-align: middle;
    margin: 0 0.5em !important;
    display: inline !important;
}
.inline-image-small:focus {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: contain;
    background-color: rgba(0, 0, 0, 0.9);
    margin: 0 !important;
    padding: 0 !important;
    z-index: 9999 !important;
    cursor: zoom-out;
}

</style>

- In der Nähe der Pyramiden wurde eine alte Drone gefunden!
  ![](drone2.webp){.inline-image-small}
- Nun im Ägyptischen Museum ausgestellt
  ![](Drone5.jpeg){.inline-image-large}


::: notes

- 04:00
- Foto von den Forschern die die Drohne ausgegraben haben
- jetzt im Museum ausgestellt
- was fällt euch da auf?

:::

---

## Zeitungen berichten über Sensationsfund

<style>
.stamp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg) scale(5);
  font-family: 'Impact', Arial, sans-serif;
  font-size: 12vw;
  font-weight: bold;
  text-transform: uppercase;
  color: #ff0000;
  border: 0.5vw solid #ff0000;
  padding: 0.5em;
  text-align: center;
  white-space: nowrap;
  opacity: 0;
}

.stamp.fragment.visible {
  animation: stamp-in 0.5s ease-out forwards;
}

.slide img {
  max-height: 120vh !important;
  width: auto;
  margin: 0;
  padding: 0;
  align: center;
  display: block;
}

@keyframes stamp-in {
  from {
    transform: translate(-50%, -50%) rotate(-30deg) scale(5);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) rotate(-30deg) scale(1);
    opacity: 0.8;
  }
}
</style>


![](Nachrichten.png){style="display: block; margin: 0 auto;"}

::: {.stamp .fragment data-fragment-index="1"}
GELOGEN
:::

::: notes

- 07:00
- alles hiervon ist nicht echt!
- die Bilder sind keine echten Fotos, sondern wurden vom Computer erzeugt! Sogar der kleine Begrüßungssong wurde von einem Computer erzeugt - inklusive Gesang.

:::


---


## Was ist eigentlich künstliche Intelligenz?
<style>
.definition {
    background-color: #303030;
    padding: 10px;
    border-left: 3px solid #666;
    margin: 10px 0;
    font-size: 0.9em;
}
.capabilities {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    margin-top: 20px;
    max-height: 65vh;
    object-fit: contain;
}
.capability {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.capability img {
    height: 200px !important;
    width: auto;
    object-fit: contain;
    margin: 5px auto !important;
}
.capability-text {
    font-weight: bold;
    margin-top: 3px;
    font-size: 0.8em;
}
</style>
- Erstaunlich: so eine richtig feste Beschreibung gibt es nicht!
- <div class="definition">Wikipedia: Eigenschaft [...], die ein Wesen befähigt, angemessen und vorausschauend in seiner Umgebung zu agieren</div>
<div class="capabilities">
<div class="capability fragment">
<img src="robotChess.webp" alt="Spielen">
<div class="capability-text">Spielen</div>
</div>
<div class="capability fragment">
<img src="RobotPhone.webp" alt="Unterhalten">
<div class="capability-text">Sich unterhalten</div>
</div>
<div class="capability fragment">
<img src="RobotCreative.webp" alt="Kreativ">
<div class="capability-text">Kreativ sein</div>
</div>
<div class="capability fragment">
<img src="RobotScientist.webp" alt="Forschen">
<div class="capability-text">Forschen</div>
</div>
<div class="capability fragment">
<img src="RobotConstructing.webp" alt="Bauen">
<div class="capability-text">Bauen</div>
</div>
<div class="capability fragment">
<img src="robotsoccer.webp" alt="Team">
<div class="capability-text">Teamwork</div>
</div>
</div>

::: notes

- 11:00
- Kinder erzählen lassen: was ist für euch künstliche Intelligenz?
- In den letzten 2 Jahren hat sich VIEL verändert
- ganz aktuelle Forschung
- früher häufig "Klassifikation" (ist auf dem Bild eine Katze?)
- heute: "beschreibe was auf dem Bild zu sehen ist"

:::


# Erstellende Künstliche Intelligenz


## Computer können Texte erzeugen

<style>
.slide-content {
    display: flex;
    flex-direction: row;
    height: 100%;
}
.text-content {
    width: 60%;
    padding-right: 20px;
}
.slide-image {
    position: absolute;
    right: 0%;
    top: 10%;
    transform: translateY(-45%);
    width: 20vw !important;
    height: auto;
    object-fit: contain;
    z-index: 1;
}
</style>
<div class="slide-content">
<div class="text-content">
<ul>
<li class="fragment" data-fragment-index="1">Automatisch Wettervorhersage schreiben</li>
<li class="fragment" data-fragment-index="2">Zusammenfassungen erstellen</li>
<li class="fragment" data-fragment-index="3">Übersetzungen von Texten</li>
<li class="fragment" data-fragment-index="4">Fragen beantworten</li>
<li class="fragment" data-fragment-index="5"><strong>kaum zu unterscheiden von menschlichen Texten</strong></li>
</ul>
</div>
<img src="RobotTyping.webp" alt="Distance to moon visualization" class="slide-image">
</div>
  
![](Nachrichten.png){.fragment}

::: notes

- 13:00
- Demo
- Aber auch Risiken:
  - was wenn die Frage nicht beantwortet werden sollte?
  - Schreibe Falsche Nachrichten mit Lügen über Politiker / Personen / und anderes
  - wie baue ich eine Bombe, schreib einen bösen Text über einen Politiker usw.

:::

---

## Der Computer kann "sprechen" - sogar mit beliebiger Stimme

- Für Menschen die ihre Stimme durch Krankheit verlieren
- Spielfilme in anderen Sprachen mit der "original" Schauspielerstimme
- Simultanübersetzung
- Hörbücher
- "Vorlesende Schulbücher"
- "Telefon Roboter"

<div class="fragment">
  <audio controls>
    <source src="Halloo-Mein Name ist Ky 2.wav" type="audio/wav">
  </audio> 
</div>
<div class="fragment">
  <audio controls>
    <source src="Hello everybody I-m real 1.wav" type="audio/wav">
  </audio>
</div>
<div class="fragment"> 
  <audio controls>
    <source src="Dies habe ich niemals ges 3.wav" type="audio/wav">
  </audio> 
</div>

::: notes

- 16:00
- Stephen Hawking?
- Kann das missbraucht werden?

:::

---

## Bilder können verändert werden

<div class="fragment">
Fotos automatisch bearbeiten (geschlossene Augen, störender Müll am Traumstrand...)
</div>
<div class="fragment">
**Eure hochgeladenen Bilder können leicht verändert werden!**
</div>
<div style="display: flex;">
<div style="flex: 1;" class="fragment">
![](ich.png){style="width: 300;"}
</div>
<div style="flex: 1;" class="fragment">
![](photo_of_a_man_in_a_space_suit_on_the_international_space_station_with_the_earth_visible_through_a_window_in_the_background__3.png)
</div>
</div>

::: notes

- 20:00
- seht ihr eine Gefahr?
- jedes Bild dass ihr irgendwo ins Internet stellt kann verändert werden!

:::


---

## Videos können auch im Computer erzeugt werden

- Innerhalb kürzester Zeit können Videos "erfunden" werden
- Zum Beispiel für Werbung, keine teuren Drehorte
- Spezialeffekte

<div>
  <video class="fragment" style="flex 1;" loop muted playsinline controls width="500" height="600">
    <source src="DroneVideo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <video class="fragment" style="flex 1;" loop muted playsinline controls width="500" height="600">
    <source src="ichAstronautVideo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <video class="fragment" style="flex 1;" loop muted playsinline controls width="500" height="600">
    <source src="GoogleVideo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>

</div>


::: notes 

- 21:00
- Viele Menschen halten Videos für Glaubwürdiger
- gefälschte Videos können viele Menschen beeinflussen

:::


---

## Musik

- Musik kann durch beschreiben leicht erzeugt werden
- Hintergrundmusik in Filmen, Serien usw.
- Computerspiele brauchen Sound-Effekte / ganze Teams für Musik
- ![](Digitale%20Reflexion.mp4)


::: notes 

- 22:00
- Sachen hören sich schnell "gleich" oder bekannt an

:::



# Wie funktioniert das eigentlich?

---

## Wie kann ein Computer Texte erzeugen?

- Spiel: was ist das nächste Wort?
  - Einer fängt an und sagt ein Wort, und ein anderes Kind sagt ein Folgewort usw.
  - Morgen früh gehe ich zur ???
  - Mein Lieblingsessen ist ???
  - Gestern war ich mit ??? im Kino.
  - Timo ist ein guter Freund. Zum Beispiel gestern war ich mit ??? im Kino.


::: notes 

- 26:00

:::

---

## Woher wissen wir welche Wörter folgen?

<style>
.photo-container {
    position: absolute;
    width: 80%;
    height: 100%;
    margin: 1em auto;
}
.photo-container:hover {
    position: fixed;
    top: 0;
    left: 10%;
    width: 80%;
    height: 100%;
    margin: 1em auto;
}

.stacked-photo {
    position: absolute;
    width: 50vh;
    height: 50vh;
    object-fit: contain;
    box-shadow: 3px 3px 8px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    border: 8px solid white;
    cursor: pointer;
    z-index: 4;
}
.stacked-photo:hover {
    position: absolute;
    top: 0 !important;
    left: 0 !important;
    min-height: 100vh;
    min-width: 100vh;
    transform: scale(5.0) translate(0 0 0);
    z-index: 9999 !important;
}
</style>
<div class="image-stack">
Wir haben ein "Gefühl" wie ein Satz weitergeht
- entstanden durch viel <span class="fragment" data-fragment-index="4">Zuhören, </span> <span class="fragment" data-fragment-index="5">Reden</span> <span class="fragment" data-fragment-index="6">und Lesen</span>
<div class="photo-container">
<img src="MotherBaby.png" alt="Person listening" class="stacked-photo fragment" data-fragment-index="4" style="left: 0%; top: 10%; z-index: 1; transform: rotate(-5deg);" tabindex="0">
<img src="kidstalking.png" alt="Person speaking" class="stacked-photo fragment" data-fragment-index="5" style="left: 45%; top: 20%; z-index: 2; transform: rotate(3deg);" tabindex="0">
<img src="GirlReading2.png" alt="Person reading" class="stacked-photo fragment" data-fragment-index="6" style="left: 90%; top: 30%; z-index: 3; transform: rotate(-2deg);" tabindex="0">
</div>
</div>


::: notes 

- 29:00

:::


---

## Das geht auch bei Computern...

<style>
.slide-content {
    display: flex;
    flex-direction: row;
    height: 100%;
}
.text-content {
    width: 60%;
    padding-right: 20px;
}
.slide-image {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translateY(-35%);
    width: 40vw !important;
    height: auto;
    object-fit: contain;
    z-index: 1;
}
</style>
<div class="slide-content">
<div class="text-content">
<ul>
<li class="fragment" data-fragment-index="1">Computer können ja "lesen" - geben wir ihnen viel zu lesen, zum Beispiel das "Internet".</li>
<li class="fragment" data-fragment-index="2">Das gesamte Internet (~150 Zettabyte) ausgedruckt auf A4 nebeneinander reicht bis zu weit entfernten Sternen (mehr als 600 Lichtjahre entfernt!)</li>
<li class="fragment" data-fragment-index="3">etwa 42 Millionen mal die Entfernung Sonne - Erde!</li>
<li class="fragment" data-fragment-index="4">Derzeit sind Modelle auf etwa so viel wie auf 4 mal bis zum Mond reicht "trainiert"</li>
<li class="fragment" data-fragment-index="5"><strong>TROTZDEM: Der Computer lernt nur das nächste Wort vorherzusagen!</strong></li>
</ul>
</div>
<img src="ToTheMoon.webp" alt="Distance to moon visualization" class="fragment slide-image" data-fragment-index="4">
</div>

::: notes

- 31:00
ein Mensch liest vielleicht 2GB in seinem Leben. 
-> 400.000 Seiten
-> das sind etwa 84km... etwa bis nach Ulm...
mit hören und sprechen etwa 250km (Stuttgart Frankfurt)
- Das heißt aber auch der Mensch ist sehr effizient!!

:::

---

## Ganz ähnlich mit Musik


<style>
.slide-content {
    display: flex;
    flex-direction: row;
    height: 100%;
}
.text-content {
    width: 60%;
    padding-right: 20px;
}
.slide-image {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translateY(-35%);
    width: 40vw !important;
    height: auto;
    object-fit: contain;
    z-index: 1;
}
</style>
<div class="slide-content">
<div class="text-content">
<ul>
<li class="fragment">Der Computer "hört" alle Musik der Welt</li>
<li class="fragment">Er "lernt" wie ein Musikstück weitergeht</li>
<li class="fragment">Musik erzeugen: Fang mit einem beliebigen Ton an und dann erzeuge immer den nächsten</li>
<li class="fragment">schau immer wieder was für Töne schon gespielt wurden damit es "gut" klingt</li>
<li style="padding-top: 1em" class="fragment">Aber: "gut klingen" ist in diesem Fall "so wie es gelernt wurde"</li>
<li class="fragment">Viele computergenerierte Lieder hören sich bekannt an</li>
</ul>
</div>
<img src="SingingRobot.webp" alt="Distance to moon visualization" class="slide-image">
</div>


::: notes 

- 33:00
- Gibt schon erste Klagen / aussagen von Musikern die verbieten ihre Musik oder auch Stimme zu benutzen
- Gibt ebenso Künstler die schon gezielt KI für ihre eigene Musik einsetzen.

:::

---

## Wie machen wir Kunst?


<div style="width: 75vw; height: auto; margin: 0 auto; margin-bottom: 0;"> <p class="fragment">Wie kann man zeichnen?</p> <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 2em;"> <img src="Rentier1.jpg" class="fragment" style="width: 22%; height: auto;" alt="Rendeer step 1"> <img src="Rentier2.jpg" class="fragment" style="width: 22%; height: auto;" alt="Rendeer step 2"> <img src="Rentier3.jpg" class="fragment" style="width: 22%; height: auto;" alt="Rendeer step 3"> <img src="Rentier4.jpg" class="fragment" style="width: 22%; height: auto;" alt="Rendeer step 4"> </div> <p class="fragment">Wie schnitzt man eine Eule?</p> <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;"> <img src="Eule1.jpg" class="fragment" style="width: 22%; height: auto;" alt="Owl step 1"> <img src="Eule2.jpg" class="fragment" style="width: 22%; height: auto;" alt="Owl step 2"> <img src="Eule3.jpg" class="fragment" style="width: 22%; height: auto;" alt="Owl step 3"> <img src="Eule4.jpg" class="fragment" style="width: 22%; height: auto;" alt="Owl step 5"><img src="Eule5.jpg" class="fragment" style="width: 22%; height: auto;" alt="Owl step 5"><img src="Eule6.jpg" class="fragment" style="width: 22%; height: auto;" alt="Owl step 6"> </div> </div> <p class="fragment">am einfachsten: man fängt grob an, und macht es dann immer feiner.</p>




::: notes 

- 35:00

:::

---

## Und im Computer?

- Der Computer lernt aus "Rauschen" Bilder zu erzeugen
![](Generation-with-Diffusion-Models.png)
<p style="font-size: 0.5em; margin-top: 0;" >(<a href="https://developer.nvidia.com/blog/improving-diffusion-models-as-an-alternative-to-gans-part-1/">https://developer.nvidia.com/blog/improving-diffusion-models-as-an-alternative-to-gans-part-1/</a>)
</p>

::: notes 

- 37:00
- Dazu nimmt man ein Bild
- sucht sich Punkte im Bild aus und "würfelt" eine neue Farbe
- Dies gibt man dem Computer in umgedrehter Reihenfolge
- Der Comuter lernt aus Rauschen wieder das Bild zu erzeugen

:::

---

## Beispiel

![](catDiffusion.mov)

::: notes 

- 39:00

:::



---

## Aber... KI ist nicht perfekt und macht Fehler!

<p class="fragment" data-fragment-index="3">Der Computer "lernt sachen auswendig".</p>
<p class="fragment" data-fragment-index="5">Der Computer "halluziniert".</p>


<div style="display: flex;">
<div style="flex: 1;" class="fragment" data-fragment-index="1">
  Mensch, Ziege, Kohlkopf und Wolf über Fluss, in das Boot passen immer höchstens zwei Sachen gleichzeitig.<br>
<video controls height="400">
    <source src="./MannZiegeWolfKohl.mov" />
</video>
</div>
<div style="flex: 1;" class="fragment" data-fragment-index="2">
  Mensch und Ziege über Fluss, in das Boot passen immer höchstens zwei Sachen gleichzeitig.<br>
<video controls height="400">
<source src="./MannZiege.mov" />
</video>
</div>
<div style="flex: 1;" class="fragment" data-fragment-index="4">
  Was machte Indrina Potter, die Halbschwester von Harry Potter nachdem sie die Kerzen gestohlen hatte?<br>
<video controls height="400">
<source src="./IndrinaPotter.mov" />
</video>
</div>
</div>


::: notes 

- 42:00
- Halluziniert
  - Es gibt keine Halbschwester Indrina Potter bei Harry Potter

:::


# Wie können wir KI erzeugtes erkennen?



## Wie können wir Echtes von KI-erzeugtem unterscheiden?

- **Glaubt nicht alles**
- Von wem kommt die Information (bekannte Zeitung? Jemand auf TikTok?)
- Wer profitiert davon, wenn das wahr wäre?
- Gibt es andere Quellen?
- "Ergibt es Sinn?"


::: notes 

- 44:00

:::

---

## Indizien für KI-erzeugtes


<style>
.slide-content {
    display: flex;
    flex-direction: row;
    height: 100%;
}
.text-content {
    width: 60%;
    padding-right: 20px;
}
.slide-image {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translateY(-35%);
    width: 30vw !important;
    height: auto;
    object-fit: contain;
    z-index: 1;
}
</style>
<div class="slide-content">
<div class="text-content">
<ul>
<li class="fragment" data-fragment-index="1">Bilder</li>
<ul>
<li class="fragment" data-fragment-index="2">unnatürliche Details (Hände, Ohren, Haare)</li>
<li class="fragment" data-fragment-index="2">Schrift</li>
<li class="fragment" data-fragment-index="2">Logikfehler (Spiegelungen, komische Details)</li>
<li class="fragment" data-fragment-index="2">"zu perfekt" (weiche Bilder, "10 nach 10")</li>
</ul>
<li class="fragment" data-fragment-index="3">Videos</li>
<ul>
<li class="fragment" data-fragment-index="4">Sachen verschwinden oder erscheinen</li>
<li class="fragment" data-fragment-index="4">Flackern</li>
</ul>
<li class="fragment" data-fragment-index="5">Texte</li>
<ul>
<li class="fragment" data-fragment-index="6">sehr oberflächlich, förmlich, entschuldigend</li>
</ul>
</ul>
</div>
<img src="IMG_6097.jpeg" alt="waitress" class="fragment slide-image" data-fragment-index="7">
</div>


::: notes

- 49:00

:::

---

## Welches Foto ist echt? {.slide-title}

<style>
.image-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 80vh;
    padding: 20px;
    position: relative;
}
.image-wrapper {
    width: 45%;
    position: relative;
}
.hover-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
}
.hover-image:hover {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 90vh;
    object-fit: contain;
    z-index: 1000;
    background: rgba(255,255,255,0.9);
    border-radius: 0;
}
</style>
<div class="image-container"><div class="image-wrapper"><img class="hover-image" src="titantic_true.png" alt="Image 1"></div><div class="image-wrapper"><img class="hover-image" src="titantic_ai.jpg" alt="Image 2"></div></div>
<p style="font-size: 0.5em; margin-top: 0;" >(Encyclopedia Britannica: <br> <a href="https://elearn.eb.com/real-vs-ai-images/">https://elearn.eb.com/real-vs-ai-images/</a>)
</p>


::: notes

- 50:00

:::


---

## Welches Foto ist echt? {.slide-title}

<style>
.image-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 80vh;
    padding: 20px;
    position: relative;
}
.image-wrapper {
    width: 45%;
    position: relative;
}
.hover-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
}
.hover-image:hover {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 90vh;
    object-fit: contain;
    z-index: 1000;
    background: rgba(255,255,255,0.9);
    border-radius: 0;
}
</style>
<div class="image-container"><div class="image-wrapper"><img class="hover-image" src="frog_ai.jpg" alt="Image 1"></div><div class="image-wrapper"><img class="hover-image" src="frog_true.jpg" alt="Image 2"></div></div>
<p style="font-size: 0.5em; margin-top: 0;" >(Encyclopedia Britannica: <br> <a href="https://elearn.eb.com/real-vs-ai-images/">https://elearn.eb.com/real-vs-ai-images/</a>)
</p>

::: notes

- 51:00

:::


---

## Welches Foto ist echt? {.slide-title}

<style>
.image-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 80vh;
    padding: 20px;
    position: relative;
}
.image-wrapper {
    width: 45%;
    position: relative;
}
.hover-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
}
.hover-image:hover {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 90vh;
    object-fit: contain;
    z-index: 1000;
    background: rgba(255,255,255,0.9);
    border-radius: 0;
}
</style>
<div class="image-container"><div class="image-wrapper"><img class="hover-image" src="launch_true.jpg" alt="Image 1"></div><div class="image-wrapper"><img class="hover-image" src="launch_ai.jpg" alt="Image 2"></div></div>
<p style="font-size: 0.5em; margin-top: 0;" >(Encyclopedia Britannica: <br> <a href="https://elearn.eb.com/real-vs-ai-images/">https://elearn.eb.com/real-vs-ai-images/</a>)
</p>

::: notes

- 52:00

:::


---

## Welches Foto ist echt? {.slide-title}

<style>
.image-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 80vh;
    padding: 20px;
    position: relative;
}
.image-wrapper {
    width: 45%;
    position: relative;
}
.hover-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
}
.hover-image:hover {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 90vh;
    object-fit: contain;
    z-index: 1000;
    background: rgba(255,255,255,0.9);
    border-radius: 0;
}
</style>
<div class="image-container"><div class="image-wrapper"><img class="hover-image" src="kids_doing_art_ai.jpg" alt="Image 1"></div><div class="image-wrapper"><img class="hover-image" src="kids_doing_art_true.jpg" alt="Image 2"></div></div>
<p style="font-size: 0.5em; margin-top: 0;" >(Encyclopedia Britannica: <br> <a href="https://elearn.eb.com/real-vs-ai-images/">https://elearn.eb.com/real-vs-ai-images/</a>)
</p>

::: notes

- 53:00

:::



---

## Welches Foto ist echt? {.slide-title}

<style>
.image-container {
    display: flex;
    justify-content: center;
    gap: 0px;
    height: 80vh;
    padding: 0px;
    position: relative;
}
.image-wrapper {
    width: 50%;
    position: relative;
}
.hover-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 0px;
    transition: all 0.3s ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
}
.hover-image:hover {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    object-fit: contain;
    z-index: 100;
    background: rgba(255,255,255,0.9);
    border-radius: 0;
}
</style>
<div class="image-container"><div class="image-wrapper"><img class="hover-image" src="Pangolin_ai.jpg" alt="Image 1"></div><div class="image-wrapper"><img class="hover-image" src="pangolin_true.jpg" alt="Image 2"></div></div>
<p style="font-size: 0.5em; margin-top: 0;" >(Encyclopedia Britannica: <br> <a href="https://elearn.eb.com/real-vs-ai-images/">https://elearn.eb.com/real-vs-ai-images/</a>)
</p>

::: notes

- 54:00

:::


---

## Welches Foto ist echt? {.slide-title}

<style>
.image-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 80vh;
    padding: 20px;
    position: relative;
}
.image-wrapper {
    width: 45%;
    position: relative;
}
.hover-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
}
.hover-image:hover {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 90vh;
    object-fit: contain;
    z-index: 1000;
    background: rgba(255,255,255,0.9);
    border-radius: 0;
}
</style>
<div class="image-container"><div class="image-wrapper"><img class="hover-image" src="hongkong_ai.jpg" alt="Image 1"></div><div class="image-wrapper"><img class="hover-image" src="hongkong_true.jpg" alt="Image 2"></div></div>
<p style="font-size: 0.5em; margin-top: 0;" >(Encyclopedia Britannica: <br> <a href="https://elearn.eb.com/real-vs-ai-images/">https://elearn.eb.com/real-vs-ai-images/</a>)
</p>

::: notes

- 55:00

:::


---

## Welches Foto ist echt? {.slide-title}

<style>
.image-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 80vh;
    padding: 20px;
    position: relative;
}
.image-wrapper {
    width: 45%;
    position: relative;
}
.hover-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
}
.hover-image:hover {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 90vh;
    object-fit: contain;
    z-index: 1000;
    background: rgba(255,255,255,0.9);
    border-radius: 0;
}
</style>
<div class="image-container"><div class="image-wrapper"><img class="hover-image" src="womens_suffrage_ai.jpg" alt="Image 1"></div><div class="image-wrapper"><img class="hover-image" src="womens_suffrage_true.jpg" alt="Image 2"></div></div>
<p style="font-size: 0.5em; margin-top: 0;" >(Encyclopedia Britannica: <br> <a href="https://elearn.eb.com/real-vs-ai-images/">https://elearn.eb.com/real-vs-ai-images/</a>)
</p>

::: notes

- 56:00

:::



---

## Welches Foto ist echt? {.slide-title}

<style>
.image-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 80vh;
    padding: 20px;
    position: relative;
}
.image-wrapper {
    width: 45%;
    position: relative;
}
.hover-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
}
.hover-image:hover {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 90vh;
    object-fit: contain;
    z-index: 1000;
    background: rgba(255,255,255,0.9);
    border-radius: 0;
}
</style>
<div class="image-container"><div class="image-wrapper"><img class="hover-image" src="egyptian_papyrus_true.jpg" alt="Image 1"></div><div class="image-wrapper"><img class="hover-image" src="egyptian_papyrus_ai.jpg" alt="Image 2"></div></div>
<p style="font-size: 0.5em; margin-top: 0;" >(Encyclopedia Britannica: <br> <a href="https://elearn.eb.com/real-vs-ai-images/">https://elearn.eb.com/real-vs-ai-images/</a>)
</p>

::: notes

- 57:00

:::

---

## Zusammenfassung

- Künstliche Intelligenz bietet viele Möglichkeiten
- Sie kann Bilder, Texte, Videos, Musik, Sprache usw. erstellen
- Aber sie macht auch Fehler 
- Sie kann auch täuschen
- Seid kritisch wenn Ihr im Im Internet / Fernsehen etwas seht!


::: notes

- 59:00
- ich kann plötzlich Bilder machen für Vorlesungen
- ich kann plötzlich Musik machen
- andere Sprachen sprechen

:::




---

## Vielen Dank <br> glaubt nicht alles, was ihr auf dem Bildschirm seht oder hört

![](Echtheit%20im%20digitalen%20Zeitalter.mp4)

::: notes

- 60:00

:::
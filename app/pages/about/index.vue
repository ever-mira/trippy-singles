<template>
    <Page>
        <h1 class="text-3xl">Über das Projekt</h1>
        <br>

        <h2 class="text-xl">Das Netzwerk soll gebaut werden von den Menschen, die es nutzen wollen.</h2>
        <br>
        <br>
        <h2 class="text-xl">Welche Features wollen wir? Wenn alles möglich wäre?</h2>

        <br>
        <span class="text-3xl">🎨</span>
        <br><br>
        <h2 class="text-xl">Folgende Aufgabenbereiche könnte es geben:</h2><br>
        <ul class="list-disc list-inside">
            <li>Ausdenken der Features - Community Interaktion</li>
            <li>Entwicklung</li>
            <li>Design</li>
            <li>Test</li>
            <li>Deployment - Infrastruktur</li>
            <li>Öffentlichkeitsarbeit - Networking</li>
            <li>Support / Help</li>
            <li>Moderation</li>
        </ul>

        <br>
        <h2 class="text-xl">Jeder der das Projekt unterstützen will, nicht groß nachdenken, und einfach der Gruppe
            beitreten:</h2>
        <a href="https://t.me/trippy_build" target="_blank" class="text-blue-600">https://t.me/trippy_build</a><br>
        (Und einfach etwas in die Gruppe schreiben, wie z.B: "ich finde die Idee gut.")<br>
        <br>


        <br>
        <h2 class="text-xl">Hier gibt es den Contribution Guide:</h2>(eher technisch und für Programmierer)<br>
        <a href="https://trippy.build" target="_blank" class="text-blue-600">https://trippy.build</a>
        <br><br>
        Das Projekt ist Open Source, d.h. jeder kann sich den Code anschauen (siehe contribution guide) und selbst zum
        Code beitragen (Features implementieren). Gesucht werden Psychonauten, die programmieren können, und Träumer,
        die sich die Funktionen ausdenken.<br><br>

        Wir wollen herausfinden, was wir bauen können, das nutzern von Psychedelica eine Erleichterung
        darstellt.<br><br>

        Trip-Berichte schreiben, ist eine gute Möglichkeit, sich gegenseitig kennenzulernen, und Erkenntnisse
        / Weltsichten auszutauschen.<br><br>

        Oft vergessen wir zu schnell, welche unglaublichen Erlebnisse wir hatten. Diese Erfahrungen ans Licht zu
        holen,
        erhöht unser Bewusstsein, und erschafft eine Vision von einer Realität, in der Magie real ist.


        <br><br>
        <h2 class="text-xl">Unterstützung</h2>
        Jede Art von Weitersagen / Networking, oder einfach nur gute Ideen, und Vorschläge.<br><br>
        <br>

        <h2 class="text-xl">Erfolg</h2>
        Das Projekt ist erfolgreich, wenn wir Lust bekommen, selbst einen Trip-Bericht auf der Plattform zu
        schreiben.
        Wenn nicht, wollen wir uns überlegen, was noch fehlt, damit sich das ändert.<br><br>

        <h2 class="text-xl">Möglichkeiten</h2>
        Aus allen unendlichen Möglichkeiten, welche denkbaren Funktionalitäten, die wir in zukünftigen Realitäten
        entwickelt haben, haben das Leben auf der Erde deutlich verbessert? <br><br>

        <h2 class="text-xl">Energie für das Projekt</h2>
        Lebendigkeit auf der Plattform<br><br>

        <h2 class="text-xl">Positionierung</h2>
        Neben dem Austausch von Erfahrungen, und dem Kennenlernen von Gleichgesinnten, kann die Plattform als
        Anlaufstelle für Hilfesuchende dienen.
        Es sollen sowohl die positiven Aspekte, als auch die Gefahren von Psychedelica sichtbar werden.
        Die Plattform kann im Bereich Drogen-Aufklärung positioniert werden.
        Die Zusammenarbeit mit Drogen-Beratungs-Stellen und Suchtberatung ist denkbar.
        In erster Linie um Spaß zu haben. Erkenntnisse auszutauschen. Und Visionen zu erschaffen.

        <br><br><br>
        <h2 class="text-xl">Trippy Singles</h2>
        Es ist geplant, außerdem eine leicht abgewandelte Version der Plattform zur Verfügung zu stellen, die darauf
        ausgelegt ist, Liebesbeziehungen zu suchen, und sich dabei selbst im Gegenüber zu
        finden:
        <a href="https://trippy.singles/" target="_blank" class="text-blue-600">https://trippy.singles/</a><br><br>
        Jemand hat vorgeschlagen, später solche Visitenkarten zu drucken, und auf Festivals zu verteilen:<br><br>
        <img src="assets/card.png" class="mx-auto w-full md:w-170">

        <br><br><br>

        Technical details in short:
        <h2 class="text-xl">built with Nuxt</h2>
        A meta-framework based on Vue.js
        <h2 class="text-xl">built with Supabase</h2>
        <a href="https://supabase.io" target="_blank" class="text-blue-600">Supabase</a>
        <div class="mb-39">
            <img src="assets/supabase.png" class="mx-auto">
            <img src="assets/supabase.jpg" class="mx-auto">
        </div>
    </Page>
</template>

<script setup lang="ts">
useHead({
    title: 'Trippy About',
})
</script>
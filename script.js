/* ==========================================================
   CyberQuiz : logique du quiz
   ========================================================== */
(function () {
  "use strict";

  var QUESTIONS = [
    {
      q: "Vous recevez un e-mail de votre « banque » : votre compte sera bloqué dans 2 heures si vous ne cliquez pas sur le lien. Que faites-vous ?",
      options: [
        "Je clique vite pour éviter le blocage",
        "Je réponds à l'e-mail pour demander si c'est vrai",
        "Je n'utilise pas le lien et je me connecte via l'application ou le site que je tape moi-même",
        "Je transfère le message à mes proches pour les prévenir sans vérifier"
      ],
      answer: 2,
      hint: "Qui contrôle le chemin que vous empruntez ?",
      explain: "L'urgence est un levier classique du phishing. Passez par un chemin que vous maîtrisez (application officielle, adresse saisie à la main) plutôt que par le lien reçu."
    },
    {
      q: "Quel élément doit le plus vous alerter dans un message inattendu ?",
      options: [
        "Un ton pressant, une menace ou une récompense trop belle",
        "Un message écrit en français correct",
        "Un logo bien reproduit",
        "Une signature avec un nom et un prénom"
      ],
      answer: 0,
      hint: "Les escrocs jouent sur vos émotions.",
      explain: "Peur, urgence, curiosité ou appât du gain servent à vous faire agir sans réfléchir. Un logo ou un français correct ne prouvent rien : ils se copient facilement."
    },
    {
      q: "Quelqu'un vous appelle en se disant conseiller de votre banque et vous demande le code reçu par SMS « pour annuler une fraude ». Que faire ?",
      options: [
        "Donner le code, c'est pour me protéger",
        "Raccrocher, puis rappeler la banque au numéro officiel",
        "Donner seulement la moitié du code",
        "Demander son nom puis donner le code s'il le connaît"
      ],
      answer: 1,
      hint: "Un code secret ne se communique à personne.",
      explain: "Un vrai conseiller ne vous demande jamais un code à usage unique. Les fraudeurs peuvent même afficher un numéro qui semble authentique : rappelez vous-même la banque."
    },
    {
      q: "Vous recevez un SMS : « Votre colis est en attente, réglez 1,99 € de frais via ce lien ». Vous n'attendez aucun colis. Quel est le bon réflexe ?",
      options: [
        "Payer, ce n'est que 1,99 €",
        "Cliquer pour voir de quoi il s'agit, sans rien saisir",
        "Ne pas cliquer, supprimer le message et le signaler",
        "Répondre STOP"
      ],
      answer: 2,
      hint: "Le petit montant n'est qu'un prétexte.",
      explain: "Le petit montant sert souvent à récupérer vos données bancaires. Ne cliquez pas, supprimez et signalez le SMS (en France, au 33700). Répondre confirme que votre numéro est actif."
    },
    {
      q: "Vous recevez un message d'un ami sur une messagerie : « Je suis en galère, peux-tu m'envoyer 200 € ? Je te rembourse demain. » Le ton paraît inhabituel. Que faire ?",
      options: [
        "Envoyer l'argent, c'est un ami",
        "Le contacter par un autre moyen (appel, personne de confiance) avant toute action",
        "Demander une photo de lui",
        "Envoyer une partie de la somme"
      ],
      answer: 1,
      hint: "Confirmez par un canal différent.",
      explain: "Le compte de votre ami a peut-être été piraté. Une vérification par un autre canal, comme un appel, lève le doute en quelques secondes."
    },
    {
      q: "Que signifie « ingénierie sociale » ?",
      options: [
        "Programmer un réseau social",
        "Manipuler une personne pour qu'elle révèle une information ou fasse une action",
        "Concevoir une politique sociale d'entreprise",
        "Pirater un ordinateur uniquement avec un logiciel"
      ],
      answer: 1,
      hint: "La cible, c'est vous, pas l'ordinateur.",
      explain: "L'attaquant vise l'humain plutôt que la machine, en exploitant la confiance, l'urgence, l'autorité ou la curiosité."
    },
    {
      q: "Vous trouvez une clé USB sur le parking de votre travail. Que faire ?",
      options: [
        "La brancher pour retrouver son propriétaire",
        "La brancher sur un vieil ordinateur sans importance",
        "La garder pour un usage perso",
        "Ne pas la brancher et la remettre au service informatique ou sécurité"
      ],
      answer: 3,
      hint: "La curiosité est aussi une faille.",
      explain: "Les clés « abandonnées » sont un appât connu : la curiosité fait le travail de l'attaquant. Confiez-la à la personne compétente."
    },
    {
      q: "Un « technicien » vous appelle pour une prétendue infection de votre ordinateur et propose de le dépanner à distance. Votre réponse ?",
      options: [
        "J'accepte et j'installe l'outil qu'il m'indique",
        "Je raccroche : un support sérieux ne démarche pas ainsi",
        "Je lui donne un accès, mais je surveille l'écran",
        "Je lui demande de m'envoyer ses diplômes"
      ],
      answer: 1,
      hint: "Qui a pris l'initiative de l'appel ?",
      explain: "Ces faux supports prennent le contrôle de l'appareil ou vous font payer des services inutiles. Aucun éditeur sérieux ne vous appelle spontanément pour une « infection »."
    },
    {
      q: "Un e-mail semble venir de votre directeur et demande un virement urgent et confidentiel à un nouveau fournisseur. Quel réflexe est le bon ?",
      options: [
        "Faire le virement, c'est le chef qui le demande",
        "Valider par un autre canal (appel, en personne) et suivre la procédure interne",
        "Répondre à l'e-mail pour confirmer",
        "Faire le virement mais en informer un collègue après"
      ],
      answer: 1,
      hint: "Autorité + urgence + secret : méfiance.",
      explain: "C'est la « fraude au président » : autorité, urgence et secret sont combinés. Répondre à l'e-mail ne prouve rien, il faut un canal indépendant."
    },
    {
      q: "Vous avez cliqué sur un lien suspect et saisi votre mot de passe sur une fausse page. Quelle est la meilleure première action ?",
      options: [
        "Ne rien faire et espérer",
        "Changer ce mot de passe (et ceux réutilisés) depuis le site officiel, activer la double authentification et prévenir qui de droit",
        "Supprimer l'e-mail et passer à autre chose",
        "Envoyer un nouveau mot de passe par e-mail à l'expéditeur"
      ],
      answer: 1,
      hint: "Réagir vite, sur les sites officiels.",
      explain: "Agir vite limite les dégâts. Changez le mot de passe partout où il est utilisé, activez la double authentification et signalez l'incident (employeur, banque, plateforme officielle)."
    }
  ];

  var LETTERS = ["A", "B", "C", "D"];
  var STORAGE_KEY = "cyberquiz-meilleur-score";

  var root = document.getElementById("quiz-app");
  if (!root) { return; }

  var state = { order: [], index: 0, score: 0, answered: false, mistakes: [] };

  /* ---------- Utilitaires ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "class") { node.className = attrs[key]; }
        else if (key === "text") { node.textContent = attrs[key]; }
        else { node.setAttribute(key, attrs[key]); }
      });
    }
    (children || []).forEach(function (child) { node.appendChild(child); });
    return node;
  }

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function readBest() {
    try {
      var v = parseInt(window.localStorage.getItem(STORAGE_KEY), 10);
      return isNaN(v) ? null : v;
    } catch (e) { return null; }
  }

  function writeBest(score) {
    try {
      var best = readBest();
      if (best === null || score > best) { window.localStorage.setItem(STORAGE_KEY, String(score)); }
    } catch (e) { /* stockage indisponible : on ignore */ }
  }

  function clear() { while (root.firstChild) { root.removeChild(root.firstChild); } }

  /* ---------- Écrans ---------- */
  function showStart() {
    clear();
    root.setAttribute("aria-live", "off");
    var best = readBest();
    var children = [
      el("p", { text: QUESTIONS.length + " questions, une correction après chaque réponse. Prêt(e) ?" }),
      el("button", { "class": "btn btn-primary", type: "button", id: "btn-start", text: "Lancer le quiz" })
    ];
    if (best !== null) {
      children.splice(1, 0, el("p", { "class": "best-score", text: "Votre meilleur score : " + best + " / " + QUESTIONS.length }));
    }
    root.appendChild(el("div", { "class": "quiz-start" }, children));
    document.getElementById("btn-start").addEventListener("click", startGame);
  }

  function startGame() {
    state.order = shuffle(QUESTIONS.map(function (_, i) { return i; }));
    state.index = 0;
    state.score = 0;
    state.mistakes = [];
    showQuestion();
  }

  function showQuestion() {
    clear();
    state.answered = false;
    var total = state.order.length;
    var data = QUESTIONS[state.order[state.index]];
    var optionOrder = shuffle(data.options.map(function (_, i) { return i; }));

    var pct = (state.index / total) * 100;
    var bar = el("div", { "class": "progress-bar", style: "width:" + pct + "%" });
    var track = el("div", {
      "class": "progress-track", role: "progressbar", "aria-label": "Progression du quiz",
      "aria-valuemin": "0", "aria-valuemax": String(total), "aria-valuenow": String(state.index)
    }, [bar]);

    root.appendChild(el("div", { "class": "progress-meta" }, [
      el("span", { text: "Question " + (state.index + 1) + " sur " + total }),
      el("span", { text: "Score : " + state.score })
    ]));
    root.appendChild(track);

    var title = el("h3", { "class": "question", id: "question-title", tabindex: "-1", text: data.q });
    root.appendChild(title);

    var list = el("ul", { "class": "options", role: "list" });
    optionOrder.forEach(function (originalIndex, position) {
      var btn = el("button", { "class": "option", type: "button", "data-index": String(originalIndex) }, [
        el("span", { "class": "option-letter", "aria-hidden": "true", text: LETTERS[position] }),
        el("span", { "class": "option-text" }, [document.createTextNode(data.options[originalIndex])])
      ]);
      btn.addEventListener("click", function () { choose(originalIndex, data); });
      list.appendChild(el("li", null, [btn]));
    });
    root.appendChild(list);

    var hintRow = el("div", { "class": "hint-row", id: "hint-row" });
    var hintBtn = el("button", { "class": "hint-btn", type: "button", text: "Besoin d'un indice ?" });
    hintBtn.addEventListener("click", function () {
      hintRow.removeChild(hintBtn);
      hintRow.appendChild(el("p", { "class": "hint-text", text: "Indice : " + data.hint }));
    });
    hintRow.appendChild(hintBtn);
    root.appendChild(hintRow);

    root.appendChild(el("div", { id: "feedback-zone", "aria-live": "polite" }));
    title.focus({ preventScroll: true });
  }

  function choose(chosen, data) {
    if (state.answered) { return; }
    state.answered = true;

    var correct = chosen === data.answer;
    if (correct) { state.score++; }
    else { state.mistakes.push({ q: data.q, answer: data.options[data.answer], explain: data.explain }); }

    var buttons = root.querySelectorAll(".option");
    Array.prototype.forEach.call(buttons, function (btn) {
      var idx = parseInt(btn.getAttribute("data-index"), 10);
      btn.disabled = true;
      if (idx === data.answer) {
        btn.classList.add("is-correct");
        btn.querySelector(".option-text").appendChild(el("span", { "class": "option-status", text: "Bonne réponse" }));
      } else if (idx === chosen) {
        btn.classList.add("is-wrong");
        btn.querySelector(".option-text").appendChild(el("span", { "class": "option-status", text: "Votre réponse" }));
      }
    });

    var hintRow = document.getElementById("hint-row");
    if (hintRow) { hintRow.parentNode.removeChild(hintRow); }

    var isLast = state.index === state.order.length - 1;
    var next = el("button", {
      "class": "btn btn-primary", type: "button",
      text: isLast ? "Voir mon résultat" : "Question suivante"
    });
    next.addEventListener("click", function () {
      if (isLast) { showResults(); } else { state.index++; showQuestion(); }
    });

    var feedback = el("div", { "class": "feedback " + (correct ? "is-correct" : "is-wrong") }, [
      el("p", { "class": "feedback-title", text: correct ? "Bien joué !" : "Pas tout à fait." }),
      el("p", { text: data.explain })
    ]);
    var zone = document.getElementById("feedback-zone");
    zone.appendChild(feedback);
    zone.appendChild(el("div", { "class": "quiz-actions" }, [next]));
    next.focus();
  }

  function resultMessage(score, total) {
    var ratio = score / total;
    if (ratio === 1) { return "Sans faute. Vous avez d'excellents réflexes."; }
    if (ratio >= 0.8) { return "Très bien : vous repérez la plupart des pièges."; }
    if (ratio >= 0.5) { return "Bon début. Revoyez les corrections ci-dessous pour renforcer vos réflexes."; }
    return "Pas de panique : ces pièges sont conçus pour tromper tout le monde. Relisez les corrections et rejouez.";
  }

  function showResults() {
    clear();
    root.setAttribute("aria-live", "polite");
    var total = state.order.length;
    writeBest(state.score);
    var best = readBest();

    var title = el("h3", { "class": "score-label", id: "result-title", tabindex: "-1", text: "Résultat" });
    root.appendChild(title);

    var big = el("p", { "class": "score-big" }, [
      document.createTextNode(String(state.score)),
      el("small", { text: " / " + total })
    ]);
    root.appendChild(big);
    root.appendChild(el("p", { text: resultMessage(state.score, total) }));
    if (best !== null) {
      root.appendChild(el("p", { "class": "best-score", text: "Votre meilleur score : " + best + " / " + total }));
    }

    var again = el("button", { "class": "btn btn-primary", type: "button", text: "Rejouer" });
    again.addEventListener("click", startGame);
    root.appendChild(el("div", { "class": "quiz-actions" }, [again]));

    var review = el("div", { "class": "review" });
    if (state.mistakes.length === 0) {
      review.appendChild(el("p", { "class": "perfect", text: "Aucune erreur à revoir. Partagez ce quiz autour de vous : les proches sont souvent les premières cibles." }));
    } else {
      review.appendChild(el("h3", { text: "À retenir (" + state.mistakes.length + (state.mistakes.length > 1 ? " erreurs" : " erreur") + ")" }));
      state.mistakes.forEach(function (m) {
        review.appendChild(el("div", { "class": "review-item" }, [
          el("p", { text: m.q }),
          el("p", {}, [el("strong", { text: "Bonne réponse : " }), document.createTextNode(m.answer)]),
          el("p", { text: m.explain })
        ]));
      });
    }
    root.appendChild(review);
    title.focus();
  }

  showStart();
})();

const DAYS = [
  {id:"day-1",code:"J1",title:"Jour 1 - Selecteurs & cascade",sub:"Cibler le bon element, comprendre la specificite",
    why:"Mal cibler casse tout. La cascade explique pourquoi 'ca marche pas'.",
    tags:["selectors","cascade","specificity"],
    sections:[
      {h:"Selecteurs de base",
        blocks:[
          {p:"CSS cible un element HTML via un selecteur. Trois familles : <code>element</code>, <code>.classe</code>, <code>#id</code>."},
          {code:"/* Element */\np { color: navy; }\n\n/* Classe (reutilisable) */\n.btn { padding: 10px 20px; }\n\n/* Id (unique) */\n#main-title { font-size: 32px; }\n\n/* Selecteur universel */\n* { box-sizing: border-box; }"}
        ]
      },
      {h:"Combinateurs",
        blocks:[
          {code:"/* Descendant : tous les <li> dans <ul> */\nul li { ... }\n\n/* Enfant direct seulement */\nul > li { ... }\n\n/* Frere adjacent (immediatement apres) */\nh2 + p { margin-top: 0; }\n\n/* Tous les freres suivants */\nh2 ~ p { color: gray; }"}
        ]
      },
      {h:"Selecteurs d'attribut",
        blocks:[
          {code:"/* Attribut existe */\na[target] { ... }\n\n/* Valeur exacte */\ninput[type=\"email\"] { ... }\n\n/* Commence par */\na[href^=\"https\"] { color: green; }\n\n/* Finit par */\na[href$=\".pdf\"] { background: url(pdf-icon.svg); }\n\n/* Contient */\na[href*=\"twitter\"] { color: #1da1f2; }"}
        ]
      },
      {h:"La specificite (poids)",
        blocks:[
          {p:"Quand 2 regles ciblent le meme element, la plus SPECIFIQUE gagne. Le poids = (inline, id, classes/attrs/pseudo-class, elements)."},
          {table:[
            ["Selecteur","Poids"],
            ["<code>p</code>","0,0,0,1"],
            ["<code>.box</code>","0,0,1,0"],
            ["<code>p.box</code>","0,0,1,1"],
            ["<code>#main</code>","0,1,0,0"],
            ["<code>style=\"\"</code>","1,0,0,0"],
            ["<code>!important</code>","🚨 ecrase tout"]
          ]},
          {bad:"<code>!important</code> doit etre un dernier recours, pas une habitude."}
        ]
      },
      {h:"Pseudo-classes & pseudo-elements",
        blocks:[
          {code:"/* Pseudo-classes (etat) */\na:hover { color: red; }\na:visited { color: purple; }\na:focus { outline: 2px solid blue; }\nbutton:disabled { opacity: 0.5; }\n\n/* Position dans le parent */\nli:first-child { font-weight: bold; }\nli:last-child { margin-bottom: 0; }\nli:nth-child(2n) { background: #f3f4f6; }\n\n/* Pseudo-elements (ajoutent du contenu) */\np::first-line { font-weight: bold; }\np::first-letter { font-size: 2em; }\n\n.btn::after { content: \"→\"; margin-left: 6px; }"},
          {tip:"<code>:</code> = pseudo-classe (etat). <code>::</code> = pseudo-element (fragment cree). Ne pas confondre."}
        ]
      }
    ],
    quiz:[
      {q:"Quelle regle gagne entre <code>p</code> et <code>.text</code> sur <code>&lt;p class=\"text\"&gt;</code> ?",
        opts:["<code>p</code>","<code>.text</code>","Erreur","La derniere ecrite"],correct:"b",
        expl:"<code>.text</code> a 0,0,1,0 vs <code>p</code> 0,0,0,1. La classe gagne."},
      {q:"Comment cibler les liens vers des PDF ?",
        opts:["<code>a:pdf</code>","<code>a[href$=\".pdf\"]</code>","<code>a[type=\"pdf\"]</code>","<code>a.pdf</code>"],correct:"b",
        expl:"<code>$=</code> = finit par. <code>^=</code> = commence par. <code>*=</code> = contient."},
      {q:"<code>::before</code> est :",opts:["Pseudo-classe","Pseudo-element","Selecteur d'attribut","Combinateur"],correct:"b",
        expl:"<code>::</code> = pseudo-element. Il insere du contenu via <code>content</code>."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Couleur des paragraphes",desc:"Tous les <p> en bleu navy.",
        sol:"p { color: navy; }"},
      {num:2,diff:"easy",title:"Premier paragraphe d'un article",desc:"1er <p> dans un article en gras.",
        sol:"article p:first-child { font-weight: bold; }"},
      {num:3,diff:"easy",title:"Liens externes verts",desc:"Liens https en vert + souligne.",
        sol:"a[href^=\"https\"] {\n  color: green;\n  text-decoration: underline;\n}"},
      {num:4,diff:"easy",title:"Lignes alternees",desc:"Lignes paires d'un tableau en gris clair.",
        sol:"tbody tr:nth-child(even) {\n  background: #f3f4f6;\n}"},
      {num:5,diff:"medium",title:"Hover sur ligne",desc:"Au survol d'un <tr>, fond jaune clair.",
        sol:"tbody tr:hover {\n  background: #fef3c7;\n}"},
      {num:6,diff:"medium",title:"Pseudo before",desc:"Avant chaque .ext, afficher une fleche externe.",
        sol:".ext::before {\n  content: \"↗ \";\n  color: gray;\n}"},
      {num:7,diff:"medium",title:"Liens PDF avec icone",desc:"Apres chaque lien vers PDF, afficher (PDF).",
        sol:"a[href$=\".pdf\"]::after {\n  content: \" (PDF)\";\n  font-size: 0.85em;\n  color: gray;\n}"},
      {num:8,diff:"hard",title:"Bouton disabled",desc:"Bouton disabled : opacite 0.5, cursor not-allowed.",
        sol:"button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}"}
    ]
  },

  {id:"day-2",code:"J2",title:"Jour 2 - Box model & display",sub:"Comment chaque element prend sa place",
    why:"Mal compris = layouts qui sautent. C'est la base de toute mise en page.",
    tags:["box-model","display","spacing"],
    sections:[
      {h:"Le box model",
        blocks:[
          {p:"Chaque element = 4 couches : <strong>content → padding → border → margin</strong>."},
          {code:"/* PAR DEFAUT : box-sizing: content-box (catastrophique) */\n/* width=200 + padding=20 + border=2 = 244px reels */\n\n/* TOUJOURS METTRE EN PREMIERE LIGNE */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* Maintenant width=200 inclut padding + border */"},
          {tip:"<code>border-box</code> sur tout : c'est la SEULE valeur saine en 2026."}
        ]
      },
      {h:"display: valeurs cles",
        blocks:[
          {table:[
            ["Valeur","Comportement"],
            ["<code>block</code>","Toute la largeur, va a la ligne"],
            ["<code>inline</code>","Sur la meme ligne, width/height ignores"],
            ["<code>inline-block</code>","Meme ligne mais width/height OK"],
            ["<code>flex</code>","Container flex (Jour 4)"],
            ["<code>grid</code>","Container grid (Jour 5)"],
            ["<code>none</code>","Element retire du flux"]
          ]}
        ]
      },
      {h:"Marges, paddings, bordures",
        blocks:[
          {code:".box {\n  /* Padding (interieur) */\n  padding: 16px;                  /* 4 cotes */\n  padding: 10px 20px;              /* vertical, horizontal */\n  padding: 10px 20px 5px;          /* top, horiz, bottom */\n  padding: 10px 20px 5px 15px;     /* top, right, bottom, left */\n\n  /* Margin (exterieur) */\n  margin: 0 auto;                  /* centre horizontalement */\n  margin-block: 16px;              /* logique (top/bottom) */\n  margin-inline: auto;             /* logique (left/right) */\n\n  /* Border */\n  border: 1px solid #cbd5e1;\n  border-top: 2px solid red;\n  border-radius: 8px;\n}"}
        ]
      },
      {h:"Marge collapse (le piege)",
        blocks:[
          {warn:"Les marges verticales <strong>fusionnent</strong> entre voisins en block. Si A a margin-bottom: 20px et B a margin-top: 30px, la distance n'est pas 50px mais 30px (le max)."},
          {tip:"Pour eviter : utiliser <code>gap</code> dans flex/grid, ou un padding sur le parent."}
        ]
      }
    ],
    quiz:[
      {q:"Avec <code>box-sizing: border-box</code>, <code>width: 200px; padding: 20px</code> donne :",
        opts:["240px","220px","200px","180px"],correct:"c",
        expl:"<code>border-box</code> inclut padding + border. La BOITE fait 200px."},
      {q:"Marges verticales entre voisins :",
        opts:["S'additionnent","Fusionnent (max)","Ne fonctionnent pas","S'annulent"],correct:"b",
        expl:"Collapse : seule la plus grande s'applique."},
      {q:"<code>display: none</code> :",opts:["Cache visuellement","Retire du flux + cache","Met opacity 0","Cache du DOM"],correct:"b",
        expl:"L'element n'occupe plus d'espace. <code>visibility: hidden</code> cache mais garde l'espace."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Border-box global",desc:"Applique border-box sur tout.",
        sol:"*, *::before, *::after {\n  box-sizing: border-box;\n}"},
      {num:2,diff:"easy",title:"Centrer un block",desc:"Centre une .container de 300px de large.",
        sol:".container {\n  width: 300px;\n  margin: 0 auto;\n}"},
      {num:3,diff:"medium",title:"Card avec padding et radius",desc:"Card : padding 20px, bordure grise, radius 12px, fond blanc.",
        sol:".card {\n  padding: 20px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n}"},
      {num:4,diff:"medium",title:"Bordure inferieure seulement",desc:"Une div avec uniquement une bordure rouge en bas.",
        sol:".div-line {\n  border-bottom: 2px solid red;\n}"},
      {num:5,diff:"hard",title:"Sticky header simulant",desc:"Header en haut, full width, fond blanc, ombre legere.",
        sol:"header {\n  position: sticky;\n  top: 0;\n  width: 100%;\n  background: white;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n}"}
    ]
  },

  {id:"day-3",code:"J3",title:"Jour 3 - Couleurs & typographie",sub:"color, font, ligne, espacement",
    why:"Une typo soignee = 90% du sentiment de qualite.",
    tags:["color","fonts","text"],
    sections:[
      {h:"Couleurs",
        blocks:[
          {code:"/* 4 facons d'ecrire rouge */\ncolor: red;\ncolor: #ff0000;\ncolor: #f00;            /* hex court */\ncolor: rgb(255, 0, 0);\ncolor: hsl(0, 100%, 50%);\n\n/* Avec alpha */\nbackground: rgba(0, 0, 0, 0.5);\nbackground: hsla(220, 50%, 50%, 0.5);\n\n/* Variables CSS */\n:root {\n  --primary: #6366f1;\n  --text: #1f2937;\n}\nh1 { color: var(--primary); }"},
          {tip:"<code>hsl</code> = Hue, Saturation, Lightness. Plus intuitif que hex pour ajuster (plus clair = monter L)."}
        ]
      },
      {h:"Typographie",
        blocks:[
          {code:"body {\n  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n  color: #1f2937;\n  -webkit-font-smoothing: antialiased;\n}\n\nh1 {\n  font-size: clamp(2rem, 4vw, 3rem);\n  font-weight: 700;\n  line-height: 1.1;\n  letter-spacing: -0.02em;\n}\n\np {\n  margin-block: 1em;\n  max-width: 65ch;  /* 65 caracteres = ligne ideale */\n}"},
          {tip:"<code>system-ui</code> en fallback = police native du systeme. Rapide et propre."}
        ]
      },
      {h:"Unites",
        blocks:[
          {table:[
            ["Unite","Sens"],
            ["<code>px</code>","Pixel absolu"],
            ["<code>%</code>","Relatif au parent"],
            ["<code>em</code>","Relatif au font-size parent"],
            ["<code>rem</code>","Relatif au font-size racine (html)"],
            ["<code>vh</code> / <code>vw</code>","% du viewport"],
            ["<code>ch</code>","Largeur d'un '0'"],
            ["<code>%</code> font","Relatif au parent"]
          ]},
          {tip:"<code>rem</code> pour les tailles (respecte le zoom utilisateur). <code>px</code> pour bordures fines. <code>%</code> pour widths fluides."}
        ]
      }
    ],
    quiz:[
      {q:"<code>line-height</code> ideal pour du texte courant :",opts:["1.0","1.2","1.5-1.7","2.5"],correct:"c",
        expl:"1.5-1.7 = confort de lecture. 1.0 = serre. 2.5 = trop aere."},
      {q:"<code>1rem</code> = ",opts:["1px","16px par defaut","100%","Relatif au parent"],correct:"b",
        expl:"<code>rem</code> = relatif au font-size de <html> (16px par defaut)."},
      {q:"Pour un titre fluide entre 32 et 48px :",
        opts:["<code>font-size: 40px</code>","<code>font-size: 2.5em</code>","<code>font-size: clamp(2rem, 4vw, 3rem)</code>","<code>font-size: 100%</code>"],correct:"c",
        expl:"<code>clamp(min, ideal, max)</code> = fluide entre 2 bornes."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Stack systeme",desc:"Body avec font-family system-ui en cascade.",
        sol:"body {\n  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;\n}"},
      {num:2,diff:"easy",title:"Hex 3 chiffres",desc:"Couleur de fond #336699 en hex court.",
        sol:"body { background: #369; }  /* equivalent #336699 */"},
      {num:3,diff:"medium",title:"Variables CSS",desc:"3 variables (primary, text, bg) puis usage sur body et h1.",
        sol:":root {\n  --primary: #6366f1;\n  --text: #1f2937;\n  --bg: #ffffff;\n}\nbody {\n  background: var(--bg);\n  color: var(--text);\n}\nh1 { color: var(--primary); }"},
      {num:4,diff:"medium",title:"Titre fluide",desc:"H1 entre 28px et 42px selon largeur.",
        sol:"h1 {\n  font-size: clamp(1.75rem, 5vw, 2.625rem);\n}"},
      {num:5,diff:"hard",title:"HSL ajuste",desc:"Bouton primaire en HSL, hover 10% plus clair.",
        sol:".btn {\n  background: hsl(220, 70%, 50%);\n}\n.btn:hover {\n  background: hsl(220, 70%, 60%);\n}"}
    ]
  },

  {id:"day-4",code:"J4",title:"Jour 4 - Flexbox",sub:"Layout 1D, le meilleur pour aligner",
    why:"Flexbox = 80% des alignements modernes. Indispensable.",
    tags:["flexbox","layout","alignment"],
    sections:[
      {h:"Concepts de base",
        blocks:[
          {p:"<code>display: flex</code> sur un parent active flexbox. Les enfants deviennent des 'items' alignables."},
          {code:".row {\n  display: flex;\n  gap: 16px;\n  justify-content: space-between;  /* axe principal */\n  align-items: center;             /* axe perpendiculaire */\n}"}
        ]
      },
      {h:"Direction & wrap",
        blocks:[
          {code:".container {\n  display: flex;\n  flex-direction: row;          /* defaut */\n  /* row | row-reverse | column | column-reverse */\n\n  flex-wrap: wrap;              /* passe a la ligne si pas assez de place */\n  /* wrap | nowrap (defaut) | wrap-reverse */\n\n  /* Shorthand */\n  flex-flow: row wrap;\n}"}
        ]
      },
      {h:"justify-content & align-items",
        blocks:[
          {table:[
            ["Valeur","Effet"],
            ["<code>flex-start</code>","Au debut (defaut)"],
            ["<code>flex-end</code>","A la fin"],
            ["<code>center</code>","Centre"],
            ["<code>space-between</code>","Espaces entre (rien aux bords)"],
            ["<code>space-around</code>","Espaces autour de chaque"],
            ["<code>space-evenly</code>","Espaces egaux partout"]
          ]}
        ]
      },
      {h:"flex sur les items",
        blocks:[
          {code:"/* Shorthand : flex-grow, flex-shrink, flex-basis */\n.item {\n  flex: 1;          /* prend tout l'espace dispo, equipartage */\n  flex: 0 0 200px;  /* taille fixe 200px, pas de grow ni shrink */\n  flex: 1 1 auto;   /* defaut */\n}\n\n/* align-self : override align-items pour un item */\n.special {\n  align-self: flex-end;\n}\n\n/* Order : repositionner sans toucher au HTML */\n.first-visible {\n  order: -1;\n}"}
        ]
      }
    ],
    quiz:[
      {q:"Pour centrer verticalement un item dans un container flex :",
        opts:["<code>justify-content: center</code>","<code>align-items: center</code>","<code>vertical-align: middle</code>","<code>margin: auto</code>"],correct:"b",
        expl:"<code>align-items</code> agit sur l'axe PERPENDICULAIRE. <code>justify-content</code> sur l'axe PRINCIPAL."},
      {q:"<code>flex: 1</code> signifie :",opts:["Taille fixe","Grandit pour remplir","Une seule ligne","Bug CSS"],correct:"b",
        expl:"Equivaut a <code>flex-grow: 1</code> : prend tout l'espace dispo, equipartage entre items."},
      {q:"Pour distribuer les items avec espaces egaux entre eux (rien aux bords) :",
        opts:["<code>space-around</code>","<code>space-between</code>","<code>space-evenly</code>","<code>distribute</code>"],correct:"b",
        expl:"<code>space-between</code> = ecart egal entre items mais rien aux bords."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Header flex",desc:"Logo a gauche, nav a droite via flexbox.",
        sol:"header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}"},
      {num:2,diff:"easy",title:"3 cartes egales",desc:"3 cartes qui se partagent l'espace egalement.",
        sol:".grid {\n  display: flex;\n  gap: 16px;\n}\n.card {\n  flex: 1;\n}"},
      {num:3,diff:"medium",title:"Sidebar + main",desc:"Sidebar 250px fixe, main prend le reste.",
        sol:".layout {\n  display: flex;\n  gap: 24px;\n}\naside {\n  flex: 0 0 250px;\n}\nmain {\n  flex: 1;\n}"},
      {num:4,diff:"medium",title:"Wrap mobile",desc:"4 cartes qui passent a la ligne sur mobile.",
        sol:".cards {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.card {\n  flex: 1 1 240px; /* min 240, sinon grow */\n}"},
      {num:5,diff:"hard",title:"Centrer absolu",desc:"Centre PARFAITEMENT une div (h+v) dans un parent.",
        sol:".parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}"}
    ]
  },

  {id:"day-5",code:"J5",title:"Jour 5 - Grid",sub:"Layout 2D, le meilleur pour les pages entieres",
    why:"Grid > Flex pour les grilles complexes. Layout 2D natif.",
    tags:["grid","layout","2D"],
    sections:[
      {h:"Grille basique",
        blocks:[
          {code:".grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;  /* 3 colonnes, 1:2:1 */\n  gap: 16px;\n}\n\n/* fr = fraction de l'espace dispo */\n/* repeat */\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);  /* 3 colonnes egales */\n  gap: 12px;\n}\n\n/* Auto-fit + minmax = grille responsive sans media query */\n.auto-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}"},
          {tip:"<code>auto-fit + minmax</code> = grille qui s'adapte automatiquement sans media query. Magique."}
        ]
      },
      {h:"Placement",
        blocks:[
          {code:".grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: 100px 200px;\n  gap: 12px;\n}\n\n/* Un item etale sur 2 colonnes */\n.wide {\n  grid-column: span 2;\n  /* ou explicite : */\n  grid-column: 1 / 3;       /* de col 1 a col 3 (exclusif) */\n}\n\n/* Sur 2 lignes */\n.tall {\n  grid-row: span 2;\n}"}
        ]
      },
      {h:"Grid areas (named)",
        blocks:[
          {code:".page {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: 60px 1fr 60px;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\"\n    \"footer footer\";\n  gap: 12px;\n}\n\nheader  { grid-area: header; }\naside   { grid-area: sidebar; }\nmain    { grid-area: main; }\nfooter  { grid-area: footer; }"}
        ]
      }
    ],
    quiz:[
      {q:"<code>1fr</code> en grid =",opts:["1 pixel","1 fraction de l'espace dispo","1 em","1% du parent"],correct:"b",
        expl:"<code>fr</code> = fraction. <code>1fr 2fr</code> = 1/3 et 2/3 de l'espace."},
      {q:"Pour une grille responsive sans media query :",
        opts:["<code>repeat(3, 1fr)</code>","<code>auto-fit + minmax</code>","<code>display: flex</code>","<code>media (max-width)</code>"],correct:"b",
        expl:"<code>repeat(auto-fit, minmax(240px, 1fr))</code> ajuste automatiquement le nombre de colonnes."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"3 colonnes egales",desc:"Grid avec 3 colonnes egales, gap 16px.",
        sol:".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}"},
      {num:2,diff:"medium",title:"Sidebar 1/4 main 3/4",desc:"Layout 2 colonnes 25%/75%.",
        sol:".layout {\n  display: grid;\n  grid-template-columns: 1fr 3fr;\n  gap: 24px;\n}"},
      {num:3,diff:"medium",title:"Galerie responsive",desc:"Cards de min 240px qui s'auto-adaptent.",
        sol:".gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}"},
      {num:4,diff:"hard",title:"Layout holy grail",desc:"header + (sidebar | main | aside) + footer en grid areas.",
        sol:".page {\n  display: grid;\n  grid-template-columns: 200px 1fr 200px;\n  grid-template-rows: 60px 1fr 60px;\n  grid-template-areas:\n    \"header header header\"\n    \"sidebar main aside\"\n    \"footer footer footer\";\n  min-height: 100vh;\n}\nheader{grid-area:header}\naside.left{grid-area:sidebar}\nmain{grid-area:main}\naside.right{grid-area:aside}\nfooter{grid-area:footer}"}
    ]
  },

  {id:"day-6",code:"J6",title:"Jour 6 - Animations & transitions",sub:"transition, transform, @keyframes",
    why:"Bien doses = UX moderne. Trop = mal de tete.",
    tags:["animations","transitions","transform"],
    sections:[
      {h:"Transitions simples",
        blocks:[
          {code:".btn {\n  background: #6366f1;\n  transform: scale(1);\n  transition: transform .2s ease-out, background .2s;\n}\n.btn:hover {\n  background: #818cf8;\n  transform: scale(1.05);\n}\n\n/* Shorthand */\n/* transition: property duration timing-function delay; */\ntransition: all .3s ease 0s;\n\n/* Plusieurs props */\ntransition: opacity .2s, transform .3s ease-out;"},
          {tip:"Anime <code>transform</code> et <code>opacity</code> en priorite : c'est GPU-accelere, pas de recalc layout."}
        ]
      },
      {h:"Transform",
        blocks:[
          {code:"transform: translate(10px, 20px);   /* deplace */\ntransform: scale(1.2);              /* zoom */\ntransform: rotate(45deg);           /* rotation */\ntransform: skew(10deg, 0);          /* incline */\n\n/* Combiner (ordre = importance) */\ntransform: translate(10px, 0) scale(1.1) rotate(5deg);\n\n/* 3D */\ntransform: rotateY(180deg);         /* flip horizontal */\ntransform: translateZ(0);           /* force GPU layer */"}
        ]
      },
      {h:"@keyframes pour animations complexes",
        blocks:[
          {code:"@keyframes spin {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n@keyframes fade-in-up {\n  0%   { opacity: 0; transform: translateY(20px); }\n  100% { opacity: 1; transform: translateY(0); }\n}\n\n.loader {\n  animation: spin 1s linear infinite;\n}\n\n.card {\n  animation: fade-in-up .4s ease-out;\n}\n\n/* Shorthand */\n/* animation: name duration timing-function delay iteration-count direction fill-mode; */"},
          {tip:"<code>infinite</code> pour boucle. <code>forwards</code> garde l'etat final. <code>alternate</code> joue en yo-yo."}
        ]
      }
    ],
    quiz:[
      {q:"Pour une animation en boucle infinie :",opts:["<code>infinite</code>","<code>repeat: forever</code>","<code>loop: -1</code>","Impossible"],correct:"a",
        expl:"<code>animation: spin 1s linear infinite</code>."},
      {q:"Les meilleures props a animer pour la perf :",
        opts:["width et height","transform et opacity","background","color"],correct:"b",
        expl:"<code>transform</code> et <code>opacity</code> sont GPU-accelerees. Les autres declenchent un layout."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Hover scale",desc:"Bouton qui grossit a 1.05 au hover, transition 200ms.",
        sol:".btn {\n  transition: transform .2s ease-out;\n}\n.btn:hover {\n  transform: scale(1.05);\n}"},
      {num:2,diff:"medium",title:"Spinner",desc:"Cercle qui tourne en boucle.",
        sol:".loader {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e5e7eb;\n  border-top-color: #6366f1;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}"},
      {num:3,diff:"medium",title:"Fade in up",desc:"Element qui apparait en montant et fade.",
        sol:"@keyframes fadeInUp {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n.card {\n  animation: fadeInUp .4s ease-out;\n}"},
      {num:4,diff:"hard",title:"Pulse",desc:"Cercle qui pulse (scale 1 -> 1.2 -> 1) en boucle.",
        sol:"@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50%      { transform: scale(1.2); }\n}\n.dot {\n  animation: pulse 1.5s ease-in-out infinite;\n}"}
    ]
  },

  {id:"day-7",code:"J7",title:"Jour 7 - Responsive & projet",sub:"Media queries, mobile-first, projet final",
    why:"Mobile = 60% du trafic. Si pas responsive, tu perds la moitie de tes users.",
    tags:["responsive","mobile-first","media-queries","project"],
    sections:[
      {h:"Media queries",
        blocks:[
          {code:"/* Mobile-first : par defaut on style mobile, on REVELE des features en desktop */\n.layout {\n  display: block;  /* mobile : empile */\n}\n\n@media (min-width: 768px) {\n  .layout {\n    display: grid;\n    grid-template-columns: 250px 1fr;\n  }\n}\n\n@media (min-width: 1024px) {\n  .layout {\n    grid-template-columns: 280px 1fr 200px;\n  }\n}"},
          {tip:"Mobile-first = <code>min-width</code> + on AJOUTE des choses pour les grands ecrans. Plus simple et plus performant."}
        ]
      },
      {h:"Breakpoints standards",
        blocks:[
          {table:[
            ["Nom","min-width"],
            ["xs","< 640px (mobile)"],
            ["sm","640px"],
            ["md","768px (tablette)"],
            ["lg","1024px (desktop)"],
            ["xl","1280px"],
            ["2xl","1536px"]
          ]}
        ]
      },
      {h:"Au-dela des media queries",
        blocks:[
          {code:"/* prefers-color-scheme : detect dark mode systeme */\n@media (prefers-color-scheme: dark) {\n  body { background: #111; color: #eee; }\n}\n\n/* prefers-reduced-motion : utilisateur veut peu d'animations */\n@media (prefers-reduced-motion: reduce) {\n  *, ::before, ::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n\n/* Container queries (recent) : reagir a la taille du PARENT */\n@container (min-width: 600px) {\n  .card { display: flex; }\n}"}
        ]
      },
      {h:"Projet final : Landing page",
        blocks:[
          {list:[
            "<strong>Header</strong> sticky avec logo + nav + bouton CTA",
            "<strong>Hero</strong> plein ecran avec h1 + sous-titre + 2 CTA",
            "<strong>Features</strong> : grille 3 colonnes (1 sur mobile, 3 sur desktop)",
            "<strong>Pricing</strong> : 3 cartes avec une mise en avant",
            "<strong>Footer</strong> : 4 colonnes de liens + copyright",
            "Mobile-first + breakpoints 768/1024",
            "Dark mode via <code>prefers-color-scheme</code> ou toggle",
            "Animations subtiles (hover, fade-in au scroll)"
          ]}
        ]
      }
    ],
    quiz:[
      {q:"Mobile-first signifie :",opts:["Cibler que mobile","Styler mobile par defaut + AJOUTER pour desktop","Cibler le mobile en dernier","Pas de desktop"],correct:"b",
        expl:"Mobile par defaut, on REVELE des features avec <code>min-width</code>."},
      {q:"Pour respecter le 'reduced motion' :",
        opts:["<code>@media (no-motion)</code>","<code>@media (prefers-reduced-motion: reduce)</code>","<code>@motion off</code>","Rien"],correct:"b",
        expl:"<code>prefers-reduced-motion</code> = preference utilisateur OS."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"2 colonnes desktop",desc:"Empile sur mobile, 2 colonnes a partir de 768px.",
        sol:".layout {\n  display: block;\n}\n@media (min-width: 768px) {\n  .layout {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 24px;\n  }\n}"},
      {num:2,diff:"medium",title:"Hide on mobile",desc:"Une sidebar cachee sous 1024px.",
        sol:".sidebar {\n  display: none;\n}\n@media (min-width: 1024px) {\n  .sidebar {\n    display: block;\n  }\n}"},
      {num:3,diff:"medium",title:"Dark mode auto",desc:"Body fond noir si dark mode systeme.",
        sol:"@media (prefers-color-scheme: dark) {\n  body {\n    background: #0f172a;\n    color: #e5e7eb;\n  }\n}"},
      {num:4,diff:"hard",title:"Reduced motion",desc:"Desactive toutes animations si l'utilisateur prefere.",
        sol:"@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}"}
    ]
  }
];

const GIO = [
  {id:"w3-intro",code:"B1",level:"basic",title:"CSS Intro",sub:"Qu'est-ce que CSS",tags:["intro","basics"],
    sections:[{h:"CSS c'est quoi ?",blocks:[
      {p:"CSS (Cascading Style Sheets) decrit l'APPARENCE des elements HTML. Couleurs, polices, espacement, mise en page."},
      {p:"La 'cascade' = quand plusieurs regles s'appliquent, les plus specifiques ou plus tardives gagnent."},
      {code:"/* Selecteur { propriete: valeur; } */\nh1 {\n  color: navy;\n  font-size: 32px;\n}"}
    ]}],
    quiz:[{q:"CSS sert a :",opts:["Structurer","Styler","Stocker","Programmer"],correct:"b",
      expl:"CSS = style. HTML = structure. JS = comportement."}]
  },
  {id:"w3-syntax",code:"B2",level:"basic",title:"CSS Syntax",sub:"Selecteur, declaration, propriete",tags:["syntax","basics"],
    sections:[{h:"Anatomie",blocks:[
      {code:"h1 { color: red; font-size: 24px; }\n|     |       |     |\n|     |       |     +-- valeur\n|     |       +-- propriete\n|     +-- declaration\n+-- selecteur"}
    ]}],
    quiz:[{q:"Entre propriete et valeur :",opts:["<code>=</code>","<code>:</code>","<code>;</code>","<code> </code>"],correct:"b",
      expl:"<code>property: value;</code>"}]
  },
  {id:"w3-inserting",code:"B3",level:"basic",title:"CSS How to Insert",sub:"Inline, internal, external",tags:["basics"],
    sections:[{h:"3 facons",blocks:[
      {code:"<!-- Inline (a eviter) -->\n<p style=\"color: red\">...</p>\n\n<!-- Internal -->\n<head>\n  <style>p { color: red; }</style>\n</head>\n\n<!-- External (recommande) -->\n<head>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>"},
      {tip:"External = reutilisable + cache navigateur + maintenable. Toujours preferer."}
    ]}],
    quiz:[{q:"La meilleure facon en production :",opts:["Inline","Internal","External","Mix de tout"],correct:"c",
      expl:"External (fichier .css) = mis en cache, reutilisable."}]
  },
  {id:"w3-colors",code:"B4",level:"basic",title:"CSS Colors",sub:"keywords, hex, rgb, hsl",tags:["colors","basics"],
    sections:[{h:"Formats",blocks:[
      {code:"color: red;            /* keyword (140 noms) */\ncolor: #ff0000;        /* hex */\ncolor: #f00;           /* hex court */\ncolor: rgb(255,0,0);   /* rgb */\ncolor: rgba(255,0,0,.5); /* alpha */\ncolor: hsl(0,100%,50%);/* hue sat light */"}
    ]}],
    quiz:[{q:"<code>#f00</code> equivaut a :",opts:["<code>#f0000</code>","<code>#ff0000</code>","<code>#f00f00</code>","Erreur"],correct:"b",
      expl:"Hex court = chaque chiffre double. <code>#f00</code> = <code>#ff0000</code>."}]
  },
  {id:"w3-backgrounds",code:"B5",level:"basic",title:"CSS Backgrounds",sub:"color, image, gradient",tags:["background","basics"],
    sections:[{h:"Properties",blocks:[
      {code:"div {\n  background-color: #f3f4f6;\n  background-image: url('bg.jpg');\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n\n  /* Gradient */\n  background: linear-gradient(135deg, #6366f1, #818cf8);\n  background: radial-gradient(circle, #fff, #000);\n}"}
    ]}],
    quiz:[{q:"Pour qu'une image de fond couvre tout sans deformer :",opts:["<code>cover</code>","<code>contain</code>","<code>100%</code>","<code>fit</code>"],correct:"a",
      expl:"<code>cover</code> remplit, peut cropper. <code>contain</code> rentre entierement, peut laisser des espaces."}]
  },
  {id:"w3-borders",code:"B6",level:"basic",title:"CSS Borders & Radius",sub:"border, border-radius",tags:["border","basics"],
    sections:[{h:"Border",blocks:[
      {code:"/* Shorthand : width style color */\nborder: 2px solid #6366f1;\n\nborder-top: 1px dashed red;\nborder-radius: 8px;\nborder-radius: 50%;     /* cercle parfait sur un carre */\nborder-radius: 12px 4px 12px 4px;  /* tl tr br bl */"}
    ]}],
    quiz:[{q:"Pour faire un cercle parfait :",opts:["<code>border-radius: 100%</code>","<code>border-radius: 50%</code>","<code>border-radius: circle</code>","<code>shape: circle</code>"],correct:"b",
      expl:"50% sur un carre = cercle parfait."}]
  },
  {id:"w3-flexbox",code:"I1",level:"intermediate",title:"CSS Flexbox",sub:"Layout 1D",tags:["flexbox","intermediate"],
    sections:[{h:"Bases",blocks:[
      {code:".container {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n  align-items: center;\n}"},
      {note:"<code>gap</code> remplace les marges entre items. Plus propre."}
    ]}],
    quiz:[{q:"Centrer vertical+horizontal :",opts:["<code>justify-content: center</code> seul","<code>align-items: center</code> seul","Les 2","<code>margin: auto</code>"],correct:"c",
      expl:"<code>justify-content</code> (axe principal) + <code>align-items</code> (axe perpendiculaire)."}]
  },
  {id:"w3-grid",code:"I2",level:"intermediate",title:"CSS Grid",sub:"Layout 2D",tags:["grid","intermediate"],
    sections:[{h:"Bases",blocks:[
      {code:".grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}"}
    ]}],
    quiz:[{q:"<code>1fr</code> =",opts:["1 pixel","1 fraction de l'espace","1 rem","1 em"],correct:"b",
      expl:"<code>fr</code> = fraction de l'espace restant."}]
  },
  {id:"w3-position",code:"I3",level:"intermediate",title:"CSS Position",sub:"static, relative, absolute, fixed, sticky",tags:["position","intermediate"],
    sections:[{h:"5 valeurs",blocks:[
      {table:[
        ["Valeur","Comportement"],
        ["<code>static</code>","Defaut, dans le flux"],
        ["<code>relative</code>","Dans le flux, peut bouger avec top/left, devient reference"],
        ["<code>absolute</code>","Hors flux, positionne par rapport au parent relative"],
        ["<code>fixed</code>","Hors flux, positionne par rapport au viewport"],
        ["<code>sticky</code>","Hybride : relative jusqu'a un seuil de scroll puis fixed"]
      ]}
    ]}],
    quiz:[{q:"Pour un header qui colle en haut au scroll :",opts:["<code>fixed</code>","<code>sticky</code>","<code>absolute</code>","<code>relative</code>"],correct:"b",
      expl:"<code>sticky</code> avec <code>top: 0</code> = colle quand le scroll l'atteint."}]
  },
  {id:"w3-shadow",code:"I4",level:"intermediate",title:"CSS Box & Text Shadow",sub:"box-shadow, text-shadow, drop-shadow",tags:["shadow","intermediate"],
    sections:[{h:"Box shadow",blocks:[
      {code:"/* x y blur spread color */\nbox-shadow: 0 4px 6px rgba(0,0,0,0.1);\nbox-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);\n\n/* Inset (interieur) */\nbox-shadow: inset 0 2px 4px rgba(0,0,0,0.1);\n\n/* Multiples */\nbox-shadow: 0 1px 2px rgba(0,0,0,0.06), 0 10px 30px -8px rgba(0,0,0,0.15);"}
    ]}],
    quiz:[{q:"4 valeurs dans box-shadow :",opts:["x y color radius","x y blur color","top right bottom left","Toujours 5"],correct:"b",
      expl:"Ordre : x-offset, y-offset, blur, [spread], color."}]
  },
  {id:"w3-transitions",code:"A1",level:"advanced",title:"CSS Transitions",sub:"transition shorthand",tags:["transitions","advanced"],
    sections:[{h:"Anatomie",blocks:[
      {code:"/* transition: property duration timing-function delay; */\ntransition: opacity .3s ease-out;\ntransition: transform .2s cubic-bezier(.4,0,.2,1) .1s;\ntransition: all .2s, transform .3s ease;"}
    ]}],
    quiz:[{q:"Quelles proprietes animer pour la perf ?",opts:["width et height","transform et opacity","background et color","Tout sauf left/top"],correct:"b",
      expl:"<code>transform</code> et <code>opacity</code> sont GPU-accelerees."}]
  },
  {id:"w3-animations",code:"A2",level:"advanced",title:"CSS Animations",sub:"@keyframes, animation",tags:["animations","advanced"],
    sections:[{h:"Animation complete",blocks:[
      {code:"@keyframes fadeIn {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n\n.card {\n  /* name duration timing iteration direction fill-mode */\n  animation: fadeIn .4s ease-out forwards;\n}"}
    ]}],
    quiz:[{q:"<code>forwards</code> dans animation =",opts:["Joue a l'envers","Boucle","Garde l'etat final","Acceleration"],correct:"c",
      expl:"<code>fill-mode: forwards</code> = l'element reste dans l'etat de la derniere keyframe."}]
  },
  {id:"w3-variables",code:"A3",level:"advanced",title:"CSS Variables",sub:"Custom properties",tags:["variables","advanced"],
    sections:[{h:"Declare et utilise",blocks:[
      {code:":root {\n  --primary: #6366f1;\n  --space: 16px;\n  --radius: 12px;\n}\n\n.btn {\n  background: var(--primary);\n  padding: var(--space);\n  border-radius: var(--radius);\n}\n\n/* Override local */\n.dark-section {\n  --primary: #818cf8;\n}\n\n/* Default si var pas definie */\ncolor: var(--text, #1f2937);"}
    ]}],
    quiz:[{q:"Pour utiliser une variable CSS :",opts:["<code>$primary</code>","<code>@primary</code>","<code>var(--primary)</code>","<code>$(primary)</code>"],correct:"c",
      expl:"<code>--name</code> a la declaration, <code>var(--name)</code> a l'usage."}]
  },
  {id:"w3-responsive",code:"A4",level:"advanced",title:"CSS Responsive Design",sub:"media queries, mobile-first",tags:["responsive","advanced"],
    sections:[{h:"Mobile-first",blocks:[
      {code:"/* Defaut = mobile */\n.layout { display: block; }\n\n@media (min-width: 768px) {\n  .layout { display: grid; grid-template-columns: 1fr 2fr; }\n}\n@media (min-width: 1024px) {\n  .layout { grid-template-columns: 200px 1fr 200px; }\n}"}
    ]}],
    quiz:[{q:"Pour cibler tablettes et + :",opts:["<code>@media (max-width: 768px)</code>","<code>@media (min-width: 768px)</code>","<code>@media tablet</code>","<code>@responsive 768</code>"],correct:"b",
      expl:"<code>min-width</code> = a partir de cette taille (mobile-first)."}]
  }
];

const ALL_LESSONS = [...DAYS, ...GIO];
const TOTAL = ALL_LESSONS.length;
const TOTAL_EXERCISES = DAYS.reduce((sum, d) => sum + (d.exercises ? d.exercises.length : 0), 0);

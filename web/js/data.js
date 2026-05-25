const DAYS = [
  {id:"day-1",code:"J1",title:"Jour 1 - Selecteurs & cascade",sub:"Cibler le bon element, comprendre la specificite",
    why:"Mal cibler casse tout. La cascade explique pourquoi 'ca marche pas'.",
    tags:["selectors","cascade","specificity"],
    sections:[
      {h:"Selecteurs de base",
        blocks:[
          {p:"CSS cible un element via un selecteur. Trois familles principales : <code>element</code>, <code>.classe</code>, <code>#id</code>."},
          {code:"/* Element */\np { color: navy; }\n\n/* Classe (reutilisable) */\n.btn { padding: 10px 20px; }\n\n/* Id (unique) */\n#main-title { font-size: 32px; }\n\n/* Selecteur universel */\n* { box-sizing: border-box; }\n\n/* Grouper plusieurs selecteurs */\nh1, h2, h3 { font-family: Inter; }"}
        ]
      },
      {h:"Combinateurs",
        blocks:[
          {code:"/* Descendant : tous les <li> dans <ul>, a n'importe quel niveau */\nul li { ... }\n\n/* Enfant direct seulement */\nul > li { ... }\n\n/* Frere adjacent (immediatement apres) */\nh2 + p { margin-top: 0; }\n\n/* Tous les freres suivants */\nh2 ~ p { color: gray; }"},
          {table:[
            ["Combinateur","Sens","Exemple"],
            ["espace","Descendant","<code>ul li</code>"],
            ["<code>&gt;</code>","Enfant direct","<code>ul &gt; li</code>"],
            ["<code>+</code>","Frere adjacent","<code>h2 + p</code>"],
            ["<code>~</code>","Freres suivants","<code>h2 ~ p</code>"],
            ["<code>,</code>","Liste","<code>h1, h2</code>"]
          ]}
        ]
      },
      {h:"Selecteurs d'attribut",
        blocks:[
          {code:"/* Attribut existe */\na[target] { ... }\n\n/* Valeur exacte */\ninput[type=\"email\"] { ... }\n\n/* Commence par */\na[href^=\"https\"] { color: green; }\n\n/* Finit par */\na[href$=\".pdf\"] { background: url(pdf-icon.svg); }\n\n/* Contient */\na[href*=\"twitter\"] { color: #1da1f2; }\n\n/* Liste separee par espaces contient (classe) */\n[class~=\"btn\"] { ... }\n\n/* Commence par (avec tiret) */\n[lang|=\"en\"] { ... }  /* matche en, en-US, en-GB */"}
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
            ["<code>div p.box</code>","0,0,1,2"],
            ["<code>#main</code>","0,1,0,0"],
            ["<code>#main .box</code>","0,1,1,0"],
            ["<code>style=\"\"</code>","1,0,0,0"],
            ["<code>!important</code>","🚨 ecrase tout"]
          ]},
          {bad:"<code>!important</code> = dernier recours, pas une habitude. Tu finis par mettre <code>!important</code> sur <code>!important</code>."}
        ]
      },
      {h:"Pseudo-classes (etat)",
        blocks:[
          {code:"/* Etat */\na:hover { color: red; }\na:visited { color: purple; }\na:focus { outline: 2px solid blue; }\na:focus-visible { outline: 2px solid blue; }  /* seulement au clavier */\nbutton:disabled { opacity: 0.5; }\ninput:checked + label { color: green; }\ninput:placeholder-shown { ... }  /* champ vide */\ninput:invalid { border-color: red; }\ninput:required { ... }\n\n/* Position dans le parent */\nli:first-child { font-weight: bold; }\nli:last-child { margin-bottom: 0; }\nli:only-child { ... }\nli:nth-child(2n)     { background: #f3f4f6; }    /* pairs */\nli:nth-child(2n+1)   { background: white; }      /* impairs */\nli:nth-child(3)      { ... }                     /* le 3eme */\nli:nth-child(3n)     { ... }                     /* tous les 3 */\nli:nth-of-type(2)    { ... }                     /* 2eme du meme tag */\n\n/* Negation */\nli:not(.actif) { opacity: 0.5; }\n\n/* is/where (groupe) */\n:is(h1, h2, h3) { font-weight: bold; }\n:where(article, section) p { ... }   /* meme effet mais 0 specificite */"},
          {tip:"<code>:focus-visible</code> = focus seulement au clavier, pas a la souris. UX bien meilleure."}
        ]
      },
      {h:"Pseudo-elements (fragment cree)",
        blocks:[
          {code:"/* :: = pseudo-element */\np::first-line { font-weight: bold; }\np::first-letter { font-size: 2em; float: left; }\n\n/* Insertion de contenu */\n.btn::after {\n  content: \"→\";\n  margin-left: 6px;\n}\n.required::before { content: \"* \"; color: red; }\n\n/* Selection texte */\n::selection { background: yellow; }\n\n/* Placeholder */\ninput::placeholder { color: #999; }"},
          {tip:"<code>:</code> = pseudo-classe (etat). <code>::</code> = pseudo-element (fragment cree). Ne pas confondre."}
        ]
      }
    ],
    quiz:[
      {q:"Plus specifique : <code>p</code> vs <code>.text</code> ?",opts:["<code>p</code>","<code>.text</code>","Egal","La derniere"],correct:"b",
        expl:"<code>.text</code> = 0,0,1,0 bat <code>p</code> = 0,0,0,1."},
      {q:"Liens vers PDF :",opts:["<code>a:pdf</code>","<code>a[href$=\".pdf\"]</code>","<code>a[type=\"pdf\"]</code>","<code>a.pdf</code>"],correct:"b",
        expl:"<code>$=</code> = finit par."},
      {q:"<code>::before</code> est :",opts:["Pseudo-classe","Pseudo-element","Attribut","Combinateur"],correct:"b",
        expl:"<code>::</code> = pseudo-element. Insere du contenu."},
      {q:"Lignes paires d'un tbody :",opts:["<code>tr:even</code>","<code>tr:nth-child(2n)</code>","<code>tr:pair</code>","<code>tr:every(2)</code>"],correct:"b",
        expl:"<code>nth-child(2n)</code> = multiples de 2 = pairs. Astuce : <code>(even)</code> aussi accepte."},
      {q:"Pour styler le focus AU CLAVIER seulement :",opts:["<code>:focus</code>","<code>:focus-visible</code>","<code>:focus-keyboard</code>","<code>:tab</code>"],correct:"b",
        expl:"<code>:focus-visible</code> = focus uniquement quand utile (Tab, pas clic souris)."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Couleur des p",desc:"Tous les <p> en bleu navy.",
        sol:"p { color: navy; }"},
      {num:2,diff:"easy",title:"Premier p d'article",desc:"1er <p> dans un article en gras.",
        sol:"article p:first-child { font-weight: bold; }"},
      {num:3,diff:"easy",title:"Liens externes verts",desc:"Liens https en vert + souligne.",
        sol:"a[href^=\"https\"] {\n  color: green;\n  text-decoration: underline;\n}"},
      {num:4,diff:"easy",title:"Pas la classe active",desc:"Tous les .nav-item sauf .actif en gris.",
        sol:".nav-item:not(.actif) { color: gray; }"},
      {num:5,diff:"easy",title:"Lignes paires",desc:"Lignes paires d'un tableau en gris clair.",
        sol:"tbody tr:nth-child(even) {\n  background: #f3f4f6;\n}"},
      {num:6,diff:"medium",title:"Hover ligne",desc:"Au survol d'un <tr>, fond jaune clair.",
        sol:"tbody tr:hover {\n  background: #fef3c7;\n}"},
      {num:7,diff:"medium",title:"Pseudo before",desc:"Avant chaque .ext, fleche externe.",
        sol:".ext::before {\n  content: \"↗ \";\n  color: gray;\n}"},
      {num:8,diff:"medium",title:"Liens PDF avec icone",desc:"Apres chaque lien PDF, '(PDF)'.",
        sol:"a[href$=\".pdf\"]::after {\n  content: \" (PDF)\";\n  font-size: 0.85em;\n  color: gray;\n}"},
      {num:9,diff:"medium",title:"Champ required marque",desc:"Avant label.required, asterisque rouge.",
        sol:"label.required::before {\n  content: \"* \";\n  color: red;\n}"},
      {num:10,diff:"medium",title:"Placeholder couleur",desc:"Placeholder en gris clair.",
        sol:"input::placeholder {\n  color: #999;\n}"},
      {num:11,diff:"medium",title:"Selection custom",desc:"Texte selectionne avec fond indigo.",
        sol:"::selection {\n  background: #818cf8;\n  color: white;\n}"},
      {num:12,diff:"hard",title:"Disabled state",desc:"Bouton disabled : opacite 0.5, cursor not-allowed.",
        sol:"button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}"},
      {num:13,diff:"hard",title:"Focus visible",desc:"Outline accent seulement au clavier (pas souris).",
        sol:"button:focus-visible {\n  outline: 2px solid #6366f1;\n  outline-offset: 2px;\n}\nbutton:focus:not(:focus-visible) {\n  outline: none;\n}"},
      {num:14,diff:"hard",title:"Premiere lettre drop cap",desc:"Premiere lettre du 1er p de chaque article en grand drop cap.",
        sol:"article p:first-of-type::first-letter {\n  font-size: 3em;\n  float: left;\n  line-height: 1;\n  padding-right: 8px;\n  font-weight: bold;\n}"}
    ]
  },

  {id:"day-2",code:"J2",title:"Jour 2 - Box model & display",sub:"Comment chaque element prend sa place",
    why:"Mal compris = layouts qui sautent. C'est la base de toute mise en page.",
    tags:["box-model","display","spacing","margin","padding"],
    sections:[
      {h:"Le box model",
        blocks:[
          {p:"Chaque element = 4 couches : <strong>content → padding → border → margin</strong>."},
          {code:"/* PAR DEFAUT : content-box (catastrophique) */\n/* width=200 + padding=20 + border=2 = 244px reels */\n\n/* TOUJOURS METTRE EN PREMIERE LIGNE */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* Maintenant width=200 inclut padding + border */"},
          {tip:"<code>border-box</code> partout. C'est la SEULE valeur saine en 2026."}
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
            ["<code>none</code>","Element retire du flux"],
            ["<code>contents</code>","L'element disparait, ses enfants restent"],
            ["<code>inline-flex</code>","Inline avec enfants flex"]
          ]}
        ]
      },
      {h:"Padding, margin, border",
        blocks:[
          {code:".box {\n  /* Padding (interieur) */\n  padding: 16px;                  /* 4 cotes */\n  padding: 10px 20px;              /* vertical, horizontal */\n  padding: 10px 20px 5px;          /* top, horiz, bottom */\n  padding: 10px 20px 5px 15px;     /* top, right, bottom, left */\n\n  /* Margin (exterieur) */\n  margin: 0 auto;                  /* centre horizontalement */\n  margin-block: 16px;              /* logique : top+bottom */\n  margin-inline: auto;             /* logique : left+right */\n\n  /* Logical properties (mieux pour i18n) */\n  padding-block-start: 10px;\n  padding-inline-end: 20px;\n\n  /* Border */\n  border: 1px solid #cbd5e1;\n  border-top: 2px solid red;\n  border-block: 1px solid #eee;\n  border-radius: 8px;\n  border-radius: 12px 4px;           /* haut-gauche/bas-droite, haut-droite/bas-gauche */\n  border-radius: 50% / 30%;          /* ovale */\n}"},
          {tip:"Logical properties (<code>margin-block</code>, <code>padding-inline</code>) s'adaptent automatiquement aux langues RTL (arabe, hebreu)."}
        ]
      },
      {h:"Marge collapse (le piege)",
        blocks:[
          {warn:"Les marges verticales <strong>fusionnent</strong> entre voisins en block. Si A a margin-bottom: 20px et B a margin-top: 30px, la distance n'est pas 50px mais 30px (le max)."},
          {tip:"Pour eviter : utilise <code>gap</code> dans flex/grid, ou un padding sur le parent. Les marges en flex/grid ne collapse PAS."}
        ]
      },
      {h:"Overflow",
        blocks:[
          {code:".box {\n  overflow: visible;   /* defaut, deborde */\n  overflow: hidden;    /* coupe */\n  overflow: scroll;    /* toujours scroll */\n  overflow: auto;      /* scroll seulement si besoin */\n\n  /* Par axe */\n  overflow-x: auto;\n  overflow-y: hidden;\n\n  /* Texte trop long */\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;  /* ... a la fin */\n}"}
        ]
      }
    ],
    quiz:[
      {q:"Avec <code>border-box</code>, <code>width: 200px; padding: 20px</code> donne :",
        opts:["240px","220px","200px","180px"],correct:"c",
        expl:"<code>border-box</code> inclut padding."},
      {q:"Marges verticales entre voisins :",opts:["S'additionnent","Fusionnent (max)","Ne marchent pas","S'annulent"],correct:"b",
        expl:"Collapse : seule la plus grande s'applique."},
      {q:"<code>display: none</code> :",opts:["Cache visuellement","Retire du flux + cache","Met opacity 0","Cache du DOM"],correct:"b",
        expl:"Element n'occupe plus d'espace."},
      {q:"Pour text ... :",opts:["<code>text-overflow: ellipsis</code> seul","Combiner nowrap+overflow:hidden+text-overflow","<code>overflow: ellipsis</code>","Impossible"],correct:"b",
        expl:"Les 3 ensemble : <code>white-space: nowrap; overflow: hidden; text-overflow: ellipsis;</code>"}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Border-box global",desc:"Applique border-box partout.",
        sol:"*, *::before, *::after {\n  box-sizing: border-box;\n}"},
      {num:2,diff:"easy",title:"Centrer un block",desc:"Centre .container 300px de large.",
        sol:".container {\n  width: 300px;\n  margin: 0 auto;\n}"},
      {num:3,diff:"easy",title:"Cacher visuellement",desc:"Cache un element du flux et de la vue.",
        sol:".hidden { display: none; }"},
      {num:4,diff:"medium",title:"Card complete",desc:"Card : padding 20px, bordure grise, radius 12px, fond blanc.",
        sol:".card {\n  padding: 20px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n}"},
      {num:5,diff:"medium",title:"Bordure inferieure",desc:"Div avec seulement une bordure rouge en bas.",
        sol:".line {\n  border-bottom: 2px solid red;\n}"},
      {num:6,diff:"medium",title:"Sticky header",desc:"Header en haut, full width, fond blanc, ombre legere.",
        sol:"header {\n  position: sticky;\n  top: 0;\n  width: 100%;\n  background: white;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n}"},
      {num:7,diff:"medium",title:"Text ellipsis",desc:"Tronquer le texte trop long avec ...",
        sol:".truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 200px;\n}"},
      {num:8,diff:"medium",title:"Cercle parfait",desc:"Avatar : div 60px avec border-radius pour faire un cercle.",
        sol:".avatar {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  overflow: hidden;\n}"},
      {num:9,diff:"hard",title:"Aspect ratio",desc:"Image conteneur 16:9.",
        sol:".video-wrap {\n  aspect-ratio: 16 / 9;\n  width: 100%;\n}"},
      {num:10,diff:"hard",title:"Multi-bordures",desc:"Box avec bordure top accent et bottom grise.",
        sol:".box {\n  border-top: 3px solid #6366f1;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 16px;\n}"}
    ]
  },

  {id:"day-3",code:"J3",title:"Jour 3 - Couleurs & typographie",sub:"color, font, line-height, units",
    why:"Une typo soignee = 90% du sentiment de qualite.",
    tags:["color","fonts","text","units"],
    sections:[
      {h:"Couleurs",
        blocks:[
          {code:"/* 4 facons d'ecrire rouge */\ncolor: red;\ncolor: #ff0000;\ncolor: #f00;            /* hex court */\ncolor: rgb(255, 0, 0);\ncolor: rgb(255 0 0);     /* syntaxe moderne sans virgules */\ncolor: hsl(0, 100%, 50%);\ncolor: hsl(0 100% 50%);\ncolor: oklch(63% 0.25 29);  /* moderne, lineaire perceptuel */\n\n/* Avec alpha */\nbackground: rgba(0, 0, 0, 0.5);\nbackground: rgb(0 0 0 / 50%);\nbackground: hsla(220, 50%, 50%, 0.5);\n\n/* Variables CSS */\n:root {\n  --primary: #6366f1;\n  --text: #1f2937;\n}\nh1 { color: var(--primary); }"},
          {tip:"<code>hsl</code> est plus intuitif : monter L = plus clair. <code>oklch</code> est encore mieux (perceptuel)."}
        ]
      },
      {h:"Gradients",
        blocks:[
          {code:"/* Lineaire */\nbackground: linear-gradient(to right, red, blue);\nbackground: linear-gradient(135deg, #6366f1, #818cf8);\nbackground: linear-gradient(90deg, red 0%, yellow 50%, green 100%);\n\n/* Radial */\nbackground: radial-gradient(circle, white, black);\nbackground: radial-gradient(circle at top right, #6366f1, transparent 50%);\n\n/* Conic */\nbackground: conic-gradient(from 0deg, red, yellow, green, blue, red);\n\n/* Repetition */\nbackground: repeating-linear-gradient(45deg, #eee, #eee 10px, #ddd 10px, #ddd 20px);"}
        ]
      },
      {h:"Typographie",
        blocks:[
          {code:"body {\n  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n  color: #1f2937;\n  -webkit-font-smoothing: antialiased;\n}\n\nh1 {\n  font-size: clamp(2rem, 4vw, 3rem);  /* fluide */\n  font-weight: 700;\n  line-height: 1.1;\n  letter-spacing: -0.02em;\n}\n\np {\n  margin-block: 1em;\n  max-width: 65ch;     /* 65 caracteres = ligne ideale */\n  text-wrap: pretty;   /* eviter mots isoles en fin */\n}\n\n/* Web fonts */\n@font-face {\n  font-family: 'MyFont';\n  src: url('myfont.woff2') format('woff2');\n  font-weight: 100 900;\n  font-display: swap;  /* affiche fallback puis swap */\n}"},
          {tip:"<code>system-ui</code> = police native du systeme. Rapide, propre, gratuit. Combiner avec une Google Font de marque pour les titres."}
        ]
      },
      {h:"Unites",
        blocks:[
          {table:[
            ["Unite","Sens","Quand"],
            ["<code>px</code>","Pixel absolu","Bordures, ombres"],
            ["<code>rem</code>","Relatif au font-size racine","Tailles texte"],
            ["<code>em</code>","Relatif au font-size parent","Espacement contextuel"],
            ["<code>%</code>","Relatif au parent","Widths fluides"],
            ["<code>vh</code> / <code>vw</code>","% du viewport","Hero plein ecran"],
            ["<code>dvh</code> / <code>svh</code>","Dynamic/small viewport h","Mobile (gere la barre nav)"],
            ["<code>ch</code>","Largeur d'un '0'","max-width texte"],
            ["<code>fr</code>","Fraction (grid only)","Grid columns"],
            ["<code>clamp(min, ideal, max)</code>","Fluide borne","Tailles fluides"]
          ]},
          {warn:"<code>vh</code> sur mobile bug : ne tient pas compte de la barre de navigation qui apparait/disparait. Prefere <code>dvh</code> (dynamic) en 2026."}
        ]
      },
      {h:"Text properties",
        blocks:[
          {code:"text-align: left | right | center | justify;\ntext-decoration: underline | line-through | overline | none;\ntext-decoration: underline wavy red 2px;\ntext-transform: uppercase | lowercase | capitalize | none;\nletter-spacing: 0.05em;\nword-spacing: 0.2em;\nwhite-space: normal | nowrap | pre | pre-wrap | break-spaces;\nword-break: break-word;\nhyphens: auto;"}
        ]
      }
    ],
    quiz:[
      {q:"<code>line-height</code> ideal :",opts:["1.0","1.2","1.5-1.7","2.5"],correct:"c",
        expl:"1.5-1.7 = confort de lecture."},
      {q:"<code>1rem</code> =",opts:["1px","16px par defaut","100%","Relatif au parent"],correct:"b",
        expl:"<code>rem</code> = relatif au font-size de <html> (16px par defaut)."},
      {q:"Pour titre fluide 32-48px :",opts:["<code>font-size: 40px</code>","<code>font-size: clamp(2rem, 4vw, 3rem)</code>","<code>font-size: 2.5em</code>","<code>font-size: 100%</code>"],correct:"b",
        expl:"<code>clamp(min, ideal, max)</code> = fluide entre 2 bornes."},
      {q:"Unite la plus saine pour mobile full-height :",opts:["<code>vh</code>","<code>dvh</code>","<code>100%</code>","<code>vmax</code>"],correct:"b",
        expl:"<code>dvh</code> = dynamic viewport height, gere la barre nav mobile."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Stack systeme",desc:"Body avec font-family system-ui en cascade.",
        sol:"body {\n  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;\n}"},
      {num:2,diff:"easy",title:"Hex court",desc:"Couleur de fond #336699 en hex court.",
        sol:"body { background: #369; }"},
      {num:3,diff:"easy",title:"Center text",desc:"H1 centre.",
        sol:"h1 { text-align: center; }"},
      {num:4,diff:"easy",title:"Uppercase",desc:"Tous les boutons en majuscules.",
        sol:"button { text-transform: uppercase; }"},
      {num:5,diff:"medium",title:"Variables CSS",desc:"3 variables (primary, text, bg) puis usage.",
        sol:":root {\n  --primary: #6366f1;\n  --text: #1f2937;\n  --bg: #ffffff;\n}\nbody {\n  background: var(--bg);\n  color: var(--text);\n}\nh1 { color: var(--primary); }"},
      {num:6,diff:"medium",title:"Titre fluide",desc:"H1 entre 28px et 42px.",
        sol:"h1 {\n  font-size: clamp(1.75rem, 5vw, 2.625rem);\n}"},
      {num:7,diff:"medium",title:"Gradient bouton",desc:"Bouton indigo gradient 135deg.",
        sol:".btn {\n  background: linear-gradient(135deg, #818cf8, #6366f1);\n  color: white;\n  padding: 10px 20px;\n  border-radius: 8px;\n}"},
      {num:8,diff:"medium",title:"Border-radius asymetrique",desc:"Bulle chat : radius 16px sauf bas-gauche 4px.",
        sol:".bubble {\n  border-radius: 16px 16px 16px 4px;\n}"},
      {num:9,diff:"medium",title:"Underline wavy red",desc:"Texte avec souligne ondule rouge.",
        sol:".error {\n  text-decoration: underline wavy red;\n}"},
      {num:10,diff:"hard",title:"HSL hover plus clair",desc:"Bouton HSL, hover 10% plus clair.",
        sol:".btn {\n  background: hsl(220, 70%, 50%);\n}\n.btn:hover {\n  background: hsl(220, 70%, 60%);\n}"},
      {num:11,diff:"hard",title:"Hero full screen mobile",desc:"Hero qui prend exactement la hauteur visible sur mobile.",
        sol:".hero {\n  min-height: 100dvh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}"},
      {num:12,diff:"hard",title:"Web font swap",desc:"Charge Inter en woff2, font-display swap.",
        sol:"@font-face {\n  font-family: 'Inter';\n  src: url('inter.woff2') format('woff2');\n  font-weight: 100 900;\n  font-display: swap;\n}"}
    ]
  },

  {id:"day-4",code:"J4",title:"Jour 4 - Flexbox",sub:"Layout 1D, le meilleur pour aligner",
    why:"Flexbox = 80% des alignements modernes. Indispensable.",
    tags:["flexbox","layout","alignment"],
    sections:[
      {h:"Concepts de base",
        blocks:[
          {p:"<code>display: flex</code> sur un parent active flexbox. Les enfants deviennent des 'items' alignables sur 2 axes."},
          {code:".row {\n  display: flex;\n  gap: 16px;\n  justify-content: space-between;  /* axe principal */\n  align-items: center;             /* axe perpendiculaire */\n}"},
          {note:"Axe principal = direction de flex-direction (par defaut: horizontal). Axe perpendiculaire = l'autre."}
        ]
      },
      {h:"Direction & wrap",
        blocks:[
          {code:".container {\n  display: flex;\n  flex-direction: row;          /* defaut */\n  /* row | row-reverse | column | column-reverse */\n\n  flex-wrap: wrap;              /* passe a la ligne */\n  /* wrap | nowrap (defaut) | wrap-reverse */\n\n  /* Shorthand */\n  flex-flow: row wrap;\n}"}
        ]
      },
      {h:"justify-content (axe principal)",
        blocks:[
          {table:[
            ["Valeur","Effet"],
            ["<code>flex-start</code>","Au debut (defaut)"],
            ["<code>flex-end</code>","A la fin"],
            ["<code>center</code>","Centre"],
            ["<code>space-between</code>","Espaces entre (rien aux bords)"],
            ["<code>space-around</code>","Espaces autour de chaque (demi aux bords)"],
            ["<code>space-evenly</code>","Espaces egaux partout"]
          ]}
        ]
      },
      {h:"align-items & align-self",
        blocks:[
          {code:".container {\n  display: flex;\n  align-items: stretch;   /* defaut, items remplissent */\n  /* flex-start | flex-end | center | baseline | stretch */\n}\n\n/* Override pour UN item */\n.special {\n  align-self: flex-end;\n}\n\n/* Sur plusieurs lignes (wrap), align-content gere les lignes */\n.container {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: space-between;  /* espace entre les lignes */\n}"}
        ]
      },
      {h:"flex sur les items",
        blocks:[
          {code:"/* Shorthand : flex-grow, flex-shrink, flex-basis */\n.item {\n  flex: 1;          /* prend tout l'espace, equipartage */\n  flex: 0 0 200px;  /* taille fixe 200px */\n  flex: 1 1 auto;   /* defaut */\n  flex: 2 1 0;      /* 2x plus large que les autres */\n}\n\n/* Order : repositionner sans toucher au HTML */\n.first {\n  order: -1;  /* avant les autres */\n}\n\n/* Grow + shrink separes */\n.item {\n  flex-grow: 1;\n  flex-shrink: 0;\n  flex-basis: 240px;\n}"}
        ]
      },
      {h:"Centrer parfaitement",
        blocks:[
          {code:"/* Le classique : centrer une div dans son parent */\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n/* Centrer juste horizontalement */\n.row {\n  display: flex;\n  justify-content: center;\n}"}
        ]
      }
    ],
    quiz:[
      {q:"Centrer vertical dans flex :",opts:["<code>justify-content: center</code>","<code>align-items: center</code>","<code>vertical-align: middle</code>","<code>margin: auto</code>"],correct:"b",
        expl:"<code>align-items</code> = axe perpendiculaire."},
      {q:"<code>flex: 1</code> =",opts:["Taille fixe","Grandit pour remplir","Une ligne","Bug"],correct:"b",
        expl:"<code>flex-grow: 1</code> : prend tout l'espace dispo."},
      {q:"Espaces egaux entre items (rien aux bords) :",opts:["<code>space-around</code>","<code>space-between</code>","<code>space-evenly</code>","<code>distribute</code>"],correct:"b",
        expl:"<code>space-between</code>."},
      {q:"Pour changer l'ordre visuel sans toucher HTML :",opts:["<code>z-index</code>","<code>order</code>","<code>position</code>","<code>sort</code>"],correct:"b",
        expl:"<code>order</code> sur les items flex/grid."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Header flex",desc:"Logo a gauche, nav a droite.",
        sol:"header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}"},
      {num:2,diff:"easy",title:"3 cartes egales",desc:"3 cartes qui se partagent l'espace.",
        sol:".grid {\n  display: flex;\n  gap: 16px;\n}\n.card {\n  flex: 1;\n}"},
      {num:3,diff:"easy",title:"Centrer parfait",desc:"Centre h+v une div dans son parent.",
        sol:".parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}"},
      {num:4,diff:"easy",title:"Stack vertical",desc:"3 items empiles verticalement.",
        sol:".stack {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}"},
      {num:5,diff:"medium",title:"Sidebar + main",desc:"Sidebar 250px fixe, main prend le reste.",
        sol:".layout {\n  display: flex;\n  gap: 24px;\n}\naside {\n  flex: 0 0 250px;\n}\nmain {\n  flex: 1;\n}"},
      {num:6,diff:"medium",title:"Wrap mobile",desc:"4 cartes qui passent a la ligne sur mobile.",
        sol:".cards {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.card {\n  flex: 1 1 240px;\n}"},
      {num:7,diff:"medium",title:"Push to end",desc:"Liste de boutons avec le dernier pousse a droite.",
        sol:".toolbar {\n  display: flex;\n  gap: 8px;\n}\n.toolbar .last {\n  margin-left: auto;\n}"},
      {num:8,diff:"medium",title:"Order swap mobile",desc:"Sur mobile, l'image apparait avant le texte (HTML inverse).",
        sol:"@media (max-width: 640px) {\n  .image-wrap { order: -1; }\n}"},
      {num:9,diff:"hard",title:"Card aspect",desc:"Card avec image flex 1, contenu flex 2 (1:2 ratio).",
        sol:".card {\n  display: flex;\n}\n.card-img { flex: 1; }\n.card-body { flex: 2; }"},
      {num:10,diff:"hard",title:"Modal centre",desc:"Modal overlay full screen, contenu centre.",
        sol:".overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0,0,0,0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 100;\n}\n.modal {\n  background: white;\n  padding: 24px;\n  border-radius: 12px;\n  max-width: 500px;\n}"},
      {num:11,diff:"hard",title:"Equal height cards",desc:"3 cards en ligne, toutes la meme hauteur meme si contenu different.",
        sol:".row {\n  display: flex;\n  gap: 16px;\n  align-items: stretch;  /* defaut, juste rappel */\n}\n.card {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.card-footer { margin-top: auto; }"}
    ]
  },

  {id:"day-5",code:"J5",title:"Jour 5 - Grid",sub:"Layout 2D, le meilleur pour les pages entieres",
    why:"Grid > Flex pour les grilles complexes. Layout 2D natif.",
    tags:["grid","layout","2D"],
    sections:[
      {h:"Grille basique",
        blocks:[
          {code:".grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;  /* 3 colonnes, 1:2:1 */\n  gap: 16px;\n}\n\n/* fr = fraction de l'espace dispo */\n/* repeat */\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);  /* 3 colonnes egales */\n  gap: 12px;\n}\n\n/* Auto-fit + minmax = grille responsive sans media query */\n.auto-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}\n\n/* auto-fill vs auto-fit */\n/* auto-fit  : si pas assez d'items, les colonnes vides disparaissent */\n/* auto-fill : garde les colonnes vides (utile pour grille a remplir) */"},
          {tip:"<code>repeat(auto-fit, minmax(240px, 1fr))</code> = grille magique qui s'adapte. Memoriser cette formule."}
        ]
      },
      {h:"Placement",
        blocks:[
          {code:".grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: 100px 200px;\n  gap: 12px;\n}\n\n/* Un item etale sur 2 colonnes */\n.wide {\n  grid-column: span 2;\n  /* ou explicite : */\n  grid-column: 1 / 3;       /* de col 1 a col 3 (exclusif) */\n  grid-column: 1 / -1;      /* toute la largeur */\n}\n\n/* Sur 2 lignes */\n.tall {\n  grid-row: span 2;\n}\n\n/* Position precise */\n.cell {\n  grid-column: 2 / 4;\n  grid-row: 1 / 3;\n}"}
        ]
      },
      {h:"Grid areas (named)",
        blocks:[
          {code:".page {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: 60px 1fr 60px;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\"\n    \"footer footer\";\n  gap: 12px;\n  min-height: 100vh;\n}\n\nheader  { grid-area: header; }\naside   { grid-area: sidebar; }\nmain    { grid-area: main; }\nfooter  { grid-area: footer; }\n\n/* Mobile : tout empile */\n@media (max-width: 768px) {\n  .page {\n    grid-template-columns: 1fr;\n    grid-template-areas:\n      \"header\"\n      \"main\"\n      \"sidebar\"\n      \"footer\";\n  }\n}"}
        ]
      },
      {h:"Alignement grid",
        blocks:[
          {code:".grid {\n  display: grid;\n  /* Aligner les items dans leur cellule */\n  justify-items: center;     /* axe colonne */\n  align-items: center;        /* axe ligne */\n  place-items: center;        /* les 2 */\n\n  /* Aligner la grille entiere (si plus petite que le container) */\n  justify-content: center;\n  align-content: center;\n  place-content: center;\n}\n\n/* Override par item */\n.cell {\n  justify-self: end;\n  align-self: start;\n}"}
        ]
      },
      {h:"Subgrid (PHP 9+, Chrome 117+)",
        blocks:[
          {code:".parent {\n  display: grid;\n  grid-template-columns: 1fr 200px 1fr;\n}\n.child {\n  display: grid;\n  /* Reprend les colonnes du parent */\n  grid-template-columns: subgrid;\n  grid-column: 1 / -1;\n}"},
          {tip:"Subgrid = les enfants alignent leurs colonnes sur le parent. Magique pour les cards uniformes."}
        ]
      }
    ],
    quiz:[
      {q:"<code>1fr</code> =",opts:["1px","1 fraction","1 em","1% du parent"],correct:"b",
        expl:"<code>fr</code> = fraction de l'espace restant."},
      {q:"Grille responsive sans media query :",opts:["<code>repeat(3, 1fr)</code>","<code>auto-fit + minmax</code>","<code>flex</code>","<code>@media</code>"],correct:"b",
        expl:"<code>repeat(auto-fit, minmax(240px, 1fr))</code>."},
      {q:"Diff entre auto-fit et auto-fill :",opts:["Aucune","auto-fit collapse les vides","auto-fill collapse","Inverse"],correct:"b",
        expl:"auto-fit fait disparaitre les colonnes vides. auto-fill les garde."},
      {q:"<code>grid-column: 1 / -1</code> :",opts:["Erreur","Toute la largeur","Premiere colonne","Derniere"],correct:"b",
        expl:"-1 = derniere ligne de grille. Donc 1 a -1 = toute la largeur."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"3 colonnes egales",desc:"Grid avec 3 colonnes egales, gap 16px.",
        sol:".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}"},
      {num:2,diff:"easy",title:"Sidebar + main",desc:"2 colonnes : 250px sidebar + reste.",
        sol:".layout {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  gap: 24px;\n}"},
      {num:3,diff:"medium",title:"Sidebar main aside",desc:"Layout 3 colonnes 200/1fr/200.",
        sol:".layout {\n  display: grid;\n  grid-template-columns: 200px 1fr 200px;\n  gap: 16px;\n}"},
      {num:4,diff:"medium",title:"Galerie responsive",desc:"Cards min 240px, auto-adaptables.",
        sol:".gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}"},
      {num:5,diff:"medium",title:"Featured item",desc:"Galerie 4 col, 1er item couvre 2 colonnes ET 2 lignes.",
        sol:".gallery {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n}\n.gallery .featured {\n  grid-column: span 2;\n  grid-row: span 2;\n}"},
      {num:6,diff:"medium",title:"Centrer grid",desc:"Centre tous les items dans leurs cellules.",
        sol:".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  place-items: center;\n}"},
      {num:7,diff:"hard",title:"Holy grail",desc:"header / (sidebar | main | aside) / footer en grid areas.",
        sol:".page {\n  display: grid;\n  grid-template-columns: 200px 1fr 200px;\n  grid-template-rows: 60px 1fr 60px;\n  grid-template-areas:\n    \"header header header\"\n    \"sidebar main aside\"\n    \"footer footer footer\";\n  min-height: 100vh;\n}\nheader{grid-area:header}\naside.left{grid-area:sidebar}\nmain{grid-area:main}\naside.right{grid-area:aside}\nfooter{grid-area:footer}"},
      {num:8,diff:"hard",title:"Magazine layout",desc:"Article principal (2 cols, 2 rows) + 3 articles secondaires.",
        sol:".magazine {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(2, 200px);\n  gap: 16px;\n}\n.magazine .main-article {\n  grid-column: span 2;\n  grid-row: span 2;\n}"},
      {num:9,diff:"hard",title:"Mobile reorder areas",desc:"Mobile : header / main / sidebar / footer empiles.",
        sol:"@media (max-width: 768px) {\n  .page {\n    grid-template-columns: 1fr;\n    grid-template-areas:\n      \"header\"\n      \"main\"\n      \"sidebar\"\n      \"footer\";\n  }\n}"}
    ]
  },

  {id:"day-6",code:"J6",title:"Jour 6 - Animations & transitions",sub:"transition, transform, @keyframes, animation",
    why:"Bien doses = UX moderne. Trop = mal de tete.",
    tags:["animations","transitions","transform"],
    sections:[
      {h:"Transitions simples",
        blocks:[
          {code:".btn {\n  background: #6366f1;\n  transform: scale(1);\n  transition: transform .2s ease-out, background .2s;\n}\n.btn:hover {\n  background: #818cf8;\n  transform: scale(1.05);\n}\n\n/* Shorthand */\n/* transition: property duration timing-function delay; */\ntransition: all .3s ease 0s;\n\n/* Plusieurs props */\ntransition: opacity .2s, transform .3s ease-out;\n\n/* Timing functions */\ntransition-timing-function: ease;\ntransition-timing-function: ease-in;\ntransition-timing-function: ease-out;\ntransition-timing-function: ease-in-out;\ntransition-timing-function: linear;\ntransition-timing-function: cubic-bezier(.4, 0, .2, 1);\ntransition-timing-function: steps(4, end);"},
          {tip:"Anime <code>transform</code> et <code>opacity</code> en priorite : c'est GPU-accelere, pas de recalc layout."}
        ]
      },
      {h:"Transform",
        blocks:[
          {code:"transform: translate(10px, 20px);    /* deplace */\ntransform: translateX(10px);\ntransform: translateY(-50%);\ntransform: scale(1.2);                /* zoom */\ntransform: scale(1.5, 2);\ntransform: rotate(45deg);             /* rotation */\ntransform: skew(10deg, 0);            /* incline */\n\n/* Combiner (ordre = importance) */\ntransform: translate(10px, 0) scale(1.1) rotate(5deg);\n\n/* 3D */\ntransform: rotateY(180deg);           /* flip horizontal */\ntransform: translateZ(0);             /* force GPU layer */\ntransform: perspective(1000px) rotateY(30deg);\n\n/* Modern : props separees (sans shorthand) */\ntranslate: 10px 20px;\nrotate: 45deg;\nscale: 1.2;"},
          {note:"En 2026, <code>translate/rotate/scale</code> sont des proprietes a part entiere. Plus simples que le <code>transform</code> shorthand."}
        ]
      },
      {h:"@keyframes pour animations complexes",
        blocks:[
          {code:"@keyframes spin {\n  from { rotate: 0deg; }\n  to   { rotate: 360deg; }\n}\n\n@keyframes fadeInUp {\n  0%   { opacity: 0; translate: 0 20px; }\n  100% { opacity: 1; translate: 0 0; }\n}\n\n@keyframes pulse {\n  0%, 100% { scale: 1; }\n  50%      { scale: 1.1; }\n}\n\n.loader {\n  animation: spin 1s linear infinite;\n}\n\n.card {\n  animation: fadeInUp .4s ease-out;\n}\n\n.dot {\n  animation: pulse 1.5s ease-in-out infinite;\n}\n\n/* Shorthand */\n/* animation: name duration timing delay iteration direction fill-mode play-state; */\nanimation: spin 1s linear infinite;\nanimation: fadeIn .3s ease-out forwards;"},
          {tip:"<code>infinite</code> = boucle. <code>forwards</code> = garde l'etat final. <code>alternate</code> = yo-yo."}
        ]
      },
      {h:"View transitions (moderne)",
        blocks:[
          {code:"/* Activer les transitions natives entre pages/etats */\n@view-transition {\n  navigation: auto;\n}\n\n/* Donner un nom a un element pour qu'il soit anime */\n.hero {\n  view-transition-name: hero-image;\n}\n\n/* Customiser la transition */\n::view-transition-old(hero-image),\n::view-transition-new(hero-image) {\n  animation-duration: .5s;\n}"},
          {note:"Recent. Permet des transitions fluides entre pages/etats sans framework. Chrome 111+."}
        ]
      },
      {h:"Reduced motion",
        blocks:[
          {code:"/* Respecter les preferences utilisateur */\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}"},
          {tip:"OBLIGATOIRE : certains utilisateurs ont des troubles vestibulaires. Les animations rapides leur donnent la nausee."}
        ]
      }
    ],
    quiz:[
      {q:"Animation en boucle infinie :",opts:["<code>infinite</code>","<code>repeat: forever</code>","<code>loop: -1</code>","Impossible"],correct:"a",
        expl:"<code>animation: spin 1s linear infinite</code>."},
      {q:"Meilleures props a animer pour la perf :",opts:["width/height","transform/opacity","background","color"],correct:"b",
        expl:"GPU-accelerees, pas de layout."},
      {q:"Pour respecter reduced-motion :",opts:["<code>@media (no-motion)</code>","<code>@media (prefers-reduced-motion: reduce)</code>","<code>@motion off</code>","Rien"],correct:"b",
        expl:"<code>prefers-reduced-motion</code>."},
      {q:"<code>fill-mode: forwards</code> :",opts:["Joue a l'envers","Garde l'etat final","Boucle","Accelere"],correct:"b",
        expl:"L'element reste dans l'etat de la derniere keyframe."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Hover scale",desc:"Bouton scale 1.05 au hover, 200ms.",
        sol:".btn {\n  transition: transform .2s ease-out;\n}\n.btn:hover {\n  transform: scale(1.05);\n}"},
      {num:2,diff:"easy",title:"Hover fade",desc:"Image hover : opacity 0.7.",
        sol:".img {\n  transition: opacity .2s;\n}\n.img:hover {\n  opacity: 0.7;\n}"},
      {num:3,diff:"easy",title:"Rotate icon",desc:"Icone qui tourne 90deg au hover.",
        sol:".icon {\n  transition: rotate .2s;\n}\n.icon:hover {\n  rotate: 90deg;\n}"},
      {num:4,diff:"medium",title:"Spinner",desc:"Cercle qui tourne en boucle.",
        sol:".loader {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e5e7eb;\n  border-top-color: #6366f1;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  to { rotate: 360deg; }\n}"},
      {num:5,diff:"medium",title:"Fade in up",desc:"Element qui apparait en montant.",
        sol:"@keyframes fadeInUp {\n  from { opacity: 0; translate: 0 20px; }\n  to   { opacity: 1; translate: 0 0; }\n}\n.card {\n  animation: fadeInUp .4s ease-out;\n}"},
      {num:6,diff:"medium",title:"Pulse dot",desc:"Cercle qui pulse (scale 1 -> 1.2 -> 1).",
        sol:"@keyframes pulse {\n  0%, 100% { scale: 1; }\n  50%      { scale: 1.2; }\n}\n.dot {\n  animation: pulse 1.5s ease-in-out infinite;\n}"},
      {num:7,diff:"medium",title:"Slide menu in",desc:"Menu lateral qui rentre depuis la gauche.",
        sol:"@keyframes slideIn {\n  from { translate: -100% 0; }\n  to   { translate: 0 0; }\n}\n.menu.open {\n  animation: slideIn .3s ease-out;\n}"},
      {num:8,diff:"hard",title:"Reduced motion safe",desc:"Animations actives sauf si prefers-reduced-motion.",
        sol:"@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}"},
      {num:9,diff:"hard",title:"Card flip",desc:"Card qui se retourne au hover (front -> back).",
        sol:".card-wrap {\n  perspective: 1000px;\n}\n.card {\n  transition: transform .6s;\n  transform-style: preserve-3d;\n}\n.card-wrap:hover .card {\n  transform: rotateY(180deg);\n}\n.card-front, .card-back {\n  position: absolute;\n  inset: 0;\n  backface-visibility: hidden;\n}\n.card-back {\n  transform: rotateY(180deg);\n}"}
    ]
  },

  {id:"day-7",code:"J7",title:"Jour 7 - Responsive & projet",sub:"Media queries, mobile-first, container queries, projet",
    why:"Mobile = 60% du trafic. Si pas responsive, tu perds la moitie de tes users.",
    tags:["responsive","mobile-first","media-queries","container-queries","project"],
    sections:[
      {h:"Media queries (mobile-first)",
        blocks:[
          {code:"/* Mobile-first : par defaut on style mobile, on REVELE des features sur desktop */\n.layout {\n  display: block;  /* mobile : empile */\n}\n\n@media (min-width: 768px) {\n  .layout {\n    display: grid;\n    grid-template-columns: 250px 1fr;\n  }\n}\n\n@media (min-width: 1024px) {\n  .layout {\n    grid-template-columns: 280px 1fr 200px;\n  }\n}\n\n/* Plage : entre 768 et 1024 */\n@media (min-width: 768px) and (max-width: 1023px) {\n  ...\n}\n\n/* OR : screen OR print */\n@media screen, print {\n  ...\n}"},
          {tip:"Mobile-first = <code>min-width</code> + ajouter pour les grands ecrans. Plus simple, plus performant."}
        ]
      },
      {h:"Breakpoints standards",
        blocks:[
          {table:[
            ["Nom","min-width","Cible"],
            ["xs","< 640px","mobile portrait"],
            ["sm","640px","mobile large"],
            ["md","768px","tablette"],
            ["lg","1024px","laptop"],
            ["xl","1280px","desktop"],
            ["2xl","1536px","grand ecran"]
          ]},
          {note:"Ce sont les breakpoints Tailwind, devenus de facto standards."}
        ]
      },
      {h:"Au-dela des media queries",
        blocks:[
          {code:"/* prefers-color-scheme : detect dark mode systeme */\n@media (prefers-color-scheme: dark) {\n  body { background: #111; color: #eee; }\n}\n\n/* prefers-reduced-motion : utilisateur veut peu d'animations */\n@media (prefers-reduced-motion: reduce) {\n  ...\n}\n\n/* prefers-contrast */\n@media (prefers-contrast: more) {\n  ...\n}\n\n/* Pointer (souris vs touch) */\n@media (pointer: fine) {\n  /* souris precise : on peut utiliser :hover */\n  .btn:hover { ... }\n}\n@media (pointer: coarse) {\n  /* touch : boutons plus gros */\n  .btn { min-height: 44px; }\n}\n\n/* Orientation */\n@media (orientation: landscape) { ... }"}
        ]
      },
      {h:"Container queries (revolutionnaire)",
        blocks:[
          {p:"Reagir a la taille du PARENT et non du viewport. Permet des composants vraiment reutilisables."},
          {code:".card-wrap {\n  container-type: inline-size;\n  container-name: card;\n}\n\n@container card (min-width: 400px) {\n  .card {\n    display: grid;\n    grid-template-columns: 200px 1fr;\n  }\n}\n\n@container card (max-width: 399px) {\n  .card {\n    display: block;\n  }\n}"},
          {tip:"Genial pour les cards qui s'adaptent selon la colonne ou elles sont, pas selon le viewport."}
        ]
      },
      {h:"Projet final : Landing page",
        blocks:[
          {list:[
            "<strong>Header</strong> sticky avec logo + nav + bouton CTA",
            "<strong>Hero</strong> plein ecran (dvh) avec h1 + sous-titre + 2 CTA",
            "<strong>Features</strong> : grille 3 colonnes (1 sur mobile, 3 sur desktop)",
            "<strong>Pricing</strong> : 3 cartes avec une mise en avant",
            "<strong>Footer</strong> : 4 colonnes de liens + copyright",
            "Mobile-first + breakpoints 768/1024",
            "Dark mode via <code>prefers-color-scheme</code> ou toggle",
            "Animations subtiles (hover, fade-in)",
            "Respecte <code>prefers-reduced-motion</code>",
            "Touch friendly (min 44px sur les boutons)"
          ]}
        ]
      }
    ],
    quiz:[
      {q:"Mobile-first signifie :",opts:["Cibler que mobile","Defaut mobile + AJOUTER pour desktop","Cibler en dernier","Pas de desktop"],correct:"b",
        expl:"Mobile par defaut, on REVELE des features avec <code>min-width</code>."},
      {q:"Respecter reduced motion :",opts:["<code>@media (no-motion)</code>","<code>@media (prefers-reduced-motion: reduce)</code>","<code>@motion off</code>","Rien"],correct:"b",
        expl:"<code>prefers-reduced-motion</code>."},
      {q:"Container queries reagissent a :",opts:["Viewport","Parent","Body","Document"],correct:"b",
        expl:"Taille du container ancetre nomme."},
      {q:"Touch friendly : taille mini bouton :",opts:["24px","32px","44px","60px"],correct:"c",
        expl:"44x44px = WCAG / Apple HIG / Google Material."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"2 colonnes desktop",desc:"Empile mobile, 2 cols a partir de 768px.",
        sol:".layout {\n  display: block;\n}\n@media (min-width: 768px) {\n  .layout {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 24px;\n  }\n}"},
      {num:2,diff:"easy",title:"Hide on mobile",desc:"Sidebar cachee sous 1024px.",
        sol:".sidebar {\n  display: none;\n}\n@media (min-width: 1024px) {\n  .sidebar {\n    display: block;\n  }\n}"},
      {num:3,diff:"easy",title:"Touch button",desc:"Bouton 44px de hauteur min.",
        sol:".btn {\n  min-height: 44px;\n  padding: 0 16px;\n}"},
      {num:4,diff:"medium",title:"Dark mode auto",desc:"Body fond noir si dark mode systeme.",
        sol:"@media (prefers-color-scheme: dark) {\n  body {\n    background: #0f172a;\n    color: #e5e7eb;\n  }\n}"},
      {num:5,diff:"medium",title:"Hover seulement souris",desc:"Hover effects seulement si pointeur fin.",
        sol:"@media (pointer: fine) {\n  .btn:hover {\n    background: #818cf8;\n  }\n}"},
      {num:6,diff:"medium",title:"Reduced motion",desc:"Desactive animations si utilisateur prefere.",
        sol:"@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}"},
      {num:7,diff:"hard",title:"Container query card",desc:"Card horizontale si container > 400px, sinon verticale.",
        sol:".cards { container-type: inline-size; }\n\n.card {\n  display: block;\n}\n@container (min-width: 400px) {\n  .card {\n    display: grid;\n    grid-template-columns: 150px 1fr;\n    gap: 12px;\n  }\n}"},
      {num:8,diff:"hard",title:"Hero responsive complet",desc:"Hero plein ecran mobile, 60vh desktop, contenu centre.",
        sol:".hero {\n  min-height: 100dvh;\n  display: grid;\n  place-items: center;\n  padding: 24px;\n  text-align: center;\n}\n@media (min-width: 1024px) {\n  .hero {\n    min-height: 60vh;\n    text-align: left;\n  }\n}"},
      {num:9,diff:"hard",title:"Print styles",desc:"En impression : retirer nav + footer, fond blanc.",
        sol:"@media print {\n  nav, footer { display: none; }\n  body { background: white; color: black; }\n  a { color: black; text-decoration: underline; }\n  a[href]::after {\n    content: \" (\" attr(href) \")\";\n    font-size: 0.85em;\n  }\n}"}
    ]
  }
];

const GIO = [
  {id:"w3-intro",code:"B1",level:"basic",title:"CSS Intro",sub:"Qu'est-ce que CSS",tags:["intro","basics"],
    sections:[{h:"CSS c'est quoi ?",blocks:[
      {p:"CSS (Cascading Style Sheets) decrit l'APPARENCE des elements HTML : couleurs, polices, espacement, mise en page."},
      {p:"La 'cascade' = quand plusieurs regles s'appliquent, les plus specifiques ou plus tardives gagnent."},
      {code:"/* Selecteur { propriete: valeur; } */\nh1 {\n  color: navy;\n  font-size: 32px;\n}"}
    ]}],
    quiz:[{q:"CSS sert a :",opts:["Structurer","Styler","Stocker","Programmer"],correct:"b",
      expl:"Style. HTML = structure. JS = comportement."}]
  },
  {id:"w3-syntax",code:"B2",level:"basic",title:"CSS Syntax",sub:"selecteur, declaration, propriete",tags:["syntax","basics"],
    sections:[{h:"Anatomie",blocks:[
      {code:"h1 { color: red; font-size: 24px; }\n|     |       |     |\n|     |       |     +-- valeur\n|     |       +-- propriete\n|     +-- declaration\n+-- selecteur"}
    ]}],
    quiz:[{q:"Entre propriete et valeur :",opts:["<code>=</code>","<code>:</code>","<code>;</code>","<code> </code>"],correct:"b",
      expl:"<code>property: value;</code>"}]
  },
  {id:"w3-inserting",code:"B3",level:"basic",title:"CSS How to Insert",sub:"Inline, internal, external",tags:["basics"],
    sections:[{h:"3 facons",blocks:[
      {code:"<!-- Inline (a eviter) -->\n<p style=\"color: red\">...</p>\n\n<!-- Internal -->\n<head>\n  <style>p { color: red; }</style>\n</head>\n\n<!-- External (recommande) -->\n<head>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>"}
    ]}],
    quiz:[{q:"Meilleure facon en prod :",opts:["Inline","Internal","External","Mix"],correct:"c",
      expl:"External = cache, reutilisable."}]
  },
  {id:"w3-colors",code:"B4",level:"basic",title:"CSS Colors",sub:"keywords, hex, rgb, hsl, oklch",tags:["colors","basics"],
    sections:[{h:"Formats",blocks:[
      {code:"color: red;                /* keyword */\ncolor: #ff0000;            /* hex */\ncolor: #f00;               /* hex court */\ncolor: rgb(255 0 0);       /* rgb moderne */\ncolor: rgb(255 0 0 / 50%); /* avec alpha */\ncolor: hsl(0 100% 50%);    /* hue sat light */\ncolor: oklch(63% 0.25 29); /* perceptuel */"}
    ]}],
    quiz:[{q:"<code>#f00</code> =",opts:["<code>#f0000</code>","<code>#ff0000</code>","<code>#f00f00</code>","Erreur"],correct:"b",
      expl:"Hex court = chaque chiffre double."}]
  },
  {id:"w3-backgrounds",code:"B5",level:"basic",title:"CSS Backgrounds",sub:"color, image, gradient",tags:["background","basics"],
    sections:[{h:"Properties",blocks:[
      {code:"div {\n  background-color: #f3f4f6;\n  background-image: url('bg.jpg');\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n\n  /* Shorthand */\n  background: #f3f4f6 url('bg.jpg') center/cover no-repeat;\n\n  /* Gradient */\n  background: linear-gradient(135deg, #6366f1, #818cf8);\n  background: radial-gradient(circle, white, black);\n}"}
    ]}],
    quiz:[{q:"Image qui couvre tout sans deformer :",opts:["<code>cover</code>","<code>contain</code>","<code>100%</code>","<code>fit</code>"],correct:"a",
      expl:"<code>cover</code> remplit, peut cropper."}]
  },
  {id:"w3-borders",code:"B6",level:"basic",title:"CSS Borders & Radius",sub:"border, border-radius",tags:["border","basics"],
    sections:[{h:"Border",blocks:[
      {code:"border: 2px solid #6366f1;\nborder-top: 1px dashed red;\nborder-radius: 8px;\nborder-radius: 50%;     /* cercle */\nborder-radius: 12px 4px 12px 4px;  /* tl tr br bl */\nborder-radius: 50% / 30%;          /* ovale */"}
    ]}],
    quiz:[{q:"Cercle parfait :",opts:["100%","50%","circle","Pas possible"],correct:"b",
      expl:"50% sur un carre."}]
  },
  {id:"w3-flexbox",code:"I1",level:"intermediate",title:"CSS Flexbox",sub:"Layout 1D",tags:["flexbox","intermediate"],
    sections:[{h:"Bases",blocks:[
      {code:".container {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n  align-items: center;\n}"},
      {note:"<code>gap</code> remplace les marges entre items."}
    ]}],
    quiz:[{q:"Centrer h+v :",opts:["justify-content seul","align-items seul","Les 2","margin: auto"],correct:"c",
      expl:"justify-content + align-items."}]
  },
  {id:"w3-grid",code:"I2",level:"intermediate",title:"CSS Grid",sub:"Layout 2D",tags:["grid","intermediate"],
    sections:[{h:"Bases",blocks:[
      {code:".grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}"}
    ]}],
    quiz:[{q:"<code>1fr</code> =",opts:["1px","1 fraction","1 rem","1 em"],correct:"b",
      expl:"Fraction de l'espace restant."}]
  },
  {id:"w3-position",code:"I3",level:"intermediate",title:"CSS Position",sub:"static, relative, absolute, fixed, sticky",tags:["position","intermediate"],
    sections:[{h:"5 valeurs",blocks:[
      {table:[
        ["Valeur","Comportement"],
        ["<code>static</code>","Defaut, dans le flux"],
        ["<code>relative</code>","Dans le flux, top/left bougent, devient reference"],
        ["<code>absolute</code>","Hors flux, ancre au parent relative"],
        ["<code>fixed</code>","Hors flux, ancre au viewport"],
        ["<code>sticky</code>","Hybride : relative jusqu'a un seuil puis fixed"]
      ]}
    ]}],
    quiz:[{q:"Header sticky :",opts:["fixed","sticky","absolute","relative"],correct:"b",
      expl:"<code>position: sticky; top: 0</code>."}]
  },
  {id:"w3-shadow",code:"I4",level:"intermediate",title:"CSS Shadows",sub:"box-shadow, text-shadow",tags:["shadow","intermediate"],
    sections:[{h:"Box shadow",blocks:[
      {code:"/* x y blur spread color */\nbox-shadow: 0 4px 6px rgba(0,0,0,0.1);\nbox-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);\n\n/* Inset */\nbox-shadow: inset 0 2px 4px rgba(0,0,0,0.1);\n\n/* Multiples */\nbox-shadow:\n  0 1px 2px rgba(0,0,0,0.06),\n  0 10px 30px -8px rgba(0,0,0,0.15);"}
    ]}],
    quiz:[{q:"4 valeurs ordre :",opts:["x y color radius","x y blur color","top right bottom left","Toujours 5"],correct:"b",
      expl:"x-offset, y-offset, blur, [spread], color."}]
  },
  {id:"w3-transitions",code:"I5",level:"intermediate",title:"CSS Transitions",sub:"transition shorthand",tags:["transitions","intermediate"],
    sections:[{h:"Anatomie",blocks:[
      {code:"/* property duration timing delay */\ntransition: opacity .3s ease-out;\ntransition: transform .2s cubic-bezier(.4,0,.2,1) .1s;\ntransition: all .2s, transform .3s ease;"}
    ]}],
    quiz:[{q:"Quoi animer pour la perf :",opts:["width/height","transform/opacity","background/color","Tout"],correct:"b",
      expl:"GPU-accelere."}]
  },
  {id:"w3-animations",code:"A1",level:"advanced",title:"CSS Animations",sub:"@keyframes, animation",tags:["animations","advanced"],
    sections:[{h:"Animation complete",blocks:[
      {code:"@keyframes fadeIn {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n.card {\n  animation: fadeIn .4s ease-out forwards;\n}"}
    ]}],
    quiz:[{q:"<code>forwards</code> :",opts:["A l'envers","Boucle","Garde l'etat final","Accelere"],correct:"c",
      expl:"<code>fill-mode: forwards</code>."}]
  },
  {id:"w3-variables",code:"A2",level:"advanced",title:"CSS Variables",sub:"Custom properties",tags:["variables","advanced"],
    sections:[{h:"Declare et utilise",blocks:[
      {code:":root {\n  --primary: #6366f1;\n  --space: 16px;\n}\n.btn {\n  background: var(--primary);\n  padding: var(--space);\n}\n\n/* Default si var pas definie */\ncolor: var(--text, #1f2937);\n\n/* Override local */\n.dark-section { --primary: #818cf8; }"}
    ]}],
    quiz:[{q:"Pour utiliser une variable :",opts:["<code>$primary</code>","<code>@primary</code>","<code>var(--primary)</code>","<code>$(primary)</code>"],correct:"c",
      expl:"<code>var(--name)</code>."}]
  },
  {id:"w3-responsive",code:"A3",level:"advanced",title:"CSS Responsive Design",sub:"Mobile-first, breakpoints",tags:["responsive","advanced"],
    sections:[{h:"Mobile-first",blocks:[
      {code:".layout { display: block; }\n@media (min-width: 768px) {\n  .layout { display: grid; grid-template-columns: 1fr 2fr; }\n}\n@media (min-width: 1024px) {\n  .layout { grid-template-columns: 200px 1fr 200px; }\n}"}
    ]}],
    quiz:[{q:"Cibler tablettes et + :",opts:["max-width","min-width","tablet","responsive"],correct:"b",
      expl:"<code>min-width: 768px</code> = a partir de cette taille."}]
  },
  {id:"w3-pseudo",code:"A4",level:"advanced",title:"CSS Pseudo-classes",sub:":hover, :focus, :nth-child",tags:["pseudo","advanced"],
    sections:[{h:"Etats",blocks:[
      {code:"a:hover { color: red; }\na:focus-visible { outline: 2px solid blue; }\nli:nth-child(2n) { background: #f3f4f6; }\nli:not(.actif) { opacity: 0.5; }\n:is(h1, h2) { font-weight: bold; }"}
    ]}],
    quiz:[{q:"Focus seulement clavier :",opts:[":focus",":focus-visible",":tab",":keyboard"],correct:"b",
      expl:"<code>:focus-visible</code>."}]
  },
  {id:"w3-pseudo-elements",code:"A5",level:"advanced",title:"CSS Pseudo-elements",sub:"::before, ::after",tags:["pseudo","advanced"],
    sections:[{h:"Inserer du contenu",blocks:[
      {code:".btn::after {\n  content: \"→\";\n  margin-left: 6px;\n}\n.required::before {\n  content: \"*\";\n  color: red;\n}\n::selection { background: yellow; }\np::first-letter { font-size: 2em; }"}
    ]}],
    quiz:[{q:"Diff : et :: :",opts:["Aucune",":  = pseudo-classe, :: = pseudo-element","Inverse","Strictement equivalent"],correct:"b",
      expl:": etat. :: fragment cree."}]
  },
  {id:"w3-lists",code:"B7",level:"basic",title:"CSS Lists",sub:"list-style, markers, padding",tags:["lists","basics"],
    sections:[{h:"Styler les listes",blocks:[
      {code:"ul {\n  list-style-type: disc;        /* disc | circle | square | none */\n  list-style-position: outside;  /* inside | outside */\n  list-style-image: url('star.svg');\n  /* Shorthand */\n  list-style: square inside;\n}\n\nol {\n  list-style-type: decimal;       /* lower-alpha | upper-roman | lower-greek... */\n}\n\n/* Custom marker (CSS3) */\nli::marker {\n  color: red;\n  font-weight: bold;\n}\n\n/* Enlever les puces */\n.no-bullets {\n  list-style: none;\n  padding-left: 0;\n}"}
    ]}],
    quiz:[{q:"Pour enlever les puces :",opts:["<code>display: none</code>","<code>list-style: none</code>","<code>bullet: off</code>","<code>marker: none</code>"],correct:"b",
      expl:"<code>list-style: none</code> + souvent <code>padding-left: 0</code>."}]
  },
  {id:"w3-tables",code:"B8",level:"basic",title:"CSS Tables",sub:"border-collapse, padding, striping",tags:["tables","basics"],
    sections:[{h:"Styler les tableaux",blocks:[
      {code:"table {\n  width: 100%;\n  border-collapse: collapse;     /* fusionne les bordures */\n  /* OU : separate avec border-spacing */\n}\n\nth, td {\n  padding: 12px;\n  text-align: left;\n  border-bottom: 1px solid #e5e7eb;\n}\n\nth {\n  background: #f3f4f6;\n  font-weight: 700;\n}\n\n/* Lignes alternees */\ntbody tr:nth-child(even) {\n  background: #f9fafb;\n}\n\n/* Hover ligne */\ntbody tr:hover {\n  background: #fef3c7;\n}\n\n/* Responsive : scroll horizontal */\n.table-wrap {\n  overflow-x: auto;\n}"}
    ]}],
    quiz:[{q:"Pour fusionner les bordures :",opts:["<code>border-merge</code>","<code>border-collapse: collapse</code>","<code>border: shared</code>","Automatique"],correct:"b",
      expl:"<code>border-collapse: collapse</code>."}]
  },
  {id:"w3-links",code:"B9",level:"basic",title:"CSS Links",sub:":link, :visited, :hover, :active",tags:["links","basics"],
    sections:[{h:"4 etats d'un lien (LVHA)",blocks:[
      {code:"/* Ordre IMPORTANT : LoVe HAte */\na:link    { color: blue; }       /* non visite */\na:visited { color: purple; }      /* visite */\na:hover   { color: red; }         /* survol */\na:active  { color: orange; }      /* clic en cours */\n\n/* Underline custom */\na {\n  text-decoration: none;\n  border-bottom: 1px solid currentColor;\n  transition: opacity .15s;\n}\na:hover { opacity: 0.7; }"},
      {tip:"Memo : <strong>LoVe HAte</strong> = Link, Visited, Hover, Active."}
    ]}],
    quiz:[{q:"Ordre correct des pseudo-classes liens :",opts:["a, hover, link, visit","link, visited, hover, active","hover, active, link, visit","Aleatoire"],correct:"b",
      expl:"LVHA : Link, Visited, Hover, Active. La specificite suit cet ordre."}]
  },
  {id:"w3-forms",code:"B10",level:"basic",title:"CSS Forms",sub:"input, button, focus, invalid",tags:["forms","basics"],
    sections:[{h:"Styler les forms",blocks:[
      {code:"input, textarea, select {\n  width: 100%;\n  padding: 10px 14px;\n  font: inherit;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  background: white;\n  transition: border-color .15s;\n}\n\ninput:focus, textarea:focus, select:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99,102,241,.2);\n}\n\n/* Etats de validation */\ninput:invalid:not(:placeholder-shown) {\n  border-color: #ef4444;\n}\n\ninput:valid {\n  border-color: #22c55e;\n}\n\n/* Placeholder */\ninput::placeholder {\n  color: #94a3b8;\n}\n\n/* Bouton */\nbutton {\n  padding: 10px 20px;\n  background: #6366f1;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\nbutton:hover { background: #818cf8; }\nbutton:disabled { opacity: 0.5; cursor: not-allowed; }"}
    ]}],
    quiz:[{q:"<code>:placeholder-shown</code> matche :",opts:["Quand placeholder visible (input vide)","Quand input rempli","Le placeholder lui-meme","Jamais"],correct:"a",
      expl:"<code>:placeholder-shown</code> = input vide donc placeholder visible."}]
  },
  {id:"w3-counters",code:"I6",level:"intermediate",title:"CSS Counters",sub:"counter-reset, counter-increment",tags:["counters","intermediate"],
    sections:[{h:"Compteurs CSS",blocks:[
      {code:"body {\n  counter-reset: section;\n}\n\nh2 {\n  counter-increment: section;\n}\n\nh2::before {\n  content: \"Section \" counter(section) \" — \";\n  color: #6366f1;\n}\n\n/* Imbriques */\nol {\n  counter-reset: item;\n  list-style: none;\n}\nli::before {\n  counter-increment: item;\n  content: counters(item, \".\") \" \";\n}"}
    ]}],
    quiz:[{q:"<code>counter-reset</code> :",opts:["Demarre un compteur","Reset le DOM","Annule un counter","Met a 1"],correct:"a",
      expl:"Initialise (ou reset si existait) un compteur a 0."}]
  },
  {id:"w3-tooltips",code:"I7",level:"intermediate",title:"CSS Tooltips",sub:"Tooltip pure CSS",tags:["tooltips","intermediate"],
    sections:[{h:"Tooltip simple",blocks:[
      {code:".tip {\n  position: relative;\n  cursor: help;\n}\n\n.tip::after {\n  content: attr(data-tip);\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 6px 12px;\n  background: #1f2937;\n  color: white;\n  border-radius: 6px;\n  font-size: 12px;\n  white-space: nowrap;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity .15s;\n}\n\n.tip:hover::after {\n  opacity: 1;\n}\n\n/* Usage : <span class=\"tip\" data-tip=\"Info\">?</span> */"}
    ]}],
    quiz:[{q:"<code>attr(data-tip)</code> :",opts:["JS","Lit l'attribut HTML","Erreur","Inutile"],correct:"b",
      expl:"<code>content: attr(data-tip)</code> lit l'attribut HTML."}]
  },
  {id:"w3-buttons",code:"I8",level:"intermediate",title:"CSS Buttons",sub:"variants, sizes, states",tags:["buttons","intermediate"],
    sections:[{h:"Systeme de boutons",blocks:[
      {code:".btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  font: 500 14px/1 inherit;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all .15s;\n}\n\n/* Variants */\n.btn-primary {\n  background: #6366f1;\n  color: white;\n}\n.btn-primary:hover { background: #818cf8; }\n\n.btn-ghost {\n  background: transparent;\n  color: #6366f1;\n  border: 1px solid currentColor;\n}\n\n.btn-danger {\n  background: #ef4444;\n  color: white;\n}\n\n/* Tailles */\n.btn-sm { padding: 6px 12px; font-size: 12px; }\n.btn-lg { padding: 14px 24px; font-size: 16px; }\n\n/* Etats */\n.btn:disabled { opacity: 0.5; cursor: not-allowed; }\n.btn:focus-visible { box-shadow: 0 0 0 3px rgba(99,102,241,.3); }"}
    ]}],
    quiz:[{q:"Pour bouton flex avec icone + texte :",opts:["<code>display: flex</code>","<code>display: inline-flex</code>","<code>display: block</code>","<code>display: grid</code>"],correct:"b",
      expl:"<code>inline-flex</code> = flex mais sur la meme ligne que le texte."}]
  },
  {id:"w3-navbar",code:"I9",level:"intermediate",title:"CSS Navigation Bar",sub:"Nav horizontale / verticale / sticky",tags:["navbar","intermediate"],
    sections:[{h:"Nav classique",blocks:[
      {code:"nav ul {\n  display: flex;\n  gap: 8px;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\nnav a {\n  display: block;\n  padding: 10px 16px;\n  color: #4b5563;\n  text-decoration: none;\n  border-radius: 6px;\n  transition: background .15s;\n}\n\nnav a:hover {\n  background: #f3f4f6;\n}\n\nnav a.active {\n  background: #6366f1;\n  color: white;\n}\n\n/* Sticky en haut */\nheader {\n  position: sticky;\n  top: 0;\n  background: white;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n  z-index: 50;\n}"}
    ]}],
    quiz:[{q:"Pour nav qui colle en haut au scroll :",opts:["<code>fixed</code>","<code>sticky</code>","<code>absolute</code>","<code>relative</code>"],correct:"b",
      expl:"<code>position: sticky; top: 0</code>."}]
  },
  {id:"w3-dropdowns",code:"I10",level:"intermediate",title:"CSS Dropdowns",sub:"Menu deroulant pur CSS",tags:["dropdown","intermediate"],
    sections:[{h:"Dropdown sur hover",blocks:[
      {code:".dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  min-width: 180px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-4px);\n  transition: all .15s;\n}\n\n.dropdown:hover .dropdown-menu,\n.dropdown:focus-within .dropdown-menu {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}"},
      {tip:"<code>:focus-within</code> rend le dropdown accessible au clavier."}
    ]}],
    quiz:[{q:"Pour dropdown accessible clavier :",opts:["<code>:hover</code>","<code>:focus-within</code>","<code>:active</code>","JS obligatoire"],correct:"b",
      expl:"<code>:focus-within</code> = matche si un descendant a le focus."}]
  },
  {id:"w3-filters",code:"A6",level:"advanced",title:"CSS Filters & Effects",sub:"filter, backdrop-filter, blend-mode",tags:["filters","effects","advanced"],
    sections:[{h:"Filtres",blocks:[
      {code:"/* Filtres appliques au contenu */\n.blur { filter: blur(4px); }\n.dim { filter: brightness(0.5); }\n.gray { filter: grayscale(100%); }\n.hue { filter: hue-rotate(90deg); }\n.invert { filter: invert(1); }\n.combo { filter: brightness(1.2) contrast(1.1) saturate(1.5); }\n\n/* Filtre sur ce qui est DERRIERE (glassmorphism) */\n.glass {\n  background: rgba(255,255,255,0.7);\n  backdrop-filter: blur(20px) saturate(180%);\n  -webkit-backdrop-filter: blur(20px) saturate(180%);\n}\n\n/* Blend modes */\n.overlay {\n  mix-blend-mode: multiply;\n}"}
    ]}],
    quiz:[{q:"<code>backdrop-filter</code> :",opts:["Filtre l'element","Filtre l'arriere-plan","Filtre tout","Filtre les enfants"],correct:"b",
      expl:"Effet glassmorphism : flou de ce qui est derriere."}]
  },
  {id:"w3-math",code:"A7",level:"advanced",title:"CSS Math Functions",sub:"calc, min, max, clamp",tags:["math","advanced"],
    sections:[{h:"Math en CSS",blocks:[
      {code:"/* calc : melange unites */\nwidth: calc(100% - 200px);\nwidth: calc(100vw - 2rem);\nfont-size: calc(16px + 0.5vw);\n\n/* min/max : prend le plus petit/grand */\nwidth: min(800px, 100%);     /* max 800 mais s'adapte */\nfont-size: max(1rem, 14px);   /* min 14px sinon 1rem */\n\n/* clamp : fluide entre 2 bornes */\nfont-size: clamp(1rem, 2.5vw, 2rem);\nwidth: clamp(300px, 50%, 900px);\n\n/* Combiner */\npadding: max(16px, calc(2vw));"}
    ]}],
    quiz:[{q:"<code>clamp(min, ideal, max)</code> :",opts:["Erreur","Fluide entre min et max","Toujours ideal","Toujours min"],correct:"b",
      expl:"S'adapte fluidly, borne entre min et max."}]
  },
  {id:"w3-specificity",code:"A8",level:"advanced",title:"CSS Specificity & !important",sub:"Resolution des conflits",tags:["specificity","cascade","advanced"],
    sections:[{h:"Calcul de specificite",blocks:[
      {table:[
        ["Selecteur","Poids","Total"],
        ["<code>p</code>","0,0,0,1","1"],
        ["<code>.box</code>","0,0,1,0","10"],
        ["<code>p.box</code>","0,0,1,1","11"],
        ["<code>div p.box</code>","0,0,1,2","12"],
        ["<code>#main</code>","0,1,0,0","100"],
        ["<code>#main .box</code>","0,1,1,0","110"],
        ["<code>style=\"\"</code>","1,0,0,0","1000"],
        ["<code>!important</code>","🚨","ecrase tout"]
      ]},
      {bad:"<code>!important</code> est l'arme nucleaire. A reserver aux : 1) overrides defensifs pour 3rd party CSS, 2) utility classes (tailwind-style). Jamais en cas par cas."}
    ]}],
    quiz:[{q:"<code>!important</code> est :",opts:["Bonne pratique","Ultime recours","Obligatoire","Inutile"],correct:"b",
      expl:"Casse la cascade naturelle. A utiliser tres rarement."}]
  },
  {id:"w3-units",code:"A9",level:"advanced",title:"CSS Units (complet)",sub:"absolutes, relatives, viewport, fr, ch",tags:["units","advanced"],
    sections:[{h:"Toutes les unites",blocks:[
      {table:[
        ["Categorie","Unite","Sens"],
        ["Absolue","<code>px</code>","Pixel"],
        ["Absolue","<code>cm/mm/in/pt</code>","Print"],
        ["Relative font","<code>em</code>","Relatif au parent font-size"],
        ["Relative font","<code>rem</code>","Relatif a html font-size"],
        ["Relative font","<code>ex</code>","Hauteur 'x'"],
        ["Relative font","<code>ch</code>","Largeur '0'"],
        ["Viewport","<code>vw / vh</code>","% du viewport"],
        ["Viewport","<code>vmin / vmax</code>","Min/max de vh/vw"],
        ["Viewport","<code>dvh / svh / lvh</code>","Dynamic/small/large (mobile-safe)"],
        ["Container","<code>cqw / cqh</code>","% du container"],
        ["Grid","<code>fr</code>","Fraction de l'espace"],
        ["Pourcentage","<code>%</code>","Relatif au parent"]
      ]},
      {tip:"En 2026, prefere <code>rem</code> pour les tailles, <code>dvh</code> pour les heros mobile, <code>fr</code> pour grid, <code>%</code> pour fluides."}
    ]}],
    quiz:[{q:"Pour height full mobile sans bug de barre nav :",opts:["<code>100vh</code>","<code>100dvh</code>","<code>100%</code>","<code>100vmax</code>"],correct:"b",
      expl:"<code>dvh</code> = dynamic, prend en compte la barre de nav mobile."}]
  }
];

const ALL_LESSONS = [...DAYS, ...GIO];
const TOTAL = ALL_LESSONS.length;
const TOTAL_EXERCISES = DAYS.reduce((sum, d) => sum + (d.exercises ? d.exercises.length : 0), 0);

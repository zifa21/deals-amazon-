/* ============================================================
   ASSISTANT DE CHOIX — zifabox.systeme.io/bons-plans
   ------------------------------------------------------------
   NE PAS EDITER CE FICHIER A LA MAIN.
   Source : site/assistant-choix.html
   Regenerer : python site/build_assistant.py  puis git push
   La landing ne contient qu'une balise <script src> : toute mise
   a jour se fait ici, sans retoucher systeme.io.

   Entonnoir de qualification DETERMINISTE : pas de LLM, pas de
   cle API, pas de backend. Il filtre le catalogue site_index.json
   deja publie — il ne peut rien inventer, et il le dit quand il
   n'a rien de solide a proposer.
   RGPD : aucun stockage, aucun cookie, aucune donnee personnelle.
   ============================================================ */
(function () {
  "use strict";
  if (document.getElementById("zba-assist")) return;

  var CSS  = "#zba-assist{\n  --zba-accent:#ff6b00; --zba-accent2:#ff9a00;\n  --zba-bg:#ffffff; --zba-card:#f6f6f9; --zba-line:#e3e3ec;\n  --zba-fg:#16161d; --zba-muted:#63637a; --zba-green:#0a8f4d;\n  max-width:840px; margin:32px auto; padding:22px;\n  border:1px solid var(--zba-line); border-radius:18px; background:var(--zba-bg);\n  font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif;\n  color:var(--zba-fg); line-height:1.5; box-sizing:border-box; text-align:left;\n}\n#zba-assist *{box-sizing:border-box}\n#zba-assist .zba-head{text-align:center}\n#zba-assist .zba-title{font-size:1.45rem; font-weight:800; letter-spacing:-.01em; margin:0 0 6px}\n#zba-assist .zba-sub{margin:0 0 18px; color:var(--zba-muted); font-size:.95rem}\n#zba-assist .zba-sub em{color:var(--zba-fg); font-style:normal; font-weight:600}\n\n#zba-assist .zba-msg{margin:0 0 14px; animation:zbIn .18s ease-out}\n@keyframes zbIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}\n#zba-assist .zba-q{font-weight:700; margin:0 0 10px; font-size:1.02rem}\n#zba-assist .zba-a{\n  display:inline-block; margin:0 8px 8px 0; padding:9px 15px;\n  border:1px solid var(--zba-line); border-radius:999px; background:var(--zba-card);\n  font:inherit; font-size:.93rem; cursor:pointer; transition:.14s;\n}\n#zba-assist .zba-a:hover{border-color:var(--zba-accent); background:#fff5ec}\n#zba-assist .zba-a:focus-visible{outline:2px solid var(--zba-accent); outline-offset:2px}\n#zba-assist .zba-echo{\n  display:inline-block; padding:6px 13px; border-radius:999px;\n  background:var(--zba-accent); color:#fff; font-size:.86rem; font-weight:600;\n}\n#zba-assist .zba-echo-row{text-align:right; margin:0 0 14px}\n\n#zba-assist .zba-card{\n  display:flex; gap:14px; padding:14px; margin:0 0 12px;\n  border:1px solid var(--zba-line); border-radius:14px; background:var(--zba-card);\n}\n#zba-assist .zba-card img{\n  width:92px; height:92px; object-fit:contain; flex:0 0 92px;\n  background:#fff; border-radius:10px; padding:6px;\n}\n#zba-assist .zba-card-body{min-width:0; flex:1}\n#zba-assist .zba-rank{\n  display:inline-block; font-size:.74rem; font-weight:800; letter-spacing:.04em;\n  text-transform:uppercase; color:var(--zba-accent); margin:0 0 3px;\n}\n#zba-assist .zba-name{font-weight:700; font-size:.97rem; margin:0 0 6px}\n#zba-assist .zba-price{font-size:1.18rem; font-weight:800; color:var(--zba-green)}\n#zba-assist .zba-was{font-size:.85rem; color:var(--zba-muted); text-decoration:line-through; margin-left:7px}\n#zba-assist .zba-off{\n  display:inline-block; margin-left:7px; padding:2px 8px; border-radius:7px;\n  background:var(--zba-accent); color:#fff; font-size:.78rem; font-weight:700;\n}\n#zba-assist .zba-meta{font-size:.85rem; color:var(--zba-muted); margin:5px 0 0}\n#zba-assist .zba-why{font-size:.88rem; margin:9px 0 0; padding-left:16px; position:relative}\n#zba-assist .zba-why::before{content:\"✓\"; position:absolute; left:0; color:var(--zba-green); font-weight:700}\n#zba-assist .zba-not{font-size:.88rem; margin:5px 0 0; padding-left:16px; position:relative; color:var(--zba-muted)}\n#zba-assist .zba-not::before{content:\"!\"; position:absolute; left:2px; color:var(--zba-accent); font-weight:800}\n#zba-assist .zba-cta{\n  display:inline-block; margin:11px 0 0; padding:9px 17px; border-radius:9px;\n  background:var(--zba-accent); color:#fff !important; text-decoration:none !important;\n  font-weight:700; font-size:.9rem;\n}\n#zba-assist .zba-cta:hover{background:var(--zba-accent2)}\n\n#zba-assist .zba-foot{display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-top:6px}\n#zba-assist .zba-restart{\n  padding:8px 15px; border:1px solid var(--zba-line); border-radius:999px;\n  background:#fff; font:inherit; font-size:.88rem; cursor:pointer;\n}\n#zba-assist .zba-restart:hover{border-color:var(--zba-accent)}\n#zba-assist .zba-note{font-size:.8rem; color:var(--zba-muted)}\n#zba-assist .zba-empty{\n  padding:13px 15px; border-radius:11px; background:#fff5ec;\n  border:1px solid #ffd9b8; font-size:.92rem;\n}\n\n@media (max-width:560px){\n  #zba-assist{padding:17px; margin:22px 10px; border-radius:14px}\n  #zba-assist .zba-title{font-size:1.22rem}\n  #zba-assist .zba-card{flex-direction:column}\n  #zba-assist .zba-card img{width:100%; height:150px; flex:none}\n  #zba-assist .zba-cta{display:block; text-align:center}\n}\n@media (prefers-color-scheme:dark){\n  #zba-assist{--zba-bg:#0f0f16; --zba-card:#191922; --zba-line:#2c2c3c;\n             --zba-fg:#f0f0f5; --zba-muted:#9494ad; --zba-green:#00e676}\n  #zba-assist .zba-a:hover{background:#241a12}\n  #zba-assist .zba-restart{background:#191922; color:var(--zba-fg)}\n  #zba-assist .zba-empty{background:#241a12; border-color:#4a3520}\n}";
  var HTML = "<div class=\"zba-head\">\n    <div class=\"zba-title\">Tu cherches quoi, exactement&nbsp;?</div>\n    <p class=\"zba-sub\">Réponds à 2 ou 3 questions, je te sors 3 produits du catalogue — et je te dis aussi\n      quand ce n'est <em>pas</em> pour toi.</p>\n  </div>\n\n  <div class=\"zba-thread\" id=\"zba-thread\" role=\"log\" aria-live=\"polite\"></div>\n\n  <div class=\"zba-foot\">\n    <button type=\"button\" class=\"zba-restart\" id=\"zba-restart\" hidden>↺ Recommencer</button>\n    <span class=\"zba-note\" id=\"zba-note\"></span>\n  </div>";

  function install() {
    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    var root = document.createElement("div");
    root.id = "zba-assist";
    root.setAttribute("data-src", "https://zifa21.github.io/deals-amazon-/data/site_index.json");
    root.setAttribute("data-tag", "fz2107site-21");
    root.innerHTML = HTML;

    // Placement : juste au-dessus de la barre de tri / grille produits.
    // Aucun element existant de la landing n'est modifie.
    var anchor = document.querySelector("#zb .zb-bar")
              || document.querySelector("#zb .zb-grid");
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(root, anchor);
    else (document.querySelector("#zb") || document.body).appendChild(root);

    boot();
  }

  function boot() {
    (function () {
      "use strict";
      var root = document.getElementById("zba-assist");
      if (!root) return;
      var SRC = root.getAttribute("data-src");
      var TAG = root.getAttribute("data-tag") || "fz2107-21";
      var thread = document.getElementById("zba-thread");
      var noteEl = document.getElementById("zba-note");
      var restartBtn = document.getElementById("zba-restart");

      // ── Besoins ──────────────────────────────────────────────
      // Chaque option porte une selection { cat, kw, excl } :
      //   cat  : categories Amazon acceptees (le catalogue en compte 96) —
      //          c'est la CONDITION, elle empeche le hors-sujet
      //   kw   : affine dans le titre, en mots entiers (facultatif)
      //   excl : ecarte les faux amis
      var BESOINS = [
        { id:"pc", label:"Informatique et bureau",
          sel:{ cat:["memoire","accessoires","electronique","imprimantes","composants"] },
          qs:[{ q:"Il te manque quoi ?", opts:[
            { label:"De la place pour mes fichiers",
              sel:{ cat:["memoire"], kw:["ssd","nvme","disque","cle","usb","microsd","microsdxc","sdxc","carte"] } },
            { label:"Du confort (souris, clavier, webcam, hub)",
              sel:{ cat:["accessoires"], kw:["souris","clavier","webcam","hub","dock","station","tapis","support"] } },
            { label:"De quoi imprimer ou scanner",
              sel:{ cat:["imprimantes"] } }
          ]}]},

        { id:"tel", label:"Téléphone et accessoires",
          sel:{ cat:["telephones portables","piles, chargeurs"] },
          qs:[{ q:"Tu cherches quoi ?", opts:[
            { label:"Tenir la journée sans recharger",
              sel:{ cat:["telephones portables","piles, chargeurs"],
                    kw:["batterie","powerbank","power","chargeur","chargeurs","solaire","mah"] } },
            { label:"Protéger l'écran ou la coque",
              sel:{ cat:["telephones portables"],
                    kw:["coque","etui","protection","verre","trempe","protecteur"] } },
            { label:"Un support voiture ou bureau",
              sel:{ cat:["telephones portables"], kw:["support","magnetique","magsafe","trepied"],
                    excl:["coque","etui","verre","protecteur","chargeur","batterie"] } }
          ]}]},

        { id:"son", label:"Son, image et TV",
          sel:{ cat:["casques, ecouteurs","tv, video","audio et video","photo et camescopes","electronique"] },
          qs:[{ q:"C'est pour quoi ?", opts:[
            { label:"Écouter (casque, écouteurs, enceinte)",
              sel:{ cat:["casques, ecouteurs","audio et video","electronique"],
                    kw:["casque","ecouteurs","airpods","enceinte","bluetooth"] } },
            { label:"Regarder (TV, box, projecteur)",
              sel:{ cat:["tv, video","electronique"],
                    kw:["tv","stick","projecteur","videoprojecteur","chromecast","kindle"] } },
            { label:"Filmer, photographier, surveiller",
              sel:{ cat:["photo et camescopes"] } }
          ]}]},

        { id:"animal", label:"Mon chat ou mon chien",
          sel:{ cat:["chats","chiens"] },
          qs:[{ q:"C'est pour qui ?", opts:[
            { label:"Mon chat",  sel:{ cat:["chats"] } },
            { label:"Mon chien", sel:{ cat:["chiens"] } }
          ]}]},

        { id:"maison", label:"Ma maison",
          sel:{ cat:["ameublement","luminaires","ampoules","rangement","aspirateurs","entretien de la maison",
                     "produits et accessoires de nettoyage","chauffage et climatisation","literie",
                     "decoration de la maison"] },
          qs:[{ q:"Tu veux améliorer quoi ?", opts:[
            { label:"L'air : purifier, chauffer, rafraîchir",
              sel:{ cat:["chauffage et climatisation"] } },
            { label:"Le ménage : aspirer, nettoyer",
              sel:{ cat:["aspirateurs","entretien de la maison","produits et accessoires de nettoyage"] } },
            { label:"Le rangement",
              sel:{ cat:["rangement"] } },
            { label:"L'éclairage",
              sel:{ cat:["luminaires","ampoules"] } },
            { label:"Le couchage et le linge",
              sel:{ cat:["literie","ameublement"],
                    kw:["matelas","surmatelas","couette","oreiller","drap","protege","housse","linge"] } },
            { label:"Les meubles et la déco",
              sel:{ cat:["ameublement","decoration de la maison"],
                    excl:["matelas","surmatelas","couette","oreiller","drap","taie","housse","linge","coussin"] } }
          ]}]},

        { id:"cuisine", label:"La cuisine",
          sel:{ cat:["cuisine","arts de la table","petit electromenager","gros electromenager","cafe, the et expresso",
                     "fontaines a eau","barbecue","couteaux","casseroles"] },
          qs:[{ q:"Tu veux quoi ?", opts:[
            { label:"Café, thé, eau",
              sel:{ cat:["cafe, the et expresso","fontaines a eau"] } },
            { label:"Cuire et cuisiner",
              sel:{ cat:["cuisine","petit electromenager","gros electromenager","casseroles","couteaux","arts de la table"] } },
            { label:"Manger dehors, barbecue",
              sel:{ cat:["barbecue"] } }
          ]}]},

        { id:"auto", label:"Ma voiture ou ma moto",
          sel:{ cat:["accessoires auto","pieces detachees auto","entretien auto","huiles et liquides",
                     "motos, accessoires","outils et depannage"] },
          qs:[{ q:"C'est pour quoi ?", opts:[
            { label:"L'entretien courant",
              sel:{ cat:["entretien auto","huiles et liquides","pieces detachees auto"] } },
            { label:"Le dépannage et l'outillage",
              sel:{ cat:["outils et depannage","accessoires auto"],
                    kw:["booster","demarreur","gonfleur","compresseur","cric","chargeur","batterie"] } },
            { label:"Le confort à bord",
              sel:{ cat:["accessoires auto","motos, accessoires"],
                    excl:["booster","demarreur","gonfleur"] } }
          ]}]},

        { id:"beaute", label:"Beauté et soin",
          sel:{ cat:["soins pour la peau","coiffure et soins des cheveux","hygiene dentaire",
                     "rasage et epilation","maquillage","vernis","bain, savons","parfums"] },
          qs:[{ q:"Tu t'occupes de quoi ?", opts:[
            { label:"Ma peau",              sel:{ cat:["soins pour la peau","bain, savons"] } },
            { label:"Mes cheveux",          sel:{ cat:["coiffure et soins des cheveux"] } },
            { label:"Mes dents",            sel:{ cat:["hygiene dentaire"] } },
            { label:"Rasage ou épilation",  sel:{ cat:["rasage et epilation"] } },
            { label:"Maquillage et ongles", sel:{ cat:["maquillage","vernis"] } },
            { label:"Un parfum",            sel:{ cat:["parfums"] } }
          ]}]},

        { id:"forme", label:"Sport et forme",
          sel:{ cat:["fitness et musculation","sports","nutrition et dietetique","vitamines",
                     "sante et premiers soins","activites de plein air","technologie portable"] },
          qs:[{ q:"C'est pour quoi ?", opts:[
            { label:"M'entraîner (matériel)",
              sel:{ cat:["fitness et musculation","sports","activites de plein air"] } },
            { label:"Compléments et nutrition",
              sel:{ cat:["nutrition et dietetique","vitamines"] } },
            { label:"Me suivre (montre, cardio)",
              sel:{ cat:["technologie portable","electronique"],
                    kw:["montre","gps","cardiaque","cardio","forerunner","garmin","connectee"] } },
            { label:"Santé et premiers soins",
              sel:{ cat:["sante et premiers soins","thermometres"] } }
          ]}]},

        { id:"bureau", label:"Écriture, école et loisirs créatifs",
          sel:{ cat:["ecriture","petites fournitures","fournitures d'ecole","loisirs creatifs"] },
          qs:[{ q:"C'est pour quoi ?", opts:[
            { label:"Écrire et annoter",     sel:{ cat:["ecriture"] } },
            { label:"L'école et le bureau",  sel:{ cat:["petites fournitures","fournitures d'ecole"] } },
            { label:"Créer, bricoler, dessiner", sel:{ cat:["loisirs creatifs"] } }
          ]}]},

        { id:"jardin", label:"Bricolage et jardin",
          sel:{ cat:["outillage","quincaillerie","construction","jardinage","materiels d'arrosage",
                     "mobilier de jardin"] },
          qs:[{ q:"Tu fais quoi ?", opts:[
            { label:"Je bricole",       sel:{ cat:["outillage","quincaillerie","construction"] } },
            { label:"Je jardine",       sel:{ cat:["jardinage","materiels d'arrosage"] } },
            { label:"J'aménage dehors", sel:{ cat:["mobilier de jardin"] } }
          ]}]},

        { id:"mode", label:"Vêtements et chaussures",
          sel:{ cat:["homme","femme","chaussures","bagages"] },
          qs:[{ q:"C'est pour qui ?", opts:[
            { label:"Homme", sel:{ cat:["homme"] } },
            { label:"Femme", sel:{ cat:["femme"] } }
          ]}]}
      ];

      // Question budget — posee pour tous les besoins
      var Q_BUDGET = { q:"Tu mets combien, à peu près ?", opts:[
        { label:"Moins de 25 €",  min:0,   max:25 },
        { label:"25 à 70 €",      min:25,  max:70 },
        { label:"Plus de 70 €",   min:70,  max:1e9 },
        { label:"Peu importe",    min:0,   max:1e9 }
      ]};

      // Question arbitrage — determine le tri
      var Q_TRI = { q:"Et tu privilégies quoi ?", opts:[
        { label:"La valeur sûre (bien noté, beaucoup d'avis)", mode:"sur" },
        { label:"La plus grosse remise",                        mode:"remise" },
        { label:"Le prix le plus bas",                          mode:"prix" }
      ]};

      var PRODUITS = [], DATE_RELEVE = "", state = null;

      // ── Utilitaires ──────────────────────────────────────────────────
      function norm(s){
        return String(s||"").toLowerCase()
          .normalize("NFD").replace(/[̀-ͯ]/g,"");
      }
      function esc(s){
        return String(s||"").replace(/[&<>"']/g, function(c){
          return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
        });
      }
      function eur(v){ return Number(v).toFixed(2).replace(".", ",") + " €"; }
      function imgUrl(id){ return "https://m.media-amazon.com/images/I/" + id + "._AC_SL400_.jpg"; }
      function lien(asin){ return "https://www.amazon.fr/dp/" + asin + "?tag=" + encodeURIComponent(TAG); }

      // ── Correspondance ───────────────────────────────────────────────
      // La CATEGORIE Amazon decide (vocabulaire controle, 96 valeurs) ; les
      // mots-cles ne font qu'affiner le titre, et avec des frontieres de mots.
      //
      // L'ancienne version cherchait les mots-cles en sous-chaine sur
      // titre+categorie : "the" matchait "Auth-e-ntique", "Only The Brave" et
      // "Eau de Toilette", "filtre" matchait un purificateur d'air et le filtre
      // lumiere bleue d'un ecran. Une question sur la cuisine sortait un parfum.
      function motPresent(hay, mot){
        var m = norm(mot);
        if (!m) return false;
        // frontiere de mot des deux cotes (tolere les traits d'union et chiffres
        // colles, ex "SSD1To", "m.2")
        var re = new RegExp("(^|[^a-z0-9])" + m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^a-z0-9]|$)");
        return re.test(hay);
      }
      function correspond(p, sel){
        if (!sel) return true;
        var cat = norm(p.c);
        if (sel.cat && sel.cat.length){
          var ok = false;
          for (var i=0;i<sel.cat.length;i++){
            // La categorie doit COMMENCER par le motif. En sous-chaine simple,
            // "accessoires" attrapait "Telephones portables et accessoires" et
            // une question sur le clavier sortait des supports de telephone.
            if (cat.lastIndexOf(norm(sel.cat[i]), 0) === 0){ ok = true; break; }
          }
          if (!ok) return false;
        }
        var titre = norm(p.t);
        if (sel.kw && sel.kw.length){
          var k = false;
          for (var j=0;j<sel.kw.length;j++){ if (motPresent(titre, sel.kw[j])){ k = true; break; } }
          if (!k) return false;
        }
        if (sel.excl && sel.excl.length){
          var hay = titre + " " + cat;
          for (var e=0;e<sel.excl.length;e++){ if (motPresent(hay, sel.excl[e])) return false; }
        }
        return true;
      }

      // Le catalogue contient des variantes tres proches d'un meme produit :
      // on n'en montre jamais deux dans la meme selection.
      function dedupe(list){
        var vus = {}, out = [];
        list.forEach(function(p){
          var k = norm(p.t).split(/\s+/).slice(0,5).join(" ");
          if (!vus[k]) { vus[k] = 1; out.push(p); }
        });
        return out;
      }

      // Score "valeur sure" : la note seule ment quand il y a 8 avis.
      function scoreSur(p){
        var r = Number(p.r)||0, n = Number(p.n)||0;
        return r * Math.log10(Math.max(n,1) + 10);
      }

      // ── Rendu ────────────────────────────────────────────────────────
      function addMsg(html){
        var d = document.createElement("div");
        d.className = "zba-msg"; d.innerHTML = html;
        thread.appendChild(d);
        return d;
      }
      function addEcho(label){
        var d = document.createElement("div");
        d.className = "zba-echo-row";
        d.innerHTML = '<span class="zba-echo">' + esc(label) + "</span>";
        thread.appendChild(d);
      }
      function addQuestion(question, options, onPick){
        var box = addMsg('<p class="zba-q">' + esc(question) + "</p>");
        options.forEach(function(opt){
          var b = document.createElement("button");
          b.type = "button"; b.className = "zba-a"; b.textContent = opt.label;
          b.addEventListener("click", function(){
            box.querySelectorAll(".zba-a").forEach(function(x){ x.disabled = true; x.style.opacity = ".45"; });
            addEcho(opt.label);
            onPick(opt);
          });
          box.appendChild(b);
        });
      }

      // Phrases honnetes, deduites uniquement des donnees du catalogue
      function pourquoi(p, mode){
        var r = Number(p.r)||0, n = Number(p.n)||0, d = Number(p.d)||0;
        if (mode === "remise" && d >= 20) return "Remise de " + d + " % sur le prix relevé — c'est la plus forte de la sélection.";
        if (mode === "prix") return "Le moins cher qui correspond à ce que tu as décrit.";
        if (n >= 1000 && r >= 4.3) return r.toString().replace(".",",") + "/5 sur " + n.toLocaleString("fr-FR") + " avis : la note est solide parce qu'elle repose sur beaucoup de monde.";
        if (n >= 200 && r >= 4.2)  return r.toString().replace(".",",") + "/5 sur " + n.toLocaleString("fr-FR") + " avis — assez d'avis pour que la note veuille dire quelque chose.";
        if (d >= 25) return "Remise de " + d + " % sur le prix relevé.";
        return "Correspond à ton besoin et à ton budget dans le catalogue vérifié.";
      }
      function pasPourToi(p){
        var r = Number(p.r)||0, n = Number(p.n)||0, d = Number(p.d)||0, pr = Number(p.p)||0;
        if (n < 100)  return "Seulement " + n + " avis : trop peu pour être une valeur sûre. À éviter si tu ne veux prendre aucun risque.";
        if (r < 4.1)  return "Note de " + r.toString().replace(".",",") + "/5 : correct sans plus. Regarde les avis négatifs avant de valider.";
        if (d <= 5)   return "Quasiment aucune remise en ce moment — à prendre seulement si tu en as besoin maintenant, pas pour faire une affaire.";
        if (pr > 150) return "C'est un budget conséquent : vérifie que tu utiliseras vraiment toutes ses fonctions.";
        return "Rien de bloquant, mais compare quand même avec ce que tu as déjà chez toi.";
      }

      function renderResultats(list, mode, rangs, titre){
        if (!list.length){
          addMsg('<div class="zba-empty"><strong>Rien de solide dans le catalogue pour cette combinaison.</strong><br>' +
                 "Je préfère te le dire plutôt que te proposer n'importe quoi. Élargis le budget, " +
                 "ou reviens dans quelques jours : le catalogue est revérifié tous les jours.</div>");
          return;
        }
        rangs = rangs || ["Le plus adapté", "Bonne alternative", "Si tu veux comparer"];
        if (titre !== "") addMsg('<p class="zba-q">' + esc(titre || "Voilà ce que je te propose :") + "</p>");
        list.forEach(function(p, i){
          var was = (Number(p.o) > Number(p.p))
            ? '<span class="zba-was">' + eur(p.o) + "</span>" : "";
          var off = (Number(p.d) > 0)
            ? '<span class="zba-off">-' + p.d + "%</span>" : "";
          var avis = (Number(p.n)||0).toLocaleString("fr-FR");
          addMsg(
            '<div class="zba-card">' +
              '<img src="' + imgUrl(p.i) + '" alt="" loading="lazy">' +
              '<div class="zba-card-body">' +
                '<div class="zba-rank">' + rangs[i] + "</div>" +
                '<div class="zba-name">' + esc(p.t) + "</div>" +
                '<div><span class="zba-price">' + eur(p.p) + "</span>" + was + off + "</div>" +
                '<p class="zba-meta">' + String(p.r).replace(".",",") + "/5 · " + avis + " avis · " + esc(p.c) + "</p>" +
                '<p class="zba-why">' + esc(pourquoi(p, mode)) + "</p>" +
                '<p class="zba-not">' + esc(pasPourToi(p)) + "</p>" +
                '<a class="zba-cta" href="' + lien(p.a) + '" target="_blank" rel="nofollow sponsored noopener">Voir le prix sur Amazon</a>' +
              "</div>" +
            "</div>"
          );
        });
        addMsg('<p class="zba-meta">Prix relevés le ' + esc(DATE_RELEVE) + ". Le prix affiché sur Amazon au moment de ton achat fait foi. " +
               "Liens affiliés : je touche une commission, ça ne change rien à ce que tu paies.</p>");
        restartBtn.hidden = false;
      }

      // ── Deroulé ──────────────────────────────────────────────────────
      // Le catalogue tourne tous les jours : une option qui ne mene a aucun
      // produit aujourd'hui n'est pas affichee. Mieux vaut moins de choix que
      // des impasses.
      function dispo(sel){
        for (var i=0;i<PRODUITS.length;i++){ if (correspond(PRODUITS[i], sel)) return true; }
        return false;
      }
      function optionsUtiles(besoin, question){
        var q = question || besoin.qs[0];
        if (!q) return [];
        return q.opts.filter(function(o){ return dispo(o.sel || besoin.sel); });
      }

      function start(garder){
        // Un lien profond (?ref= / ?top=) a deja affiche des fiches : on les
        // garde et on enchaine avec l'assistant en dessous.
        if (!garder) thread.innerHTML = "";
        restartBtn.hidden = true;
        state = { sel: null, min: 0, max: 1e9, mode: "sur" };

        var besoinsDispo = BESOINS.filter(function(b){
          return dispo(b.sel) && (!b.qs.length || optionsUtiles(b).length > 0);
        });
        if (!besoinsDispo.length){
          addMsg('<div class="zba-empty"><strong>Le catalogue du jour est trop mince pour l\'assistant.</strong><br>' +
                 "Reviens demain : il est revérifié chaque jour.</div>");
          return;
        }

        addQuestion("Tu es là pour quoi ?", besoinsDispo.map(function(b){
          return { label: b.label, besoin: b };
        }), function(opt){
          var b = opt.besoin;
          state.sel = b.sel;
          var etape = 0;
          (function suite(){
            if (etape < b.qs.length){
              var q = b.qs[etape++];
              var opts = optionsUtiles(b, q);
              if (!opts.length){ suite(); return; }
              addQuestion(q.q, opts, function(o){
                if (o.sel) state.sel = o.sel;
                suite();
              });
              return;
            }
            addQuestion(Q_BUDGET.q, Q_BUDGET.opts, function(o){
              state.min = o.min; state.max = o.max;
              addQuestion(Q_TRI.q, Q_TRI.opts, function(o2){
                state.mode = o2.mode;
                finir();
              });
            });
          })();
        });
      }

      function finir(){
        var res = PRODUITS.filter(function(p){
          var pr = Number(p.p) || 0;
          return pr >= state.min && pr <= state.max && correspond(p, state.sel);
        });
        if (state.mode === "sur"){
          res = res.filter(function(p){ return (Number(p.n)||0) >= 50; });
          res.sort(function(a,b){ return scoreSur(b) - scoreSur(a); });
        } else if (state.mode === "remise"){
          res.sort(function(a,b){ return (Number(b.d)||0) - (Number(a.d)||0); });
        } else {
          res.sort(function(a,b){ return (Number(a.p)||0) - (Number(b.p)||0); });
        }
        renderResultats(dedupe(res).slice(0,3), state.mode);
      }

      // ── Liens profonds venus des réseaux ─────────────────────────────
      //   ?ref=NNNNN        → une fiche produit (post solo)
      //   ?top=N1,N2,N3     → les 3 fiches d'un comparatif Pinterest.
      //                       Une épingle ne porte qu'UN lien : il mène ici, où
      //                       chacun des 3 produits a son propre lien Amazon.
      function parRefs(refs){
        var out = [];
        refs.forEach(function(r){
          var p = PRODUITS.filter(function(x){ return Number(x.x) === Number(r); })[0];
          if (p) out.push(p);
        });
        return out;
      }
      function msgIntrouvable(n){
        addMsg('<div class="zba-empty"><strong>' +
          (n > 1 ? "Ces produits ne sont plus au catalogue." : "Ce produit n'est plus au catalogue.") +
          "</strong><br>L'offre a expiré ou le prix n'est plus vérifiable — je ne l'affiche pas " +
          "plutôt que de te montrer un prix faux. Utilise l'assistant ci-dessous pour trouver " +
          "l'équivalent du moment.</div>");
      }
      function deepLink(){
        var q = window.location.search;

        var mTop = /[?&]top=([\d,]+)/.exec(q);
        if (mTop){
          var refs = mTop[1].split(",").filter(Boolean);
          var found = parRefs(refs);
          if (!found.length){ msgIntrouvable(refs.length); return false; }
          renderResultats(found.slice(0,3), "sur", ["N°1 du comparatif", "N°2", "N°3"],
                          "Le comparatif que tu venais voir — chaque produit a son propre lien :");
          if (found.length < refs.length){
            addMsg('<p class="zba-meta">' + (refs.length - found.length) +
                   " produit(s) de ce comparatif ont quitté le catalogue depuis la publication.</p>");
          }
          addMsg('<p class="zba-q">Tu cherches autre chose ?</p>');
          return true;
        }

        var mRef = /[?&]ref=(\d+)/.exec(q);
        if (mRef){
          var p = parRefs([mRef[1]])[0];
          if (!p){ msgIntrouvable(1); return false; }
          renderResultats([p], "sur", ["Le produit annoncé"],
                          "Le produit que tu venais voir :");
          addMsg('<p class="zba-q">Envie de comparer avant d\'acheter ?</p>');
          return true;
        }
        return false;
      }

      restartBtn.addEventListener("click", function(){ start(false); });

      // ── Chargement du catalogue ──────────────────────────────────────
      noteEl.textContent = "Chargement du catalogue…";
      fetch(SRC, { cache: "no-cache" })
        .then(function(r){ if(!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .then(function(j){
          PRODUITS = (j && j.products) || [];
          DATE_RELEVE = (j && j.date) || "";
          noteEl.textContent = PRODUITS.length + " produits vérifiés · relevé du " + DATE_RELEVE +
                               " · aucune donnée personnelle collectée";
          start(deepLink());
        })
        .catch(function(e){
          noteEl.textContent = "";
          thread.innerHTML = '<div class="zba-empty"><strong>Le catalogue n\'a pas pu être chargé.</strong><br>' +
            "Réessaie dans un instant — les produits restent visibles plus bas sur la page.</div>";
          if (window.console) console.warn("[assistant]", e);
        });
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install);
  } else { install(); }
})();

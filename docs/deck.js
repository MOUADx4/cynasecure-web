const PptxGenJS = require("pptxgenjs");
const p = new PptxGenJS();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";

// Palette (theme de l'app)
const BG = "0B0B0D", SURF = "16161A", SURF2 = "1E1E24", BORDER = "2D2D31";
const WHITE = "FFFFFF", MUTED = "9CA3AF", DIM = "6B7280";
const BLUE = "3B82F6", BLUED = "2563EB", BLUEL = "60A5FA";
const OK = "10B981", WARN = "F59E0B", DANGER = "EF4444", VIO = "8B5CF6";
const HF = "Trebuchet MS", BF = "Calibri", MF = "Consolas";

const DIR = "/Users/mouad/Cynasecure/docs/diagrams/";
const ARCH = DIR + "01_architecture_globale.png";
const ERD = DIR + "02_erd.png";
const GANTT = DIR + "07_gantt.png";

const W = 13.333, H = 7.5, M = 0.7;

function bg(s){ s.background = { color: BG }; }
function pageno(s, n){
  s.addText(String(n).padStart(2,"0"), { x: W-1.0, y: H-0.5, w: 0.6, h: 0.3, align:"right",
    fontFace: MF, fontSize: 9, color: DIM });
  s.addText("CynaSecure", { x: M, y: H-0.5, w: 3, h: 0.3, fontFace: MF, fontSize: 9, color: DIM });
}
function eyebrow(s, t, x=M, y=0.6){
  s.addText(t.toUpperCase(), { x, y, w: 9.5, h: 0.3, fontFace: MF, fontSize: 11, color: BLUE,
    charSpacing: 3, bold: true });
}
function title(s, t, x=M, y=0.95, w=W-2*M, size=34){
  s.addText(t, { x, y, w, h: 1.0, fontFace: HF, fontSize: size, color: WHITE, bold: true });
}
function card(s, x, y, w, h, fill=SURF){
  s.addShape(p.ShapeType.roundRect, { x, y, w, h, fill: { color: fill },
    line: { color: BORDER, width: 1 }, rectRadius: 0.08 });
}

// ---------- 1. TITRE ----------
let s = p.addSlide(); bg(s);
s.addShape(p.ShapeType.rect, { x:0, y:0, w:W, h:H, fill:{ color: BG } });
s.addShape(p.ShapeType.ellipse, { x: 8.2, y: -2.2, w: 7, h: 7, fill: { color: BLUED, transparency: 84 }, line:{type:"none"} });
s.addShape(p.ShapeType.ellipse, { x: -2.5, y: 3.8, w: 6, h: 6, fill: { color: VIO, transparency: 90 }, line:{type:"none"} });
s.addText("●  CYBERSÉCURITÉ · SAAS · E-COMMERCE B2B", { x: M, y: 1.4, w: 10, h: 0.4,
  fontFace: MF, fontSize: 12, color: BLUEL, charSpacing: 2, bold:true });
s.addText("CynaSecure", { x: M, y: 2.0, w: 11.5, h: 1.4, fontFace: HF, fontSize: 76, color: WHITE, bold: true });
s.addText("Marketplace+", { x: M, y: 3.25, w: 11.5, h: 1.0, fontFace: HF, fontSize: 40, color: BLUE, bold: true });
s.addText("Plateforme e-commerce pour la commercialisation de services de cybersécurité en mode SaaS — site web, back-office et application mobile.",
  { x: M, y: 4.35, w: 9.8, h: 0.9, fontFace: BF, fontSize: 16, color: MUTED, lineSpacingMultiple: 1.1 });
s.addText([
  { text: "Projet fil rouge B3 — DEV", options:{ bold:true, color: WHITE } },
  { text: "   ·   H3 HITEMA   ·   Promotion 2025-2026", options:{ color: MUTED } },
], { x: M, y: 5.7, w: 11, h: 0.4, fontFace: BF, fontSize: 14 });
s.addText("Mouad BOUNOKRA  ·  Pharell TITI  ·  Nolwen FERNANDES  ·  Wissal LIDAM",
  { x: M, y: 6.2, w: 11.5, h: 0.4, fontFace: MF, fontSize: 12.5, color: DIM });

// ---------- 2. EQUIPE ----------
s = p.addSlide(); bg(s); eyebrow(s,"L'équipe projet"); title(s,"Quatre rôles, une plateforme");
const team = [
  ["Mouad BOUNOKRA", "Frontend & Base de données", "Site web React, design système, schéma MySQL et modèle de données.", BLUE],
  ["Pharell TITI", "Backend & API", "API REST Symfony, logique métier, paiements et sécurité serveur.", VIO],
  ["Nolwen FERNANDES", "Back-office admin", "Tableau de bord, gestion des services, commandes et statistiques.", OK],
  ["Wissal LIDAM", "Application mobile", "App React Native miroir du site, consommant la même API.", WARN],
];
let cx = M, cy = 2.1, cw = (W-2*M-0.6)/2, ch = 2.15;
team.forEach((t,i)=>{
  const x = cx + (i%2)*(cw+0.6), y = cy + Math.floor(i/2)*(ch+0.45);
  card(s, x, y, cw, ch);
  s.addShape(p.ShapeType.roundRect, { x:x+0.35, y:y+0.35, w:0.16, h:ch-0.7, fill:{color:t[3]}, line:{type:"none"}, rectRadius:0.05 });
  s.addText(t[0], { x:x+0.7, y:y+0.32, w:cw-1, h:0.4, fontFace:HF, fontSize:19, color:WHITE, bold:true });
  s.addText(t[1].toUpperCase(), { x:x+0.7, y:y+0.78, w:cw-1, h:0.3, fontFace:MF, fontSize:11, color:t[3], charSpacing:1.5, bold:true });
  s.addText(t[2], { x:x+0.7, y:y+1.15, w:cw-1.05, h:0.8, fontFace:BF, fontSize:13, color:MUTED, lineSpacingMultiple:1.05 });
});
pageno(s,2);

// ---------- 3. CONTEXTE ----------
s = p.addSlide(); bg(s); eyebrow(s,"Contexte & problématique"); title(s,"Le besoin du client Cyna");
card(s, M, 2.1, 6.0, 4.4);
s.addText("La situation", { x:M+0.4, y:2.35, w:5, h:0.4, fontFace:HF, fontSize:18, color:BLUE, bold:true });
[
 "Cyna vend des solutions de cybersécurité (SOC, EDR, XDR) en B2B.",
 "La vente passe uniquement par des commerciaux et un réseau de distribution.",
 "Aucune présence e-commerce : accès aux services lent et peu accessible.",
].forEach((t,i)=>{
  s.addText("—", { x:M+0.4, y:2.95+i*0.75, w:0.3, h:0.4, fontFace:BF, fontSize:14, color:BLUE, bold:true });
  s.addText(t, { x:M+0.75, y:2.95+i*0.75, w:4.95, h:0.7, fontFace:BF, fontSize:14, color:WHITE, lineSpacingMultiple:1.05 });
});
card(s, M+6.4, 2.1, W-2*M-6.4, 4.4, SURF2);
s.addText("L'objectif", { x:M+6.8, y:2.35, w:5, h:0.4, fontFace:HF, fontSize:18, color:OK, bold:true });
[
 "Créer une plateforme e-commerce mobile-first.",
 "Une application mobile miroir du site web.",
 "Un back-office complet de gestion.",
 "Un paiement sécurisé et évolutif.",
].forEach((t,i)=>{
  s.addText("✓", { x:M+6.8, y:2.95+i*0.72, w:0.35, h:0.4, fontFace:BF, fontSize:14, color:OK, bold:true });
  s.addText(t, { x:M+7.2, y:2.95+i*0.72, w:4.4, h:0.6, fontFace:BF, fontSize:14, color:WHITE });
});
pageno(s,3);

// ---------- 4. SOLUTION ----------
s = p.addSlide(); bg(s); eyebrow(s,"Notre solution"); title(s,"Trois composants, une seule API");
const comps = [
  ["Site web", "React + Vite", "Catalogue, panier, paiement, espace client et back-office administrateur.", BLUE],
  ["API REST", "Symfony + MySQL", "Toute la logique métier centralisée : 107 endpoints documentés (Swagger).", VIO],
  ["Application mobile", "React Native (Expo)", "Miroir du site, consomme la même API. iOS et Android.", WARN],
];
let bw = (W-2*M-1.2)/3;
comps.forEach((c,i)=>{
  const x = M + i*(bw+0.6);
  card(s, x, 2.3, bw, 3.6);
  s.addShape(p.ShapeType.roundRect, { x:x+0.35, y:2.65, w:0.7, h:0.7, fill:{color:c[3], transparency:80}, line:{color:c[3], width:1}, rectRadius:0.1 });
  s.addText(String(i+1), { x:x+0.35, y:2.65, w:0.7, h:0.7, align:"center", valign:"middle", fontFace:HF, fontSize:26, color:c[3], bold:true });
  s.addText(c[0], { x:x+0.35, y:3.6, w:bw-0.7, h:0.4, fontFace:HF, fontSize:19, color:WHITE, bold:true });
  s.addText(c[1].toUpperCase(), { x:x+0.35, y:4.05, w:bw-0.7, h:0.3, fontFace:MF, fontSize:11, color:c[3], charSpacing:1, bold:true });
  s.addText(c[2], { x:x+0.35, y:4.45, w:bw-0.7, h:1.3, fontFace:BF, fontSize:13, color:MUTED, lineSpacingMultiple:1.1 });
});
s.addText("Le web et le mobile ne dupliquent aucune logique : ils consomment la même API et la même base de données.",
  { x:M, y:6.2, w:W-2*M, h:0.5, fontFace:BF, fontSize:13.5, color:DIM, italic:true });
pageno(s,4);

// ---------- 5. ANALYSE CONCURRENTIELLE ----------
s = p.addSlide(); bg(s); eyebrow(s,"Veille concurrentielle"); title(s,"Un créneau peu occupé");
const rows = [
  ["AWS / Azure Marketplace", "Catalogue SaaS très riche", "Web uniquement, orienté experts, pas d'app d'achat", DANGER],
  ["CrowdStrike, SentinelOne", "Produits de référence", "Pas de vente self-service simple", WARN],
  ["App Store / Google Play", "Vrai parcours d'achat natif", "Grand public, pas de cybersécurité B2B", WARN],
  ["CynaSecure", "App mobile native + UX e-commerce", "Ciblage PME, tunnel d'achat complet", OK],
];
s.addText("ACTEUR", { x:M+0.3, y:2.2, w:3.4, h:0.3, fontFace:MF, fontSize:10, color:DIM, charSpacing:1, bold:true });
s.addText("FORCE", { x:M+3.9, y:2.2, w:3.6, h:0.3, fontFace:MF, fontSize:10, color:DIM, charSpacing:1, bold:true });
s.addText("LIMITE / OPPORTUNITÉ", { x:M+7.7, y:2.2, w:4.2, h:0.3, fontFace:MF, fontSize:10, color:DIM, charSpacing:1, bold:true });
let ry = 2.65;
rows.forEach((r)=>{
  const hl = r[3]===OK;
  card(s, M, ry, W-2*M, 0.92, hl?SURF2:SURF);
  if(hl) s.addShape(p.ShapeType.roundRect,{x:M,y:ry,w:0.12,h:0.92,fill:{color:OK},line:{type:"none"},rectRadius:0.03});
  s.addText(r[0], { x:M+0.3, y:ry+0.04, w:3.5, h:0.84, valign:"middle", fontFace:HF, fontSize:14.5, color:hl?OK:WHITE, bold:true });
  s.addText(r[1], { x:M+3.9, y:ry+0.04, w:3.7, h:0.84, valign:"middle", fontFace:BF, fontSize:12.5, color:MUTED });
  s.addText(r[2], { x:M+7.7, y:ry+0.04, w:4.0, h:0.84, valign:"middle", fontFace:BF, fontSize:12.5, color:hl?WHITE:MUTED });
  ry += 1.02;
});
pageno(s,5);

// ---------- 6. FONCTIONNALITES CLIENT ----------
s = p.addSlide(); bg(s); eyebrow(s,"Fonctionnalités — espace client"); title(s,"Le parcours d'achat complet");
const feats = [
  ["Catalogue", "Recherche à 5 facettes, tri, pagination, fiches détaillées."],
  ["Panier", "Cycle mensuel / annuel, codes promo, persistance de session."],
  ["Tunnel de commande", "4 étapes : identité, adresse, paiement, confirmation."],
  ["Compte client", "Abonnements, commandes, adresses, moyens de paiement."],
  ["Sécurité du compte", "Vérification e-mail, 2FA, mot de passe fort."],
  ["Support", "Formulaire de contact et chatbot avec FAQ."],
];
let fx=M, fy=2.2, fw=(W-2*M-0.6)/3, fh=1.85;
feats.forEach((f,i)=>{
  const x=fx+(i%3)*(fw+0.3), y=fy+Math.floor(i/3)*(fh+0.35);
  card(s,x,y,fw,fh);
  s.addShape(p.ShapeType.ellipse,{x:x+0.32,y:y+0.32,w:0.32,h:0.32,fill:{color:BLUE},line:{type:"none"}});
  s.addText(f[0],{x:x+0.82,y:y+0.28,w:fw-1,h:0.4,fontFace:HF,fontSize:15.5,color:WHITE,bold:true});
  s.addText(f[1],{x:x+0.35,y:y+0.85,w:fw-0.7,h:0.85,fontFace:BF,fontSize:12.5,color:MUTED,lineSpacingMultiple:1.08});
});
pageno(s,6);

// ---------- 7. BACK-OFFICE ----------
s = p.addSlide(); bg(s); eyebrow(s,"Fonctionnalités — back-office"); title(s,"Pilotage administrateur");
card(s, M, 2.2, 5.6, 4.3);
s.addText("Tableau de bord", { x:M+0.4, y:2.45, w:5, h:0.4, fontFace:HF, fontSize:17, color:VIO, bold:true });
["KPI : services, utilisateurs, abonnements actifs, MRR","Ventes par jour et par semaine","Panier moyen par catégorie","Répartition des ventes par catégorie"].forEach((t,i)=>{
  s.addText("›",{x:M+0.4,y:3.0+i*0.62,w:0.3,h:0.4,fontFace:BF,fontSize:15,color:VIO,bold:true});
  s.addText(t,{x:M+0.75,y:3.0+i*0.62,w:4.6,h:0.55,fontFace:BF,fontSize:13.5,color:WHITE});
});
card(s, M+6.0, 2.2, W-2*M-6.0, 4.3, SURF2);
s.addText("Gestion & modération", { x:M+6.4, y:2.45, w:5, h:0.4, fontFace:HF, fontSize:17, color:OK, bold:true });
["Services, catégories et contenu de la page d'accueil","Utilisateurs, abonnements et paiements","Codes promotionnels","Messages de contact et conversations chatbot","2FA obligatoire pour les comptes admin"].forEach((t,i)=>{
  s.addText("›",{x:M+6.4,y:3.0+i*0.62,w:0.3,h:0.4,fontFace:BF,fontSize:15,color:OK,bold:true});
  s.addText(t,{x:M+6.75,y:3.0+i*0.62,w:4.6,h:0.55,fontFace:BF,fontSize:13.5,color:WHITE});
});
pageno(s,7);

// ---------- 8. ARCHITECTURE (diagramme) ----------
s = p.addSlide(); bg(s); eyebrow(s,"Architecture technique"); title(s,"Une architecture découplée");
s.addImage({ path: ARCH, x:(W-5.95)/2, y:2.25, w:5.95, h:4.5 });
pageno(s,8);

// ---------- 9. MODELE DE DONNEES (ERD) ----------
s = p.addSlide(); bg(s); eyebrow(s,"Modèle de données"); title(s,"Le schéma de la base");
s.addImage({ path: ERD, x:(W-6.05)/2, y:2.1, w:6.05, h:4.6 });
pageno(s,9);

// ---------- 10. STACK ----------
s = p.addSlide(); bg(s); eyebrow(s,"Stack technique"); title(s,"Des technologies éprouvées");
const stacks = [
  ["Frontend", BLUE, ["React 18 + TypeScript","Vite · Tailwind CSS","React Router · i18next","Recharts · Vitest"]],
  ["Backend", VIO, ["PHP 8.2 · Symfony 7.4","Doctrine ORM 3","MySQL 8","Stripe · PayPal · Dompdf"]],
  ["Mobile", WARN, ["React Native 0.81","Expo SDK 54 · React 19","React Navigation 7","Stripe React Native"]],
];
let sw=(W-2*M-1.2)/3;
stacks.forEach((st,i)=>{
  const x=M+i*(sw+0.6);
  card(s,x,2.3,sw,3.7);
  s.addText(st[0].toUpperCase(),{x:x+0.35,y:2.6,w:sw-0.7,h:0.4,fontFace:MF,fontSize:13,color:st[1],charSpacing:2,bold:true});
  st[2].forEach((line,j)=>{
    s.addShape(p.ShapeType.rect,{x:x+0.35,y:3.3+j*0.62+0.1,w:0.18,h:0.18,fill:{color:st[1]},line:{type:"none"}});
    s.addText(line,{x:x+0.65,y:3.3+j*0.62,w:sw-1,h:0.45,fontFace:BF,fontSize:13.5,color:WHITE,valign:"middle"});
  });
});
pageno(s,10);

// ---------- 11. SECURITE ----------
s = p.addSlide(); bg(s); eyebrow(s,"Sécurité & conformité"); title(s,"La sécurité au cœur du projet");
const sec = [
  ["Argon2id","Hashage des mots de passe"],
  ["2FA (TOTP)","Obligatoire pour les admins"],
  ["Login throttling","5 tentatives / 15 min anti-force-brute"],
  ["CORS verrouillé","Origines restreintes, pas de wildcard"],
  ["Webhooks signés","Stripe & PayPal vérifiés côté serveur"],
  ["Détection de fraude","Stripe Radar + scoring interne"],
  ["Sessions HttpOnly","Aucun token exposé au JavaScript"],
  ["RGPD & PCI-DSS","Aucune donnée carte stockée"],
];
let qx=M, qy=2.2, qw=(W-2*M-0.9)/4, qh=1.85;
sec.forEach((c,i)=>{
  const x=qx+(i%4)*(qw+0.3), y=qy+Math.floor(i/4)*(qh+0.35);
  card(s,x,y,qw,qh);
  s.addText(c[0],{x:x+0.28,y:y+0.3,w:qw-0.5,h:0.7,fontFace:HF,fontSize:15,color:BLUEL,bold:true});
  s.addText(c[1],{x:x+0.28,y:y+1.0,w:qw-0.5,h:0.7,fontFace:BF,fontSize:11.5,color:MUTED,lineSpacingMultiple:1.05});
});
pageno(s,11);

// ---------- 12. PAIEMENT ----------
s = p.addSlide(); bg(s); eyebrow(s,"Paiement & facturation"); title(s,"Un tunnel sécurisé et fiable");
const pay = [
  ["Stripe Elements","Cartes bancaires + 3D Secure / SCA automatique.",BLUE],
  ["PayPal","Paiement alternatif en mode sandbox.",BLUED],
  ["Détection de fraude","Scoring sur l'IP, la fréquence et l'e-mail.",DANGER],
  ["Factures PDF","Générées automatiquement (Dompdf), téléchargeables.",OK],
  ["Webhooks signés","Synchronisation asynchrone et fiable des paiements.",VIO],
  ["Renouvellement auto","Commande Symfony planifiable en cron.",WARN],
];
let px=M, py=2.2, pw=(W-2*M-0.6)/3, ph=1.85;
pay.forEach((c,i)=>{
  const x=px+(i%3)*(pw+0.3), y=py+Math.floor(i/3)*(ph+0.35);
  card(s,x,y,pw,ph);
  s.addShape(p.ShapeType.roundRect,{x:x+0.32,y:y+0.32,w:0.16,h:ph-0.64,fill:{color:c[2]},line:{type:"none"},rectRadius:0.04});
  s.addText(c[0],{x:x+0.65,y:y+0.3,w:pw-0.9,h:0.4,fontFace:HF,fontSize:15.5,color:WHITE,bold:true});
  s.addText(c[1],{x:x+0.65,y:y+0.82,w:pw-0.95,h:0.85,fontFace:BF,fontSize:12.5,color:MUTED,lineSpacingMultiple:1.08});
});
pageno(s,12);

// ---------- 13. MOBILE ----------
s = p.addSlide(); bg(s); eyebrow(s,"Application mobile"); title(s,"Le site, dans la poche");
card(s, M, 2.2, 6.2, 4.3);
s.addText("Une app native, pas une copie",{x:M+0.4,y:2.5,w:5.4,h:0.4,fontFace:HF,fontSize:17,color:WARN,bold:true});
["Développée en React Native (Expo SDK 54).","Reprend tous les parcours du site web.","Consomme exactement la même API Symfony.","Persistance de session par cookie sécurisé.","Multilingue FR / EN / ES, thème sombre."].forEach((t,i)=>{
  s.addText("—",{x:M+0.4,y:3.05+i*0.62,w:0.3,h:0.4,fontFace:BF,fontSize:14,color:WARN,bold:true});
  s.addText(t,{x:M+0.75,y:3.05+i*0.62,w:5.1,h:0.55,fontFace:BF,fontSize:13.5,color:WHITE});
});
card(s, M+6.6, 2.2, W-2*M-6.6, 4.3, SURF2);
s.addText("Pourquoi c'est notable",{x:M+7.0,y:2.5,w:4.6,h:0.4,fontFace:HF,fontSize:17,color:BLUEL,bold:true});
s.addText("Les marketplaces SaaS (AWS, Azure, Google Cloud) n'ont pas d'application mobile native dédiée à l'achat. CynaSecure transpose le confort d'un app store grand public à la vente de cybersécurité pour les PME.",
  { x:M+7.0, y:3.1, w:4.3, h:2.8, fontFace:BF, fontSize:13.5, color:MUTED, lineSpacingMultiple:1.2 });
pageno(s,13);

// ---------- 14. METHODOLOGIE ----------
s = p.addSlide(); bg(s); eyebrow(s,"Méthodologie & gestion de projet"); title(s,"Agile Scrum sur 10 sprints");
const steps = [
  ["Cadrage","Besoins, maquettes, architecture"],
  ["Développement","Catalogue, comptes, paiement"],
  ["Back-office","Gestion, statistiques, modération"],
  ["Mobile","App miroir, tests sur device"],
  ["Mise en production","Documentation, recette, soutenance"],
];
let stx=M, sty=2.6, stw=(W-2*M-1.6)/5;
steps.forEach((st,i)=>{
  const x=stx+i*(stw+0.4);
  s.addShape(p.ShapeType.roundRect,{x,y:sty,w:0.55,h:0.55,fill:{color:BLUE,transparency:78},line:{color:BLUE,width:1},rectRadius:0.1});
  s.addText(String(i+1),{x,y:sty,w:0.55,h:0.55,align:"center",valign:"middle",fontFace:HF,fontSize:20,color:BLUEL,bold:true});
  if(i<4) s.addShape(p.ShapeType.line,{x:x+0.55,y:sty+0.275,w:stw-0.15,h:0,line:{color:BORDER,width:1.5}});
  s.addText(st[0],{x:x-0.2,y:sty+0.75,w:stw+0.3,h:0.4,fontFace:HF,fontSize:14,color:WHITE,bold:true});
  s.addText(st[1],{x:x-0.2,y:sty+1.18,w:stw+0.35,h:0.9,fontFace:BF,fontSize:11.5,color:MUTED,lineSpacingMultiple:1.05});
});
const tools = ["Trello — backlog & sprints","Discord — communication","GitHub — versioning","Postman — tests API"];
let tw=(W-2*M-0.9)/4;
tools.forEach((t,i)=>{
  const x=M+i*(tw+0.3);
  card(s,x,5.4,tw,1.0,SURF);
  s.addText(t,{x:x+0.25,y:5.4,w:tw-0.4,h:1.0,valign:"middle",fontFace:BF,fontSize:12.5,color:WHITE});
});
pageno(s,14);

// ---------- 15. GANTT (diagramme) ----------
s = p.addSlide(); bg(s); eyebrow(s,"Planification"); title(s,"Le rétroplanning du projet");
s.addImage({ path: GANTT, x:(W-8.0)/2, y:1.75, w:8.0, h:5.5 });
pageno(s,15);

// ---------- 16. TESTS & QUALITE ----------
s = p.addSlide(); bg(s); eyebrow(s,"Tests & qualité"); title(s,"Un code testé et accessible");
const stats = [["89","tests automatisés verts",BLUE],["100","Lighthouse accessibilité",OK],["3","langues (FR/EN/ES)",VIO],["107","endpoints API documentés",WARN]];
let kx=M, kw=(W-2*M-0.9)/4;
stats.forEach((st,i)=>{
  const x=kx+i*(kw+0.3);
  card(s,x,2.3,kw,2.0);
  s.addText(st[0],{x:x+0.2,y:2.5,w:kw-0.4,h:1.0,align:"center",fontFace:HF,fontSize:54,color:st[2],bold:true});
  s.addText(st[1],{x:x+0.2,y:3.6,w:kw-0.4,h:0.6,align:"center",fontFace:BF,fontSize:12.5,color:MUTED});
});
card(s, M, 4.7, W-2*M, 1.7, SURF2);
s.addText("Couverture",{x:M+0.4,y:4.9,w:4,h:0.4,fontFace:HF,fontSize:15,color:BLUEL,bold:true});
s.addText("34 tests backend (PHPUnit) · 55 tests frontend (Vitest) · WCAG 2.1 AA · navigation clavier complète · contrastes vérifiés · respect de prefers-reduced-motion.",
  { x:M+0.4, y:5.35, w:W-2*M-0.8, h:0.9, fontFace:BF, fontSize:13.5, color:WHITE, lineSpacingMultiple:1.15 });
pageno(s,16);

// ---------- 17. DEMO ----------
s = p.addSlide(); bg(s);
s.addShape(p.ShapeType.ellipse,{x:8.5,y:-2,w:7,h:7,fill:{color:BLUED,transparency:85},line:{type:"none"}});
eyebrow(s,"Démonstration", M, 2.4);
s.addText("Place à la démo", { x:M, y:2.85, w:11, h:1.0, fontFace:HF, fontSize:48, color:WHITE, bold:true });
s.addText("Inscription  →  catalogue  →  panier  →  paiement Stripe  →  facture PDF  →  back-office admin",
  { x:M, y:4.0, w:11.5, h:0.5, fontFace:MF, fontSize:15, color:BLUEL });
s.addText("Site web + application mobile en direct.", { x:M, y:4.6, w:10, h:0.5, fontFace:BF, fontSize:15, color:MUTED });

// ---------- 18. DIFFICULTES ----------
s = p.addSlide(); bg(s); eyebrow(s,"Difficultés & solutions"); title(s,"Ce que nous avons appris");
const diff = [
  ["Synchroniser web et mobile","Une API unique consommée par les deux clients, sans duplication de logique.",BLUE],
  ["Paiement et webhooks","Vérification de signature et gestion asynchrone des statuts de commande.",VIO],
  ["Sécurité et fraude","2FA, throttling, scoring de fraude et sessions sécurisées.",DANGER],
  ["Travail en équipe à 4","Répartition claire des rôles, Trello et revues de code régulières.",OK],
];
let dx=M, dy=2.2, dw=(W-2*M-0.6)/2, dh=1.95;
diff.forEach((c,i)=>{
  const x=dx+(i%2)*(dw+0.6), y=dy+Math.floor(i/2)*(dh+0.4);
  card(s,x,y,dw,dh);
  s.addShape(p.ShapeType.roundRect,{x:x+0.35,y:y+0.35,w:0.16,h:dh-0.7,fill:{color:c[2]},line:{type:"none"},rectRadius:0.04});
  s.addText(c[0],{x:x+0.7,y:y+0.35,w:dw-1,h:0.5,fontFace:HF,fontSize:16.5,color:WHITE,bold:true});
  s.addText(c[1],{x:x+0.7,y:y+0.95,w:dw-1.05,h:0.85,fontFace:BF,fontSize:13,color:MUTED,lineSpacingMultiple:1.1});
});
pageno(s,18);

// ---------- 19. BILAN & PERSPECTIVES ----------
s = p.addSlide(); bg(s); eyebrow(s,"Bilan & perspectives"); title(s,"Un projet complet, et la suite");
card(s, M, 2.2, 6.0, 4.3);
s.addText("Objectifs atteints",{x:M+0.4,y:2.45,w:5,h:0.4,fontFace:HF,fontSize:17,color:OK,bold:true});
["Plateforme web + mobile fonctionnelle","57 tickets du backlog couverts","Paiement, sécurité et back-office complets","Documentation technique et tests"].forEach((t,i)=>{
  s.addText("✓",{x:M+0.4,y:3.0+i*0.65,w:0.35,h:0.4,fontFace:BF,fontSize:14,color:OK,bold:true});
  s.addText(t,{x:M+0.8,y:3.0+i*0.65,w:5.0,h:0.6,fontFace:BF,fontSize:13.5,color:WHITE});
});
card(s, M+6.4, 2.2, W-2*M-6.4, 4.3, SURF2);
s.addText("Perspectives",{x:M+6.8,y:2.45,w:5,h:0.4,fontFace:HF,fontSize:17,color:BLUEL,bold:true});
["Déploiement en production (cloud)","Pipeline CI/CD automatisé","Notifications push mobiles","Tableau de bord analytics avancé","Espace partenaires / revendeurs"].forEach((t,i)=>{
  s.addText("→",{x:M+6.8,y:3.0+i*0.62,w:0.35,h:0.4,fontFace:BF,fontSize:14,color:BLUEL,bold:true});
  s.addText(t,{x:M+7.2,y:3.0+i*0.62,w:4.4,h:0.55,fontFace:BF,fontSize:13.5,color:WHITE});
});
pageno(s,19);

// ---------- 20. MERCI ----------
s = p.addSlide(); bg(s);
s.addShape(p.ShapeType.ellipse,{x:-2,y:-2,w:7,h:7,fill:{color:VIO,transparency:88},line:{type:"none"}});
s.addShape(p.ShapeType.ellipse,{x:8.5,y:3,w:7,h:7,fill:{color:BLUED,transparency:84},line:{type:"none"}});
s.addText("Merci.", { x:M, y:2.6, w:11, h:1.3, fontFace:HF, fontSize:80, color:WHITE, bold:true });
s.addText("Des questions ?", { x:M, y:4.0, w:11, h:0.7, fontFace:HF, fontSize:26, color:BLUE, bold:true });
s.addText("Mouad BOUNOKRA  ·  Pharell TITI  ·  Nolwen FERNANDES  ·  Wissal LIDAM",
  { x:M, y:5.1, w:11.5, h:0.4, fontFace:MF, fontSize:13, color:MUTED });
s.addText("CynaSecure Marketplace+  —  H3 HITEMA  ·  2025-2026",
  { x:M, y:5.55, w:11.5, h:0.4, fontFace:MF, fontSize:11, color:DIM });

p.writeFile({ fileName: "/Users/mouad/Cynasecure/docs/Soutenance_CynaSecure.pptx" }).then(f=>console.log("OK:",f));

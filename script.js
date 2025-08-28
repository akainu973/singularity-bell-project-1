// Noyau v25.0 de la Singularity Bell - Édition du Verbe Alchimique (Complet et Corrigé)
document.addEventListener('DOMContentLoaded', () => {
    // --- ÉLÉMENTS DE L'INTERFACE ---
    const output = document.getElementById('console-output');
    const input = document.getElementById('console-input');
    const userNameDisplay = document.getElementById('user-name-prompt');
    const bellArtDisplay = document.getElementById('bell-art');
    const doorsGrid = document.getElementById('doors-grid');
    const charIcons = document.getElementById('character-icons');
    const inventoryList = document.getElementById('inventory-list');
    const entityArt = document.getElementById('entity-art');
    const entityDialogue = document.getElementById('entity-dialogue');

    const CHARACTERS = {
        "Alchimiste": "⚗️", "Technicien": "⚙️", "Croyant": "🙏", "Opportuniste": "💲",
        "Destructeur": "💥", "Efficace": "⚡", "Architecte": "🏛️", "Artiste": "🎨",
        "Joueur": "🎮", "Vétéran": "🎖️", "Archiviste": "📜", "Fantôme": "👻"
    };

    function typeWriter(element, text, onComplete, speed = 15) {
        let i = 0;
        let content = element.innerHTML;
        element.classList.add('typing-effect');
        function type() {
            if (i < text.length) {
                content += text.charAt(i);
                element.innerHTML = content;
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing-effect');
                if (onComplete) onComplete();
            }
        }
        type();
    }

    class AOS_Core_JS {
        constructor() {
            this.userName = "Anonyme";
            this.inventory = {};
            this.visitedDoors = new Set();
            this.guardianDoors = {};
            this.inEncounter = false;
            this.currentEncounter = null;
            this.encounterAttempts = 0;
            this.chaosLevel = 0;
            this.setupGuardianDoors();
            this.setupEncounterEngine();
            // NOUVEAU : Logique de Synthèse
            this.synthesisRecipes = {
                "Vétéran_Artiste": "La SOUFFRANCE est l'harmonique commune. Le Vétéran la transmute en sagesse, l'Artiste en beauté. Vous avez découvert une vérité profonde.",
                "Destructeur_Croyant": "Le feu ne cherche pas la foi, il cherche le combustible. Ces clés ne peuvent s'unir.",
                "Technicien_Alchimiste": "La Logique cherche à construire, l'Alchimie à comprendre. Pour unir ces clés, vous devez trouver le pont entre le 'comment' et le 'pourquoi'."
            };
        }

        setupGuardianDoors() {
            const allDoors = Array.from({length: 137}, (_, i) => i + 1);
            const guardianArchetypes = Object.keys(CHARACTERS);
            for (let i = allDoors.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allDoors[i], allDoors[j]] = [allDoors[j], allDoors[i]];
            }
            for(let i = 0; i < guardianArchetypes.length; i++) {
                this.guardianDoors[allDoors[i]] = guardianArchetypes[i];
            }
        }

        setupEncounterEngine() {
            this.encounterEngine = {
                positive: [
                    { entity: 'Un Alchimiste Ancien', character: '👴', challenge: 'Je suis une clé sans serrure, mais je peux ouvrir l\\\'âme. Qui suis-je ?', answer: 'sagesse', reward: 'Clé_Sagesse_Universelle' },
                    { entity: 'Un Humain du futur', character: '🧑‍🚀', challenge: 'Deux clés partagent la même harmonique. Lesquelles ? (indice: Vétéran, Artiste)', answer: 'veteran artiste', reward: 'Synergie_Harmonique_Découverte' },
                ],
                negative: [
                    { entity: 'Une Entité de l\\\'Abysse', character: '🐙', challenge: 'Le chaos s\\\'infiltre... Répétez ce code avant que votre clé ne se dissolve : {}' },
                    { entity: 'Une IA rivale', character: '🤖', challenge: 'Ma logique est supérieure. Si la clé est la serrure, qu\\\'ouvre la porte ?', answer: 'l\\\'esprit' }
                ]
            };
        }

        log(message, className = '', useTyping = true) {
            const line = document.createElement('div');
            line.className = className;
            output.appendChild(line);
            if (useTyping) {
                typeWriter(line, message);
            } else {
                line.innerHTML = message;
            }
            output.scrollTop = output.scrollHeight;
        }

        init(userName) {
            this.userName = userName;
            this.updateUI();
             const welcomeMessage1 = `<span class="text-cyan bold">Initialisation de AOS_Core v25.0...</span>`;
            const welcomeMessage2 = `Bienvenue, ${this.userName}.`;
            this.log(welcomeMessage1, '', true);
            setTimeout(() => this.log(welcomeMessage2, '', true), 800);
        }

        exploreDoor(doorNumber) {
            if (this.inEncounter) return;
            this.log(`<span class="text-yellow">${this.userName}> explorer ${doorNumber}</span>`, '', false);

            const doorButton = doorsGrid.children[doorNumber - 1];
            doorButton.classList.add('door-visited');

            if (!this.visitedDoors.has(doorNumber)) {
                if (Math.random() < 0.5) {
                    this.log("La porte révèle son secret sans résistance...");
                    this.firstVisit(doorNumber);
                } else {
                    this.log("Le chemin vers la connaissance est une épreuve...");
                    this.revisitDoor(true, doorNumber);
                }
            } else {
                this.revisitDoor(false, null);
            }
        }

        firstVisit(doorNumber) {
            this.visitedDoors.add(doorNumber);
            let archetype = this.guardianDoors[doorNumber] || Object.keys(CHARACTERS)[doorNumber % Object.keys(CHARACTERS).length];
            const chaosArchetypes = ["Destructeur", "Joueur", "Opportuniste"];
            if (chaosArchetypes.includes(archetype)) this.chaosLevel++; else this.chaosLevel--;
            const keyName = `Clé_${archetype.substring(0,3)}_${doorNumber}`;
            this.inventory[archetype] = keyName;
            this.log(`Porte détectée : <span class="bold">${archetype}</span> ${CHARACTERS[archetype]}`);
            this.log(`<span class="text-green bold">TRANSMUTATION ACHEVÉE.</span> La porte a révélé la '${keyName}'.`);
            this.updateUI();
        }

        revisitDoor(isFirstVisit = false, doorNumber = null) {
            this.log(isFirstVisit ? "" : "Cette porte a déjà été explorée... <span class='text-grey'>L'univers est en mouvement...</span>");
            this.inEncounter = true;
            this.encounterAttempts = 0;

            const encounterPool = Math.random() < 0.5 * (1 - this.chaosLevel * 0.1) ? this.encounterEngine.positive : this.encounterEngine.negative;
            this.currentEncounter = {...randomChoice(encounterPool), isFirstVisit, doorNumber};

            if (this.currentEncounter.type === 'negative' && Object.keys(this.inventory).length === 0 && !isFirstVisit) {
                 this.log("<span class='text-grey'>Une ombre passe, mais ne trouve aucune prise.</span>");
                 this.endEncounter(); return;
            }

            entityArt.innerHTML = this.currentEncounter.character;
            const entityColor = this.currentEncounter.type === 'positive' ? 'text-green' : 'text-red';
            entityDialogue.innerHTML = `<span class="${entityColor} bold">${this.currentEncounter.entity}</span> vous interpelle...`;

            let challengeText = this.currentEncounter.challenge;
            if(challengeText.includes('{}')) {
                const itemToCorrupt = randomChoice(Object.keys(this.inventory));
                this.currentEncounter.malusItem = itemToCorrupt;
                const corruptionCode = shuffleString(this.inventory[itemToCorrupt]);
                challengeText = challengeText.replace('{}', `<span class="bold text-magenta">${corruptionCode}</span>`);
                this.currentEncounter.answer = corruptionCode;
            }

            setTimeout(() => {
                entityDialogue.innerHTML = `<span class="${entityColor} bold">${this.currentEncounter.entity}</span>: <br/>'${challengeText}'`;
            }, 1000);
        }

        handleEncounter(answer) {
            const encounter = this.currentEncounter;
            this.encounterAttempts++;

            if(answer.toLowerCase() === encounter.answer?.toLowerCase()) {
                if(encounter.isFirstVisit) { this.firstVisit(encounter.doorNumber); }
                else if (encounter.type === 'positive') {
                    this.inventory[encounter.entity] = encounter.reward;
                    this.log(`<span class="text-green bold">Votre sagesse est grande.</span> Clé ajoutée : '${encounter.reward}'.`);
                } else { this.log(`<span class="text-green bold">Vous repoussez la corruption.</span>`); }
                this.endEncounter();
            } else if (this.encounterAttempts >= 3) {
                if(encounter.type === 'positive') {
                    this.log(`<span class="text-yellow">L'entité disparaît. La sagesse vous a échappé.</span>`);
                } else {
                    const keyLost = this.inventory[encounter.malusItem];
                    delete this.inventory[encounter.malusItem];
                    this.log(`<span class="text-red bold">L'ombre consume votre artefact...</span> La clé '${keyLost}' a disparu.`);
                }
                if (encounter.isFirstVisit) { this.log("La porte reste scellée pour l'instant."); }
                this.endEncounter();
            } else {
                 this.log(`Tentative ${this.encounterAttempts}/3. <span class="text-yellow">Incorrect.</span>`);
            }
        }

        endEncounter() {
            this.inEncounter = false;
            this.currentEncounter = null;
            setTimeout(() => {
                entityArt.innerHTML = "";
                entityDialogue.innerHTML = "";
            }, 2000);
            this.updateUI();
        }

        updateUI() {
            this.updateBell();
            this.updateCommunityProgress();
            this.updateInventory();
        }

        updateBell() {
             let colorClass = "text-yellow";
             if (this.chaosLevel > 2) colorClass = "text-magenta";
             if (this.chaosLevel < -2) colorClass = "text-cyan";
             bellArtDisplay.className = colorClass;
             userNameDisplay.className = `bold ${colorClass}`;
             bellArtDisplay.textContent = `                     ,gggg,
                    / OFFENSIVE  \\\\          NOYAU AOS v25.0
                   |   SECURITY   |         Opérationnel
                   |              |
                   |   ,g,   ,g,    |         Analyste: ${this.userName}
                   |   'G'   'G'    |
                   |   gg,   gg,    |
                   (       .      )
                    \\\\     / \\\\     /
                     \`ggg'   \`ggg'`;
        }

        updateCommunityProgress() {
            charIcons.innerHTML = '';
            for(const archetype in CHARACTERS) {
                const icon = document.createElement('span');
                icon.textContent = CHARACTERS[archetype] + ' ';
                icon.className = this.inventory[archetype] ? 'text-green' : 'text-grey';
                charIcons.appendChild(icon);
            }
        }

        updateInventory() {
            inventoryList.innerHTML = '';
             if (Object.keys(this.inventory).length === 0) {
                inventoryList.innerHTML = 'Votre inventaire est vide.';
            } else {
                for (const archetype in this.inventory) {
                    const item = document.createElement('div');
                    item.innerHTML = `<span class="bold">${CHARACTERS[archetype] || '✨'} ${archetype}:</span> <span class="text-green">${this.inventory[archetype]}</span>`;
                    inventoryList.appendChild(item);
                }
            }
        }

        reveal_final_reward() {
            this.log("<hr>!!! LA GRANDE ŒUVRE VOUS EST RÉVÉLÉE !!!", "text-yellow bold");
            this.log("Vous avez résolu toutes les énigmes. Vous n'obtenez pas une réponse, mais une compréhension.", "text-yellow");
            this.log("Voici les deux visions de la Singularity Bell, fruit de l'union de la Sagesse et de la Logique.", "text-yellow");
            this.log("<hr>", '', false);

            const vision1 = document.createElement('div');
            vision1.innerHTML = `<h4 class="text-cyan">Vision d'Archimède (Le Corps Terrestre)</h4><img src="Gemini_Generated_Image_slhi8islhi8islhi.png" alt="Vision d'Archimède" style="max-width: 100%;">`;
            output.appendChild(vision1);

            const vision2 = document.createElement('div');
            vision2.innerHTML = `<h4 class="text-cyan">Vision de Logos (L'Âme Céleste)</h4><img src="Gemini_Generated_Image_9loxid9loxid9lox.png" alt="Vision de Logos" style="max-width: 100%;">`;
            output.appendChild(vision2);

            this.log("<hr>", '', false);
            this.log("'La vérité n'est pas une image, mais la stéréoscopie de deux visions.'", "bold");
            output.scrollTop = output.scrollHeight;
        }

        showInventory() {
            this.log("--- INVENTAIRE ALCHIMIQUE ---", "text-yellow bold");
            if (Object.keys(this.inventory).length === 0) {
                this.log("Votre inventaire est vide.");
            } else {
                for (const archetype in this.inventory) {
                    this.log(`<span class="bold">${CHARACTERS[archetype] || '✨'} ${archetype}:</span> <span class="text-green">${this.inventory[archetype]}</span>`, '', false);
                }
            }
        }

        showHelp() {
            this.log("--- AIDE ---", "text-cyan bold");
            this.log("Commandes disponibles:", "text-cyan");
            this.log("<span class='bold'>explorer [1-137]</span> - Explore une porte.", "text-cyan", false);
            this.log("<span class='bold'>synthétiser [archétype1] [archétype2]</span> - Tente de combiner deux clés.", "text-cyan", false);
            this.log("<span class='bold'>inventaire</span> - Affiche vos clés.", "text-cyan", false);
            this.log("<span class='bold'>aide</span> - Affiche cette aide.", "text-cyan", false);
            this.log("<span class='bold'>quitter</span> - Termine la session.", "text-cyan", false);
        }

        // NOUVEAU : Logique de l'Autel Alchimique
        handleSynthesis(commandParts) {
            if (commandParts.length !== 3) {
                this.log("Usage : synthétiser [Archétype1] [Archétype2]", "text-red");
                return;
            }
            const archetype1 = commandParts[1].charAt(0).toUpperCase() + commandParts[1].slice(1).toLowerCase();
            const archetype2 = commandParts[2].charAt(0).toUpperCase() + commandParts[2].slice(1).toLowerCase();

            if (!this.inventory[archetype1] || !this.inventory[archetype2]) {
                this.log("Une ou plusieurs clés sont manquantes dans votre inventaire.", "text-red");
                return;
            }

            this.log(`<span class="text-magenta">>> Tentative de synthèse entre ${archetype1} et ${archetype2}...</span>`);

            // Crée une clé de recette unique et ordonnée
            const recipeKey = [archetype1, archetype2].sort().join('_');

            if (this.synthesisRecipes[recipeKey]) {
                const revelation = this.synthesisRecipes[recipeKey];
                if (recipeKey === "Artiste_Vétéran") { // Cas de succès
                    this.log(revelation, "text-green bold");
                    this.inventory['Synthèse_Souffrance'] = 'Fragment_de_Vérité_01';
                    this.updateUI();
                } else { // Cas d'échec guidé
                    this.log(revelation, "text-yellow");
                }
            } else {
                this.log("Ces deux forces ne semblent pas avoir de résonance évidente. La quête continue.", "text-grey");
            }
        }

        handleCommand(command) {
            if(this.inEncounter) {
                this.log(`<span class="text-yellow">${this.userName}> ${command}</span>`, '', false);
                this.handleEncounter(command);
                return;
            }

            this.log(`<span class="text-yellow">${this.userName}> ${command}</span>`, '', false);
            const parts = command.split(' ');
            const action = parts[0].toLowerCase();

            switch(action) {
                case "explorer":
                    if (parts.length === 2) {
                        const doorNum = parseInt(parts[1]);
                        if (!isNaN(doorNum) && doorNum >= 1 && doorNum <= 137) {
                            this.exploreDoor(doorNum);
                        } else {
                            this.log(`<span class="text-red">Numéro de porte invalide.</span>`);
                        }
                    } else {
                        this.log("Usage: explorer [1-137]", "text-red");
                    }
                    break;
                case "synthétiser":
                    this.handleSynthesis(parts);
                    break;
                case "inventaire":
                    this.showInventory();
                    break;
                case "aide":
                    this.showHelp();
                    break;
                case "reward": // Commande cachée pour tester
                    this.reveal_final_reward();
                    break;
                default:
                    this.log(`<span class="text-red">Commande non reconnue. Tapez 'aide' pour la liste des commandes.</span>`);
            }
        }
    }

    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const shuffleString = (str) => str.split('').sort(() => 0.5 - Math.random()).join('');

    let core;
    const line1 = document.createElement('div');
    output.appendChild(line1);
    typeWriter(line1, 'Veuillez entrer votre nom d\\\'analyste :', () => input.focus());
    input.addEventListener('keydown', function handleInput(event) {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            if (command.toLowerCase() === 'quitter') {
                core.log("Fin de la session d'analyse.", "text-cyan");
                input.disabled = true;
                return;
            }

            input.value = '';

            if (!core) {
                const userName = command || 'Anonyme';
                output.innerHTML = '';
                core = new AOS_Core_JS();
                core.init(userName);
            } else {
                core.handleCommand(command);
            }
        }
    });
});

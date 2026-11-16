/**
 * Catálogo de arte do SombraNeon: uma linha por imagem a gerar (token de ator ou ícone de item).
 * Fonte única dos prompts (docs/sombraneon-arte-prompts.md) e do mapeamento imagem -> documento do Foundry.
 *
 * Entrada: [identifier, assunto (inglês, vai no prompt), foco da cor de destaque].
 * `scope` = pacote (module = sombraneon-compendium, carga = sombraneon-carga-sem-nome),
 * `pack` = compêndio, `kind` = token (medalhão redondo de ator) ou item (ícone quadrado).
 */

export const COLORS = {
  amber: 'amber yellow',
  red: 'blood red',
  orange: 'hot orange',
  cyan: 'electric cyan',
  magenta: 'hot magenta',
  green: 'acid green',
  violet: 'electric violet',
  blue: 'electric blue'
};

export const GROUPS = [
  /* ============================ ARMAS ============================ */
  {
    scope: 'module', pack: 'armas', kind: 'item', spot: 'red', label: 'Armas brancas',
    entries: [
      ['faca', 'a tactical combat knife with a serrated spine, wrapped grip and a short guard, lying diagonally', 'a thin glowing line along the cutting edge'],
      ['soqueira', 'a heavy chrome knuckle duster with four finger holes and short studs on the front', 'the studs on the front'],
      ['bastao-de-choque', 'a collapsible shock baton with a ribbed handle and a forked electrode tip', 'the arc of current between the two electrode prongs'],
      ['katana-monofio', 'a katana in a plain black wrapped hilt with a perfectly straight blade, a hairline monofilament edge', 'the hairline edge glowing along the whole blade'],
      ['marreta-cibernetica', 'a two-handed sledgehammer with a block head, a hydraulic piston running up the shaft and a counterweight at the base', 'the hydraulic piston']
    ]
  },
  {
    scope: 'module', pack: 'armas', kind: 'item', spot: 'amber', label: 'Armas de fogo e inteligentes',
    entries: [
      ['pistola-leve', 'a slim compact handgun with a short barrel and a small magazine, side profile', 'the muzzle'],
      ['pistola-pesada', 'a large heavy handgun with a thick slide, a long barrel and a big magazine, side profile', 'the muzzle and the front sight'],
      ['submetralhadora', 'a compact submachine gun with a long curved magazine, a folding stock and a short barrel, side profile', 'the magazine window'],
      ['escopeta', 'a pump-action combat shotgun with a short barrel, a ribbed pump grip and a shell holder on the stock', 'the shell holder shells'],
      ['fuzil', 'an assault rifle with a red-dot optic, a curved magazine and a short stock, side profile', 'the optic lens'],
      ['rifle-de-precisao', 'a long precision sniper rifle with a big scope, a bipod folded under the barrel and a cheek rest, side profile', 'the scope lens'],
      ['arma-inteligente', 'a smart pistol with a small camera-eye module on top of the slide, a cable running to a wrist link and a floating holographic reticle in front', 'the holographic reticle']
    ]
  },
  {
    scope: 'module', pack: 'armas', kind: 'item', spot: 'orange', label: 'Armas pesadas pessoais',
    entries: [
      ['metralhadora-leve', 'a belt-fed light machine gun with a bipod, a perforated barrel shroud and an ammunition box hanging below', 'the ammunition belt'],
      ['lanca-granadas', 'a revolver-style grenade launcher with a fat rotating drum, a short barrel and a pistol grip, side profile', 'the grenade tips in the drum'],
      ['lanca-foguetes', 'a shoulder-fired rocket launcher: a long open tube with a front flare, a rear venturi, a grip and a simple sight', 'the rocket nose inside the tube'],
      ['rifle-anti-material', 'an enormous anti-materiel rifle with a huge muzzle brake, a thick barrel, a bipod and a big scope, side profile', 'the muzzle brake'],
      ['minigun', 'a six-barrel rotary minigun with a carry handle and a thick ammunition feed hose to a backpack drum', 'the spinning barrel cluster tips'],
      ['lanca-chamas', 'a flamethrower with two cylindrical fuel tanks on a back frame, a hose and a gun-like nozzle with a pilot flame', 'the pilot flame at the nozzle'],
      ['rifle-de-trilho-portatil', 'a heavy portable railgun rifle with two parallel metal rails along the barrel, capacitor coils and a stock', 'the capacitor coils between the rails'],
      ['canhao-de-plasma-portatil', 'a bulky shoulder plasma cannon with a wide glass-like chamber, cooling fins and a flared muzzle', 'the plasma inside the chamber'],
      ['lanca-misseis-portatil', 'a shoulder-fired guided missile launcher: a boxy tube, a folded guidance optic on the side and a battery pack', 'the guidance optic'],
      ['morteiro-portatil', 'a portable mortar: a short smooth tube on a round base plate with two bipod legs and a sight dial, a shell next to it', 'the shell tip']
    ]
  },
  {
    scope: 'module', pack: 'armas', kind: 'item', spot: 'orange', label: 'Armas de veículo e de cerco',
    entries: [
      ['metralhadora-leve-veiculo', 'a vehicle-mounted light machine gun on a swivel pintle post with an ammunition box and a small armor plate', 'the muzzle flash hider'],
      ['lanca-granadas-veiculo', 'a vehicle-mounted automatic grenade launcher on a swivel mount with a round ammo drum', 'the grenade drum'],
      ['metralhadora-pesada', 'a heavy machine gun on a pedestal mount with a shield plate, an ammo belt and a heavy barrel', 'the ammo belt'],
      ['canhao-automatico-30-mm', 'a 30 mm autocannon in a small stabilised turret with a long barrel and a belt feed', 'the muzzle'],
      ['lancador-de-foguetes', 'a rocket pod with a grid of twelve round tubes on a swivel mount', 'the rocket noses in the tubes'],
      ['lancador-de-misseis', 'a twin missile rack on a swivel mount, two slender missiles with fins', 'the missile seeker heads'],
      ['canhao-emp', 'a vehicle-mounted EMP cannon: a wide parabolic dish emitter with coils on an armored arm', 'the emitter coil in the dish'],
      ['canhao-antiaereo-duplo', 'a twin anti-aircraft cannon on a rotating mount with two long parallel barrels and a gunner seat', 'the two muzzles'],
      ['lancador-de-misseis-sam', 'a surface-to-air missile launcher: four large missile canisters on a rotating platform, tilted upward', 'the missile noses'],
      ['morteiro-pesado', 'a heavy vehicle mortar: a thick tube on a recoil cradle with a baseplate and shells stacked beside it', 'the shell tips'],
      ['canhao-de-tanque-120-mm', 'a tank gun: a long barrel with a muzzle brake and a thermal sleeve, emerging from a turret mantlet', 'the muzzle brake'],
      ['laser-pesado', 'a heavy laser cannon on a turret with a large focusing lens, cooling radiators and thick power cables', 'the focusing lens'],
      ['canhao-de-trilho', 'a massive vehicle railgun with two huge parallel rails, a capacitor bank and a mount ring', 'the capacitor bank'],
      ['obus-autopropulsado', 'a self-propelled howitzer gun: a long barrel with a bore evacuator and a muzzle brake raised on a cradle, with a short armored mount', 'the muzzle brake'],
      ['lancador-multiplo-de-foguetes', 'a multiple rocket launcher: two rows of large rocket tubes on a tilted rack', 'the rocket noses']
    ]
  },

  /* ========================== ARMADURAS ========================== */
  {
    scope: 'module', pack: 'armaduras', kind: 'item', spot: 'cyan', label: 'Armaduras',
    entries: [
      ['jaqueta-blindada', 'an armored street jacket with a high collar, shoulder pads and stitched ballistic panels, hanging on an invisible hanger, front view', 'a thin glowing seam along the collar'],
      ['colete-tatico', 'a tactical plate-carrier vest with front plate, shoulder straps, modular pouches and a radio clip, front view', 'the central plate edge'],
      ['armadura-corp-pesada', 'a full heavy corporate armor suit: helmet with a slit visor, chunky chest plate, shoulder guards, thigh and shin plates, standing on a stand', 'the visor slit']
    ]
  },

  /* ========================= EQUIPAMENTO ========================= */
  {
    scope: 'module', pack: 'equipamento', kind: 'item', spot: 'cyan', label: 'Decks, firewall e nanokit',
    entries: [
      ['deck-de-rua', 'a battered homemade cyberdeck: a thick case with an exposed circuit board, a cracked small screen, patchwork stickers (abstract shapes) and dangling cables', 'the cracked screen'],
      ['deck-corp', 'a sleek corporate cyberdeck: a slim aluminium slab with a thin keyboard row, a clean screen and a row of status lights', 'the screen'],
      ['deck-militar', 'a ruggedized military cyberdeck in an armored briefcase frame with rubber bumpers, a folded antenna and heavy port covers', 'the screen'],
      ['firewall', 'a small shield-shaped data cartridge with a contact edge, being held ready for insertion', 'the shield-shaped core'],
      ['nanokit', 'an open hard case with foam slots holding injector vials of silvery fluid and a pen-shaped nanite injector', 'the vials']
    ]
  },
  {
    scope: 'module', pack: 'equipamento', kind: 'item', spot: 'green', label: 'Médico e reparo',
    entries: [
      ['kit-cirurgico', 'a surgical case opened flat with scalpels, clamps, a bone saw and a small suture reel on a tray', 'one scalpel edge'],
      ['kit-medico', 'a medical first aid bag with a zipper, a plus-shaped patch (no text), a strap and a bandage roll sticking out', 'the plus-shaped patch'],
      ['stim', 'a stim auto-injector: a stubby pen-like injector with a clear window showing liquid and a safety cap', 'the liquid in the window'],
      ['gel-de-reparo', 'a squeezable tube of repair gel with a screw cap and a dollop of gel on the nozzle, next to a small metal patch', 'the gel dollop'],
      ['pmb-braco', 'a basic mechanical prosthetic arm: a simple exposed-frame arm with a plain claw hand and a shoulder socket plate', 'the shoulder socket joint'],
      ['pmb-perna', 'a basic mechanical prosthetic leg: an exposed-frame leg with a spring knee, a pylon shin and a flat foot, plus a thigh socket', 'the knee joint']
    ]
  },
  {
    scope: 'module', pack: 'equipamento', kind: 'item', spot: 'amber', label: 'Ferramentas e suprimentos',
    entries: [
      ['kit-de-ferramentas', 'a rolled-open tool pouch holding wrenches, a lockpick set, a pry bar, a multitool and a small soldering pen', 'the lockpick tips'],
      ['rig-de-palco', 'a portable stage rig: a compact synthesizer keyboard with knobs, a mic stand clip and a light bar on a folding stand', 'the light bar'],
      ['lanterna', 'a heavy tactical flashlight with a knurled body, a wide lens head and a wrist loop', 'the beam coming out of the lens'],
      ['bateria', 'a rectangular heavy-duty power cell battery with terminals on top and a charge indicator window', 'the charge indicator window'],
      ['carregador', 'a pistol magazine with a few cartridges next to it, side view', 'the cartridge tips'],
      ['cabo-de-interface', 'a coiled interface cable with a neural jack plug on both ends', 'the jack plug tips'],
      ['radio', 'a rugged handheld radio with a stub antenna, a speaker grille, a dial and a push-to-talk button', 'the antenna tip'],
      ['racao', 'three flat sealed ration packs stacked in a fan, with a tear notch and simple abstract pictogram stripes (no text)', 'a stripe on the top pack'],
      ['rig-utilitario', 'a utility rig: a tactical harness vest with a small backpack, belt pouches and carabiners, hanging flat', 'the carabiners'],
      ['kit-de-runner', 'an open duffel bag full of runner starter gear: a pistol grip, a rolled harness, a stim pen and a cable coil sticking out', 'the stim pen']
    ]
  },
  {
    scope: 'module', pack: 'equipamento', kind: 'item', spot: 'orange', label: 'Granadas e explosivos',
    entries: [
      ['granada-de-fragmentacao', 'a classic fragmentation grenade with a segmented body, a spoon lever and a pin ring', 'the pin ring'],
      ['granada-de-atordoamento', 'a cylindrical stun grenade (flashbang) with a perforated body, a spoon lever and a pin ring', 'the burst of light from the perforations'],
      ['granada-de-fumaca', 'a smoke grenade canister with a vented top, a pin ring and smoke curling up from it', 'the pin ring'],
      ['granada-emp', 'an EMP grenade with a coil-wrapped body, crackling arcs of current around it and a pin ring', 'the crackling arcs'],
      ['granada-de-termita', 'a thermite grenade with a thick cylindrical body, a vented cap and molten drips falling from it', 'the molten drips'],
      ['granada-de-gas', 'a gas grenade canister with a hazard trefoil stripe (no text), a vented top and a pin ring, wisps of gas leaking', 'the leaking wisps'],
      ['carga-de-demolicao', 'a demolition charge: two bricks of plastic explosive strapped together with a detonator block, wires and a timer window (no digits)', 'the detonator block'],
      ['mina-antipessoal', 'a round anti-personnel landmine disc with a central pressure plate, three small prongs and a half-buried look', 'the pressure plate']
    ]
  },

  /* ========================= IMPLANTES =========================== */
  {
    scope: 'module', pack: 'implantes', kind: 'item', spot: 'violet', label: 'Implantes neurais',
    entries: [
      ['reflexos-neurais', 'a small neural reflex chip: a square processor with fine thread-like wires fanning out and pins along the bottom', 'the chip core'],
      ['alvejador-neural', 'a cybernetic eye module with a targeting reticle ring and a small rangefinder lens', 'the targeting reticle'],
      ['potencializador-mental', 'a stylised brain-shaped circuit chip with a lightning-bolt boost notch and contacts', 'the lightning-bolt notch'],
      ['jack-de-interface', 'a neural interface jack socket set in a metal plate behind a stylised ear, with a plug cable half inserted', 'the socket opening'],
      ['filtro-de-dor', 'a small disc-shaped pain dampener implant with a spiral groove and fine wires, next to a short spine segment', 'the spiral groove'],
      ['olhos-termicos', 'a pair of cybernetic eyes with segmented thermal lenses, joined by a bridge plate', 'the two lenses'],
      ['memoria-estendida', 'a stack of three memory module slabs with a connector edge and a small label stripe (no text)', 'the middle slab edge']
    ]
  },
  {
    scope: 'module', pack: 'implantes', kind: 'item', spot: 'green', label: 'Implantes de corpo',
    entries: [
      ['subderme-blindada', 'a patch of armored subdermal plating: overlapping thin metal scales on a curved skin-like backing', 'the plate seams'],
      ['quadro-cinetico', 'a kinetic frame: a lightweight exoskeletal rib-and-spine lattice that braces the torso', 'the spine joints'],
      ['coracao-cibernetico', 'a cybernetic heart: a mechanical heart with pistons, pipes and a clear chamber', 'the clear chamber'],
      ['protocolo-social', 'a social protocol implant: a small voice-box and facial muscle driver, a throat module with a tiny speaker and fine wires', 'the tiny speaker'],
      ['contrapeso', 'a counterweight implant: a compact dense metal block mounted on a spine bracket with load straps', 'the mounting bracket'],
      ['sistema-de-estimulantes', 'a stimulant system: three small vial chambers connected by thin tubes to an injector node', 'the vial fluid'],
      ['pulmoes-filtrantes', 'a pair of filtering lungs: two lung-shaped canisters with filter cartridges and tubing joined at a trachea piece', 'the filter cartridges']
    ]
  },
  {
    scope: 'module', pack: 'implantes', kind: 'item', spot: 'red', label: 'Implantes de braços',
    entries: [
      ['arma-retratil', 'a cybernetic forearm with a hidden short blade-gun slot opening, the blade half extended', 'the extended blade'],
      ['mao-tatica', 'a cybernetic hand with a pistol barrel emerging from the palm, fingers retracted', 'the barrel in the palm'],
      ['garras-de-pressao', 'a cybernetic hand with four heavy steel crushing claws and hydraulic tendons', 'the hydraulic tendons'],
      ['mao-de-precisao', 'a slender cybernetic hand with fine tool-tipped fingers, a tiny magnifier lens and a micro screwdriver tip', 'the micro tool tips'],
      ['escudo-cinetico', 'a cybernetic forearm with an unfolded kinetic shield plate, an energy field outline around it', 'the energy field outline'],
      ['cabo-gancho', 'a cybernetic forearm with a grappling cable launcher, a magnetic anchor hook extended on a line', 'the magnetic anchor hook'],
      ['injetor-embutido', 'a cybernetic forearm with a small flip-open injector bay holding a stim, a needle ready', 'the stim vial']
    ]
  },
  {
    scope: 'module', pack: 'implantes', kind: 'item', spot: 'amber', label: 'Implantes de pernas',
    entries: [
      ['molas-de-salto', 'a pair of cybernetic legs with big spring coils at the calves and shock-absorbing pistons', 'the spring coils'],
      ['motor-de-sprint', 'a cybernetic leg with a compact motor block at the hip and a drive belt running to the knee', 'the motor block'],
      ['passos-silenciosos', 'a cybernetic leg ending in a padded, soft-soled foot with damping foam inserts at the heel and sole', 'the damping inserts'],
      ['estabilizadores', 'a cybernetic leg with gyroscopic stabiliser rings at the ankle and knee', 'the gyroscopic rings'],
      ['ancoras-magneticas', 'a cybernetic foot with magnetic anchor discs on the sole, sticking to a steel plate', 'the magnetic discs'],
      ['sub-rotina-de-passo', 'a cybernetic leg with a small processor module on the thigh and fine wires running down to the joints, motion-blur ghost outlines of a sidestep', 'the processor module'],
      ['pernas-de-combate', 'a pair of reinforced cybernetic combat legs with armored shin plates, steel-toed boots and strong hydraulic knees', 'the knee hydraulics']
    ]
  },

  /* ===================== VEÍCULOS E MÓDULOS ====================== */
  {
    scope: 'module', pack: 'veiculos', kind: 'item', spot: 'cyan', label: 'Módulos de drone',
    entries: [
      ['sensor-termico', 'a drone sensor module: a round thermal camera pod with a lens and mounting clamp, a heat-map style ring behind it', 'the lens'],
      ['compartimento-de-carga', 'a drone cargo compartment: a small sealed box with a hinged lid half open, with a small package inside', 'the package inside'],
      ['placa-de-impacto', 'a drone impact plate: a curved armor shell plate with bolts and a mounting bracket', 'the bolts']
    ]
  },
  {
    scope: 'module', pack: 'veiculos', kind: 'item', spot: 'amber', label: 'Veículos terrestres civis',
    entries: [
      ['scooter-eletrica', 'an electric kick scooter-moped with a small battery deck, a handlebar and small wheels, three-quarter front view', 'the headlight'],
      ['moto-urbana', 'an urban motorcycle with a naked frame, a small windscreen, an exposed engine and a round headlight, three-quarter front view', 'the headlight'],
      ['moto-tatica', 'a tactical motorcycle with a low black fairing, armored side panels and a rifle holster, three-quarter front view', 'the headlight'],
      ['buggy-de-zona', 'a rugged wasteland buggy with a roll cage, fat tires, a bare engine and a welded scrap plate, three-quarter front view', 'the roll cage lamp'],
      ['carro-compacto', 'a small boxy city car with round headlights and a roof rack, three-quarter front view', 'the headlights'],
      ['carro-esportivo', 'a low wedge-shaped sports car with a sleek canopy and a rear spoiler, three-quarter front view', 'the underglow strip'],
      ['van-de-carga', 'a boxy cargo van with a sliding side door and a rear cargo box, three-quarter front view', 'the headlights'],
      ['caminhao-de-transporte', 'a heavy transport truck with a flat cab, a long cargo trailer box and big dual wheels, three-quarter front view', 'the cab headlights'],
      ['sedan-executivo-blindado', 'a long armored executive sedan with thick tinted windows, a heavy grille without any emblem and bulky armor pillars, three-quarter front view', 'the headlights'],
      ['suv-tatico', 'a tactical armored SUV with a roof light bar, a bull bar and a spare wheel, three-quarter front view', 'the roof light bar'],
      ['technical-caminhonete-armada', 'a pickup truck with a heavy machine gun welded on the bed, scrap armor plates and a roof guard, three-quarter front view', 'the machine gun muzzle']
    ]
  },
  {
    scope: 'module', pack: 'veiculos', kind: 'item', spot: 'cyan', label: 'Veículos aéreos e aquáticos',
    entries: [
      ['lancha', 'a fast speedboat with a pointed hull, a small windshield and an outboard engine, throwing a spray, three-quarter front view', 'the spray wake'],
      ['hoverbike', 'a hoverbike: a motorcycle-like body with two antigravity thruster pods under it instead of wheels, hovering above the ground, three-quarter front view', 'the thruster pods glow'],
      ['drone-de-transporte', 'a large four-rotor transport drone carrying a cargo box slung underneath, three-quarter front view', 'the four rotor rings'],
      ['aerocarro-civil', 'a civilian flying car: a rounded car body with two small vertical lift fans on the sides and no wheels visible, three-quarter front view', 'the lift fans'],
      ['aerocarro-corporativo', 'a luxury corporate flying car: a sleek elongated body with swept lift ducts and a tinted canopy, three-quarter front view', 'the lift ducts'],
      ['barco-de-patrulha', 'a coastal patrol boat with a light bar, a small deck gun and a covered cabin, three-quarter front view', 'the light bar'],
      ['helicoptero-leve', 'a light helicopter with a bubble cockpit, a main rotor and a tail rotor, three-quarter front view', 'the rotor disc edge']
    ]
  },
  {
    scope: 'module', pack: 'veiculos', kind: 'item', spot: 'orange', label: 'Veículos militares',
    entries: [
      ['caminhao-militar', 'a military 6x6 truck with a canvas-covered cargo bed, a heavy bumper and big tires, three-quarter front view', 'the headlights'],
      ['blindado-de-transporte-apc', 'an eight-wheeled armored personnel carrier with a boxy hull, a small remote weapon station and slit windows, three-quarter front view', 'the weapon station barrel'],
      ['tanque-leve', 'a light tank with a low hull, narrow tracks and a turret with a medium gun, three-quarter front view', 'the gun muzzle'],
      ['tanque-pesado', 'a heavy main battle tank with a wide hull, thick track skirts and a big turret with a long gun, three-quarter front view', 'the gun muzzle'],
      ['plataforma-de-artilharia', 'a tracked artillery platform with a large howitzer barrel raised on an armored mount, three-quarter front view', 'the barrel muzzle brake'],
      ['helicoptero-de-ataque', 'an attack helicopter with a narrow tandem cockpit, stub wings with rocket pods and a chin cannon, three-quarter front view', 'the chin cannon'],
      ['vtol-de-assalto', 'an assault VTOL aircraft with two large tilting ducted rotors, a broad fuselage and side door guns, three-quarter front view', 'the ducted rotors'],
      ['fragata-costeira', 'a coastal frigate warship with a pointed bow, a bow gun, a bridge tower and missile cells, three-quarter front view', 'the bow gun']
    ]
  },
  {
    scope: 'module', pack: 'veiculos', kind: 'item', spot: 'orange', label: 'Exoesqueletos e mechas',
    entries: [
      ['exoesqueleto-de-carga', 'a wearable cargo exoskeleton: an open lifting frame with hydraulic limbs, an operator seat harness and clamp hands, front three-quarter view', 'the hydraulic pistons'],
      ['exoesqueleto-de-combate', 'a wearable combat exoskeleton with armor plates, an operator cage, a light weapon arm and hydraulic limbs, front three-quarter view', 'the weapon arm'],
      ['exoesqueleto-pesado', 'a heavy wearable exoskeleton with thick armor, big shoulder guards, huge hydraulic fists and a closed visor, front three-quarter view', 'the hydraulic fists'],
      ['mecha-de-carga', 'a four-metre cargo mecha: a boxy worker mech with a glass cockpit bubble, two heavy lifting arms and stubby legs, front three-quarter view', 'the cockpit bubble'],
      ['mecha-de-arena', 'a three-and-a-half metre arena fighting mech with armored fists, a rounded helmet head and dented plates, front three-quarter view', 'the head sensor'],
      ['mecha-caminhante', 'a light bipedal walker mech with reverse-jointed legs, a cockpit on top and a small cannon arm, front three-quarter view', 'the cannon'],
      ['mecha-aranha', 'a light spider mech with four long articulated legs, a low armored cockpit body and a small gun, front three-quarter view', 'the cockpit'],
      ['mecha-cavalo', 'a quadruped mech shaped like a horse with four digitigrade legs, a rider cockpit on the back and a front cannon, three-quarter view', 'the cockpit'],
      ['mecha-sentinela', 'a medium sentinel mech: a bipedal armored mech with a wide chest, a sensor head and twin shoulder cannons, front three-quarter view', 'the sensor head'],
      ['mecha-golias', 'a heavy goliath mech with massive plated legs, huge arms with a gun on each, a small head and shoulder missile racks, front three-quarter view', 'the shoulder missile racks'],
      ['mecha-tita', 'a colossal titan mech towering and monumental, with a fortress-like torso, giant cannons on both arms and a tiny glowing head sensor, low angle view', 'the head sensor']
    ]
  },
  {
    scope: 'module', pack: 'veiculos', kind: 'item', spot: 'green', label: 'Módulos de veículo',
    entries: [
      ['modulo-blindagem-reforcada', 'a stack of thick bolted armor plates with a mounting rail, one plate leaning against the stack', 'the bolt heads'],
      ['modulo-pneus-e-esteiras-reforcados', 'a heavy reinforced tire with deep tread beside a short length of tank track, both studded', 'the tread studs'],
      ['modulo-motor-turbo', 'a compact turbocharged engine block with a big snail-shaped turbine, intake pipes and exhaust flare', 'the turbine'],
      ['modulo-jammer-e-ecm', 'a jammer box with three antennas and a radar-like dish emitting wavy concentric arcs', 'the concentric arcs'],
      ['modulo-interface-neural', 'a neural interface module: a control box with a jack socket and a cable ending in a neural plug, with a seat headrest cradle', 'the jack socket'],
      ['modulo-controle-de-armas-integrado', 'an integrated weapons control module: a pistol-grip joystick console linked by cables to a small weapon turret icon, a heads-up screen', 'the heads-up screen'],
      ['modulo-camuflagem-termica-e-optica', 'a camouflage module: a panel of hexagonal adaptive tiles fading to transparency at the edge', 'the hexagonal tile glow'],
      ['modulo-fumaca-e-chaff', 'a smoke and chaff launcher: a row of four angled tubes with smoke puffs and glittering chaff strips escaping', 'the chaff strips'],
      ['modulo-blindagem-anti-emp', 'an anti-EMP shielding module: a metal mesh cage box with a lightning bolt deflecting off it', 'the deflected lightning bolt'],
      ['modulo-cabine-blindada', 'an armored cockpit capsule with thick walls, a narrow slit window and a hatch ring', 'the slit window'],
      ['modulo-compartimento-secreto', 'a false-bottom secret compartment: a vehicle floor panel lifted at an angle to show a hidden cavity with a package inside', 'the package inside the cavity'],
      ['modulo-autonomia-estendida', 'an extended range module: a large fuel tank and a battery bank wired together, a gauge dial on top (no digits)', 'the gauge needle'],
      ['modulo-assentos-extras', 'two folding extra seats with harness belts, shown folded out from a wall rail', 'the harness buckles'],
      ['modulo-reparo-automatico', 'an auto-repair module: a compact box with two small articulated repair arms, a weld torch and a spray nozzle', 'the weld torch spark'],
      ['modulo-sensores', 'a sensor mast with a radar dish, a thermal camera pod and small antennas', 'the thermal camera lens'],
      ['modulo-escudo-energetico', 'an energy shield projector: a circular emitter on a short pylon projecting a hexagon-pattern dome outline', 'the dome outline'],
      ['modulo-propulsores-de-salto', 'a pair of jump jet thruster nozzles on a mounting plate, blasting flames downward', 'the flames'],
      ['modulo-sistema-de-ejecao', 'an ejection seat firing upward from a cockpit hatch, with a rocket motor under it and the canopy flying off', 'the rocket motor flame']
    ]
  },

  /* ============================== ICE ============================ */
  {
    scope: 'module', pack: 'ice', kind: 'token', spot: 'magenta', label: 'ICE do livro principal',
    entries: [
      ['sentinela', 'a floating sentry program drawn as a hovering spherical eye with a single watchful pupil, a small antenna and a ring of tiny sensors', 'the pupil'],
      ['enxame', 'a malicious computer virus drawn as a swirling swarm of many small angular cubes and spiked virus particles that glitch and multiply, a purely abstract digital organism with barbed spikes and fractured pixel fragments, absolutely no person, no human figure, no hands, no face', 'a few cubes and spike tips'],
      ['cao-de-guarda', 'a guard-dog program drawn as an angular robotic hound made of wireframe-like plates, jaws open, in an attack stance', 'the jaw interior'],
      ['executor', 'an executor program drawn as a tall armored humanoid figure with a smooth featureless head and one oversized clenched fist', 'the fist'],
      ['muralha', 'a wall program drawn as a massive golem built from stacked firewall bricks with two small glowing slit eyes', 'the eye slits']
    ]
  },
  {
    scope: 'module', pack: 'ice', kind: 'token', spot: 'magenta', label: 'ICE adicional',
    entries: [
      ['labirinto', 'a labyrinth program drawn as a sphere made of maze walls with several false doorways', 'one real doorway'],
      ['sanguessuga', 'a leech program drawn as a fat cable-body creature latched onto a battery, a round toothed sucker mouth', 'the toothed mouth'],
      ['espelho', 'a mirror program drawn as a tall faceted polygon with a mirror face reflecting a distorted copy of itself', 'the reflected copy'],
      ['cadeado', 'a lock program drawn as a giant padlock wrapped in heavy chains with a keyhole eye', 'the keyhole'],
      ['cacador', 'a hunter program drawn as a lean predator hound-like figure with long claws and a single tracking eye on a long snout', 'the tracking eye'],
      ['carrasco', 'an executioner program drawn as a hooded tall figure with an empty dark face holding a large data axe', 'the axe blade'],
      ['hidra', 'a hydra program drawn as three serpent heads made of thick cables rising from a single knot, jaws open', 'the three heads\' eyes']
    ]
  },
  {
    scope: 'module', pack: 'ice', kind: 'token', spot: 'green', label: 'Malware',
    entries: [
      ['spyware', 'a spyware program drawn as a small insect-like bug with a single big camera lens eye and thin legs', 'the lens'],
      ['worm', 'a worm program drawn as a long segmented worm made of square data blocks, curling', 'the head segment'],
      ['virus-de-implante', 'an implant virus drawn as a spiky virus particle shaped like a syringe tip, surrounded by tiny implant chips', 'the needle tip'],
      ['ransomware', 'a ransomware program drawn as a heavy locked strongbox wrapped in a chain with a padlock and a glowing slot, a demanding open hand beneath it', 'the padlock'],
      ['bomba-logica', 'a logic bomb program drawn as a round bomb with a fuse made of a circuit trace and a small sleeping eye on its surface', 'the fuse tip']
    ]
  },

  /* =========================== AMEAÇAS =========================== */
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'amber', label: 'Gente da rua',
    entries: [
      ['civil', 'an ordinary city dweller in a hooded raincoat clutching a plastic delivery bag, nervous posture, waist-up', 'a small neon tag on the bag'],
      ['viciado-em-stim', 'a gaunt twitchy stim addict with huge wide eyes and trembling hands holding a dirty knife, empty injector tubes taped to the forearm, waist-up', 'the wide pupils'],
      ['fixer', 'a sharp-dressed fixer in a long coat holding a data slate with a smug half-smile and a small earpiece, waist-up', 'the earpiece'],
      ['medico-de-beco', 'a back-alley doctor in a stained apron and magnifier goggles holding a scalpel with a worn medical bag on the shoulder, waist-up', 'the goggle lenses'],
      ['hacker-de-rua', 'a hunched street hacker in an oversized hoodie typing on a battered cyberdeck balanced on one arm, a cable running to a neck jack, waist-up', 'the deck screen']
    ]
  },
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'magenta', label: 'Gangues',
    entries: [
      ['capanga', 'a gang thug in a patched studded jacket with a heavy brow and a cheap chrome jaw plate, holding a machete in one hand and a pistol in the other, waist-up', 'the chrome jaw plate'],
      ['atirador-de-gangue', 'a gang shooter in a bandana holding a submachine gun sideways at hip height, a bandolier of magazines across the chest, waist-up', 'the muzzle flash'],
      ['motoqueiro', 'a gang biker in a spiked leather jacket and goggles sitting on an urban motorcycle and swinging a chain, three-quarter view', 'the motorcycle headlight'],
      ['brutamontes-cromado', 'a huge hulking cyborg bruiser with steel fists, enormous chrome shoulders and a tiny head, swinging a cybernetic sledgehammer, waist-up', 'the cybernetic eye'],
      ['lider-de-gangue', 'a gang leader in a long coat with a studded collar and a scarred chrome cheek, a katana in one hand and a heavy pistol in the other, waist-up', 'the katana edge']
    ]
  },
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'blue', label: 'Lei e segurança',
    entries: [
      ['policial-urbano', 'a patrol police officer in a bulletproof vest and a visored helmet holding a shock baton and a pistol, waist-up', 'the helmet visor strip'],
      ['seguranca-corporativa', 'a corporate security guard in a dark suit with a ballistic vest under it, a radio earpiece and a pistol held low, waist-up', 'the earpiece'],
      ['tropa-de-choque', 'a riot trooper in heavy armor behind a big transparent riot shield, holding an anti-riot shotgun, waist-up', 'the shield edge'],
      ['agente-corporativo-de-campo', 'a corporate field agent in a sleek tailored suit with cybernetic eyes, a smart pistol in each hand and a katana sheathed on the back, waist-up', 'the cybernetic eyes'],
      ['atirador-de-elite', 'a sniper kneeling with a long scoped precision rifle, urban tactical gear and a cap, three-quarter view', 'the scope lens'],
      ['comandante-de-seguranca', 'a security commander in a long coat with a command headset, holding two heavy pistols, stern face, waist-up', 'the headset']
    ]
  },
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'orange', label: 'Mercenários e militares',
    entries: [
      ['mercenario', 'a mercenary in mismatched tactical gear with a face-covering scarf holding an assault rifle at the ready, waist-up', 'the rifle optic'],
      ['soldado-de-esquadrao', 'a squad soldier in full tactical armor with a helmet and a thermal visor holding an assault rifle, waist-up', 'the thermal visor'],
      ['operador-de-elite', 'a special operations assassin in a sleek matte suit and balaclava holding two silenced pistols with a mono-blade at the hip, faint shimmer lines of optical camouflage around the body, waist-up', 'the camouflage shimmer lines'],
      ['comandante-de-esquadrao', 'a squad commander in heavy armor with an antenna on the helmet, holding a rifle with a grenade on the belt, pointing orders, waist-up', 'the helmet antenna'],
      ['soldado-de-linha-pesada', 'a heavy line soldier inside a hulking exoskeleton with a light machine gun mounted on one arm and a hydraulic fist on the other, three-quarter view', 'the hydraulic pistons']
    ]
  },
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'cyan', label: 'Cibernéticos, sintéticos e aberrações',
    entries: [
      ['ciberpsicopata', 'a crazed cyberpsycho with far too much chrome, half-metal face, a wild grin and two blades extended from the forearms, waist-up', 'the glowing eye'],
      ['ciborgue-de-combate', 'a military combat cyborg, mostly military chrome, tactical hand-guns built into both palms and blade arms folded back, waist-up', 'the sensor eye'],
      ['assassino-fantasma', 'a ghost assassin in a hooded dark bodysuit holding a silent blade, parts of the body fading into thin outline lines, waist-up', 'the fading outline'],
      ['android-de-seguranca', 'a factory-made humanoid security android with a smooth matte faceplate, gray plated chassis and reinforced fists, standing at attention, waist-up', 'the scanning eye strip'],
      ['replicante-fugitivo', 'a runaway replicant that looks fully human, worn hoodie, a barcode-like tattoo on the neck (bars only, no digits), glancing over the shoulder, waist-up', 'the barcode tattoo'],
      ['android-fugitivo', 'a runaway domestic android in a stolen long coat and hat, visible seams at the joints and a plain faceplate, holding a heavy wrench, waist-up', 'the eye'],
      ['cacador-de-sinteticos', 'a synthetic hunter in a long trench coat holding a handheld scanner in one hand and a shock baton in the other, a heavy pistol on the belt, waist-up', 'the scanner screen'],
      ['mutante-da-zona', 'a mutated wasteland dweller with elongated clawed arms, patchy plated skin and tattered clothes, a radiation hazard patch on the shoulder, waist-up', 'the glowing eyes'],
      ['experimento-fugido', 'a lab experiment gone wild: a hulking body with three thrashing tentacles, broken lab restraints and tubes dangling from it, waist-up', 'the bioluminescent veins'],
      ['abominacao', 'a giant abomination, a mass of flesh and metal filling the whole frame, many limbs, pipes, bolted plates and a cluster of eyes', 'the cluster of eyes']
    ]
  },
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'red', label: 'Máquinas',
    entries: [
      ['drone-de-vigilancia', 'a small flying surveillance drone: a spherical body with one large camera lens and four small rotors, three-quarter view', 'the lens'],
      ['drone-de-combate', 'a compact armed combat drone with two ring rotors and an autocannon under the belly, three-quarter view', 'the gun muzzle'],
      ['enxame-de-drones', 'a swirling cloud of tiny stinger micro-drones forming one buzzing swarm shape', 'a few sting tips'],
      ['torreta', 'a fixed machine-gun turret on a tripod pedestal with a sensor dome and an ammunition belt, three-quarter view', 'the sensor dome'],
      ['cao-cibernetico', 'a cybernetic guard dog with a steel jaw and exposed hydraulic legs, mid-lunge, side view', 'the eye'],
      ['robo-de-seguranca', 'a bipedal security robot with a matte hull, a taser rod in one hand and a blocky head with a single visor slit, full figure', 'the visor slit'],
      ['robo-pesado-de-combate', 'a heavy combat robot with an armored hull, two hand cannons and a shoulder missile pod, full figure', 'the missile pod']
    ]
  },
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'green', label: 'Fauna urbana',
    entries: [
      ['enxame-de-ratos', 'a surging swarm of sewer rats piled together into one heaving mass, many tails and teeth', 'the glowing eyes of a few rats'],
      ['cao-feral', 'a thin feral street dog with ribs showing and torn ears, snarling, side view', 'the eyes']
    ]
  },
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'blue', label: 'Corporações e hackers',
    entries: [
      ['executivo-corporativo', 'a corporate executive in an expensive suit with slicked-back hair and a confident smile, holding a compact pistol, waist-up', 'the smart watch'],
      ['diretor', 'a corporate director in a long coat with a heavy pistol in hand, imposing posture, a ring of faint holographic lines around them, waist-up', 'the holographic lines'],
      ['netrunner-corporativo', 'a corporate netrunner in a neat office uniform with a sleek corp deck strapped to the forearm and a neural cable at the temple, waist-up', 'the deck display'],
      ['netrunner-mestre', 'a master netrunner in a long cloak of cables with a military deck on the back and glowing jack ports along the neck and temples, hands raised mid-hack, waist-up', 'the jack ports']
    ]
  },
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'violet', label: 'Cultos',
    entries: [
      ['fiel', 'a cult follower in a plain robe with a small chrome pendant holding a rough knife, a devout stare, waist-up', 'the pendant'],
      ['zelote', 'a cult zealot in a robe patched with armor plates holding a spiked baton and a pistol, a fanatical grin, waist-up', 'the spiked baton'],
      ['sacerdote', 'a cult priest in an ornate robe holding a ritual staff, a halo-shaped ring implant glowing behind the head, waist-up', 'the halo ring'],
      ['profeta', 'a cult prophet with a tall crown-like headpiece of antennas, two ritual blades and arms spread wide, waist-up', 'the antenna crown']
    ]
  },
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'cyan', label: 'IAs',
    entries: [
      ['mordomo', 'a polite domestic AI butler drawn as a slim chrome bust with a simple expressive display face and a floating white-gloved hand', 'the display face'],
      ['zeladora', 'a caretaker building AI drawn as a gentle holographic bust made of fine wire lines holding a ring of keys, small camera eyes floating around it', 'the keys'],
      ['eco', 'a fugitive AI drawn as a ghostly outline figure flickering between a small drone body and a speaker, repeated faint echo outlines trailing behind', 'the echo outlines'],
      ['madre', 'a hospital AI drawn as a large matriarchal face on a wall screen with surgical robot arms reaching out and an IV drip beside it', 'the face on the screen'],
      ['argos', 'a surveillance AI drawn as a face made of dozens of camera lenses arranged on a dark disc', 'one lens'],
      ['cobalto', 'a bank AI drawn as a cold geometric face on a round vault door, with concentric lock rings and coin-shaped eyes (no symbols or text)', 'the coin-shaped eyes'],
      ['oraculo', 'a prediction AI drawn as a huge floating crystalline eye above a city grid, orbit rings around it', 'the eye']
    ]
  },
  {
    scope: 'module', pack: 'ameacas', kind: 'token', spot: 'red', label: 'Veículos e mechas hostis',
    entries: [
      ['viatura-da-guarda', 'a city guard patrol car with a roof light bar and a push bar, three-quarter front view', 'the light bar'],
      ['technical-de-gangue', 'a gang technical pickup with a heavy machine gun welded to the bed and scrap armor plates, three-quarter front view', 'the machine gun muzzle'],
      ['drone-aranha', 'a spider-legged combat drone with six legs and a central gun pod, three-quarter view', 'the gun pod'],
      ['blindado-de-transporte', 'an armored personnel carrier with a boxy hull and a remote weapon station, three-quarter front view', 'the weapon station'],
      ['mecha-caminhante', 'a light bipedal walker mech with reverse-jointed legs and a small cannon arm, three-quarter front view', 'the cannon'],
      ['mecha-sentinela', 'a medium sentinel mech with a wide chest, a sensor head and twin shoulder cannons, three-quarter front view', 'the sensor head'],
      ['tanque-leve', 'a light tank with narrow tracks and a turret with a medium gun, three-quarter front view', 'the gun muzzle'],
      ['helicoptero-de-ataque', 'an attack helicopter with a tandem cockpit, stub wings with rocket pods and a chin cannon, three-quarter front view', 'the chin cannon'],
      ['mecha-golias', 'a heavy goliath mech with massive plated legs, big gun arms and shoulder missile racks, three-quarter front view', 'the missile racks'],
      ['mecha-tita', 'a colossal titan mech with a fortress-like torso and giant cannons, low angle, towering', 'the head sensor'],
      ['torreta-sentinela-autonoma', 'an autonomous sentinel turret: a tall armored pedestal with a rotating twin autocannon head and a camera dome', 'the camera dome']
    ]
  },

  /* ======================= FICHAS PRONTAS ======================== */
  {
    scope: 'module', pack: 'fichas-prontas', kind: 'token', spot: 'amber', label: 'Runners prontos (uma por classe)',
    entries: [
      ['brasa', 'Brasa, a Solo: a broad-shouldered chromed street soldier with subdermal plating glinting through the cheek, a tactical vest and a heavy pistol held low, cautious eyes, waist-up', 'the chrome cheek plate'],
      ['vetor', 'Vetor, a Netrunner: a lean natural human in a hoodie with a neural jack cable at the temple and a custom deck on the forearm, sly smile, waist-up', 'the deck screen'],
      ['sutura', 'Sutura, a Hyperdoc: a biomod medic with a surgical apron over a jacket, magnifier goggles pushed up, an injector gun in hand and stitched scars, waist-up', 'the injector gun'],
      ['nevoa', 'Névoa, a Ghost: a sleek android courier in a hooded jacket with a smooth faceplate and visible joint seams, crouched ready to run, waist-up', 'the eye strip'],
      ['riff', 'Riff, a Rocker: a natural-born club DJ and guitarist with spiky hair, a studded jacket and a portable synth-guitar slung across the chest, waist-up', 'the instrument\'s light strip'],
      ['zangao', 'Zangão, a Rigger: a chromed mechanic pilot in coveralls with tool pockets, goggles on the forehead and two small drones hovering at the shoulders, waist-up', 'the two drones']
    ]
  },

  /* ================== NOITE DAS MÁSCARAS (novos) ================= */
  {
    scope: 'module', pack: 'noite-elenco', kind: 'token', spot: 'amber', label: 'Elenco: O Curador',
    entries: [
      ['o-curador', 'a civil gallery guard in a neat uniform with a pin-on tag, passionate about art, holding a small tablet and standing next to a gallery pedestal, waist-up', 'the tablet screen']
    ]
  },
  {
    scope: 'module', pack: 'noite-fichas', kind: 'token', spot: 'violet', label: 'Runners da festa (retratos com a máscara na mão)',
    entries: [
      ['ferrugem', 'Ferrugem, a Solo in a rented tuxedo too tight over a chrome frame, rusty chrome fingers holding a skull-shaped holographic mask at the hip, waist-up', 'the holographic skull mask'],
      ['pixel', 'Pixel, a Netrunner android in a slim evening jacket with a faint seam line along the jaw, holding a pumpkin-shaped LED mask, a tablet under the arm, waist-up', 'the LED mask'],
      ['agulha', 'Agulha, a replicant Hyperdoc in an elegant gown-like dress with a hidden surgical case and a fox-shaped circuit mask held in hand, waist-up', 'the circuit fox mask'],
      ['sombra', 'Sombra, a biomod Ghost in dark formal wear with a glass cat-shaped holographic mask on the face, long gloves, waist-up', 'the glass cat mask'],
      ['estatica', 'Estática, a natural Rocker DJ in a sparkling jacket with a synth case slung on the shoulder and a prism-shaped glass mask held up, waist-up', 'the prism mask'],
      ['faisca', 'Faísca, a chromed Rigger pilot in a formal pilot-executive suit with a moth-shaped LED mask on the face and a tiny folded drone brooch on the lapel, waist-up', 'the moth LED mask']
    ]
  },
  {
    scope: 'module', pack: 'noite-itens', kind: 'item', spot: 'violet', label: 'Itens da festa',
    entries: [
      ['pistola-de-polimero', 'a disposable polymer pistol: a translucent, stubby two-shot handgun with no metal parts, visibly one-use', 'the muzzle'],
      ['embaralhador', 'a serial scrambler: a small pocket device with a ribbed casing, a clip, and a row of small switches, a thin signal wave coming out', 'the signal wave'],
      ['pele-cosmetica-descartavel', 'a disposable cosmetic skin: a thin peel-off sheet of synthetic skin partly unrolled over a mannequin hand', 'the peel edge'],
      ['mascara-caveira-de-neon', 'a holographic party mask shaped like a neon skull, a thin visor-type mask with a glowing outline', 'the skull outline'],
      ['mascara-raposa-de-circuito', 'a holographic party mask shaped like a fox with circuit traces across the muzzle and ears', 'the circuit traces'],
      ['mascara-abobora-de-led', 'a holographic party mask shaped like a pumpkin with a carved LED grin and eye holes', 'the LED grin'],
      ['mascara-gato-de-vidro', 'a holographic party mask shaped like a cat, made of glass-like faceted planes with pointed ears', 'the glass edges'],
      ['mascara-prisma-de-vidro', 'a holographic party mask shaped like a prism: a faceted triangular glass mask splitting light into stripes', 'the light stripes'],
      ['mascara-mariposa-de-led', 'a holographic party mask shaped like a moth with wing-like extensions made of LED strips', 'the LED wing strips'],
      ['bengala-bastao', 'a fancy walking cane with a silver knob and a hidden shock baton electrode slot at the tip', 'the electrode tip'],
      ['charuteira', 'an elegant cigar case, partly open, hiding a small disposable polymer pistol among the cigars', 'the pistol grip'],
      ['bisturis-de-ceramica', 'three ceramic scalpels fanned out of a slim leather case, white blades', 'the blade edges'],
      ['lamina-de-ceramica', 'a high-heeled boot with a ceramic blade sliding out from the heel, next to the hidden blade', 'the ceramic blade'],
      ['broche-drone', 'a moth-shaped jewelry brooch that is a folded micro drone, with tiny rotor wings tucked in', 'the tiny rotors'],
      ['registro-de-acessos-do-cracha', 'a data readout of access records: a floating translucent card with rows of lines and a highlighted row', 'the highlighted row'],
      ['uisque-de-barril-de-servidor', 'a glass tumbler of whisky with a few ice cubes, next to a small oak barrel shaped like a server rack unit', 'the whisky']
    ]
  },

  /* ================== CARGA SEM NOME (sem arte própria) =========== */
  {
    scope: 'carga', pack: 'carga-ameacas', kind: 'token', spot: 'magenta', label: 'Cães de Vidro, Guarda e droid',
    entries: [
      ['capanga-caes', 'a Glass Dogs gang thug with mismatched second-hand chrome limbs and proud scars, a patched jacket and a pistol, waist-up', 'the chrome limbs'],
      ['atirador-caes', 'a Glass Dogs gang shooter with a chrome arm and a bandana, aiming a submachine gun, waist-up', 'the chrome arm'],
      ['policial-urbano', 'a city guard police officer in a clean uniform with a bulletproof vest, a visored helmet and a shock baton, waist-up', 'the helmet visor strip'],
      ['droid-combate', 'a flat combat droid the size of a coffee table with two ring rotors, a weapon module under the belly and one unblinking eye, three-quarter view', 'the unblinking eye']
    ]
  },
  {
    scope: 'carga', pack: 'carga-npcs', kind: 'token', spot: 'amber', label: 'NPCs',
    entries: [
      ['motorista-jararaca', 'Eurico, a civilian truck driver in work overalls and a cap with tired eyes, gripping a steering wheel strap, waist-up', 'the cap badge'],
      ['tesoureira', 'the Treasurer of the Market: a precise middle-aged woman in a neat suit with a ledger tablet, a tight smile and cold eyes, a credit stick between her fingers, waist-up', 'the credit stick']
    ]
  },
  {
    scope: 'carga', pack: 'carga-equipamentos', kind: 'item', spot: 'orange', label: 'Equipamentos',
    entries: [
      ['item-macarico-brecha', 'a breaching torch: a pistol-grip cutting torch with a thin fuel hose, a tank and a small bright flame at the tip', 'the flame'],
      ['item-manta-faraday', 'a rolled Faraday blanket: a metallic mesh-lined blanket half unrolled with a wire-mesh texture', 'the mesh sheen'],
      ['item-radio-interceptor', 'a guard radio interceptor: a handheld scanner with a folded antenna, a headset jack and a small waveform screen', 'the waveform screen'],
      ['item-cracha-manutencao', 'three maintenance vests with hanging ID badges, simple strips and a hard hat on top (no text, no logos)', 'the badges']
    ]
  },
  {
    scope: 'carga', pack: 'carga-tesouros', kind: 'item', spot: 'orange', label: 'Tesouros',
    entries: [
      ['item-celula-militar', 'a military power cell: a heavy rugged cylindrical battery with handles, thick terminals and a warning stripe (no text)', 'the terminals'],
      ['item-nucleo-cerbero', 'a robot core: a glowing sphere inside a protective cage frame with cooling fins and cables, extracted from a robot chest', 'the sphere']
    ]
  }
];

/**
 * Imagens reaproveitadas de outra entrada (sem gerar de novo): destino -> origem.
 * Destino e origem no formato `escopo/compêndio/identifier`.
 */
export const REUSE = [
  ['module/noite-elenco/seguranca-corporativa', 'module/ameacas/seguranca-corporativa'],
  ['module/noite-elenco/drone-de-vigilancia', 'module/ameacas/drone-de-vigilancia'],
  ['carga/carga-equipamentos/item-furgao-tavares', 'module/veiculos/van-de-carga'],
  ['carga/carga-equipamentos/item-motos-tavares', 'module/veiculos/moto-urbana'],
  ['carga/carga-equipamentos/item-granadas', 'module/equipamento/granada-de-fragmentacao'],
  ['carga/carga-equipamentos/item-carga-demolicao', 'module/equipamento/carga-de-demolicao']
];

export const STYLE = {
  art: 'Art Direction: A clean, bold 2D flat vector-style digital illustration, inspired by minimalist graphic novel art and modern vector zines. Composed of solid, sharp shapes, very thick and smooth black outlines, and flat, blocky cel-shaded grayscale (pure black, white, and flat gray tones). Absolutely NO sketchy crosshatching, NO rough ink lines, NO pen and ink aesthetics, NO pencil textures, and NO smooth digital gradients. Focus on heavy graphic contrast and flat color blocking.',
  color: (spot, focus) =>
    `Color Scheme: Strictly flat grayscale (black, white, and flat grays) for everything, including skin, faces, hands, hair, clothing and background, EXCEPT for one single, intense, glowing spot color (${COLORS[spot]}) used sparingly only on ${focus}. No global lighting spill, only sharp graphic highlights.`,
  atmosphere: 'Atmosphere: Gritty, high-contrast, minimalist 2D vector comic book style. Clean retro cyberpunk aesthetic.',
  background: 'plain flat light gray background (#CFCFD4), no gradient, no floor, no cast shadow, nothing touching the edges',
  token: (bg) => `Format: square 1:1 game token portrait. The subject is centered and fills about 75% of the frame, on a ${bg}, so the image can be cropped into a circle.`,
  item: (bg) => `Format: square 1:1 inventory icon. A single subject centered, filling about 75% of the frame, with a bold readable silhouette that still works at 64 pixels, on a ${bg}.`,
  closing: 'No text, no lettering, no numbers, no logos, no watermark.'
};

/** Prompt final de uma entrada. */
export function buildPrompt(kind, subject, spot, focus) {
  return [
    STYLE.art,
    `Subject: ${subject}.`,
    STYLE.color(spot, focus),
    STYLE[kind](STYLE.background),
    STYLE.atmosphere,
    STYLE.closing
  ].join(' ');
}

/** Lista plana com código, caminho de saída e prompt. */
export function flatCatalog() {
  const out = [];
  let n = 0;
  for (const g of GROUPS) {
    for (const [id, subject, focus] of g.entries) {
      n += 1;
      out.push({
        code: `S${String(n).padStart(3, '0')}`,
        scope: g.scope,
        pack: g.pack,
        id,
        kind: g.kind,
        spot: g.spot,
        label: g.label,
        subject,
        focus,
        file: `arte/${g.pack}/${id}.webp`,
        prompt: buildPrompt(g.kind, subject, g.spot, focus)
      });
    }
  }
  return out;
}

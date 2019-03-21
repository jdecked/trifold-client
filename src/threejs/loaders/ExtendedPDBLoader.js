/**
 * Extended based on THREE.PDBLoader by:
 * @author alteredq / http://alteredqualia.com/
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Extension by:
 * @author jdecked <justine@minerva.kgi.edu>
 *
 * @flow strict
 */

import {
  PDBLoader,
  BufferGeometry,
  Float32BufferAttribute,
  Vector3
} from 'three-full';

const atomColoring = {
  h: { r: 255, g: 255, b: 255 },
  he: { r: 217, g: 255, b: 255 },
  li: { r: 204, g: 128, b: 255 },
  be: { r: 194, g: 255, b: 0 },
  b: { r: 255, g: 181, b: 181 },
  c: { r: 144, g: 144, b: 144 },
  n: { r: 48, g: 80, b: 248 },
  o: { r: 255, g: 13, b: 13 },
  f: { r: 144, g: 224, b: 80 },
  ne: { r: 179, g: 227, b: 245 },
  na: { r: 171, g: 92, b: 242 },
  mg: { r: 138, g: 255, b: 0 },
  al: { r: 191, g: 166, b: 166 },
  si: { r: 240, g: 200, b: 160 },
  p: { r: 255, g: 128, b: 0 },
  s: { r: 255, g: 255, b: 48 },
  cl: { r: 31, g: 240, b: 31 },
  ar: { r: 128, g: 209, b: 227 },
  k: { r: 143, g: 64, b: 212 },
  ca: { r: 61, g: 255, b: 0 },
  sc: { r: 230, g: 230, b: 230 },
  ti: { r: 191, g: 194, b: 199 },
  v: { r: 166, g: 166, b: 171 },
  cr: { r: 138, g: 153, b: 199 },
  mn: { r: 156, g: 122, b: 199 },
  fe: { r: 224, g: 102, b: 51 },
  co: { r: 240, g: 144, b: 160 },
  ni: { r: 80, g: 208, b: 80 },
  cu: { r: 200, g: 128, b: 51 },
  zn: { r: 125, g: 128, b: 176 },
  ga: { r: 194, g: 143, b: 143 },
  ge: { r: 102, g: 143, b: 143 },
  as: { r: 189, g: 128, b: 227 },
  se: { r: 255, g: 161, b: 0 },
  br: { r: 166, g: 41, b: 41 },
  kr: { r: 92, g: 184, b: 209 },
  rb: { r: 112, g: 46, b: 176 },
  sr: { r: 0, g: 255, b: 0 },
  y: { r: 148, g: 255, b: 255 },
  zr: { r: 148, g: 224, b: 224 },
  nb: { r: 115, g: 194, b: 201 },
  mo: { r: 84, g: 181, b: 181 },
  tc: { r: 59, g: 158, b: 158 },
  ru: { r: 36, g: 143, b: 143 },
  rh: { r: 10, g: 125, b: 140 },
  pd: { r: 0, g: 105, b: 133 },
  ag: { r: 192, g: 192, b: 192 },
  cd: { r: 255, g: 217, b: 143 },
  in: { r: 166, g: 117, b: 115 },
  sn: { r: 102, g: 128, b: 128 },
  sb: { r: 158, g: 99, b: 181 },
  te: { r: 212, g: 122, b: 0 },
  i: { r: 148, g: 0, b: 148 },
  xe: { r: 66, g: 158, b: 176 },
  cs: { r: 87, g: 23, b: 143 },
  ba: { r: 0, g: 201, b: 0 },
  la: { r: 112, g: 212, b: 255 },
  ce: { r: 255, g: 255, b: 199 },
  pr: { r: 217, g: 255, b: 199 },
  nd: { r: 199, g: 255, b: 199 },
  pm: { r: 163, g: 255, b: 199 },
  sm: { r: 143, g: 255, b: 199 },
  eu: { r: 97, g: 255, b: 199 },
  gd: { r: 69, g: 255, b: 199 },
  tb: { r: 48, g: 255, b: 199 },
  dy: { r: 31, g: 255, b: 199 },
  ho: { r: 0, g: 255, b: 156 },
  er: { r: 0, g: 230, b: 117 },
  tm: { r: 0, g: 212, b: 82 },
  yb: { r: 0, g: 191, b: 56 },
  lu: { r: 0, g: 171, b: 36 },
  hf: { r: 77, g: 194, b: 255 },
  ta: { r: 77, g: 166, b: 255 },
  w: { r: 33, g: 148, b: 214 },
  re: { r: 38, g: 125, b: 171 },
  os: { r: 38, g: 102, b: 150 },
  ir: { r: 23, g: 84, b: 135 },
  pt: { r: 208, g: 208, b: 224 },
  au: { r: 255, g: 209, b: 35 },
  hg: { r: 184, g: 184, b: 208 },
  tl: { r: 166, g: 84, b: 77 },
  pb: { r: 87, g: 89, b: 97 },
  bi: { r: 158, g: 79, b: 181 },
  po: { r: 171, g: 92, b: 0 },
  at: { r: 117, g: 79, b: 69 },
  rn: { r: 66, g: 130, b: 150 },
  fr: { r: 66, g: 0, b: 102 },
  ra: { r: 0, g: 125, b: 0 },
  ac: { r: 112, g: 171, b: 250 },
  th: { r: 0, g: 186, b: 255 },
  pa: { r: 0, g: 161, b: 255 },
  u: { r: 0, g: 143, b: 255 },
  np: { r: 0, g: 128, b: 255 },
  pu: { r: 0, g: 107, b: 255 },
  am: { r: 84, g: 92, b: 242 },
  cm: { r: 120, g: 92, b: 227 },
  bk: { r: 138, g: 79, b: 227 },
  cf: { r: 161, g: 54, b: 212 },
  es: { r: 179, g: 31, b: 212 },
  fm: { r: 179, g: 31, b: 186 },
  md: { r: 179, g: 13, b: 166 },
  no: { r: 189, g: 13, b: 135 },
  lr: { r: 199, g: 0, b: 102 },
  rf: { r: 204, g: 0, b: 89 },
  db: { r: 209, g: 0, b: 79 },
  sg: { r: 217, g: 0, b: 69 },
  bh: { r: 224, g: 0, b: 56 },
  hs: { r: 230, g: 0, b: 46 },
  mt: { r: 235, g: 0, b: 38 },
  ds: { r: 235, g: 0, b: 38 },
  rg: { r: 235, g: 0, b: 38 },
  cn: { r: 235, g: 0, b: 38 },
  uut: { r: 235, g: 0, b: 38 },
  uuq: { r: 235, g: 0, b: 38 },
  uup: { r: 235, g: 0, b: 38 },
  uuh: { r: 235, g: 0, b: 38 },
  uus: { r: 235, g: 0, b: 38 },
  uuo: { r: 235, g: 0, b: 3 }
};

export default class ExtendedPDBLoader extends PDBLoader {
  constructor() {
    super();
    this.covalentBonds = [];
    this.hydrogenBonds = [];
    this.atoms = [];
    this.lines = [];
  }

  static capitalize(text: string) {
    return (
      text.charAt(0).toUpperCase() +
      text.slice(1, text.length - 1).toLowerCase()
    );
  }

  static hash(s: number, e: number) {
    return `s${Math.min(s, e)}e${Math.max(s, e)}`;
  }

  parseCovalentBond(
    start: number,
    length: number,
    line: number,
    startAtom: number
  ) {
    const bondsHash = {};
    const endAtom = parseInt(this.lines[line].substr(start, length), 10);

    if (endAtom) {
      const bond = ExtendedPDBLoader.hash(startAtom, endAtom);

      if (bondsHash[bond] === undefined) {
        this.covalentBonds.push([startAtom - 1, endAtom - 1, 1]);
        bondsHash[bond] = this.covalentBonds.length - 1;
      } else {
        // doesn't really work as almost all PDBs
        // have just normal bonds appearing multiple
        // times instead of being double/triple bonds
        // bonds[bondsHash[bond]][2] += 1;
      }
    }

    return bondsHash;
  }

  calculateDistanceMatrix() {
    const distanceMatrix = {};
    for (let a = 0; a < this.atoms.length; a += 1) {
      for (let a2 = 0; a2 < this.atoms.length; a2 += 1) {
        const startAtom = this.atoms[a];
        const endAtom = this.atoms[a2];
        const { x: endAtomX, y: endAtomY, z: endAtomZ } = endAtom;
        const { x: startAtomX, y: startAtomY, z: startAtomZ } = startAtom;

        const startAtomVector = new Vector3(startAtomX, startAtomY, startAtomZ);
        const endAtomVector = new Vector3(endAtomX, endAtomY, endAtomZ);

        const distance = startAtomVector.distanceTo(endAtomVector);

        if (distanceMatrix[startAtom.id]) {
          distanceMatrix[startAtom.id][endAtom.id] = distance;
        } else {
          distanceMatrix[startAtom.id] = { [endAtom.id]: distance };
        }

        if (distanceMatrix[endAtom.id]) {
          distanceMatrix[endAtom.id][startAtom.id] = distance;
        } else {
          distanceMatrix[endAtom.id] = { [startAtom.id]: distance };
        }
      }
    }

    return distanceMatrix;
  }

  inferHydrogenBonds = () => {
    // This is based on the DSSP algorithm by Kabsch & Sander (1983).
    const distanceMatrix = this.calculateDistanceMatrix();
    const nitrogens = this.atoms.filter(a => a.element === 'N');
    const oxygens = this.atoms.filter(a => a.element === 'O');
    const carbons = this.atoms.filter(a => a.element === 'C');
    const hydrogens = this.atoms.filter(a => a.element === 'H');

    for (let a = 0; a < nitrogens.length; a += 1) {
      for (let a2 = 0; a2 < oxygens.length; a2 += 1) {
        const nitrogen = nitrogens[a];
        const oxygen = oxygens[a2];

        if (nitrogen.aminoAcid !== oxygen.aminoAcid) {
          const ONdistance = distanceMatrix[oxygen.id][nitrogen.id];

          const carbonylBonds = this.covalentBonds.filter(bond => {
            const carbonIds = carbons.map(carbon => carbon.id);
            return bond[0] === oxygen.id - 1 && carbonIds.includes(bond[1] + 1);
          });
          const amineBonds = this.covalentBonds.filter(bond => {
            const hydrogenIds = hydrogens.map(hydrogen => hydrogen.id);
            return (
              bond[0] === nitrogen.id - 1 && hydrogenIds.includes(bond[1] + 1)
            );
          });

          const CNdistance = carbonylBonds
            .map(bond => distanceMatrix[bond[1] + 1][nitrogen.id])
            .reduce((accumulator, value) => accumulator + value, 0);
          const CHdistance = amineBonds
            .map(
              amineBond =>
                // eslint-disable-next-line implicit-arrow-linebreak
                carbonylBonds.map(
                  carbonylBond =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    distanceMatrix[amineBond[1] + 1][carbonylBond[1] + 1]
                )
              // eslint-disable-next-line function-paren-newline
            )
            .reduce((accumulator, value) => accumulator + value, 0);
          const OHdistance = amineBonds
            .map(bond => distanceMatrix[oxygen.id][bond[1] + 1])
            .reduce((accumulator, value) => accumulator + value, 0);
          const inverseONdistance =
            1 / ONdistance === Infinity ? 0 : 1 / ONdistance;
          const inverseCHdistance =
            1 / CHdistance === Infinity ? 0 : 1 / CHdistance;
          const inverseCNdistance =
            1 / CNdistance === Infinity ? 0 : 1 / CNdistance;
          const inverseOHdistance =
            1 / OHdistance === Infinity ? 0 : 1 / OHdistance;

          const energy =
            0.084 *
            332 *
            (inverseONdistance +
              inverseCHdistance -
              inverseCNdistance -
              inverseOHdistance);

          if (energy < -0.5 && carbonylBonds && amineBonds) {
            this.hydrogenBonds.push([nitrogen.id - 1, oxygen.id - 1, energy]);
          }
        }
      }
    }
  };

  buildGeometry() {
    const build = {
      geometryAtoms: new BufferGeometry(),
      geometryCovalentBonds: new BufferGeometry(),
      geometryHydrogenBonds: new BufferGeometry(),
      json: {
        atoms: this.atoms,
        covalentBonds: this.covalentBonds,
        hydrogenBonds: this.hydrogenBonds
      }
    };

    const {
      geometryAtoms,
      geometryCovalentBonds,
      geometryHydrogenBonds
    } = build;
    const atomVertices = [];
    const atomColors = [];
    const covalentBondVertices = [];
    const hydrogenBondVertices = [];

    for (let atomIdx = 0; atomIdx < this.atoms.length; atomIdx += 1) {
      const atom = this.atoms[atomIdx];
      const { x, y, z, color } = atom;
      const { r, g, b } = color;

      atomVertices.push(x, y, z);

      const decimalR = r / 255;
      const decimalG = g / 255;
      const decimalB = b / 255;

      atomColors.push(decimalR, decimalG, decimalB);
    }

    for (
      let cBondIdx = 0;
      cBondIdx < this.covalentBonds.length;
      cBondIdx += 1
    ) {
      const bond = this.covalentBonds[cBondIdx];

      const start = bond[0];
      const end = bond[1];

      covalentBondVertices.push(atomVertices[start * 3 + 0]);
      covalentBondVertices.push(atomVertices[start * 3 + 1]);
      covalentBondVertices.push(atomVertices[start * 3 + 2]);

      covalentBondVertices.push(atomVertices[end * 3 + 0]);
      covalentBondVertices.push(atomVertices[end * 3 + 1]);
      covalentBondVertices.push(atomVertices[end * 3 + 2]);
    }

    for (
      let hBondIdx = 0;
      hBondIdx < this.hydrogenBonds.length;
      hBondIdx += 1
    ) {
      const bond = this.hydrogenBonds[hBondIdx];

      const start = bond[0];
      const end = bond[1];

      hydrogenBondVertices.push(atomVertices[start * 3 + 0]);
      hydrogenBondVertices.push(atomVertices[start * 3 + 1]);
      hydrogenBondVertices.push(atomVertices[start * 3 + 2]);

      hydrogenBondVertices.push(atomVertices[end * 3 + 0]);
      hydrogenBondVertices.push(atomVertices[end * 3 + 1]);
      hydrogenBondVertices.push(atomVertices[end * 3 + 2]);
    }

    geometryAtoms.addAttribute(
      'position',
      new Float32BufferAttribute(atomVertices, 3)
    );
    geometryAtoms.addAttribute(
      'color',
      new Float32BufferAttribute(atomColors, 3)
    );

    geometryCovalentBonds.addAttribute(
      'position',
      new Float32BufferAttribute(covalentBondVertices, 3)
    );

    geometryHydrogenBonds.addAttribute(
      'position',
      new Float32BufferAttribute(hydrogenBondVertices, 3)
    );

    return build;
  }

  parseAtoms(line: number) {
    const id = parseInt(this.lines[line].substr(6, 5), 10);
    const x = parseFloat(this.lines[line].substr(30, 7));
    const y = parseFloat(this.lines[line].substr(38, 7));
    const z = parseFloat(this.lines[line].substr(46, 7));
    const aminoAcid = this.lines[line].substr(17, 3);

    let element = this.lines[line]
      .substr(76, 2)
      .trim()
      .toLowerCase();

    if (element === '') {
      element = this.lines[line]
        .substr(12, 2)
        .trim()
        .toLowerCase();
    }

    const atom = {
      id,
      x,
      y,
      z,
      color: atomColoring[element],
      element: ExtendedPDBLoader.capitalize(element),
      aminoAcid
    };

    this.atoms.push(atom);
  }

  parseCovalentBonds(line: number) {
    const startAtom = parseInt(this.lines[line].substr(6, 5), 10);

    this.parseCovalentBond(11, 5, line, startAtom);
    this.parseCovalentBond(16, 5, line, startAtom);
    this.parseCovalentBond(21, 5, line, startAtom);
    this.parseCovalentBond(26, 5, line, startAtom);
  }

  static extractCommand(line: string) {
    return line.split(' ')[0];
  }

  parse(text: string) {
    this.lines = text.split('\n');

    for (let line = 0; line < this.lines.length; line += 1) {
      switch (ExtendedPDBLoader.extractCommand(this.lines[line])) {
        case 'ATOM':
        case 'HETATM':
          this.parseAtoms(line);
          break;

        case 'CONECT':
          this.parseCovalentBonds(line);
          break;

        default:
          break;
      }
    }

    this.inferHydrogenBonds();

    return this.buildGeometry();
  }
}

/**
 * Extended based on THREE.PDBLoader by:
 * @author alteredq / http://alteredqualia.com/
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Extension by:
 * @author jdecked <justine@minerva.kgi.edu>
 */

import {
  BufferGeometry,
  Float32BufferAttribute,
  DefaultLoadingManager,
  FileLoader
} from 'three-full';
import AminoAcidGroup from '../subjects/AminoAcidGroup';

// TODO: Possibly not necessary for MVP. On hold for now.

export default class FastaLoader {
  constructor(scene) {
    this.aminoAcidGroups = [];
    this.manager = DefaultLoadingManager;
    this.aminoAcidRenderers = {
      A: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/alanine.pdb',
        'skyblue'
      ),
      C: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/cysteine.pdb',
        'skyblue'
      ),
      D: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/aspartic_acid.pdb',
        'skyblue'
      ),
      E: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/glutamic_acid.pdb',
        'skyblue'
      ),
      F: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/phenylalanine.pdb',
        'skyblue'
      ),
      G: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/glycine.pdb',
        'skyblue'
      ),
      H: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/histidine.pdb',
        'skyblue'
      ),
      I: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/isoleucine.pdb',
        'skyblue'
      ),
      K: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/lysine.pdb',
        'skyblue'
      ),
      L: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/leucine.pdb',
        'skyblue'
      ),
      M: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/methionine.pdb',
        'skyblue'
      ),
      N: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/asparagine.pdb',
        'skyblue'
      ),
      P: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/proline.pdb',
        'skyblue'
      ),
      Q: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/glutamine.pdb',
        'skyblue'
      ),
      R: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/arginine.pdb',
        'skyblue'
      ),
      S: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/serine.pdb',
        'skyblue'
      ),
      T: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/threonine.pdb',
        'skyblue'
      ),
      U: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/selenocysteine.pdb',
        'skyblue'
      ),
      V: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/valine.pdb',
        'skyblue'
      ),
      W: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/tryptophan.pdb',
        'skyblue'
      ),
      Y: new AminoAcidGroup(
        scene,
        'molecules/amino_acids/tyrosine.pdb',
        'skyblue'
      )
    };
  }

  load(url, onLoad, onProgress, onError) {
    const scope = this;

    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.load(
      url,
      text => {
        onLoad(this.parse(text));
      },
      onProgress,
      onError
    );
  }

  buildGeometry() {
    const build = {
      geometryAtoms: new BufferGeometry(),
      geometryBonds: new BufferGeometry(),
      json: {
        atoms: this.atoms,
        bonds: this.bonds
      }
    };

    const { geometryAtoms, geometryBonds } = build;
    const atomVertices = [];
    const atomColors = [];
    const bondVertices = [];

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

    for (let bondIdx = 0; bondIdx < this.bonds.length; bondIdx += 1) {
      const bond = this.bonds[bondIdx];

      const start = bond[0];
      const end = bond[1];

      bondVertices.push(atomVertices[start * 3 + 0]);
      bondVertices.push(atomVertices[start * 3 + 1]);
      bondVertices.push(atomVertices[start * 3 + 2]);

      bondVertices.push(atomVertices[end * 3 + 0]);
      bondVertices.push(atomVertices[end * 3 + 1]);
      bondVertices.push(atomVertices[end * 3 + 2]);
    }

    geometryAtoms.addAttribute(
      'position',
      new Float32BufferAttribute(atomVertices, 3)
    );
    geometryAtoms.addAttribute(
      'color',
      new Float32BufferAttribute(atomColors, 3)
    );

    geometryBonds.addAttribute(
      'position',
      new Float32BufferAttribute(bondVertices, 3)
    );

    return build;
  }

  parseAminoAcidGroups(aminoAcids) {
    aminoAcids.forEach(aminoAcid => {
      this.aminoAcidGroups.push(aminoAcidRenderer[aminoAcid]);
    });
  }

  parse(text) {
    this.lines = text.split('\n');

    for (let line = 0; line < this.lines.length; line += 1) {
      switch (this.lines[line][0]) {
        case '>':
          break;

        default:
          this.parseAminoAcidGroups(this.lines[line]);
          break;
      }
    }

    return this.buildGeometry();
  }
}

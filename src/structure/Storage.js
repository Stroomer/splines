import Vertex from '../graphics/Vertex.js';

class Storage {
  constructor() {
    this.fallback = [
      new Vertex({ x: 10, y: 41 }),
      new Vertex({ x: 30, y: 41 }),
      new Vertex({ x: 50, y: 41 }),
      new Vertex({ x: 70, y: 41 }),
      new Vertex({ x: 90, y: 41 }),
      new Vertex({ x: 110, y: 41 }),
      new Vertex({ x: 130, y: 41 }),
      new Vertex({ x: 150, y: 41 }),
      new Vertex({ x: 170, y: 41 }),
      new Vertex({ x: 190, y: 41 }),
    ];
  }

  save(vertices) {
    let data = '';
    for (let i = 0; i < vertices.length; i++) {
      data += vertices[i].x + '_' + vertices[i].y + '_';
    }
    data = data.slice(0, -1);
    console.log(data);
    window.localStorage.setItem('data', data);
  }

  load() {
    let data = window.localStorage.getItem('data');
    //if (data) {
    if (!data) {
      data =
        '158.5_140.5_49.5_86.5_34.5_58.5_62_21.5_89.5_15_114.5_6_139_20_174_28_213.5_16.5_228.5_81';
    }

    console.log('data found');
    data = data.split('_');
    const vertices = [];
    for (let i = 0; i < data.length; i += 2) {
      vertices.push(
        new Vertex({ x: parseFloat(data[i]), y: parseFloat(data[i + 1]) })
      );
    }
    return vertices;
    // } else {
    //   console.log('no data found');
    //   return this.fallback;
    // }
  }

  clear() {
    window.localStorage.clear();
  }
}

export default Storage;

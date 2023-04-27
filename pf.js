const fs = require('fs');
class Products {
    constructor(cp, desc, price, clasi, stock, stockMin, stockMax) 
    {
      this.cp = cp;
      this.desc = desc;
      this.price = price;
      this.clasi = clasi;
      this.stock = stock;
      this.stockMin = stockMin;
      this.stockMax = stockMax;
    }
  }
  
  class DAO {
    constructor() {
      this.array = [];
    }
  
    readData(archivo) {
      const infoArchivo = fs.readFileSync(archivo, 'utf-8');
      const rens = infoArchivo.split('\n');
      const array = rens.map(ren => {
      const pos = ren.split(',');
      const p = new Products(pos[0], pos[1], parseFloat(pos[2]), pos[3], parseInt(pos[4]), parseInt(pos[5]), parseInt(pos[6]));
      return p;
      });
      this.array = array;
    }

    e1() {
      return this.array.filter(p => p.stock > 20).length;
    }

    e2() {
      return this.array.filter(p => p.stock <15).length;
    }
  
    e3(products) {
      const clasif = this.array[3].clasi;
      const fp = this.array.filter(p => p.clasi === clasif && p.price > 15.50);
      return fp.map(p => p.desc);    
    }
  
    e4(products) {
      const fp = this.array.filter(p => p.price > 20.30 && p.price < 45.00);
      return fp.map(p => `${p.desc} - ${p.price}`);    
    }
  
    e5(products) {
      const groups = {};
      this.array.forEach(p => {
        if (groups[p.clasi]) {
          groups[p.clasi] += 1;
        } else {
          groups[p.clasi] = 1;
        }
      });
    console.log("5.-#productos agrupados por su clasificación:\n");
    console.log(groups);
    return true;
    }
  }

const dao = new DAO();
dao.readData('products.txt'); 

console.log(`1.-#productos con existencia > 20 = ${dao.e1()}\n`);
console.log(`2.-#productos con existencia < 15 = ${dao.e2()}\n`);
console.log(`3.-#Lista de productos con la misma clasificación > 15.50 = ${dao.e3()}\n`);
console.log(`4.-#Lista de productos con la misma clasificación > 20.30 y < 45 = ${dao.e4()}\n`);
console.log(dao.e5());

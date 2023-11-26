import { Manufacturer } from "./Manufacturer";
import { Picture } from "./Picture";

export class Product {
    id: number=0;
    naziv: string='';
    aktivan: boolean=false;
    datumKreiranja!: Date;
    proizvodjac!: Manufacturer;
    pictures: Picture[]=[];
}
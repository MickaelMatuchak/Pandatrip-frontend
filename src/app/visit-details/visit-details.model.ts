export class VisitDetailsModel {
  constructor(id: number, name: string, address: string, city: string, postalCode: number, description: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
    this.description = description;
  }
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: number;
  description: string;
}

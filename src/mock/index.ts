import carsData from "./../data.json";

export function getCars() {
  return carsData;
}

export function getCarById(id: string) {
  return carsData.filter(_c => _c.id === id)[0];
}
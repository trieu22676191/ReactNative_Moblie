class Animal{
    sound():void{
        console.log("The animal make a sound");
    }
}
class Dogo extends Animal{
    sound(): void {
        console.log("Woof");
    }
}
class Cata extends Animal{
    sound(): void {
        console.log("Meow");
    }
}
function makeAnimalSound(animal: Animal): void {
    animal.sound();
}
const a1: Animal = new Animal();
const a2: Animal = new Dogo();
const a3: Animal = new Cata();

makeAnimalSound(a1);
makeAnimalSound(a2); 
makeAnimalSound(a3);
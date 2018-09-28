const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index,timestamp,data,previousHash = " "){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
}
mineBlock(difficulty){
    while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
        this.nonce++;
        this.hash = this.calculateHash();
    }
    console.log("Block mined " + this.hash);
}
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 6;
    }
createGenesisBlock(){
    return new Block(0,"25/10/1998","SAIRAM","0");
}
getLatestBlock(){
    return this.chain[this.chain.length - 1];
}
addNewBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
}
ischeckValid(){
    for(let i = 1;i < this.chain.length ; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];
        if(currentBlock.hash !== currentBlock.calculateHash()){
            return false;
        }
        if(currentBlock.previousHash !== previousBlock.hash){
            return false;
        }
        }
        return true;
}
}


let SB = new Blockchain();

console.log("mining block 1 !.........");
SB.addNewBlock(new Block(1,"26/10/1998","BHANU","1"));

console.log("mining block 2 !.........");
SB.addNewBlock(new Block(2,"27/10/1998","BUNTY","2"));

/*console.log('is Blockchain valid ?' + SB.ischeckValid());

SB.chain[2].data = "NOT BUNTY";
console.log('is Blockchain valid ?' + SB.ischeckValid());*/

//console.log(JSON.stringify(SB,null,4));
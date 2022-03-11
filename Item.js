class Item{
    constructor(imagearray, type, max){
        this.itemImgs = [];
        for (let i = 0; i < imagearray.length; i++){
            this.itemImgs[i] = imagearray[i];//array of images to cycle through
        } 
        this.imgIndex = 0; //index of current image selected
        this.itemType = type; //the type of item: food, toy, bath, 
        this.arrayMax = max; //max number, not max index
    }

    
    changeItem(scene){
        
        this.imgIndex = Math.floor(Math.random() * this.arrayMax);
        
    }
    
}
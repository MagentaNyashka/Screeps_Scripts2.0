var boostTime = 0;
var roleHarvester = {
    run: function(creep) {
        if(creep.memory.transferring && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.transferring = false;
        }
        if(!creep.memory.transferring && creep.store.getFreeCapacity() <= 10){
            creep.memory.transferring = true;
        }
        if(creep.memory.transferring){
            var links = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(structure.structureType == STRUCTURE_LINK);
                }
            });
            var link = creep.pos.findClosestByRange(links);
            if(links != 0){
                if(creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(link, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                });
                var structures = creep.pos.findClosestByRange(targets);
                if(creep.transfer(structures, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structures, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                if(targets == 0){
                    var towers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return(structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 100;
                        }
                    });
                    var tower = creep.pos.findClosestByRange(towers);
                    if(towers != 0){
                        if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(tower);
                        }
                    }
                }
            }
        }
        /*
I used to rule the world
Seas would rise when I gave the word
Now in the morning I sleep alone
Sweep the streets I used to own

I used to roll the dice
Feel the fear in my enemy's eyes
Listened as the crowd would sing,
"Now the old king is dead! Long live the king!"
One minute I held the key
Next the walls were closed on me
And I discovered that my castles stand
Upon pillars of salt and pillars of sand

I hear Jerusalem bells a-ringing
Roman cavalry choirs are singing
Be my mirror, my sword and shield
My missionaries in a foreign field
For some reason I can't explain
Once you'd gone there was never
Never an honest word
And that was when I ruled the world

It was a wicked and wild wind
Blew down the doors to let me in
Shattered windows and the sound of drums
People couldn't believe what I'd become
Revolutionaries wait
For my head on a silver plate
Just a puppet on a lonely string
Oh who would ever want to be king?

I hear Jerusalem bells a-ringing
Roman cavalry choirs are singing
Be my mirror, my sword and shield
My missionaries in a foreign field
For some reason I can't explain
I know St. Peter won't call my name
Never an honest word
But that was when I ruled the world

Oh, oh, oh, oh, oh, oh [5x]

Hear Jerusalem bells a-ringing
Roman cavalry choirs are singing
Be my mirror, my sword and shield
My missionaries in a foreign field
For some reason I can't explain
I know St. Peter won't call my name
Never an honest word
But that was when I ruled the world 
        */
        else{
            
            if(creep.room == '[room E27N39]'){
                var bLab = Game.getObjectById('62d4c9d27d34ce0fbbf5b300');
                if(!creep.memory.boosted && bLab.store[RESOURCE_UTRIUM_ALKALIDE] != 0 && bLab.store[RESOURCE_ENERGY] != 0){
                    if(!creep.pos.inRangeTo(bLab, 1)){
                        creep.moveTo(bLab, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    else{
                        if(boostTime != 5){
                            boostTime = boostTime + 1;
                        }
                        else{
                            creep.memory.boosted = true;
                            boostTime = 0;
                        }
                    }
                    
                }
                else{
                    var sources = creep.room.find(FIND_SOURCES);
                    if(sources.length >= 2){
                        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE || creep.harvest(sources[1]) == ERR_NOT_ENOUGH_ENERGY) {
                            creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    if(sources.length == 1){
                        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE || creep.harvest(sources[0]) == ERR_NOT_ENOUGH_ENERGY) {
                            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
            
            else{
                var sources = creep.room.find(FIND_SOURCES);
                if(sources.length >= 2){
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE || creep.harvest(sources[1]) == ERR_NOT_ENOUGH_ENERGY) {
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                if(sources.length == 1){
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE || creep.harvest(sources[0]) == ERR_NOT_ENOUGH_ENERGY) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};
module.exports = roleHarvester;
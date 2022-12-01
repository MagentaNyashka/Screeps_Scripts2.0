var roleMiner = {
    run: function(creep) {
        var sources = creep.room.find(FIND_MINERALS);
        if(creep.memory.transferring && creep.store[RESOURCE_HYDROGEN] == 0 && creep.ticksToLive > 600){
            creep.memory.transferring = false;
            creep.say('harvest');
        }
        if(!creep.memory.transferring && creep.store.getFreeCapacity() == 0){
            creep.memory.transferring = true;
            creep.say('transfer');
        }
        if(creep.memory.transferring){
            if(creep.room == '[room E27N39]'){
                if(creep.store[RESOURCE_HYDROGEN] == 0){
                    var terminal = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return(
                                //structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_TERMINAL);
                            }
                        });
                    var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return(
                                //structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_STORAGE);
                            }
                        });
                    var kLab = Game.getObjectById("62a5233f875df90a4ea2576a");
                    var zLab = Game.getObjectById("62d13471f319f22aaed658ce");
                    var uLab = Game.getObjectById('62a7fe22d78d6e0577d2347c');
                    var lLab = Game.getObjectById('62ab2f1f00db9fe0cfe039fc');
                    var ghLab = Game.getObjectById('62d1cc51db46af21be01b5d5');
                    var nuker = Game.getObjectById('62d6c46f311108d3850b8891');
                    var factory = Game.getObjectById('631d8315f169257f0b3fefc7');
                    var bLab = Game.getObjectById('62d4c9d27d34ce0fbbf5b300');
                    
                    if(creep.store.getFreeCapacity() > 0 && kLab.store.getFreeCapacity(RESOURCE_KEANIUM) >= 200){
                        if(creep.withdraw(terminal, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                    }
                    if(creep.store.getFreeCapacity() > 0 && zLab.store.getFreeCapacity(RESOURCE_ZYNTHIUM) >= 200){
                        if(creep.withdraw(terminal, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                    }
                    if(creep.store.getFreeCapacity() > 0 && uLab.store.getFreeCapacity(RESOURCE_UTRIUM) >= 200){
                        if(creep.withdraw(terminal, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                    }
                    if(creep.store.getFreeCapacity() > 0 && lLab.store.getFreeCapacity(RESOURCE_LEMERGIUM) >= 200){
                        if(creep.withdraw(terminal, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                    }
                    if(creep.store.getFreeCapacity() > 0 && nuker.store.getFreeCapacity(RESOURCE_GHODIUM) > 0 && ghLab.store[RESOURCE_GHODIUM] >= 200){
                        if(creep.withdraw(ghLab, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(ghLab, {visualizePathStyle: {stroke: '#00ffff'}});
                        } 
                    }
                    
                    if(creep.store.getFreeCapacity() > 0 && factory.store[RESOURCE_KEANIUM] <= 1000){
                        if(creep.withdraw(terminal, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                    }
                    
                    if(creep.store.getFreeCapacity() > 0 && factory.store[RESOURCE_OXYGEN] <= 1000){
                        if(creep.withdraw(terminal, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                    }
                    if(creep.store.getFreeCapacity() > 0 && factory.store[RESOURCE_MIST] <= 10000){
                        if(creep.withdraw(storage, RESOURCE_MIST) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                    }
                    
                    if(creep.store.getFreeCapacity() > 0 && bLab.store.getFreeCapacity(RESOURCE_UTRIUM_ALKALIDE) >= 200){
                        if(creep.withdraw(terminal, RESOURCE_UTRIUM_ALKALIDE) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                    }
                    
                    if(creep.store[RESOURCE_KEANIUM] > 0 || creep.store[RESOURCE_UTRIUM_ALKALIDE] > 0 || creep.store[RESOURCE_ZYNTHIUM] > 0 || creep.store[RESOURCE_UTRIUM] > 0 || creep.store[RESOURCE_LEMERGIUM] > 0 || creep.store[RESOURCE_MIST] > 0){
                        if(creep.store[RESOURCE_KEANIUM] > 0){
                            if(creep.transfer(kLab, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(kLab, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                            
                            if(factory.store[RESOURCE_KEANIUM] < 1000){
                                if(creep.transfer(factory, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(factory, {visualizePathStyle: {stroke: '#ffffff'}});
                                }
                            }
                            
                        }
                        if(creep.store[RESOURCE_ZYNTHIUM] > 0){
                            if(creep.transfer(zLab, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(zLab, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                        if(creep.store[RESOURCE_MIST] > 0){
                            if(creep.transfer(factory, RESOURCE_MIST) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(factory, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                        if(creep.store[RESOURCE_UTRIUM_ALKALIDE] > 0){
                            if(creep.transfer(bLab, RESOURCE_UTRIUM_ALKALIDE) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(bLab, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                        if(creep.store[RESOURCE_LEMERGIUM] > 0){
                            if(creep.transfer(lLab, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(lLab, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                        if(creep.store[RESOURCE_UTRIUM] > 0){
                            if(creep.transfer(uLab, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(uLab, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }
                    if(creep.store[RESOURCE_GHODIUM] > 0){
                        if(creep.transfer(nuker, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(nuker, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    
                    if(creep.store[RESOURCE_OXYGEN] > 0){
                        if(creep.transfer(factory, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(factory, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    
                
                    
                }
                else{
                    var terminal = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (
                                structure.structureType == STRUCTURE_TERMINAL) &&
                                structure.store.getFreeCapacity() > 0;
                        }
                    });
                    var factory = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return(structure.structureType == STRUCTURE_FACTORY) &&
                            structure.store[RESOURCE_HYDROGEN] < 1000;
                        }
                    });
                    if(factory.length == 0){
                        if(creep.transfer(terminal[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    else if(creep.store[RESOURCE_HYDROGEN] != 0){
                        if(creep.transfer(factory[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(factory[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
                
            }
            if(creep.room == '[room E26N39]'){
                if(creep.store[RESOURCE_HYDROGEN] == 0){
                    var terminal = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return(
                                structure.structureType == STRUCTURE_TERMINAL);
                            }
                        });
                    var bE26N39LAB = Game.getObjectById('62e46fcabac167e54855a804');
                    if(creep.store.getFreeCapacity() != 0 && bE26N39LAB.store.getFreeCapacity(RESOURCE_CATALYZED_GHODIUM_ACID) >= 200){
                        if(creep.withdraw(terminal, RESOURCE_CATALYZED_GHODIUM_ACID) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                    }
                    
                    if(creep.store[RESOURCE_CATALYZED_GHODIUM_ACID] > 0){
                        if(creep.store[RESOURCE_CATALYZED_GHODIUM_ACID] > 0){
                            if(creep.transfer(bE26N39LAB, RESOURCE_CATALYZED_GHODIUM_ACID) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(bE26N39LAB, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }
                    
                }
                else{
                    var terminal = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (
                                structure.structureType == STRUCTURE_TERMINAL) &&
                                structure.store.getFreeCapacity() > 0;
                        }
                    });
                    var factory = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return(structure.structureType == STRUCTURE_FACTORY) &&
                            structure.store[RESOURCE_HYDROGEN] < 1000;
                        }
                    });
                    if(factory.length == 0){
                        if(creep.transfer(terminal[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    else{
                        if(creep.transfer(factory[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(factory[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
            else{
                var terminal = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_TERMINAL) &&
                            structure.store.getFreeCapacity() > 0;
                    }
                });
                var factory = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return(structure.structureType == STRUCTURE_FACTORY) &&
                        structure.store[RESOURCE_HYDROGEN] < 1000;
                    }
                });
                if(factory.length == 0){
                    if(creep.transfer(terminal[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else if(creep.store[RESOURCE_HYDROGEN]){
                    if(creep.transfer(factory[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(factory[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        
        }
        else{
            var sources = creep.room.find(FIND_MINERALS
                /*, {
                filter: (Object) => {
                    Object.store > 0;
                }
            }*/
            );
            if(sources.length != 0){
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            /*
            else{
                var flags = creep.room.find(FIND_FLAGS);
                creep.moveTo(flags[0]);
            }
            */
        }
    }
};
module.exports = roleMiner;
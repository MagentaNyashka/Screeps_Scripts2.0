var roleHarvesterUpgr = {
    run: function(creep) {
        if(creep.memory.transferring && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.transferring = false;
        }
        if(!creep.memory.transferring && creep.store.getFreeCapacity() <= 10){
            creep.memory.transferring = true;
        }
        if(creep.memory.transferring){
            var link = Game.getObjectById('62772ada64ac7a000425caf2');
            if(creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(link, {visualizePathStyle: {stroke: '#00ffff'}});
            }
        }
        else{
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && creep.harvest(sources[0]) != ERR_NOT_ENOUGH_ENERGY) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#00ffff'}});
            }
        }
    }
};
module.exports = roleHarvesterUpgr;
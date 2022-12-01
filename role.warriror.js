var roleWarrior = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        if(enemies.length != 0){
            
            if(creep.rangedAttack(enemies[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(46, 8, {visualizePathStyle: {stroke: '#ff0000'}});
            }
            /*
            if(creep.attack(enemies[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(enemies[0], {visualizePathStyle: {stroke: '#ff0000'}});
            }
            */
        }
        else {
            flags = creep.room.find(FIND_FLAGS);
            creep.moveTo(flags[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

module.exports = roleWarrior;
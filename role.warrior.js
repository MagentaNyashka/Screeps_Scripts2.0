var roleWarrior = {
    run: function(creep) {
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        var closestHostile = creep.pos.find(enemies);
        if(closestHostile){
            if(creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#00ffff'}});
            }
        }
    }
};
module.exports = roleWarrior;